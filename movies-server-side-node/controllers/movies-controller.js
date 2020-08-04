const express = require("express");
const moviesLogic = require("../bll/movies-logic");

const router = express.Router();

// get all movies
router.get("/", async (req, res) => {
    try {
        const movies = await moviesLogic.getAllMovies();
        res.json(movies);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one movie
router.get("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const movie = await moviesLogic.getOneMovie(name);
        res.json(movie);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


// add one movie
router.post("/", async (request, response) => {
    try {
        const movie = request.body;
        const addedMovie = await moviesLogic.addOneMovie(movie);
        response.status(201).json(addedMovie);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// delete one movie
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await moviesLogic.deleteMovie(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;