import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    url: "",
  });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchLinks = async () => {
    try {
      const res = await API.get("/links");
      setLinks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLinks();
    };
    fetchData();
  }, []);

  const handleViewProfile = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) return;

      navigate(`/${username}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLink = async (e) => {
  e.preventDefault();

  if (!title || !url) {
    showToast("Please fill all fields", "warning");
    return;
  }

  try {
    await API.post("/links", { title, url });

    setTitle("");
    setUrl("");

    fetchLinks();
    showToast("Link added successfully", "success");
  } catch (error) {
    showToast(
      error.response?.data?.message || "Failed to add link",
      "error"
    );
  }
};

  const handleDelete = async (id) => {
  try {
    await API.delete(`/links/${id}`);
    fetchLinks();

    showToast("Link deleted successfully", "info");
  } catch (error) {
    showToast(
      error.response?.data?.message || "Delete failed",
      "error"
    );
  }
};

  const handleUpdate = async () => {
  if (!editData.title || !editData.url) {
    showToast("All fields are required", "warning");
    return;
  }

  try {
    await API.put(`/links/${editData.id}`, {
      title: editData.title,
      url: editData.url,
    });

    setIsModalOpen(false);
    fetchLinks();

    showToast("Link updated successfully ✨", "success");
  } catch (error) {
    showToast(
      error.response?.data?.message || "Update failed",
      "error"
    );
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
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50">
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
              className="w-full border p-2 rounded mb-4"
              placeholder="URL"
            />

            <div className="flex justify-end gap-3">
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
                  onClick={() => handleDelete(link._id)}
                  className="text-secondary"
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
