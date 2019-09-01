import React from 'react'
import { Route, Link } from "react-router-dom";

export default class extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			login: false
		}
	}
	
	componentDidMount() {
		let user = localStorage.getItem('user')
		if (user) {
			this.setState({
				login: true
			})
		}
	}
	
	render() {
		return (
			<React.Fragment>
				<header className="blog-header py-3">
					<div className="row flex-nowrap justify-content-between align-items-center">
						<div className="col-12 text-center">
							<a className="blog-header-logo text-dark" href="#">PokeApi</a>
						</div>
					</div>
				</header>
				
				<nav className="nav d-flex justify-content-between">
					<Link to={'/'}>
						<a href="javascript:void(0);" className={this.props.selectedMenu == 'home' ? "p-2 text-primary font-weight-bold" : "p-2 text-muted"}>Home</a>
					</Link>
					<Link to={'/pokemon-list'}>
						<a href="javascript:void(0);" className={this.props.selectedMenu == 'pokemonlist' ? "p-2 text-primary font-weight-bold" : "p-2 text-muted"}>Pokemon List</a>
					</Link>
					<Link to={'/my-pokemon'}>
						<a href="javascript:void(0);" className={this.props.selectedMenu == 'mypokemon' ? "p-2 text-primary font-weight-bold" : "p-2 text-muted"}>My Pokemon</a>
					</Link>
				</nav>
				
				<hr />
			</React.Fragment>
		)
	}
}