import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

const Config = require('../config')

export default class extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: 'Pokemon List',
			pokemons: [],
			pokemontotal: 0,
			offset: 0,
			limit: 20,
			hasMoreItems: true
		}

		this.handleLoadMore = this.handleLoadMore.bind(this)
		this.handleRefresh = this.handleRefresh.bind(this)
		this.slicePokemonId = this.slicePokemonId.bind(this)
		this.handleBackTop = this.handleBackTop.bind(this)
	}

	componentDidMount() {
		this.handleRefresh()
	}
	
	handleLoadMore() {
		let self = this
		axios({
			url: Config.API_HOST + '/pokemon?offset='+this.state.offset+'&limit='+this.state.limit,
			method: 'GET',
			timeout: Config.TIMEOUT
		}).then(function (response) {
			if (response.status == '200') {
				if (response.data.results.length > 0) {
					let lists = self.state.pokemons.concat(response.data.results)
					self.setState({
						pokemons: lists,
						offset: self.state.offset+self.state.limit,
						hasMoreItems: response.data.results.length > 19 ? true : false
					})
				} else {
					self.setState({
						hasMoreItems: false
					})
				}
			}
		})
	}
	
	handleRefresh() {
		let self = this
		axios({
			url: Config.API_HOST + '/pokemon?offset='+this.state.offset+'&limit='+this.state.limit,
			method: 'GET',
			timeout: Config.TIMEOUT
		}).then(function (response) {
			if (response.status == '200') {
				if (response.data.results.length > 0) {
					self.setState({
						pokemons: response.data.results,
						pokemontotal: response.data.count,
						offset: self.state.offset+self.state.limit,
						hasMoreItems: response.data.results.length > 19 ? true : false
					})
				} else {
					self.setState({
						hasMoreItems: false
					})
				}
			}
		})
	}

	slicePokemonId(url) {
		let slice = url.slice(0, -1);
		let getId = slice.split("/").slice(-1)[0];
		return getId
	}

	handleBackTop() {
		window.scrollTo({
	          top: 0
	    })
	}
	
	render() {
		return (
			<React.Fragment>
				<main role="main" className="container">
					<div className="row mb-2">
						<div className="col-md-12">
							<div className="blog-post">
								<h2 className="blog-post-title">Pokemon List</h2><hr />
								{
									this.state.pokemons.length > 0 &&
									<p>Showing {this.state.pokemontotal} Pokemon</p>
								}
							</div>
						</div>
						
						{this.state.pokemons &&
							<React.Fragment>
								<InfiniteScroll
									dataLength={this.state.pokemons}
									next={this.handleLoadMore}
									hasMore={this.state.hasMoreItems}
									endMessage={<div className="alert alert-light text-center small">All data has been displayed</div>}
									refreshFunction={this.handleRefresh}
									pullDownToRefresh
									pullDownToRefreshContent={<div className="alert alert-light text-center small">&#8595; Pull down to refresh</div>}
									releaseToRefreshContent={<div className="alert alert-light text-center small">&#8593; Release to refresh</div>}
								>
									<div className="container">
										<div className="row">
											{this.state.pokemons.map((data, i) => {
												return (<div className="col-md-6" key={i}>
													<Link to={"/pokemon/detail/"+ this.slicePokemonId(data.url)}>
														<div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
															<div className="col p-4 d-flex flex-column position-static bg-warning">
																<h4 className="mb-0 text-white text-capitalize">{ data.name }</h4>
															</div>
														</div>
													</Link>
												</div>)
											})}
										</div>
									</div>
								</InfiniteScroll>
							</React.Fragment>
						}
					</div>
				</main>
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