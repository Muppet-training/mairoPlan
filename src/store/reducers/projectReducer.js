const initState = [];

const projectReducer = (state = initState, action) => {
	// console.log(action);
	// console.log(state);
	switch (action.type) {
		case 'CREATE_PROJECT':
			console.log('Created Project: ', action.project);
			return state;
		case 'CREATE_PROJECT_ERROR':
			console.log('Created Project Error: ', action.err);
			return state;
		case 'DELETE_PROJECT':
			// console.log('Successfully Deleted Project: ', action);
			console.log(action.projects);

			const disallow = [ action.projectId ];
			const filtered = Object.keys(action.projects)
				.filter((key) => !disallow.includes(key))
				.reduce((obj, key) => {
					obj[key] = action.projects[key];
					return obj;
				}, {});

			console.log('filtered:', filtered);

			return {
				...state,
				projects: filtered
			};
		// return state;
		case 'DELETE_PROJECT_ERROR':
			console.log('Delete Project Error: ', action.err);
			return state;
		default:
			return state;
	}
};

export default projectReducer;
