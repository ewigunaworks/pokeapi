import React, { Component } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import Home from "./pages/home";
import PokemonList from "./pages/pokemon-list";
import MyPokemon from "./pages/my-pokemon";
import About from "./About";
import Contact from "./Contact";
import Header from './components/header'
 
class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/pokemon-list" component={PokemonList} />
					<Route path="/my-pokemon" component={MyPokemon} />
				</Switch>
			</React.Fragment>
		);
	}
}
 
export default Main;