import { useEffect, useState } from "react";

const API_URL = "https://gorest.co.in/public/v2/users";
const TOKEN =
  "fa8096656b9262d4f083e902327e4bc92d5959914a01b4fd12a0250eed3a4bdf";

const ThirdPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", status: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Błąd pobierania:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, status: user.status });
  };

  const handleSave = async () => {
    if (!editingUser) return;

    try {
      const res = await fetch(`${API_URL}/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Błąd aktualizacji:", errorData);
        return;
      }

      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? updatedUser : u))
      );
      setEditingUser(null);
    } catch (err) {
      console.error("Błąd:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Zarządzanie użytkownikami
      </h1>

      <input
        type="text"
        placeholder="Szukaj użytkownika..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
      />

      {editingUser && (
        <div className="mt-6  pt-4 bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2 text-blue-700">
            {editingUser.name}
          </h2>
          <input
            type="text"
            placeholder="Imię"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-2 w-full rounded mb-2"
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="border p-2 w-full rounded mb-3"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Zapisz
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`rounded-xl p-4 shadow-md transition hover:shadow-lg border ${
                user.status === "active"
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {user.name}
                </p>
                <p className="text-gray-600">{user.email}</p>
                <p
                  className={`font-medium mt-1 ${
                    user.status === "active" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Status: {user.status}
                </p>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edytuj
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThirdPage;
