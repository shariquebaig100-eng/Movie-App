import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  MenuItem,
  Select,
  Box,
  Card,
  CardContent
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-hot-toast";

import MovieCard from "../components/MovieCard";
import { getMovies, sortMovies } from "../services/api";

const MOVIES_PER_PAGE = 6;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  // Reset page whenever movies change (important UX fix)
  useEffect(() => {
    setPage(1);
  }, [movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getMovies();
      setMovies(res.data);
    } catch {
      toast.error("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async (e) => {
    const value = e.target.value;
    setSortBy(value);

    try {
      setLoading(true);
      const res = value
        ? await sortMovies(value)
        : await getMovies();
      setMovies(res.data);
    } catch {
      toast.error("Failed to sort movies");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const currentMovies = movies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Movies
      </Typography>

      {/* Sort Dropdown */}
      <Select
        value={sortBy}
        onChange={handleSort}
        displayEmpty
        disabled={loading}
        sx={{ mb: 3, minWidth: 200 }}
      >
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="title">Name</MenuItem>
        <MenuItem value="duration">Duration</MenuItem>
        <MenuItem value="releaseDate">Release Date</MenuItem>
      </Select>

      {/* Movies Grid */}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(MOVIES_PER_PAGE)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <Skeleton
                    variant="rectangular"
                    height={350}
                  />
                  <CardContent>
                    <Skeleton height={30} />
                    <Skeleton width="80%" />
                    <Skeleton width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : currentMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
      </Grid>

      {/* Empty State */}
      {!loading && movies.length === 0 && (
        <Typography
          align="center"
          sx={{ mt: 4, color: "text.secondary" }}
        >
          No movies found 🎬
        </Typography>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Home;
