import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoNext = infinite ? true : currentIndex + frameSize < images.length;
  const canGoPrev = infinite ? true : currentIndex > 0;

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev + step) % images.length);
    } else if (canGoNext) {
      setCurrentIndex(prev => Math.min(prev + step, images.length - frameSize));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev - step + images.length) % images.length);
    } else if (canGoPrev) {
      setCurrentIndex(prev => Math.max(0, prev - step));
    }
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * (itemWidth + 10)}px` }}
    >
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * (itemWidth + 10)}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((src, index) => (
            <li key={src} className="Carousel__item">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        onClick={handlePrev}
        disabled={!canGoPrev}
        data-cy="prev"
      >
        ←
      </button>
      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        onClick={handleNext}
        disabled={!canGoNext}
        data-cy="next"
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
