import React from 'react'
import $ from 'jquery'
import firebase from '../../Firebase';

export default class PopupRelease extends React.Component {
	constructor(props) {
		super(props)

		this.ref = firebase.firestore().collection('mypokemon');

		this.state = {
			pokemonid: this.props.pokemonid,
			firebasekey: this.props.firebasekey
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		firebase.firestore().collection('mypokemon').doc(this.state.firebasekey).delete().then(() => {
			this.handleChange(true, false, false, 'Release The Pokemon')
		}).catch((error) => {
			this.handleChange(true, true, false, 'Failed Release The Pokemon')
		})
	}

	handleChange(isNotif, isError, is404, message) {
		if(this.props.handleNotification) {
			this.props.handleNotification(isNotif, isError, is404, message)
			$('.popup-bottom-release').addClass('closed')
		}
	}
	
	componentDidMount() {
		$('body').on('click', '.popup-release', function() {
			$('.popup-bottom-release').removeClass('closed')
		})
		
		$('body').on('click', '.popup-bottom-close', function() {
			$('.popup-bottom-release').addClass('closed')
		})
		
		$('body').on('click', '.popup-bottom-backdrop-share', function() {
			$('.popup-bottom-release').addClass('closed')
		})
		
		$('body').on('click', '.w-bottom-length', function() {
			$('.popup-bottom-release').addClass('closed')
		})
	}
 
	render() {
		return (
			<div>
				<div className="popup-bottom popup-bottom-release closed">
					<div className="popup-bottom-backdrop popup-bottom-backdrop-share"></div>
					<div className="popup-center-content bottom-prescription">
						<div className="p-3">
							<div className="form-group">
								<p className="mb-4">Are you sure to release the pokemon?</p>
							</div>
							<div className="d-flex justify-content-center justify-content-xl-end">
								<button className="btn btn-secondary w-bottom-length">Cancel</button>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<button className="btn btn-danger w-bottom-length" onClick={this.handleSubmit}>Release</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}