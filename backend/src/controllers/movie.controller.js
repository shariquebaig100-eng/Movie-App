import Movie from "../models/Movie.js";
import { fetchIMDbTop250 } from "../jobs/imdb.fetch.js";

export const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const searchMovies = async (req, res) => {
  const q = req.query.q;
  const movies = await Movie.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ]
  });
  res.json(movies);
};

export const sortMovies = async (req, res) => {
  const sortBy = req.query.by;
  const movies = await Movie.find().sort({ [sortBy]: 1 });
  res.json(movies);
};

export const addMovie = async (req, res) => {
  const { title, rating } = req.body;

if (!title || rating === undefined) {
  return res.status(400).json({ message: "Title and rating required" });
}

  const movie = await Movie.create(req.body);
  res.json(movie);
};

export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};

export const loadIMDbMovies = async (req, res) => {
  try {
    await fetchIMDbTop250(); // 🔥 await add karo
    res.json({ message: "IMDb movies synced successfully" });
  } catch (err) {
    console.error("IMDb sync failed:", err.message);
    res.status(500).json({ message: "IMDb sync failed" });
  }
};

