import React, { useContext, useState, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { AnchorComponent, ButtonComponent } from "../../components/elements"; 
import { LabelFieldComponent, LabelTextareaComponent } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from "react";

export default function ItemsUploadPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    // scrolling 
    const cityRef = useRef(null);
    const locationRef = useRef(null);
    const categoryRef = useRef(null);

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const itemsid = query.get('itemsid');

    const cityid =  localStorage.getItem("cityID"); 

    // const [uploadFile, setUploadFile] = React.useState('image upload');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({});
    const [cityData, setcityData] = useState([]);
    const [LocationData, setLocationData] = useState([]);
    const [CategoryData, setCategoryData] = useState([]);
    const [WeeksData, setWeeksData] = useState([]);
    const [MallData, setMallData] = useState([]);
    const [errors, setErrors] = useState({
        cityid: false,
        locationid: false,
        categoryid: false,
    });

    useEffect(() => {
        fetchCities(cityid);
        fetchItemDetails(itemsid);
        fetchWeeks();
    }, []);
    

    useEffect(() => {
        if (formData.isinmall === "Yes") {
          if (formData.cityid && formData.locationid && formData.categoryid) {
            fetchMall(formData.cityid, formData.locationid, formData.categoryid);
            setErrors({ cityid: false, locationid: false, categoryid: false });
          } else {
            setErrors({
              cityid: !formData.cityid,
              locationid: !formData.locationid,
              categoryid: !formData.categoryid,
            });
          }
          if (!formData.cityid) {
            cityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          } else if (!formData.locationid) {
            locationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          } else if (!formData.categoryid) {
            categoryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
    }, [formData.isinmall]);
    

    const fetchCities = async (cityid) => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_city_list/${cityid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setcityData(data.info);

        } catch (error) {
            console.error("Error fetching cities:", error);
        } 
    };

    const fetchLocation = async (cityid) => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_location_list/${cityid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setLocationData(data.info);
        } catch (error) {
            console.error("Error fetching locations:", error);
        } 
    };

    const fetchCategory = async (locationid) => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_Category_list/${locationid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCategoryData(data.info);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } 
    };

    const fetchMall = async (cityid, locationid, categoryid) => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_mall_list/${cityid}/${locationid}/${categoryid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setMallData(data.info);
        } catch (error) {
            console.error("Error fetching Mall:", error);
        } 
    };


    const fetchWeeks = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_weeks_list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setWeeksData(data.info);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } 
    };


    const fetchItemDetails = async (itemsid) => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/view/items_details/${itemsid}`);
            const data = await response.json();
            if(data.status_code === 200){
                
            }
            const item = data.info[0];

            setFormData({
                itemname: item.V_ItemName,
                cityid: item.N_T_M_City_ID,
                locationid: item.N_T_M_Location_ID,
                categoryid: item.N_T_M_Category_ID,
                itemaddress: item.V_ItemAddress,
                pincode: item.V_Pincode,
                featured: item.B_Featured === 1? "Yes" : "No",
                contactperson: item.V_ContactPerson,
                phoneno: item.V_PhoneNumber,
                googlemaplink: item.V_GoogleMapLink,
                websitelink: item.V_WebSiteLink,
                whatsapplink: item.V_WhatsappLink,
                digitalfile: null, // The actual file
                digitalfilePreview: item.V_ItemDigitalFile,
                keyfeatures: item.V_KeyFeatures,
                status: item.B_Active === 1? 'Active': 'InActive',
                workingdays: item.B_WorkingDays === 1 ? "Yes" : "No",
                isinmall: item.B_InMall === 1 ? "Yes" : "No",
                parentitemsid: item.N_T_M_ParentItems_ID,
                parentitemname: item.V_ParentItemName,
                workingHours: item.workingHours || [],
            });
    
            // fetch location/category if needed
            if (item.N_T_M_City_ID) fetchLocation(item.N_T_M_City_ID);
            if (item.N_T_M_Location_ID) fetchCategory(item.N_T_M_Location_ID);
            if (item.B_InMall) fetchMall();
    
        } catch (err) {
            console.error("Error fetching item data:", err);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updatedFormData = { ...prev, [field]: value };
            if (field === "cityid") {
                if (!value) {
                    alert("Please Select City to Fetch Location");
                }
                fetchLocation(value);
            }
            if(field === 'locationid'){
                if (!value) {
                    alert("Please Select Location to fetch Category");
                }
                fetchCategory(value);
            }
            return updatedFormData;
        });
    };


    const handleUpload = async () => {
        try {
            const formDataToSend = new FormData();
    
            formDataToSend.append("N_T_M_Items_ID", itemsid);
            formDataToSend.append("N_T_M_City_ID", formData.cityid);
            formDataToSend.append("N_T_M_Location_ID", formData.locationid);
            formDataToSend.append("N_T_M_Category_ID", formData.categoryid);
            formDataToSend.append("V_ItemName", formData.itemname);
            formDataToSend.append("V_ItemAddress", formData.itemaddress);
            formDataToSend.append("V_Pincode", formData.pincode);
            formDataToSend.append("B_Featured", (formData.featured === 'Yes') ? 1 : 0);
            formDataToSend.append("V_ContactPerson", formData.contactperson);
            formDataToSend.append("V_PhoneNumber", formData.phoneno);
            formDataToSend.append("V_GoogleMapLink", formData.googlemaplink);
            formDataToSend.append("V_WebSiteLink", formData.websitelink);
            formDataToSend.append("V_WhatsappLink", formData.whatsapplink);
            formDataToSend.append("V_KeyFeatures", formData.keyfeatures);
            formDataToSend.append("B_Active", formData.status === 'Active' ? 1 : 0);
            formDataToSend.append("B_InMall", (formData.isinmall === "Yes") ? 1 : 0);
            formDataToSend.append("N_T_M_ParentItems_ID", formData.parentitemsid || '');
            formDataToSend.append("B_WorkingDays", (formData.workingdays === "Yes") ? 1 : 0);
            formDataToSend.append("workingHours", formData.workingHours);
    
            // Only append digitalfile if it exists and is a File
            if (formData.digitalfile instanceof File) {
                formDataToSend.append("V_DigitalFile", formData.digitalfile);
            }
    
            const response = await fetch(`${config.bmrServerURL}/api/admin/create/item`, {
                method: "POST",
                body: formDataToSend, // send FormData, no headers
            });
    
            const result = await response.json();
    
            if (result.status_code === 200) {
                alert("Successfully Added the item.");
                setIsSubmitting(false);
                navigate('/item-list');
            } else {
                alert("Failed to add item: " + (result.response || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add item.");
        }
    };

    // const handleUpload = async() => {

    //     try {
    //         const response = await fetch(`${config.bmrServerURL}/api/admin/create/item`, {
    //         method: "POST", // or "PUT" depending on your backend
    //         headers: {
    //                     "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //                 N_T_M_Items_ID: itemsid,
    //                 N_T_M_City_ID: formData.cityid,
    //                 N_T_M_Location_ID: formData.locationid,
    //                 N_T_M_Category_ID: formData.categoryid,
    //                 V_ItemName: formData.itemname,
    //                 V_ItemAddress: formData.itemaddress,
    //                 V_Pincode: formData.pincode,
    //                 B_Featured: (formData.featured =='Yes') ?1:0,
    //                 V_ContactPerson: formData.contactperson,
    //                 V_PhoneNumber: formData.phoneno,
    //                 V_GoogleMapLink: formData.googlemaplink,
    //                 V_WebSiteLink: formData.websitelink,
    //                 V_WhatsappLink: formData.whatsapplink,
    //                 V_KeyFeatures: formData.keyfeatures,
    //                 B_Active: formData.status === 'Active'?1:0,
    //                 B_InMall: (formData.isinmall) == "Yes"? 1:0,
    //                 N_T_M_ParentItems_ID: formData.parentitemsid,
    //                 B_WorkingDays: (formData.workingdays == "Yes") ? 1:0,
    //                 workingHours: formData.workingHours
    //             })
    //         });
        
    //         const result = await response.json();
        
    //         if (result.status_code === 200) {
    //             alert("Item updated successfully." );
    //             setIsSubmitting(false); 
    //             navigate('/item-list');
    //         } else {
    //             alert("Failed to added item: " + (result.response || "Unknown error"));
    //         }
    //     } catch (error) {
    //         alert("Failed to added item." );
    //     }
           
    // };

    const addWorkingHour = () => {
        setFormData(prev => ({
          ...prev,
          workingHours: [
            ...prev.workingHours,
            {
              N_T_M_ItemsWorkingHours_ID: '',
              N_T_M_WeekDays_ID: '',
              V_WeekDays: '',
              D_FromTime: '',
              D_ToTime: '',
            }
          ]
        }));
    };
    
    const removeWorkingHour = (index) => {
        const updatedHours = [...formData.workingHours];
        if (updatedHours[index].N_T_M_ItemsWorkingHours_ID) {
          // Clear the values instead of removing
          updatedHours[index] = {
            N_T_M_ItemsWorkingHours_ID: updatedHours[index].N_T_M_ItemsWorkingHours_ID, 
            N_T_M_WeekDays_ID: '',
            V_WeekDays: '',
            D_FromTime: '',
            D_ToTime: ''
          };
        } else {
          updatedHours.splice(index, 1);
        }
      
        setFormData(prev => ({ ...prev, workingHours: updatedHours }));
    };
      
    
    const handleWorkingHourChange = (index, field, value) => {
        const updatedHours = [...formData.workingHours];
      
        if (field === "N_T_M_WeekDays_ID") {
          const selectedWeek = WeeksData.find(w => w.N_T_M_WeekDays_ID == value);
          updatedHours[index][field] = value;
          updatedHours[index]["V_WeekDays"] = selectedWeek?.V_WeekDays || "";
        } else {
          updatedHours[index][field] = value;
        }
      
        setFormData(prev => ({ ...prev, workingHours: updatedHours }));
    };


    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('items update')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('items')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('items update')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('basic_information')}</h4>
                            {/* <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle> */}
                                {/* <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>{t('edit')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>{t('delete')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>{t('download')}</span></button>
                                </Dropdown.Menu> */}
                            {/* </Dropdown> */}
                        </div>
                        <Row>
                            <Col xl={12}><LabelFieldComponent type="text" label={t('Item Name')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.itemname} onChange={(e) => handleChange("itemname", e.target.value)} required/></Col>
                            <Col xl={6}><LabelTextareaComponent label={t('Address')} fieldSize="mb-4 w-100 h-text-md" 
                            value={formData.itemaddress} onChange={(e) => handleChange("itemaddress", e.target.value)} required/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Pincode')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.pincode} onChange={(e) => handleChange("pincode", e.target.value)} required/></Col>
                            <Col xl={6}>
                                <div className="form-group mb-4" ref={cityRef}>
                                    <Form.Label>{t('city')}</Form.Label>
                                    <select
                                        id="city"
                                        className={`form-control w-100 h-md ${errors.cityid ? 'border border-danger' : ''}`}
                                        value={formData.cityid}
                                        onChange={(e) => handleChange("cityid", e.target.value)}
                                    >
                                        <option value="">{t('-- Select City --')}</option>
                                        {cityData.map((city) => (
                                            <option key={city.N_T_M_City_ID} value={city.N_T_M_City_ID}>
                                                {city.V_CityName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6}>
                                <div className="form-group mb-4" ref={locationRef}>
                                    <Form.Label>{t('location')}</Form.Label>
                                    <select
                                        id="location"
                                        className={`form-control w-100 h-md ${errors.locationid ? 'border border-danger' : ''}`}
                                        value={formData.locationid}
                                        onChange={(e) => handleChange("locationid", e.target.value)}
                                    >
                                        <option value="">{t('-- Select Location --')}</option>
                                        {LocationData.map((loc) => (
                                            <option key={loc.N_T_M_Location_ID} value={loc.N_T_M_Location_ID}>
                                                {loc.V_LocationName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6}>
                                <div className="form-group mb-4" ref={categoryRef}>
                                    <Form.Label>{t('category')}</Form.Label>
                                    <select
                                        id="category"
                                        className={`form-control w-100 h-md ${errors.categoryid ? 'border border-danger' : ''}`}
                                        value={formData.categoryid}
                                        onChange={(e) => handleChange("categoryid", e.target.value)}
                                    >
                                        <option value="">{t('-- Select Category --')}</option>
                                        {CategoryData.map((cat) => (
                                            <option key={cat.N_T_M_Category_ID} value={cat.N_T_M_Category_ID}>
                                                {cat.V_CategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6}><LabelFieldComponent label={t('Featured')} option={['No','Yes']} fieldSize="mb-4 w-100 h-md" 
                            value={formData.featured} onChange={(e) => handleChange("featured", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Contact Number')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.contactperson} onChange={(e) => handleChange("contactperson", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Phone number')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.phoneno} onChange={(e) => handleChange("phoneno", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Google Map Link')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.googlemaplink} onChange={(e) => handleChange("googlemaplink", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('WebSite Link')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.websitelink} onChange={(e) => handleChange("websitelink", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Whatsapp Link')} fieldSize="mb-4 w-100 h-md" 
                            value={formData.whatsapplink} onChange={(e) => handleChange("whatsapplink", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent label={t('Is In Mall')} option={['No','Yes']} fieldSize="mb-4 w-100 h-md" 
                            value={formData.isinmall} onChange={(e) => handleChange("isinmall", e.target.value)}/></Col>
                            {formData.isinmall == "Yes" && (
                            <Col xl={6}>
                                <div className="form-group mb-4">
                                    <Form.Label>{t('mall')}</Form.Label>
                                        <select
                                            id="mall"
                                            className="form-control w-100 h-md"
                                            value={formData.parentitemsid}
                                            onChange={(e) => handleChange("parentitemsid", e.target.value)}
                                        >
                                        <option value="">{t('-- Select Mall --')}</option>
                                        {MallData.map((mall) => (
                                            <option key={mall.N_T_M_ParentItems_ID} value={mall.N_T_M_ParentItems_ID}>
                                                {mall.V_ParentItemName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            )}
                            <Col xl ={6}>
                                <Form.Group className=" inline">
                                    <Form.Label>{t('status')}</Form.Label>
                                    <Form.Select value={formData.status || ""} 
                                        onChange={(e) => handleChange("status", e.target.value)}>
                                        <option value="Active">{t('Active')}</option>
                                        <option value="InActive">{t('InActive')}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                                            <Form.Group className="inline">
                                                                <Form.Label>{t('Image')}</Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files[0];
                                                                        if (file) {
                                                                            // 1. Save the actual file
                                                                            setFormData((prev) => ({
                                                                                ...prev,
                                                                                digitalfile: file,  // Keep file separately
                                                                            }));
                            
                                                                            // 2. Read and save preview URL (base64 or blob URL)
                                                                            const reader = new FileReader();
                                                                            reader.onloadend = () => {
                                                                                setFormData((prev) => ({
                                                                                    ...prev,
                                                                                    digitalfilePreview: reader.result, // Save base64 for preview only
                                                                                }));
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                        }
                                                                    }}
                                                                />
                                                                
                                                                {/* Show preview */}
                                                                {formData?.digitalfilePreview && (
                                                                    <div style={{ marginTop: "10px", position: "relative", display: "inline-block" }}>
                                                                    <img
                                                                        src={formData.digitalfilePreview}
                                                                        alt="Uploaded Preview"
                                                                        style={{ maxHeight: "150px", borderRadius: "8px" }}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger"
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: "0",
                                                                            right: "0",
                                                                            transform: "translate(50%, -50%)",
                                                                            borderRadius: "50%",
                                                                            padding: "2px 6px"
                                                                        }}
                                                                        onClick={() => {
                                                                            setFormData((prev) => ({
                                                                                ...prev,
                                                                                digitalfile: null,
                                                                                digitalfilePreview: '',
                                                                            }));
                                                                        }}
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                                    
                                                                )}
                                                            </Form.Group>
                                                        </Col>
                            
                            <Col xl={6}><LabelFieldComponent label={t('Is include Working Hours')} option={['No','Yes']} fieldSize="mb-4 w-100 h-md" 
                            value={formData.workingdays} onChange={(e) => handleChange("workingdays", e.target.value)}/></Col>
                            {formData.workingdays === "Yes" && (
                                <Col xl={12}>
                                    <div className="mc-working-hours-section mb-4">
                                        <h5 className="mb-3">{t("Working Hours")}</h5>
                                        {formData.workingHours.map((hour, index) => (
                                            <Row key={index} className="mb-3">
                                                <Col xl={3}>
                                                    <Form.Control
                                                    as="select"
                                                    value={String(hour.N_T_M_WeekDays_ID || "")}
                                                    onChange={(e) => handleWorkingHourChange(index, "N_T_M_WeekDays_ID", e.target.value)}
                                                    >
                                                        <option value="">-- Day --</option>
                                                        {WeeksData.map((week) => (
                                                            <option key={week.N_T_M_WeekDays_ID} value={String(week.N_T_M_WeekDays_ID)}>
                                                            {week.V_WeekDays}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                                <Col xl={3}>
                                                    <Form.Control
                                                        type="time"
                                                        value={hour.D_FromTime}
                                                        onChange={(e) => handleWorkingHourChange(index, "fromTime", e.target.value)}
                                                    />
                                                </Col>
                                                <Col xl={3}>
                                                    <Form.Control
                                                        type="time"
                                                        value={hour.D_ToTime}
                                                        onChange={(e) => handleWorkingHourChange(index, "endTime", e.target.value)}
                                                    />
                                                </Col>
                                                <Col xl={3}>
                                                    <ButtonComponent className="mc-btn red mt-2" onClick={() => removeWorkingHour(index)}>
                                                        {t("Remove")}
                                                    </ButtonComponent>
                                                </Col>
                                            </Row>
                                        ))}
                                        <ButtonComponent className="mc-btn primary" onClick={() => {
                                        addWorkingHour();
                                        fetchWeeks();
                                        }}>
                                            {t("Add Working Hour")}
                                        </ButtonComponent>
                                    </div>
                                </Col>
                            )}

                            <Col xl={12} className="text-center"><ButtonComponent className="mc-btn green" onClick={handleUpload}>
                            {/* {itemId ? t('update_item') : t('add_item')} */}
                            {t('add item')}
                            </ButtonComponent></Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    )
}