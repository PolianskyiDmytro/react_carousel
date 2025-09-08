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
  const [duration, setDuration] = useState(animationDuration);
  const [width, setWidth] = useState(itemWidth);
  const [size, setSize] = useState(frameSize);
  const [moveStep, setMoveStep] = useState(step);

  const canGoNext = infinite ? true : currentIndex + size < images.length;
  const canGoPrev = infinite ? true : currentIndex > 0;

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev + moveStep) % images.length);
    } else if (canGoNext) {
      setCurrentIndex(prev => Math.min(prev + moveStep, images.length - size));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex(
        prev => (prev - moveStep + images.length) % images.length,
      );
    } else if (canGoPrev) {
      setCurrentIndex(prev => Math.max(0, prev - moveStep));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${size * (width + 10)}px` }}>
      <div className="Carousel__controls">
        <label>
          Item Width:
          <input
            type="number"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </label>

        <label>
          Step:
          <input
            type="number"
            value={moveStep}
            onChange={e => setMoveStep(Number(e.target.value))}
          />
        </label>

        <label>
          Animation Duration:
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * (width + 10)}px)`,
            transitionDuration: `${duration}ms`,
          }}
        >
          {images.map((src, index) => (
            <li key={src} className="Carousel__item">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: `${width}px` }}
                width={width}
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
