// src/App.tsx

import FixedContent from './fixed';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.scss';

const accessKey = 'xNI_mC3_kB7ZS9-FErAUBvR3_Z2KUCi6xFO_nO-T3rk';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?count=10&page=${page}&client_id=${accessKey}`
      );
      setImages([...images, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const openImagePreview = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="router-action">
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image) => (
            <div
              key={image.id}
              className="image-item"
              onClick={() => openImagePreview(image.urls.regular)}
            >
              <img src={image.urls.small} alt="" className='animate__animated animate__fadeInUp'/>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <FixedContent/>
    </div>
  );
};

export default App;
