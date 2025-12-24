import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Skeleton
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import { updateMovie, getMovies } from "../services/api";
import { toast } from "react-hot-toast";

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setFetching(true);
        const res = await getMovies();
        const found = res.data.find((m) => m._id === id);
        setMovie(found);
      } catch {
        toast.error("Failed to load movie");
      } finally {
        setFetching(false);
      }
    };
    fetchMovie();
  }, [id]);

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
      await updateMovie(id, {
        ...movie,
        rating: Number(movie.rating),
        duration: Number(movie.duration)
      });
      toast.success("Movie updated ✏️");
      navigate("/admin/movies");
    } catch {
      toast.error("Failed to update movie");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Skeleton while fetching
  if (fetching) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Skeleton height={40} />
        <Skeleton height={56} sx={{ mt: 2 }} />
        <Skeleton height={56} />
        <Skeleton height={56} />
        <Skeleton height={56} />
        <Skeleton height={40} width="40%" />
      </Container>
    );
  }

  if (!movie) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Movie
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
          {loading ? "Updating..." : "Update Movie"}
        </Button>
      </Box>
    </Container>
  );
};

export default AdminEditMovie;
