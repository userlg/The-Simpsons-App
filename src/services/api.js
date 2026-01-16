import axios from "axios";

const API_BASE_URL = "https://thesimpsonsapi.com/api";
export const IMAGE_BASE_URL = "https://cdn.thesimpsonsapi.com/500";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept responses to normalize data
apiClient.interceptors.response.use(
  (response) => {
    // The API returns { results: [...], ... }
    if (response.data && Array.isArray(response.data.results)) {
      response.data = response.data.results;
    } else if (response.data && Array.isArray(response.data.docs)) {
      response.data = response.data.docs;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default {
  // Characters
  getCharacters(page = 1) {
    return apiClient.get(`/characters?page=${page}`);
  },
  getCharacter(id) {
    return apiClient.get(`/characters/${id}`);
  },

  // Episodes
  getEpisodes(page = 1) {
    return apiClient.get(`/episodes?page=${page}`);
  },
  getEpisode(id) {
    return apiClient.get(`/episodes/${id}`);
  },

  // Locations
  getLocations(page = 1) {
    return apiClient.get(`/locations?page=${page}`);
  },
  getLocation(id) {
    return apiClient.get(`/locations/${id}`);
  },
};
