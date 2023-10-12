import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login, logout} from '../service/UserService';
import register from "../component/Register";

const initialState = {
    value: null,
    loading: false,
    errors: null,
    loginSuccess: false,
    registerSuccess: false,
    // forgotPasswordSuccess: false,
    token: localStorage.getItem("token"),
};

export const loginUser = createAsyncThunk(
    "",
    async (loginData, {rejectWithValue}) => {
        const response = await login(loginData);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);

export const registerUser = createAsyncThunk(
    "register",
    async (registerData, {rejectWithValue}) => {
        const response = await register(registerData);
        if (response.status !== 201) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);
export const logoutUser = createAsyncThunk(
    "logout",
    async (logoutData, {rejectWithValue}) => {
        const response = await logout(logoutData);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);

export const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginSuccess = false;
                state.loading = true;
                state.errors = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginSuccess = false;
                state.loading = false;
                state.errors = action.error;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginSuccess = true;
                state.loading = false;
                state.value = action.payload;
                state.errors = false;
                state.token = action.payload.data;
                localStorage.setItem("token", action.payload.data);
            })
            .addCase(registerUser.pending, (state) => {
                state.registerSuccess = false;
                state.loading = true;
                state.errors = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerSuccess = false;
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerSuccess = true;
                state.loading = false;
                state.errors = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loginSuccess = false;
                state.loading = true;
                state.errors = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loginSuccess = false;
                state.loading = false;
                state.value = action.payload;
                state.errors = false;
                state.token = null;
                localStorage.removeItem("token");

            })
        ;
    },
});

export const {setLoading, setError, setSuccess, setValue} = loginSlice.actions;

export const selectAuthIsLoading = (state) => state.user.loading;
export const selectAuthIsError = (state) => state.user.errors;
export const selectLoginSuccess = (state) => state.user.loginSuccess;
export const selectRegisterSuccess = (state) => state.user.registerSuccess;
export const selectUserLogin = (state) => state.user.value;
export const selectUserRegister = (state) => state.login.value;
export const selectToken = (state) => state.user.token;

export default loginSlice.reducer;