export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(
				credentials.email,
				credentials.password
			)
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
		});
	};
};

export const signUp = (newUser) => {
	// We user firebase to sign a new user up, using the authentication service by firebase
	// We use firestore to access our firestore database
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(
				newUser.email,
				newUser.password
			)
			.then((response) => {
				// .doc = Is used to specify an id that you want to use when creating the user, so it is related to another piece of data.
				// .add() = Is used when you are happy with auto generating the id
				return firestore
					.collection('users')
					.doc(response.user.uid)
					.set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials:
							newUser.firstName[0] + newUser.lastName[0]
					});
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};
