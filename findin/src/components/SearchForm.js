"use client";
import React, { useState } from 'react';

const SearchForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    keyword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search data:', formData);
    // Perform search action here
  };

  return (
    <form onSubmit={handleSubmit}>
     
<div className="row">
  {/* Category Dropdown */}
  {/* Category Dropdown */}
<div className="col-lg-3 col-md-4 col-sm-12">
  <div className="form_group">
    <select
      className="form_control"
      name="category"
      value={formData.category}
      onChange={handleInputChange}
      required
    >
      <option value="">Select Category</option>
      <option value="Museums">Museums</option>
      <option value="Restaurant">Restaurant</option>
      <option value="Party Center">Party Center</option>
      <option value="Fitness Zone">Fitness Zone</option>
      <option value="Game Field">Game Field</option>
      <option value="Job & Feeds">Job & Feeds</option>
      <option value="Shopping">Shopping</option>
      <option value="Art Gallery">Art Gallery</option>
    </select>
  </div>
</div>

{/* Location Dropdown */}
<div className="col-lg-3 col-md-4 col-sm-12">
  <div className="form_group">
  <select>
  <option value="">Select Location</option>
  <option value="New York">New York</option>
</select>
    {/* <select
      className="form_control"
      name="location"
      value={formData.location}
      onChange={handleInputChange}
      required
    >
      <option value="">Select Location</option>
      <option value="New York">New York</option>
      <option value="Los Angeles">Los Angeles</option>
      <option value="Chicago">Chicago</option>
      <option value="Houston">Houston</option>
      <option value="Miami">Miami</option>
    </select> */}
  </div>
</div>


        {/* Keyword Search Input */}
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="form_group">
            <input
              type="text"
              className="form_control"
              placeholder="Search by Keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="col-lg-3 col-md-12 text-center  mb-3">
          <button type="submit" className="main-btn icon-btn">
            Search Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
