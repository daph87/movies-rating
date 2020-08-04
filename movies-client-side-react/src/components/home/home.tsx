import React, { Component } from "react";
import "./home.css";
import { Movie } from "../../models/movie";
import { url } from "../global";
import { NavLink } from "react-router-dom";

interface HomeState {
    movies: Movie[];
    dramaMovies: Movie[];
    scienceFictionMovies: Movie[];
    categoryMovies: Movie[];
    comedyMovies: Movie[];
    thrillerMovies: Movie[],
    actionMovies: Movie[],
    ratedMovies: Movie[],
}
export class Home extends Component<any, HomeState>{
    public constructor(props: any) {
        super(props)
        this.state = {
            movies: [],
            dramaMovies: [],
            scienceFictionMovies: [],
            categoryMovies: [],
            comedyMovies: [],
            thrillerMovies: [],
            actionMovies: [],
            ratedMovies: []
        }
    }

    public componentDidMount(): void {
        fetch(url + "/api/movies")
            .then(response => response.json())
            .then(movies => {
                this.setState({ ratedMovies: movies });
                this.state.ratedMovies.sort(function (a, b) {
                    return a.rating - b.rating;
                });

                this.setState({ movies: this.state.ratedMovies });
                {
                    this.state.movies.map(movie => {

                        if (movie.category === "Drama") {
                            this.state.dramaMovies.push(movie);
                        }
                        else if (movie.category === "Thriller") {
                            this.state.thrillerMovies.push(movie);
                        }
                        else if (movie.category === "Action") {
                            this.state.actionMovies.push(movie);
                        }
                        else if (movie.category === "Science-fiction") {
                            this.state.scienceFictionMovies.push(movie);
                        }

                        else if (movie.category === "Comedy") {
                            this.state.comedyMovies.push(movie);
                        }
                    })
                }
            })
    }


// Show movies of each category when clicking
    public showComedyMovies = (e: any): void => {
        this.setState({ movies: this.state.comedyMovies });
    }

    public showDramaMovies = (e: any): void => {
        this.setState({ movies: this.state.dramaMovies });
    }

    public showAllMovies = () => {
        this.setState({ movies: this.state.ratedMovies })
    }

    public showSFMovies = (e: any): void => {
        this.setState({ movies: this.state.scienceFictionMovies });
    }

    public showActionMovies = (e: any): void => {
        this.setState({ movies: this.state.actionMovies });

    }

    public showHorrorMovies = (e: any): void => {
        this.setState({ movies: this.state.thrillerMovies });
    }

// Home page built with bootstrap grid
    public render(): JSX.Element {
        return (
            <div className="home">

                <nav>
                    <ul>
                        <li><button className="btn btn-outline-warning" onClick={this.showAllMovies}>All Genres</button></li>
                        <li><button className="btn btn-outline-light" onClick={this.showComedyMovies}>Comedy</button></li>
                        <li><button className="btn btn-outline-light" onClick={this.showDramaMovies}>Drama</button></li>
                        <li><button className="btn btn-outline-light" onClick={this.showSFMovies}>Science-Fiction</button></li>
                        <li><button className="btn btn-outline-light" onClick={this.showActionMovies}>Action</button></li>
                        <li><button className="btn btn-outline-warning" onClick={this.showHorrorMovies}>Thriller</button></li>
                    </ul>
                </nav>

                <div className="container"  >
                    <div className="row">
                        {this.state.movies.map(m =>
                            <div key={m.name} className="col-sm-6 col-md-4 col-lg-3 movieWrapper">
                                <div className="movieName">
                                    <p>{m.name}</p>
                                </div>
                                <NavLink to={"/movies/" + m.name}><img className="moviesImage" src={url + "/assets/" + m.fileName} alt={m.fileName} /></NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }



}

