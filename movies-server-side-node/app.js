const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const server = express();
server.use(express.static(__dirname));
server.use(cors());
server.use(express.json());



const moviesController = require("./controllers/movies-controller");
const moviesLogic = require("./bll/movies-logic");

server.use("/api/movies", moviesController);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + `\\assets`);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
let newUpload = multer({ storage });

server.post('/upload', newUpload.single('myImage'), (req, res) => {

    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName;

    let movie = JSON.parse(req.body.addedMovie);
    movie.fileName = req.file.originalname;


console.log(req.body,'body')
    fs.rename(multerFileName, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try {
        moviesLogic.addOneMovie(movie);

    }
    catch (err) {
        console.log(err);
    }
});

server.listen(8080, () => console.log("Listening on http://localhost:8080"));

