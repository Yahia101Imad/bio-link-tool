import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  // GET USER LINKS
  const fetchLinks = async () => {
    try {
      const res = await axios.get("/api/links");
      setLinks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH USER LINKS ASYNCROUNESLY WHILE RENDERING THE PAGE
  useEffect(() => {
    const fetchData = async () => {
      await fetchLinks();
    };
    fetchData();
  }, []);

  // ADD LINK
  const handleAddLink = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/links", {
        title,
        url,
      });

      setTitle("");
      setUrl("");

      fetchLinks(); // UPDATING LINKS
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE LINK
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/links/${id}`);
      fetchLinks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <div className="flex gap-4">
          <a href="/profile/yahia" className="text-blue-500">
            View Profile
          </a>

          <button className="text-red-500">Logout</button>
        </div>
      </div>

      {/* Add Link Form */}
      <form onSubmit={handleAddLink} className="flex flex-col gap-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-black text-white p-2 rounded">
          Add Link
        </button>
      </form>

      {/* Links List */}
      <div className="flex flex-col gap-4">
        {links.length === 0 ? (
          <div>You don't have any links yet</div>
        ) : (
          links.map((link) => (
            <div
              key={link._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{link.title}</h3>

                <a
                  href={link.url}
                  className="text-blue-500 text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.url}
                </a>
              </div>

              <div className="flex gap-3">
                <button className="text-yellow-600">Edit</button>

                <button
                  onClick={() => handleDelete(link._id)}
                  className="text-red-600"
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
