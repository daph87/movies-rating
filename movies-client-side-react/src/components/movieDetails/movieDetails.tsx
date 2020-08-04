import React, { Component, useState } from "react";
import "./movieDetails.css";
import { url } from "../global";
import Card from 'react-bootstrap/Card';
import { Movie } from "../../models/movie";


interface MovieDetailsState {
  movie: Movie,
  show: boolean,
  setShow: boolean
}
export class MovieDetails extends Component<any, MovieDetailsState>{
  public constructor(props: any) {
    super(props)
    this.state = {
      movie: new Movie(),
      show: false,
      setShow: false
    }
  }


  // Find one movie via movie name
  public componentDidMount(): void {
    const name = this.props.match.params.name;
    fetch(url + "/api/movies/")
      .then(response => response.json())
      .then(movies => {
        const movie = movies.find((m: Movie) => m.name === name);
        this.setState({ movie });
      })
      .catch(err => alert(err));
  }

  // Functions for ratings stars
  public showEmptyStars = () => {
    let emptyStars = []
    for (let i = 1; i <= 5 - this.state.movie.rating; i++) {

      emptyStars.push(<span className="fa fa-star"></span>)
    }
    return emptyStars
  }


  public showYellowStars = () => {
    let yellowStars = []
    for (let i = 1; i <= this.state.movie.rating; i++) {
      yellowStars.push(<span className="fa fa-star checked"></span>)
    }
    return yellowStars
  }

  public render(): JSX.Element {

    return (
      <div className="movie-details">

        <div id="ratingDiv">
          {this.showYellowStars()}
          {this.showEmptyStars()}
        </div>
        <div className="movie-card">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={url + "/assets/" + this.state.movie.fileName} />
            <Card.Body>
              <Card.Title>{this.state.movie.category} movie</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

}