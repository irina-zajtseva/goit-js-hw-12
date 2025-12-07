import axios from 'axios';
const API_KEY = '53431502-05bc1324bd266ac6e07fa7d19';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get('/', { params }).then(response => response.data);
}
