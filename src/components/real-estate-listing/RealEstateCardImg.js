import React from 'react';
import './realEstateCardImg.css';
import img1 from '../../images/house01.jpg';
import img2 from '../../images/download.png';
import img3 from '../../images/sunset.jpg';
const images = [img1,img2,img3];
const randomItem = images[Math.floor(Math.random()*images.length)];

const RealEstateCardImg = ({
  title,
  id,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="realEstateCardImg">
      <img src={img1} alt={title} className="realEstateCardImg__img" />
      <button
        className="realEstateCardImg__editButton"
        onClick={handleEditClick}
        value={id}
      >
        Edit
      </button>
      <button
        className="realEstateCardImg__deleteButton"
        onClick={handleDeleteClick}
        value={id}
      >
        Del
      </button>
    </div>
  );
};

export default RealEstateCardImg;
