import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export const fetchData = async (page: number) => {
  try {
    console.log('pageno-from api-', page);

    const response = await axios.get(`${API_BASE_URL}/books/?pageIndex=${page}`);
    console.log('response', response);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
