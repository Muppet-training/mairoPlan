import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import { deleteProject } from '../../store/actions/projectActions';

class ProjectDetails extends Component {
	state = {
		title: '',
		content: ''
	};

	// const ProjectDetails = (props) => {

	handleDelete = (projectId) => {
		console.log(projectId);
		this.props.deleteProject(projectId);
		this.props.history.push('/');
	};

	render() {
		const { project, auth, projectId } = this.props;

		// console.log('Project: ', project);
		// console.log('Auth: ', auth);
		console.log('Props: ', this.props);
		if (!auth.uid) return <Redirect to="/signin" />;

		if (project) {
			let deleteButton = null;
			if (auth.uid === project.authorId) {
				deleteButton = (
					<button
						// Create any annonymous function here to the function doesn't automatically fire when the page loads
						onClick={() => {
							this.handleDelete(projectId);
						}}
						className="red lighten-1 btn z-depth-0 button"
					>
						Delete Project
					</button>
				);
			}
			return (
				<div className="container section project details">
					<div className="card z-depth-0">
						<div className="card-content">
							<span className="card-title">
								{project.title}
							</span>
							<p>{project.content}</p>
						</div>
						<div className="card-action grey lighten-4 grey-text">
							<div>
								Posted By {project.authorFirstName}{' '}
								{project.authorLastName}
							</div>
							<div>
								{moment(
									project.createdAt
										.toDate()
										.toString()
								).calendar()}
							</div>
							<div>{deleteButton}</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container center">
					<p>Loading Project...</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	// console.log('State: ', state);
	const id = ownProps.match.params.id;
	const projects = state.firestore.data.projects;
	const project = projects ? projects[id] : null;

	return {
		project: project,
		auth: state.firebase.auth,
		projectId: id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteProject: (projectId) =>
			dispatch(deleteProject(projectId))
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: 'projects' } ])
)(ProjectDetails);
