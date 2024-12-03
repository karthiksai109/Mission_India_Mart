import React, { useState } from 'react';
import './ProductCarousel.css'; // For styling the carousel



const images=[
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSJF-BaISimKYbrmvZwUV2WEYtLiPwCelYAOZVkdtQbEnW10HNJh6JbNKknP2EwmcyBOWeysCqm8KQpEcVQlYxtv8IFYebcoFdenLePnkT5zDLVQkba4uXpV32f2ZUKEndXW9ZCDfM&usqp=CAc",
    "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQc_FubuLllBiqYVrox1heJp3HAFGe_usUnfJGb7dV04to_o_XJpLQ1UzMHAfU_y8PlhzGWQG25EdCYg_PI7v2S_BMUFWI-Xql-OYi_cAyGHDYQmu_6DSzE"

]
const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <button className="prev-button" onClick={prevSlide}>
        ❮
      </button>
      <div className="carousel-slide">
        {images.map((image, index,images) => (
          <div
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            key={index}
          >
            {index === currentIndex && <img src={image[index]} alt={`Product ${index}`} />}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default ProductCarousel;
