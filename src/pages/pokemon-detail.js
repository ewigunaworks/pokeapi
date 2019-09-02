import React from 'react'
import axios from 'axios'
import PopupCatch from '../components/popup/popup-catch'
import PopupNotification from '../components/popup/popup-notification'
import Loader from '../components/loader'
import Collapse, { Panel } from 'rc-collapse'

const Config = require('../config')

export default class extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			title: 'Pokemon Detail',
			pokemonid: this.props.match.params.id,
			pokemonmoves: [],
			pokemonsprites: [],
			pokemontypes: [],
			pokemonname: [],
			height: 0,
			weight: 0,
			isData: false,
			isNotif: false,
			isError: false,
			message: '',
		}

		this.handleGetDetail = this.handleGetDetail.bind(this)
		this.handleNotification = this.handleNotification.bind(this)
		this.handlePopupCatch = this.handlePopupCatch.bind(this)
		this.handleRedirect = this.handleRedirect.bind(this)
	}

	componentDidMount() {
		this.handleGetDetail()
	}

	handleGetDetail() {
		let self = this
		axios({
			url: Config.API_HOST + '/pokemon/'+this.state.pokemonid,
			method: 'GET',
			timeout: Config.TIMEOUT
		}).then(function (response) {
			if (response.status == '200') {
				self.setState({
					pokemonmoves: response.data.moves,
					pokemonsprites: response.data.sprites,
					pokemontypes: response.data.types,
					pokemonname: response.data.name,
					height: response.data.height,
					weight: response.data.weight,
					isData: true
				})
			}
		})
	}

	handleNotification(isnotif, iserror, message) {
		this.setState({
			isError: iserror,
			isNotif: isnotif,
			message: message,
		})
	}

	handlePopupCatch() {
		let random = Math.floor(Math.random() * 100);
		if(random >= 50) {
			this.handleNotification(true, false, 'Added to My Pokemon List.')
		} else {
			this.handleNotification(true, true, 'Pokemon broke free')
		}
	}

	handleRedirect(isError, urlredir) {
		if(isError) {
			window.location.reload();
		} else {
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
								<h4 className="blog-post-title">Pokemon Detail</h4>
								<hr />
								<div className="col-12">
									<div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
										<div className="col-12 bg-secondary p-2">
											<h4 className="mb-0 text-capitalize text-white">{this.state.pokemonname}</h4>
										</div>
										<div className="col-12">
											<div className="row mx-1">
												<div className="col-6 p-1 d-flex flex-column position-static justify-content-center">
													<p className="mb-0"><small>Height: {this.state.height} dm</small></p>
													<p className="mb-0"><small>Weight: {this.state.weight} hg</small></p>
												</div>
												<div className="col-6 p-0 text-right">
													<img src={this.state.pokemonsprites.front_default} alt={this.state.pokemonname} className="p-1" />
												</div>
											</div>
										</div>
									</div>
								</div>
								
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
							</div>
							<div className="row m-2">
								<button type="button" className="btn btn-danger col-12" onClick={this.handlePopupCatch}>Catch</button>
							</div>
						</div>
					</div>
				</main>
				{
					this.state.isData &&
					<PopupCatch handleNotification={this.handleNotification} pokemonid={this.state.pokemonid} pokemonmoves={this.state.pokemonmoves} pokemonname={this.state.pokemonname} pokemontypes={this.state.pokemontypes} pokemonsprites={this.state.pokemonsprites} weight={this.state.weight} height={this.state.height} handleRedirect={this.handleRedirect} />
				}
				
				{
					this.state.isNotif &&
					<PopupNotification isError={this.state.isError} message={this.state.message} urlredir={window.location.pathname} handleRedirect={this.handleRedirect} />
				}
				<Loader />
			</React.Fragment>
		)
	}
}