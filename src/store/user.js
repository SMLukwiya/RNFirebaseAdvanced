import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState = {
    userId: '',
    userEmail: '',
    token: '',
    username: '',
    loading: false
}

export const signInEmail = createAsyncThunk('users/signin-email',
    async(userDetails, {rejectWithValue}) => {
        const { email, password } = userDetails;

        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            const token = await auth().currentUser.getIdToken();
            
            return {...response, token};
        } catch (error) {
            let errMessage = '';
            errMessage = error.code === 'auth/user-not-found' ? 'User does not exist' : ''
            return rejectWithValue(errMessage);
        }
    }
)

export const signUpEmail = createAsyncThunk('user/signup-email',
    async(userDetails, {rejectWithValue}) => {
        const {username, email, password} = userDetails;

        try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            const token = await auth().currentUser.getIdToken();
            const {user: {uid}} = response;

            const userDoc = await firestore().collection('users').doc(uid).set({username, email, imageUrl: '', fav: []});

            return {...response, token}
        } catch (error) {
            return rejectWithValue(error.code)
        }
    }
)

export const signOut = createAsyncThunk('user/signout',
    async() => {
        try {
            await auth().signOut()   
        } catch (error) {
            return rejectWithValue(error.code)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetLoaders: (state, action) => {
            state.loading = false;
        },
        updateProfile: (state, {payload}) => {
            state[payload.key] = payload.value;
        }
    },
    extraReducers: (builder) => {
        // sign in/login
        builder.addCase(signInEmail.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signInEmail.fulfilled, (state, {payload}) => {
            const { user: { uid, email }, token } = payload;
            state.loading = false;
            state.userId = uid;
            state.userEmail = email;
            state.token = token;
        })
        builder.addCase(signInEmail.rejected, (state, action) => {
            state.loading = false;
        })
        // signup/create account
        builder.addCase(signUpEmail.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signUpEmail.fulfilled, (state, {payload}) => {
            const { user: { uid, email }, token } = payload;
            state.loading = false;
            state.userId = uid;
            state.userEmail = email;
            state.token = token;
        })
        builder.addCase(signUpEmail.rejected, (state, action) => {
            state.loading = false;
        })
        // sign out
        builder.addCase(signOut.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signOut.fulfilled, (state, action) => {
            state.loading = false;
            state.token = '';
        })
        builder.addCase(signOut.rejected, (state, action) => {
            state.loading = false;
        })
    }
});

const { reducer, actions } = userSlice;
export const { resetLoaders, updateProfile } = actions;

export default reducer;