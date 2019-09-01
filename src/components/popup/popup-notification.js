import React from 'react'
import $ from 'jquery'

export default class PopupNotification extends React.Component {
	constructor(props) {
		super(props)

		this.handleClose = this.handleClose.bind(this)
	}
	
	componentDidMount() {
		$('.popup-notification').click(function() {
			$('.popup-bottom-notification').removeClass('closed')
		})

		$('.popup-bottom-backdrop-share').click(function() {
			$('.popup-bottom-notification').addClass('closed')
		})
		
		$('.popup-bottom-notification-close').click(function() {
			$('.popup-bottom-notification').addClass('closed')
		})

		if(this.props.isError) {
			$('.popup-bottom-notification').removeClass('closed')	
		} else {
			$('.popup-bottom-notification').removeClass('closed')	
		}
	}

	handleClose() {
		if(this.props.isError) {
			if(this.props.is404) {
				if(this.props.handleRedirect) {
					this.props.handleRedirect(false, '/my-pokemon/')
				}
			} else {
				$('.popup-bottom-notification').addClass('closed')
				if(this.props.handleRedirect) {
					this.props.handleRedirect(true, this.props.urlredir)
				}
			}
		} else {
			if(this.props.isMyPokemon) {
				if(this.props.handleRedirect) {
					this.props.handleRedirect(false, '/my-pokemon/')
				}
			} else {
				$('.popup-bottom-catch').removeClass('closed')
			}
		}
	}
 
	render() {
		return (
			<div>
				<div className="popup-bottom popup-bottom-notification closed">
					<div className="popup-bottom-backdrop popup-bottom-backdrop-share"></div>
					{
						this.props.isError ?
						<div className="popup-center-content rounded bottom-error">
							<div className="p-2 text-white">
								<div className="d-flex justify-content-center">
									<div className="d-flex align-items-center justify-content-end">
										<p className="mb-0 pr-3">Something happen.<br/> {this.props.message}</p>
										<h3 className="popup-bottom-notification-close mb-0" onClick={this.handleClose}>OK</h3>
									</div>
								</div>
							</div>
						</div>
						:
						<div className="popup-center-content rounded bottom-success">
							<div className="p-2 text-white">
								<div className="d-flex justify-content-center">
									<div className="d-flex align-items-center justify-content-end">
										<p className="mb-0 pr-3">Success !<br/> {this.props.message}</p>
										<h3 className="popup-bottom-notification-close mb-0" onClick={this.handleClose}>OK</h3>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}