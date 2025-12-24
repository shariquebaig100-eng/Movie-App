import express from "express";
import {
    getMovies,
    searchMovies,
    sortMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    loadIMDbMovies
} from "../controllers/movie.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", sortMovies);

router.post("/", authMiddleware, roleMiddleware("admin"), addMovie);
router.post("/load-imdb", authMiddleware, roleMiddleware("admin"), loadIMDbMovies);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMovie);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);

export default router;
