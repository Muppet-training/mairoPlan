import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createProject } from '../../store/actions/projectActions';

class CreateProject extends Component {
	state = {
		title: '',
		content: ''
	};

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.props.createProject(this.state);
		this.props.history.push('/');
	};

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;

		return (
			<div className="container">
				<h5 className="grey-text text-darken-3">
					Create New Project
				</h5>
				<form onSubmit={this.handleSubmit} className="white">
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input
							onChange={this.handleChange}
							type="text"
							id="title"
						/>
					</div>
					<div className="input-field">
						<label htmlFor="content">
							Project Content
						</label>
						<textarea
							className="materialize-textarea"
							onChange={this.handleChange}
							type="text"
							id="content"
						/>
					</div>
					<button className="btn pink lighten-1 z-depth-0">
						Create
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createProject: (project) => dispatch(createProject(project))
	};
};

// Map displatch to props is the second arguement that is passed to the connect function
// Map state to props is the first function
export default connect(mapStateToProps, mapDispatchToProps)(
	CreateProject
);
