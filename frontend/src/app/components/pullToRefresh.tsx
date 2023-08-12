import React, { useState, ReactNode } from 'react';

interface PullToRefreshProps {
  onRefresh: () => void;
  children: ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null && e.touches[0].clientY > startY) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = async (e: React.TouchEvent) => {
    if (startY !== null && e.changedTouches[0].clientY > startY + 50) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setStartY(null);
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {isRefreshing ? 'Refreshing...' : children}
    </div>
  );
};

export default PullToRefresh;
