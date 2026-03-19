import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";
import DOMPurify from "dompurify";
import Loader from "../components/loader";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: "", title: "", url: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [urlError, setUrlError] = useState("");
  const [editUrlError, setEditUrlError] = useState("");
  const [toast, setToast] = useState(null);
  const [profileLink, setProfileLink] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Loading state for any action

  const showToast = (message, type = "success") => setToast({ message, type });

  // URL Validation
  const isValidURL = (string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
        "localhost)" +
        "(\\:[0-9]{1,5})?" +
        "(\\/.*)?$"
    );
    return pattern.test(string);
  };

  // Fetch Links
  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/links");
      setLinks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLinks();
      const username = localStorage.getItem("username");
      if (username) setProfileLink(`${window.location.origin}/${username}`);
    })();
  }, []);

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(profileLink);
    showToast("Profile link copied to clipboard!", "success");
  };

  const handleViewProfile = () => {
    const username = localStorage.getItem("username");
    if (!username) return;
    navigate(`/${username}`);
  };

  // Add Link
  const handleAddLink = async (e) => {
    e.preventDefault();
    setUrlError("");

    const cleanTitle = DOMPurify.sanitize(title).trim();
    const cleanUrl = url.trim();

    if (!cleanTitle || !cleanUrl) {
      showToast("Please fill all fields", "warning");
      return;
    }

    if (!isValidURL(cleanUrl)) {
      setUrlError("URL is invalid. Use https://example.com");
      return;
    }

    try {
      setIsLoading(true);
      await API.post("/links", { title: cleanTitle, url: cleanUrl });
      setTitle("");
      setUrl("");
      fetchLinks();
      showToast("Link added successfully", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to add link", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Update Link
  const handleUpdate = async () => {
    setEditUrlError("");

    const cleanTitle = DOMPurify.sanitize(editData.title).trim();
    const cleanUrl = editData.url.trim();

    if (!cleanTitle || !cleanUrl) {
      showToast("All fields are required", "warning");
      return;
    }

    if (!isValidURL(cleanUrl)) {
      setEditUrlError("URL is invalid. Use https://example.com");
      return;
    }

    try {
      setIsLoading(true);
      await API.put(`/links/${editData.id}`, { title: cleanTitle, url: cleanUrl });
      setIsModalOpen(false);
      fetchLinks();
      showToast("Link updated successfully", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Update failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Link
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await API.delete(`/links/${deleteId}`);
      setIsDeleteModalOpen(false);
      fetchLinks();
      showToast("Link deleted successfully", "info");
    } catch (error) {
      showToast(error.response?.data?.message || "Delete failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-primary relative">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
          <Loader />
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Link</h2>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full border p-2 rounded mb-3"
              placeholder="Title"
            />
            <input
              type="text"
              value={editData.url}
              onChange={(e) => setEditData({ ...editData, url: e.target.value })}
              className="w-full border p-2 rounded mb-1"
              placeholder="URL"
            />
            {editUrlError && <span className="text-red-500 text-sm mt-1">{editUrlError}</span>}
            <div className="flex justify-end gap-3 mt-3">
              <button onClick={() => setIsModalOpen(false)} className="text-secondary">Cancel</button>
              <button onClick={handleUpdate} className="bg-primary text-background px-4 py-1 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-xl w-96 shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this link?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border rounded text-secondary">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <a onClick={handleViewProfile} className="text-secondary cursor-pointer">View Profile</a>
          <button onClick={handleLogout} className="text-red-600">Logout</button>
        </div>
      </div>

      {/* Profile Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-secondary mb-1">Your public profile link</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={profileLink}
            readOnly
            className="flex-1 border border-border p-2 rounded-l bg-background text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleCopyProfileLink}
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/90 transition"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-secondary mt-1">
          Share this link to let others view your profile and links.
        </p>
      </div>

      {/* Add Link Form */}
      <form onSubmit={handleAddLink} className="flex flex-col gap-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-border p-2 rounded bg-background"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-border p-2 rounded bg-background"
        />
        {urlError && <span className="text-red-500 text-sm mt-1">{urlError}</span>}
        <button type="submit" className="bg-primary text-white p-2 rounded">Add Link</button>
      </form>

      {/* Links List */}
      <div className="flex flex-col gap-4">
        {links.length === 0 ? (
          <div className="text-secondary">You don't have any links yet</div>
        ) : (
          links.map((link) => (
            <div key={link._id} className="border border-border p-4 rounded flex justify-between items-center bg-background-alt">
              <div>
                <h3 className="font-semibold text-primary">{link.title}</h3>
                <a href={link.url} className="text-secondary text-sm" target="_blank" rel="noreferrer">{link.url}</a>
              </div>
              <div className="flex gap-3">
                <button className="text-secondary" onClick={() => { setEditData({ id: link._id, title: link.title, url: link.url }); setIsModalOpen(true); }}>Edit</button>
                <button className="text-secondary" onClick={() => confirmDelete(link._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}