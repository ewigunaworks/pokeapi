import React from 'react'
import $ from 'jquery'

export default class Loader extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		
	}
 
	render() {
		return (
			<div>
				<div className="popup-bottom popup-bottom-loader closed">
					<div className="popup-bottom-backdrop popup-bottom-backdrop-share"></div>
					<div className="d-flex justify-content-center popup-center-content-loader loader-spinner">
						<strong className="text-white">Loading...</strong>
						<div class="spinner-grow text-light" role="status">
						  	<span class="sr-only">Loading...</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}