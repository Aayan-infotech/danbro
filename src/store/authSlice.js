import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../utils/apiUrl';
import { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, clearAuthCookies } from '../utils/cookies';
import { getStoredLocation, clearStoredLocation } from '../utils/location';
import { refreshTokenApi } from '../utils/apiService';

/**
 * Async thunk for user login
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const location = getStoredLocation();
      const body = {
        email: credentials.email || credentials.username,
        password: credentials.password,
      };
      if (credentials.cart != null) body.cart = credentials.cart;
      if (credentials.wishlist != null) body.wishlist = credentials.wishlist;
      const response = await axios.post(`${API_BASE_URL}/user/login`, body, {
        headers: {
          'Content-Type': 'application/json',
          'lat': location.lat.toString(),
          'long': location.long.toString(),
        },
      });

      const responseData = response.data;
      
      // Extract tokens from various possible response structures
      const accessToken = responseData.accessToken || 
                         responseData.user?.accessToken || 
                         responseData.data?.accessToken || 
                         responseData.token;
      
      const refreshToken = responseData.refreshToken || 
                          responseData.user?.refreshToken || 
                          responseData.data?.refreshToken;

      if (!accessToken) {
        return rejectWithValue('Access token not found in response');
      }

      // Save tokens to cookies
      setAccessToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }

      return {
        accessToken,
        refreshToken,
        user: responseData.user || responseData.data?.user || {},
        message: responseData.message || 'Login successful',
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Login failed';
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
        isVerified: error.response?.data?.isVerified,
      });
    }
  }
);

/**
 * Async thunk for user logout
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      clearAuthCookies();
      clearStoredLocation();
      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

/**
 * Refresh access token using refresh token (POST /api/user/refreshToken)
 */
export const refreshAuth = createAsyncThunk(
  'auth/refreshAuth',
  async (_, { rejectWithValue }) => {
    const refresh = getRefreshToken();
    if (!refresh) return rejectWithValue('No refresh token');
    try {
      const { accessToken, refreshToken } = await refreshTokenApi(refresh);
      return { accessToken, refreshToken };
    } catch (err) {
      clearAuthCookies();
      return rejectWithValue(err.message || 'Session expired');
    }
  }
);

/**
 * Check if user is authenticated (uses access token; if missing but refresh token exists, tries refresh)
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    let token = getAccessToken();
    if (!token && getRefreshToken()) {
      const result = await dispatch(refreshAuth());
      if (refreshAuth.fulfilled.match(result)) token = result.payload?.accessToken;
    }
    return !!token;
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  authChecked: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  isRedirecting: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRedirecting: (state, action) => {
      state.isRedirecting = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isRedirecting = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = null;
        state.isRedirecting = true;
        // Reload window to update cart quantity in header
        window.location.reload();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isRedirecting = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
        state.isRedirecting = false;
      })
      // Check auth cases
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authChecked = true;
        state.isAuthenticated = action.payload;
        if (!action.payload) {
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
        }
      })
      // Refresh token cases
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { setRedirecting, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;

