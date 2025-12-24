import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import { addMovie } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminAddMovie = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: ""
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await addMovie({
        ...movie,
        rating: Number(movie.rating),
        duration: Number(movie.duration)
      });
      toast.success("Movie added 🎬");
      navigate("/admin/movies");
    } catch {
      toast.error("Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Movie
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          margin="normal"
          value={movie.title}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          margin="normal"
          value={movie.description}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Rating (0 – 10)"
          name="rating"
          type="number"
          inputProps={{ step: 0.1, min: 0, max: 10 }}
          margin="normal"
          value={movie.rating}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Release Date"
          name="releaseDate"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={movie.releaseDate}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Duration (minutes)"
          name="duration"
          type="number"
          margin="normal"
          value={movie.duration}
          onChange={handleChange}
          required
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
        >
          {loading ? "Adding..." : "Add Movie"}
        </Button>
      </Box>
    </Container>
  );
};

export default AdminAddMovie;
