"use client";
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import config from "./common.service";



const SearchForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    keyword: "",
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState({ categories: true, locations: true });
  const [selectionSource, setSelectionSource] = useState(""); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (formData.category && selectionSource === "category") {
      fetchLocations(formData.category);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.location && selectionSource === "location") {
      fetchCategories(formData.location);
    }
  }, [formData.location]);

  const fetchCategories = async (locationId = 0) => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      console.log(locationId)
      const url = `${config.bmrServerURL}/api/user/get/category_list/FindInTrivandrum/${locationId}`;
      const res = await fetch(url);
      const data = await res.json();
      setCategories(data.info || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

 

const fetchLocations = async (categoryId = 0) => {
  setLoading(prev => ({ ...prev, locations: true }));
  try {
    const url = `${config.bmrServerURL}/api/user/get/location_list/findintrivandrum/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    setLocations(data.info || []);
  } catch (err) {
    console.error("Error fetching categories:", err);
  } finally {
    setLoading(prev => ({ ...prev, locations: false }));
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));
    
    if (name === "location") {
      if (!formData.category) {
        setSelectionSource("location");
        fetchCategories(value); 
      }
    }
  
    if (name === "category") {
      if (!formData.location) {
        setSelectionSource("category");
        fetchLocations(value); // Category just selected → Fetch locations
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.N_T_M_Category_ID,
    label: cat.V_CategoryName
  }));


  const locationOptions = locations.map(loc => ({
    value: loc.N_T_M_Location_ID,
    label: loc.V_LocationName
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="form_group">
            {/* {categories.length > 0 && ( 
              <select name="category" className="form_control" value={formData.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                 {loading.categories ? (
                  <option disabled>Loading categories...</option>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.N_T_M_Category_ID} value={cat.N_T_M_Category_ID}>
                      {cat.V_CategoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
             )}  */}
          
            <Select
              className="form_control w-114 p-0 t-start h-70"
              name="category"
              options={categoryOptions}
              value={categoryOptions.find(opt => opt.value === formData.category)}
              onChange={(selectedOption) => {
                const selectedCategoryId = selectedOption?.value || "";
                setFormData(prev => ({ ...prev, category: selectedCategoryId }));
                if (!formData.location && selectedCategoryId) {
                  setSelectionSource("category");
                  // fetchLocations(selectedCategoryId);
                }
              }}
              placeholder="Select Category"
            />

          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="form_group">
            {/* {!loading.locations && locations.length > 0 && (
            <select name="location" className="form_control" value={formData.location} onChange={handleInputChange}>
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc.N_T_M_Location_ID} value={loc.N_T_M_Location_ID}>
                  {loc.V_LocationName}
                </option>
              ))}
            </select>
            )} */}
            <Select
              className="form_control w-114 w-100 p-0 t-start h-70"
            name="location"
            options={locationOptions}
            value={locationOptions.find(opt => opt.value === formData.location)}
            onChange={(selectedOption) => {
              const selectedLocationId = selectedOption?.value || "";
              setFormData(prev => ({ ...prev, location: selectedLocationId }));
              if (!formData.location && selectedLocationId) {
                setSelectionSource("location");
                // fetchCategories(selectedLocationId);
              }
            }}
            placeholder="Select Location"
            />
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="form_group">
            <input
              type="text"
              className="form_control"
              placeholder="Search by Keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-3 col-md-12 text-center mb-3">
          {/* <button type="submit" className="main-btn icon-btn">
            Search Now
          </button> */}
          
            {/* {(formData.category || formData.location || formData.keyword) ? (
               */}
              <a
                href={`/item-listing?category=${formData.category || ''}&location=${formData.location || ''}&keyword=${formData.keyword || ''}`}
                className="main-btn icon-btn"
              >
                Search Now
              </a>
            {/* ) : (
              <a className="main-btn icon-btn disabled" onClick={(e) => e.preventDefault()}>
                Search Now
              </a>
            )} */}

          
       </div>
      </div>
    </form>
    // <form onSubmit={handleSubmit}>
    //   <div className="row">
    //     <div className="col-lg-3 col-md-4 col-sm-12">
    //       <div className="form_group">
    //         <select
    //         className="form_control"
    //         name="category"
    //         >
    //         {categories.map((cat) => (
    //           <option key={cat.N_T_M_Category_ID} value={cat.N_T_M_Category_ID}>
    //             {cat.V_CategoryName}
    //           </option>
    //         ))}
    //         </select>
    //       </div>

    //     </div>
    //     {/* Category Dropdown
    //     <div className="col-lg-3 col-md-4 col-sm-12">
    //       <div className="form_group">
    //         <select
    //         className="form_control"
    //         name="category"
    //         >
    //           {categories.map((cat, idx) => (
    //               <option key={cat.N_T_M_Category_ID} value={cat.N_T_M_Category_ID}>
    //                 {cat.V_CategoryName}
    //               </option>
    //             ))}
    //         </select>
    //         {/* <select
    //           className="form_control"
    //           name="category"
    //           value={formData.category}
    //           onChange={handleInputChange}
    //           required
    //         >
    //           <option value="">Select Category</option> */}
    //           {/* {loading.categories ? (
    //             <option disabled>Loading categories...</option>
    //           ) : categories.length > 0 ? (
    //             categories.map((cat, idx) => (
    //               <option
    //                 key={cat.N_T_M_Category_ID || idx}
    //                 value={cat.V_CategoryName || ""}
    //               >
    //                 {cat.V_CategoryName || "Unnamed"}
    //               </option>
    //             ))
    //           ) : (
    //             <option disabled>No categories available</option>
    //           )} */}
    //           {/* {categories.map((cat, idx) => (
    //               <option key={cat.N_T_M_Category_ID} value={cat.N_T_M_Category_ID}>
    //                 {cat.V_CategoryName}
    //               </option>
    //             ))} */}
    //         {/* </select> */}
    //       {/* </div>
    //     </div> */} 

    //     {/* Location Dropdown */}
    //     <div className="col-lg-3 col-md-4 col-sm-12">
    //       <div className="form_group">
    //         <select
    //           className="form_control"
    //           name="location"
    //           // value={formData.location}
    //           // onChange={handleInputChange}
    //           required
    //         >
    //           <option value="">Select Location</option>
    //           {/* {!loading.locations && locations.length > 0 ? (
    //             locations.map((loc, idx) => (
    //               <option key={loc.N_T_M_Location_ID || idx} value={loc.V_LocationName}>
    //                 {loc.V_LocationName}
    //               </option>
    //             ))
    //           ) : (
    //             <option disabled>{loading.locations ? "Loading locations..." : "No locations found"}</option>
    //           )} */}
    //         </select>
    //       </div>
    //     </div>

    //     {/* Keyword Input */}
    //     <div className="col-lg-3 col-md-4 col-sm-12">
    //       <div className="form_group">
    //         <input
    //           type="text"
    //           className="form_control"
    //           placeholder="Search by Keyword"
    //           name="keyword"
    //           value={formData.keyword}
    //           onChange={handleInputChange}
    //           required
    //         />
    //       </div>
    //     </div>

    //     {/* Submit Button */}
    //     <div className="col-lg-3 col-md-12 text-center mb-3">
    //       <button type="submit" className="main-btn icon-btn">
    //         Search Now
    //       </button>
    //     </div>
    //   </div>
    // </form>
  );
};

export default SearchForm;
