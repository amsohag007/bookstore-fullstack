'use client'; // This is a client component
import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';
import BookCardList from './components/bookCardList';
import PullToRefresh from './components/pullToRefresh';

interface Book {
  id: string;
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [positon, setPosition] = useState<number>(0);

  // function for calling next page data
  const loadNextPage = async () => {
    if (loading) {
      console.log('Already loading, skipping.');
      return;
    }

    setLoading(true);
    console.log('Loading next page...', loading);

    try {
      const nextPage = page + 1;
      console.log('Next page:', nextPage);

      const newData = await fetchData(nextPage);
      console.log('New data fetched:', newData);

      if (page > newData.totalPages) {
        return;
      }

      setData((prevData) => [...prevData, ...newData.data]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      console.log('Next page loaded successfully.', loading);
    }
  };

  useEffect(() => {
    loadNextPage();
  }, []);

  const handleScroll = () => {
    const scrollThreshold = 0.8;
    const scrollPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    setPosition(scrollPosition);

    if (scrollPosition > scrollThreshold) {
      loadNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [positon]);

  // function for pull refresh data fetching
  const fetchDataPull = async () => {
    try {
      console.log('refreshing-----------');
      const newData = await fetchData(1);
      setData([...newData.data]);
      setPage(1);
      console.log('refreshed***');
      return;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto bg-white">
      <h2 className="text-center font-semibold w-full pt-3 rounded bg-white">Books</h2>
      <PullToRefresh onRefresh={fetchDataPull} children={<BookCardList data={data} />} />
      {/* <BookCardList data={data} /> */}
    </div>
  );
};

export default HomePage;
