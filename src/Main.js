import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import PokemonList from "./pages/pokemon-list";
import PokemonDetail from "./pages/pokemon-detail";
import MyPokemon from "./pages/my-pokemon";
import MyPokemonDetail from "./pages/my-pokemon-detail";
import Header from './components/header'
 
class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/pokemon-list" component={PokemonList} />
					<Route path="/pokemon/detail/:id" component={PokemonDetail} />
					<Route path="/my-pokemon" component={MyPokemon} />
					<Route path="/my-pokemons/detail/:id" component={MyPokemonDetail} />
				</Switch>
			</React.Fragment>
		);
	}
}
 
export default Main;