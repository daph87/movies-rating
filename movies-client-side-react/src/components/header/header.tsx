import React, { Component } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap"
import { Movie } from "../../models/movie";
import { url } from "../global";
import axios from "axios";

interface HeaderState {

    movie: Movie,
    image: any,
    movies: Movie[],
    ratedMovies: Movie[],
    show: boolean,
    errorRating: string
}
export class Header extends Component<any, HeaderState>{
    public constructor(props: any) {
        super(props)
        this.state = {
            movie: new Movie(),
            image: null,
            movies: [],
            ratedMovies: [],
            show: false,
            errorRating: ""
        }
    }


    //get movies data and sort them according to ratings
    public componentDidMount(): void {
        fetch(url + '/api/movies')
            .then(res => res.json()).then(movies => {
                this.setState({ movies })
                this.state.movies.sort(function (a, b) {
                    return a.rating - b.rating;
                })
            });
    }

    // get Image info
    public setImage = (e: any) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    // Add data in MongoDB and picture in server 
    public addMovie = (e: any) => {
        const fd = new FormData();
        fd.append("myImage", this.state.image, this.state.image.name)
        fd.append("addedMovie", JSON.stringify(this.state.movie));
        axios.post(url + '/upload', fd);
        fetch((url + '/api/movies/' + this.state.movies[0]._id), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        this.setState({ show: !this.state.show });
    }

    // Check if inputs filled
    private isFormLegal(): boolean {
        return this.state.movie.name === "" ||
            this.state.movie.rating === "" ||
            this.state.movie.rating === undefined ||
            this.state.movie.category === "" ||
            this.state.image === null
    }


    //inputs functions with validations if needed
    public setCategory = (e: any): void => {
        const category = e.target.value
        const movie = { ...this.state.movie };
        movie.category = category;
        this.state.movie.category = movie.category;
    };

    public setName = (e: any): void => {
        this.state.movies.map(movie => {
            if (movie.name?.toLowerCase() === e.target.value?.toLowerCase()) {
                alert("This movie already exists, choose another one please");
                e.target.value = "";
            }
            else {
                const name = e.target.value
                const movie = { ...this.state.movie };
                movie.name = name;
                this.setState({ movie });
            }
        })
    };

    public setRating = (e: any): void => {
        if (e.target.value < 0 || e.target.value > 5) {
            let errorRating = "Ratings are between 0 and 5"
            this.setState({ errorRating });
            e.target.value = ""
        }
        else {
            let errorRating = "";
            this.setState({ errorRating });
            let rating = e.target.value;
            const movie = { ...this.state.movie };
            movie.rating = rating;
            this.setState({ movie })
        };
    };

    // Open or close Bootstrap Modal
    public handleModal = () => {
        this.setState({ show: !this.state.show })
    }


    public render(): JSX.Element {
        return (
            <div className="header">
                <NavLink to={"/home"}><img id="logo" className="bounceInLeft animated" src={url+"/assets/logo.png"}></img></NavLink>

                {/* Add Movie Modal */}
                <button className="btn btn-light add-movie-button" onClick={this.handleModal}>Add movie</button>
                <Modal show={this.state.show} onHide={this.handleModal}>
                    <Modal.Header closeButton>Add a movie</Modal.Header>
                    <Modal.Body>  <label>Rating (between 0 and 5 stars): </label>
                        <input type="number" max="5" min="0" onChange={this.setRating} value={this.state.movie.rating}></input>
                        <span className="error-message">{this.state.errorRating}</span>
                        <label>Movie's Name : </label>
                        <input type="text" onChange={this.setName} value={this.state.movie.name}></input>
                        <label>Category : </label>
                        <select onChange={this.setCategory}>
                            <option value="Thriller">Thriller</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Science-fiction">Science-fiction</option>
                        </select>
                        <label>Image : </label>
                        <input type="file" accept="image/*" name="image" onChange={this.setImage}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-danger" disabled={this.isFormLegal()} onClick={this.addMovie}>Add movie</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

