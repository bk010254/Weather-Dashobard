import React, { useState, useEffect } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

const FavoriteComponent = ({ onSearch }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const favs = await getFavorites();
        setFavorites(favs);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleAddFavorite = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const newFavorite = await addFavorite(city);
      setFavorites([...favorites, newFavorite]);
      setNewCity("");
    } catch (err) {
      console.error(err);
      setError("Failed to add favorite");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to remove favorite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Favorites</h3>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Add city"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          
        />
        <button
          onClick={() => handleAddFavorite(newCity)}
          disabled={loading || !newCity.trim()}
        >
          {loading ? "Adding..." : "Add City"}
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>City Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <tr key={fav.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {fav.city}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    className="btn-View"
                    onClick={() => onSearch(fav.city)}
                  >
                    View
                  </button>
                  <span
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  ></span>
                  <button onClick={() => handleRemoveFavorite(fav.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                No favorites added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteComponent;
