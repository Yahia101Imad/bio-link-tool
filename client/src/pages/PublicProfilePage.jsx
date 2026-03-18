import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/api";

export default function PublicProfilePage() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await getUserProfile(username);
        setUser(res.data.data.user);
        setLinks(res.data.data.links);
      } catch (err) {
        setError("User not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-alt">
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-alt">
        <p className="text-secondary">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background-alt text-primary">
      {/* Profile Card */}
      <div className="bg-background shadow-md rounded-2xl p-6 w-full max-w-md text-center border border-border">
        {/* Avatar */}
        <img
          src={user?.avatar || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto object-cover border border-border"
        />

        {/* Username */}
        <h1 className="text-2xl font-bold mt-4 text-primary">@{user?.username}</h1>

        {/* Bio */}
        <p className="text-secondary mt-2">{user?.bio || "No bio available"}</p>

        {/* Links */}
        <div className="mt-6 space-y-3">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-light transition"
              >
                {link.title}
              </a>
            ))
          ) : (
            <p className="text-secondary">No links yet</p>
          )}
        </div>
      </div>
    </div>
  );
}