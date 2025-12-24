import axios from "axios";
import Movie from "../models/Movie.js";

export const fetchIMDbTop250 = async () => {
  try {
    // 1️⃣ Get Top 250 list
    const listUrl = `https://imdb-api.com/en/API/Top250Movies/${process.env.IMDB_API_KEY}`;
    const listRes = await axios.get(listUrl);

    const movies = listRes.data.items;
    if (!movies || movies.length === 0) {
      throw new Error("No IMDb movies found");
    }

    console.log("IMDb Top 250 count:", movies.length);

    // 2️⃣ Fetch full details per movie
    for (const item of movies) {
      const detailUrl = `https://imdb-api.com/en/API/Title/${process.env.IMDB_API_KEY}/${item.id}`;
      const detailRes = await axios.get(detailUrl);
      const d = detailRes.data;

      await Movie.updateOne(
        { imdbId: d.imdbID },
        {
          title: d.Title,
          description: d.Plot,
          rating: Number(d.imdbRating),
          releaseDate: new Date(d.Year, 0),
          duration: Number(d.Runtime?.replace(" min", "")) || null

        },
        { upsert: true }
      );
    }

    console.log("IMDb Top 250 fully synced");
  } catch (error) {
    console.error("IMDb fetch error:", error.message);
  }
};
