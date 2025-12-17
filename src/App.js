import React, { useState } from "react";

function App() {
  const [preference, setPreference] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async () => {
    if (!preference.trim()) {
      setError("Please enter your movie preference");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        "https://movie-recommendation-postgre.onrender.com/api/recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_input: preference }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMovies(data.movies);
    } catch (err) {
      setError(err.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Movie Recommendation App</h1>
        <p style={styles.subtitle}>
          Enter your preference and get AI-powered movie suggestions
        </p>
      </div>

      <div style={styles.formContainer}>
        <label style={styles.label}>What kind of movies do you like?</label>
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="e.g., Indian superhero movies"
          style={styles.input}
          onKeyPress={(e) => e.key === "Enter" && getRecommendations()}
        />

        <button
          onClick={getRecommendations}
          disabled={loading}
          style={
            loading
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </div>

      {movies.length > 0 && (
        <div style={styles.resultsContainer}>
          <h2 style={styles.resultsTitle}>Recommended Movies</h2>
          {movies.map((movie, index) => (
            <div key={index} style={styles.movieCard}>
              <div style={styles.movieHeader}>
                <h3 style={styles.movieTitle}>{movie.title}</h3>
                <span style={styles.movieYear}>{movie.year}</span>
              </div>
              <p style={styles.movieGenre}>{movie.genre}</p>
              <p style={styles.movieDescription}>{movie.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
  },
  formContainer: {
    backgroundColor: "#f5f5f5",
    padding: "30px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  error: {
    marginTop: "15px",
    padding: "12px",
    backgroundColor: "#ffe6e6",
    color: "#d00",
    border: "1px solid #ffcccc",
    borderRadius: "4px",
  },
  resultsContainer: {
    marginTop: "30px",
  },
  resultsTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  movieCard: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "15px",
  },
  movieHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  movieTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  movieYear: {
    fontSize: "14px",
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: "4px 10px",
    borderRadius: "4px",
  },
  movieGenre: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  movieDescription: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.5",
  },
};

export default App;
