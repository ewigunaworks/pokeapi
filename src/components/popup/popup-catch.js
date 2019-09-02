import React from 'react'
import $ from 'jquery'
import firebase from '../../Firebase';

export default class PopupCatch extends React.Component {
	constructor(props) {
		super(props)

		this.ref = firebase.firestore().collection('mypokemon');

		this.state = {
			nickname: '',
			pokemonid: this.props.pokemonid,
			weight: this.props.weight,
			height: this.props.height,
			pokemonmoves: this.props.pokemonmoves,
			pokemontypes: this.props.pokemontypes,
			pokemonsprites: this.props.pokemonsprites,
			pokemonname: this.props.pokemonname,
		}

		this.handleChangeNickname = this.handleChangeNickname.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChangeNickname(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit() {
		const { nickname, pokemonid, pokemonname, pokemonsprites, pokemontypes, pokemonmoves, weight, height } = this.state;
		$('.popup-bottom-loader').removeClass('closed')
		this.ref.add({
			nickname,
			pokemonid,
			pokemonname,
			pokemonsprites,
			pokemontypes,
			pokemonmoves,
			weight, 
			height,
		}).then((docRef) => {
        	if(this.props.handleRedirect) {
        		$('.popup-bottom-loader').addClass('closed')
				this.props.handleRedirect(false, '/my-pokemon/')
			}
		})
		.catch((error) => {
		  	this.handleChange(true, true, 'failed to catch the pokemon.')
		});
	}

	handleChange(isNotif, isError, message) {
		if(this.props.handleNotification) {
			this.props.handleNotification(isNotif, isError, message)
			$('.popup-bottom-catch').addClass('closed')
		}
	}
	
	componentDidMount() {
		$('body').on('click', '.popup-catch', function() {
			$('.popup-bottom-catch').removeClass('closed')
		})
		
		$('body').on('click', '.popup-bottom-close', function() {
			$('.popup-bottom-catch').addClass('closed')
		})
		
		$('body').on('click', '.popup-bottom-backdrop-share', function() {
			$('.popup-bottom-catch').addClass('closed')
		})
		
		$('body').on('click', '.w-bottom-length', function() {
			$('.popup-bottom-catch').addClass('closed')
		})
	}
 
	render() {
		return (
			<div>
				<div className="popup-bottom popup-bottom-catch closed">
					<div className="popup-bottom-backdrop popup-bottom-backdrop-share"></div>
					<div className="popup-center-content bottom-prescription">
						<div className="p-3">
							<div className="form-group">
								<label>Pokemon Nickname</label>
								<input type="text" className="form-control" name="nickname" id="nickname" value={this.state.nickname} onChange={this.handleChangeNickname}></input>
							</div>
							<div className="d-flex justify-content-center justify-content-xl-end">
								<button className="btn btn-secondary w-bottom-length">Cancel</button>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<button className="btn btn-danger w-bottom-length" onClick={this.handleSubmit}>Catch</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}