import React from 'react'
import { Link } from "react-router-dom";

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
						<p className={this.props.selectedMenu == 'pokemonlist' ? "p-2 text-primary font-weight-bold" : "p-2 text-muted"}>Home</p>
					</Link>
					<Link to={'/pokemon-list'}>
						<p className={this.props.selectedMenu == 'pokemonlist' ? "p-2 text-primary font-weight-bold" : "p-2 text-muted"}>Pokemon List</p>
					</Link>
					<Link to={'/my-pokemon'}>
						<p className={this.props.selectedMenu == 'mypokemon' ? "p-2 text-primary font-weight-bold" : "p-2 text-muted"}>My Pokemon</p>
					</Link>
				</nav>
				
				<hr />
			</React.Fragment>
		)
	}
}