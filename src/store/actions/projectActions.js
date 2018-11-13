export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//We pause the dispatch
		//Make async call to database
		const firestore = getFirestore();
		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		// const projects = getState().firestore.data.projects;

		firestore
			.collection('projects')
			.add({
				...project,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorId: authorId,
				createdAt: new Date()
			})
			.then(() => {
				//Then once we have retrieved the data from the database
				//We tell the action to continue displatching
				dispatch({ type: 'CREATE_PROJECT', project });
			})
			.catch((err) => {
				dispatch({ type: 'CREATE_PROJECT_ERROR', err });
			});
	};
};

export const deleteProject = (projectId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// We pause the dispatch
		// We make async call to the database
		const firestore = getFirestore();
		const projects = getState().firestore.data.projects;
		const initialState = getState();
		console.log('initialState from action: ', initialState);
		// console.log('Projects: ', projects);

		firestore
			.collection('projects')
			.doc(projectId)
			.delete()
			.then(() => {
				dispatch({
					type: 'DELETE_PROJECT',
					projectId: projectId,
					projects: projects,
					initialState: initialState
				});
			})
			.catch((err) => {
				dispatch({ type: 'DELETE_PROJECT_ERROR', err });
			});
	};
};
