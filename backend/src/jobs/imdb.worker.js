import movieQueue from "../config/queue.js";
import Movie from "../models/Movie.js";

movieQueue.process(async (job) => {
  const movie = job.data;

  const exists = await Movie.findOne({ title: movie.title });
  if (!exists) {
    await Movie.create(movie);
    console.log("Inserted:", movie.title);
  }

  return true;
});
