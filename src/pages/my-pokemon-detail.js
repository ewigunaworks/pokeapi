import React from 'react'
import $ from 'jquery'
import firebase from '../Firebase'
import Collapse, { Panel } from 'rc-collapse'
import PopupRelease from '../components/popup/popup-release'
import PopupNotification from '../components/popup/popup-notification'
import Loader from '../components/loader'

import 'rc-collapse/assets/index.css';

export default class extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			key: this.props.match.params.id,
			title: 'My Pokemon Detail',
			pokemonid: '',
			pokemonmoves: [],
			pokemonsprites: [],
			pokemontypes: [],
			pokemonname: [],
			nickname: '',
			height: 0,
			weight: 0,
			isData: false,
			isNotif: false,
			isError: false,
			message: '',
			is404: false,
		}

		this.handleNotification = this.handleNotification.bind(this)
		this.handleRedirect = this.handleRedirect.bind(this)
	}

	componentDidMount() {
		let ref = firebase.firestore().collection('mypokemon').doc(this.state.key)

		ref.get().then((doc) => {
	    	if (doc.exists) {
	        	this.setState({
	          		pokemonname: doc.data().pokemonname,
	          		weight: doc.data().weight,
	          		height: doc.data().height,
	          		nickname: doc.data().nickname,
	          		pokemonmoves: doc.data().pokemonmoves,
	          		pokemontypes: doc.data().pokemontypes,
	          		pokemonsprites: doc.data().pokemonsprites,
	          		pokemonid: doc.data().pokemonid,
	          		isData: true,
	        	});
	      	} else {
	        	this.handleNotification(true, true, true, 'Cannot find the pokemon')
	      	}
	    });
	}

	handleNotification(isnotif, iserror, is404='false', message) {
		this.setState({
			isError: iserror,
			isNotif: isnotif,
			message: message,
			is404: is404,
		})
	}

	handleRedirect(isError, urlredir) {
		if(isError) {
			window.location.reload();
		} else {
			$('.popup-bottom-loader').addClass('closed')
			this.props.history.push(urlredir)
		}
	}
	
	render() {
		return (
			<React.Fragment>
				<main role="main" className="container">
					<div className="row">
						<div className="col-12 blog-main">
							<div className="blog-post">
								<h4 className="blog-post-title">My Pokemon Detail</h4>
								<hr />
								<div className="col-12">
									<div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
										<div className="col-12 bg-secondary p-2">
											<h4 className="mb-0 text-capitalize text-white">{this.state.nickname}</h4>
										</div>
										<div className="col-12">
											<div className="row mx-1">
												<div className="col-6 p-1 d-flex flex-column position-static justify-content-center">
													<h5 className="mb-0 text-capitalize">{this.state.pokemonname}</h5>
													<p className="mb-0"><small>Height: {this.state.height} dm</small></p>
													<p className="mb-0"><small>Weight: {this.state.weight} hg</small></p>
												</div>
												{	this.state.pokemonsprites &&
													<div className="col-6 p-0 text-right">
														<img src={this.state.pokemonsprites.front_default} alt={this.state.pokemonname} className="p-1" />
													</div>
												}
											</div>
										</div>
									</div>
								</div>

								{	this.state.pokemontypes &&
									<Collapse accordion={true}>
									    <Panel header="Types" headerClass="my-header-class">
									    	<ul>
									    	{
									    		this.state.pokemontypes.map((data, i) => {
									    			return(
									    				<li key={i}>{data.type.name}</li>
									    			)
									    		})
									    	}
									    	</ul>
									    </Panel>
									    <Panel header="Moves">
									    	<ul>
									    		{
									    			this.state.pokemonmoves.map((data, i) => {
									    				return(
									    					<li key={i}>{data.move.name}</li>
									    				)
									    			})
									    		}
									    	</ul>
									    </Panel>
									</Collapse>
								}
							</div>
							<div className="row m-2">
								<button type="button" className="btn btn-danger col-12 popup-release">Release</button>
							</div>
						</div>
					</div>
				</main>

				{
					this.state.isData &&
					<PopupRelease handleNotification={this.handleNotification} firebasekey={this.state.key} pokemonid={this.state.pokemonid} />
				}
				
				{
					this.state.isNotif &&
					<PopupNotification isError={this.state.isError} message={this.state.message} is404={this.state.is404} isMyPokemon={true} handleRedirect={this.handleRedirect} />
				}
				<Loader />
			</React.Fragment>
		)
	}
}