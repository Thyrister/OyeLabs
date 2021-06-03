import React from 'react';
import { LOCATIONS } from './../../constant';

const RealEstateInputs = ({
  isEdit,
  title,
  setTitle,
  price,
  setPrice,
  location,
  setLocation,
  clearInput,
  handleAddOrEditClick,
}) => {
  const buttonContent = isEdit ? 'Change' : 'Add';
  return (
    <div>
      <div className="inputGroup">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
   
      <div className="inputGroup">
        <label htmlFor="location">Location</label>
        <input
        type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
         
        
      </div>
      <button className="button" onClick={handleAddOrEditClick}>
        {buttonContent}
      </button>
      <button className="button" onClick={clearInput}>
        Clear
      </button>
    </div>
  );
};

export default RealEstateInputs;
