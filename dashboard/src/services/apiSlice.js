import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401/403 error, try to refresh the token
  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // Attempt to refresh the token
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await baseQuery({
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }, api, extraOptions);

      if (refreshResult.data) {
        // Save the new access token
        const newAccessToken = refreshResult.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh failed, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    } else {
      // No refresh token available, redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  return result;
};

// Define the base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User', 'Dashboard'],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),

    // User endpoints
    getDashboard: builder.query({
      query: () => '/user/dashboard',
      providesTags: ['Dashboard'],
    }),

    // Admin endpoints (if needed)
    getAnalytics: builder.query({
      query: () => '/admin/analytics',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useGetDashboardQuery,
  useGetAnalyticsQuery,
} = apiSlice;