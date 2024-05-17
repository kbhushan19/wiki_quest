import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Define a base URL for your API
const BASE_URL = import.meta.env.VITE_BASE_URL

// Define a function to make GET requests
export function useGetRequest(endpoint, options = {}) {
  return useQuery(endpoint, async () => {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  }, options);
}

// Define a function to make POST requests
export function usePostRequest(endpoint, options = {}) {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate the cache for the relevant endpoint
        queryClient.invalidateQueries(endpoint);
      },
      ...options,
    }
  );
}

// Define a function to make PUT requests
export function usePutRequest(endpoint, options = {}) {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate the cache for the relevant endpoint
        queryClient.invalidateQueries(endpoint);
      },
      ...options,
    }
  );
}

// Define a function to make DELETE requests
export function UseDeleteRequest(endpoint, options = {}) {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const response = await axios.delete(`${BASE_URL}/${endpoint}`);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate the cache for the relevant endpoint
        queryClient.invalidateQueries(endpoint);
      },
      ...options,
    }
  );
}