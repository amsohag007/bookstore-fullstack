import React from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

type BookCardProps = {
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
};

const BookCard: React.FC<BookCardProps> = ({ title, discountRate, coverImage, price }) => (
  <div className="flex flex-col h-full justify-between border rounded shadow-md">
    <div className="h-[187px]">
      <img src={coverImage} alt={title} className="object-fit w-full h-full " />
    </div>

    <div className="p-2">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex justify-between pt-3">
        <span style={{ fontWeight: 700, color: '##FF003E' }} className={roboto.className}>
          {discountRate}%
        </span>
        <span style={{ fontWeight: 700, color: '#080A0C' }} className={roboto.className}>
          {price.toLocaleString()}원
        </span>
      </div>
    </div>
  </div>
);

export default BookCard;
