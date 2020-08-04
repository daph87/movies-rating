import React, { Component } from "react";
import "./layout.css";
import { Header } from "../header/header";
import { Home } from "../home/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MovieDetails } from "../movieDetails/movieDetails";


interface LayoutState {


}
export class Layout extends Component<any, LayoutState>{
    public constructor(props: any) {
        super(props)
        this.state = {
        }
    }

    public render(): JSX.Element {
        return (
            <div className="layout">
                <BrowserRouter>
                    <header><Header /></header>
                    <main>
                        <Switch>
                            <Route path="/movies/:name" component={MovieDetails} exact />
                            <Route path="/home" component={Home} exact />
                            <Redirect from="/" to="/home" exact />
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        );
    }

}