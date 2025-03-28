"use client";
import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://13.203.104.113:3000";

const SearchForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    keyword: "",
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState({ categories: true, locations: true });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/get/category_list/findintrivandrum/0`
        );
        const data = await response.json();

        if (data.success_status && Array.isArray(data.info)) {
          // Ensure unique categories
          const uniqueCategories = [
            ...new Map(
              data.info.map((cat) => [cat.V_CategoryName, cat])
            ).values(),
          ];
          setCategories(uniqueCategories);
        } else {
          console.error("Invalid API response for categories:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    };

    fetchCategories();
  }, []);

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/get/location_list/findintrivandrum/0`
        );
        const data = await response.json();

        if (data.success_status && Array.isArray(data.info)) {
          const uniqueLocations = [
            ...new Map(
              data.info.map((loc) => [loc.V_LocationName, loc])
            ).values(),
          ];
          setLocations(uniqueLocations);
        } else {
          console.error("Invalid API response for locations:", data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading((prev) => ({ ...prev, locations: false }));
      }
    };

    fetchLocations();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
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
              {!loading.categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.N_T_M_Category_ID} value={cat.V_CategoryName}>
                    {cat.V_CategoryName}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="form_group">
            <select
              className="form_control"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Location</option>
              {!loading.locations && locations.length > 0 ? (
                locations.map((loc) => (
                  <option key={loc.N_T_M_Location_ID} value={loc.V_LocationName}>
                    {loc.V_LocationName}
                  </option>
                ))
              ) : (
                <option disabled>Loading locations...</option>
              )}
            </select>
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
        <div className="col-lg-3 col-md-12 text-center mb-3">
          <button type="submit" className="main-btn icon-btn">
            Search Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
