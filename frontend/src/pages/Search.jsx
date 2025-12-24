import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Box,
  Card,
  CardContent
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔁 DEBOUNCED SEARCH (500ms)
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      const trimmedQuery = query.trim();

      if (trimmedQuery.length === 0) {
        setMovies([]);
        setSearched(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setSearched(true);
        const res = await searchMovies(trimmedQuery);
        setMovies(res.data);
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <Container sx={{ mt: 4 }}>
      {/* 🔍 Header */}
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600 }}
      >
        🔍 Search Movies
      </Typography>

      {/* 🔎 Search Input */}
      <TextField
        fullWidth
        label="Search by title or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* ⏳ Loading Skeletons */}
      {loading && (
        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
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
          ))}
        </Grid>
      )}

      {/* 🎬 Results */}
      {!loading && movies.length > 0 && (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie._id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ❌ Empty State */}
      {!loading && searched && movies.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h6">
            🎭 Movie not found
          </Typography>
          <Typography color="text.secondary">
            Try searching with a different keyword
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Search;
