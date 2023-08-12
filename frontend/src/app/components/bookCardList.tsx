import React from 'react';
import BookCard from './bookCard';

interface BookCardData {
  id: string;
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

interface BookCardListProps {
  data: BookCardData[];
}

const BookCardList: React.FC<BookCardListProps> = ({ data }) => {
  return (
    <>
      <div className="grid xs:grid-cols-2 ss:grid-cols-3 sm:grid-cols-4 mt-1">
        {data.map((item, idx) => (
          <BookCard
            key={idx}
            title={item.title}
            discountRate={item.discountRate}
            coverImage={item.coverImage}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
};

export default BookCardList;
