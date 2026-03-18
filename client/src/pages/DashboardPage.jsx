import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

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

  const handleAddLink = async (e) => {
    e.preventDefault();

    try {
      await API.post("/links", { title, url });

      setTitle("");
      setUrl("");

      fetchLinks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/links/${id}`);
      fetchLinks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProfile = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) return;

      navigate(`/${username}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-primary">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <div className="flex gap-4">
          <a onClick={handleViewProfile} className="text-secondary cursor-pointer">
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
                <button className="text-secondary">Edit</button>

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