import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getMovies,
  deleteMovie,
  searchMovies,
  sortMovies
} from "../services/api";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // search & sort
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  // delete
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // 🔹 Fetch all movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getMovies();
      setMovies(res.data || []); // 🛡️ safety
    } catch {
      toast.error("Failed to load movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 🔍 Search movies
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    try {
      setLoading(true);

      if (value.trim() === "") {
        const res = await getMovies();
        setMovies(res.data || []);
      } else {
        const res = await searchMovies(value.trim());
        setMovies(res.data || []);
      }
    } catch {
      toast.error("Search failed");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔃 Sort movies
  const handleSort = async (e) => {
    const value = e.target.value;
    setSortBy(value);
    setQuery(""); // reset search

    try {
      setLoading(true);
      const res = value
        ? await sortMovies(value)
        : await getMovies();
      setMovies(res.data || []);
    } catch {
      toast.error("Sorting failed");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete handlers
  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const confirmDelete = async () => {
    try {
      setDeletingId(selectedId);
      await deleteMovie(selectedId);
      toast.success("Movie deleted 🗑️");
      fetchMovies();
    } catch {
      toast.error("Failed to delete movie");
    } finally {
      setDeletingId(null);
      closeDeleteDialog();
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Movies
      </Typography>

      {/* 🔍 Search + Sort */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search movies"
          value={query}
          onChange={handleSearch}
          fullWidth
        />

        <Select
          value={sortBy}
          onChange={handleSort}
          displayEmpty
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="title">Name</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
        </Select>
      </Box>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/admin/add")}
      >
        Add New Movie
      </Button>

      {/* 🎬 MOVIES GRID */}
      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton
                    variant="rectangular"
                    height={36}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : movies.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" sx={{ mt: 4 }}>
              No movies found 🎬
            </Typography>
          </Grid>
        ) : (
          movies.map((movie) => (
            <Grid item xs={12} md={6} key={movie._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2">
                    ⭐ {movie.rating}
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      disabled={deletingId === movie._id}
                      onClick={() =>
                        navigate(`/admin/edit/${movie._id}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      disabled={deletingId === movie._id}
                      onClick={() =>
                        openDeleteDialog(movie._id)
                      }
                    >
                      {deletingId === movie._id
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* 🗑️ DELETE CONFIRMATION DIALOG */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={confirmDelete}
            disabled={!!deletingId}
          >
            {deletingId ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminMovies;
