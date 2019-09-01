import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <React.Fragment>
		<div className="container">
			<div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
				<div className="col-md-6 px-0">
					<h4 className="font-italic">Project Assignment Software Enginner - Web Platform</h4>
					<p className="lead my-3">This mini project assignment is using AdonisJS - NextJS and ReactJS as framework. And this website consist of 3 pages :</p>
					<ul>
						<li>Pokemon List</li>
						<li>Pokemon Detail</li>
						<li>My Pokemon List</li>
					</ul>
				</div>
			</div>
		</div>
	</React.Fragment>
    );
  }
}
 
export default Home;