const mongoose = require("mongoose");

// Connect to the database: 
mongoose.connect("mongodb://localhost:27017/moviesDatabase",
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, mongoClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("We're connected to " + mongoClient.name + " database on MongoDB...");
    });
    
// create schema for movie 
const movieSchema = mongoose.Schema({
    name: String,
    fileName: String,
    category: String,
    rating: Number,
}, { versionKey: false });


const Movie = mongoose.model("Movie", movieSchema, "movies"); // Model, Schema, Collection

function getAllMovies() {
    return new Promise((resolve, reject) => {

        Movie.find({}).exec((err, movies) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(movies);
        });
    });

}

function getOneMovie(_id) {
    return new Promise((resolve, reject) => {
        Movie.find(_id, (err, movie) => {
            if (err) return reject(err);
            resolve(movie);
        });
    });
}

function addOneMovie(movie) {
    return new Promise((resolve, reject) => {
        const newMovie = new Movie(movie);
        newMovie.save((err, newMovie) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(newMovie);
        });
    });
}

function deleteMovie(_id) {
    return new Promise((resolve, reject) => {
        Movie.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}



module.exports={
    getAllMovies,
    getOneMovie,
    addOneMovie,
    deleteMovie
}