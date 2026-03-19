import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // Edit modal
  const [editData, setEditData] = useState({ id: "", title: "", url: "" });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete confirmation modal
  const [deleteId, setDeleteId] = useState(null); // ID to delete
  const [urlError, setUrlError] = useState(""); // Add Form URL error
  const [editUrlError, setEditUrlError] = useState(""); // Edit Modal URL error

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  // Check url formula with regex
  const isValidURL = (string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" + // http:// or https://
      "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // domain...
      "localhost)" + // ...or localhost
      "(\\:[0-9]{1,5})?" + // optional port
      "(\\/.*)?$" // path
    );
    return pattern.test(string);
  };

  // Fetch Links
  const fetchLinks = async () => {
    try {
      const res = await API.get("/links");
      setLinks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLinks();
    })();
  }, []);

  // View Profile
  const handleViewProfile = () => {
    const username = localStorage.getItem("username");
    if (!username) return;
    navigate(`/${username}`);
  };

  // Add Link
  const handleAddLink = async (e) => {
    e.preventDefault();
    setUrlError(""); // Reset the Add Form error

    if (!title || !url) {
      showToast("Please fill all fields", "warning");
      return;
    }

    if (!isValidURL(url)) {
      setUrlError("URL is invalid. Use https://example.com");
      return;
    }

    try {
      await API.post("/links", { title, url });
      setTitle("");
      setUrl("");
      fetchLinks();
      showToast("Link added successfully", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to add link", "error");
    }
  };

  // Update Link
  const handleUpdate = async () => {
    setEditUrlError(""); // Reset Edit Modal error

    if (!editData.title || !editData.url) {
      showToast("All fields are required", "warning");
      return;
    }

    if (!isValidURL(editData.url)) {
      setEditUrlError("URL is invalid. Use https://example.com");
      return;
    }

    try {
      await API.put(`/links/${editData.id}`, {
        title: editData.title,
        url: editData.url,
      });
      setIsModalOpen(false);
      fetchLinks();
      showToast("Link updated successfully", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Update failed", "error");
    }
  };

  // Open Delete Modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Delete Link
  const handleDelete = async () => {
    try {
      await API.delete(`/links/${deleteId}`);
      setIsDeleteModalOpen(false);
      fetchLinks();
      showToast("Link deleted successfully", "info");
    } catch (error) {
      showToast(error.response?.data?.message || "Delete failed", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-primary">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Link</h2>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Title"
            />
            <input
              type="text"
              value={editData.url}
              onChange={(e) =>
                setEditData({ ...editData, url: e.target.value })
              }
              className="w-full border p-2 rounded mb-1"
              placeholder="URL"
            />
            {editUrlError && (
              <span className="text-red-500 text-sm mt-1">{editUrlError}</span>
            )}
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-primary text-background px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-xl w-96 shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this link?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <a
            onClick={handleViewProfile}
            className="text-secondary cursor-pointer"
          >
            View Profile
          </a>
          <button className="text-secondary">Logout</button>
        </div>
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
        <button type="submit" className="bg-primary text-white p-2 rounded">
          Add Link
        </button>
      </form>

      {/* Links List */}
      <div className="flex flex-col gap-4">
        {links.length === 0 ? (
          <div className="text-secondary">You don't have any links yet</div>
        ) : (
          links.map((link) => (
            <div
              key={link._id}
              className="border border-border p-4 rounded flex justify-between items-center bg-background-alt"
            >
              <div>
                <h3 className="font-semibold text-primary">{link.title}</h3>
                <a
                  href={link.url}
                  className="text-secondary text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.url}
                </a>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-secondary"
                  onClick={() => {
                    setEditData({
                      id: link._id,
                      title: link.title,
                      url: link.url,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-secondary"
                  onClick={() => confirmDelete(link._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}