import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip
} from "@mui/material";

const MovieCard = ({ movie }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.25s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6
        }
      }}
    >

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          noWrap
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {movie.description || "No description available"}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Chip
            label={`⭐ ${movie.rating ?? "N/A"}`}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`⏱ ${movie.duration ?? "N/A"} min`}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
