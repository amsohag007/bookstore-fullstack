// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1'; // Replace with your API base URL

const bookData = [
  {
    id: '1',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '2',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '3',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '4',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '5',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '6',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '7',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '8',
    title: '레이블라우스',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
  {
    id: '9',
    title: '레이블라우스9',
    discountRate: 10,
    coverImage: 'img',
    price: 100,
  },
];

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
