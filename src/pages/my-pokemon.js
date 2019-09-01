import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import firebase from '../Firebase'

export default class extends React.Component {
	constructor(props) {
		super(props)

		this.ref = firebase.firestore().collection('mypokemon');

		this.unsubscribe = null;
	    this.state = {
	    	pokemons: [],
	    	isData: false
	    };

	    this.handleBackTop = this.handleBackTop.bind(this)
	}

	onCollectionUpdate = (querySnapshot) => {
	    const pokemons = [];
	    querySnapshot.forEach((doc) => {
	    	const { pokemonid, pokemonname, nickname } = doc.data();
	    	pokemons.push({
	        	key: doc.id,
	        	doc, // DocumentSnapshot
	        	pokemonid,
	        	pokemonname,
	        	nickname,
	      	});
	    });
	    this.setState({
	    	pokemons
	   	});

	   	if(this.state.pokemons.length > 0) {
		   	this.setState({
		    	isData: true
		   	});
		}
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
	}

	handleBackTop() {
		window.scrollTo({
	          top: 0
	    })
	}
	
	render() {
		return (
			<React.Fragment>
				<div className="container">
					{
						this.state.isData ?
						<div className="row mb-2">
							{
								this.state.pokemons.map((data, i) => {
									return(
										<div className="col-md-6" key={i}>
											<Link href={"/my-pokemon/detail/"+ data.pokemonid +"/"+data.key} as={"/my-pokemon/detail/"+ data.pokemonid +"/"+data.key}>
												<div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
													<div className="col d-flex flex-column position-static">
														<div className="p-4 bg-warning">
															<h4 className="mb-0 text-white text-capitalize">{data.nickname}</h4>
														</div>
														<div className="px-4 py-2">
															<h5 className="mb-0 text-capitalize">{data.pokemonname}</h5>
														</div>
													</div>
												</div>
											</Link>
										</div>
									)
								})
							}
						</div>
						:
						<div className="row mb-2 justify-content-center">
							<div className="text-center">
								<p>Have you catch the pokemon ?</p>
								<Link href={"/pokemon/"} as={"/pokemon/"} >
									<button className="btn btn-primary">Let's Go!</button>
								</Link>
							</div>
						</div>
					}
				</div>

				{
					this.state.pokemons.length > 10 &&
					<div className="box-filter only-one">
						<div className="box-filter-sort box-filter-only-one" onClick={this.handleBackTop}><span className="box-filter-sort-span">Back To Top</span></div>
					</div>
				}
			</React.Fragment>
		)
	}
}