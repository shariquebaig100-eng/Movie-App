import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    rating: Number,
    releaseDate: Date,
    duration: Number,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Movie",
  movieSchema,
  "movies" // 🔥 FORCE collection name
);
