import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setUsers(data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return (
    <>
      <div className="search-container users-section">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          type="text"
          className="users-search"
          placeholder="Search users..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <span className="search-shortcut">⌘ K</span>
      </div>
      <p>{filteredUsers.length} users found</p>
      <h2>Users</h2>
      {loading && <p className="users-loading">Loading users...</p>}
      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-avatar">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </div>

            <div className="user-info">
              <h3>{user.name}</h3>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          </div>
        ))}
    </>
  );
}

export default Users;
