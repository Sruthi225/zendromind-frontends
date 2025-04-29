import React, { useContext, useState, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { AnchorComponent, ButtonComponent } from "../../components/elements"; 
import { LabelFieldComponent, LabelTextareaComponent } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";

export default function ItemsUploadPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    // scrolling 
    const cityRef = useRef(null);
    const locationRef = useRef(null);
    const categoryRef = useRef(null);

    const cityid =  localStorage.getItem("cityID"); 

    const [uploadFile, setUploadFile] = React.useState('image upload');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
            cityid: false,
            locationid: false,
            categoryid: false,
        });

    const [formData, setFormData] = useState({
        itemname: "",
        cityid: "",
        locationid: "",
        categoryid: "",
        itemaddress: "",
        pincode: "",
        featured: "",
        contactperson: "",
        phoneno: "",
        googlemaplink: "",
        websitelink: "",
        whatsapplink: "",
        digitalfile: null, // The actual file
        digitalfilePreview: '',
        keyfeatures: "",
        status: "Active",
        workingdays: "",
        isinmall: "",
        parentitemsid: "",
        workingHours: [],
    });
    const [cityData, setcityData] = useState([]);
    const [LocationData, setLocationData] = useState([]);
    const [CategoryData, setCategoryData] = useState([]);
    const [WeeksData, setWeeksData] = useState([]);
    const [MallData, setMallData] = useState([]);
    useEffect(() => {
        fetchCities();
    
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
    

    const fetchCities = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/city_list/${cityid}`, {
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

    const fetchMall = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_mall_list/${cityid}`, {
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
    
            formDataToSend.append("N_T_M_Items_ID", '');
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
    

    const addWorkingHour = () => {
        setFormData(prev => ({
            ...prev,
            workingHours: [...prev.workingHours, { N_T_M_ItemsWorkingHours_ID : '', N_T_M_WeekDays: '', V_WeekDays: '', D_FromTime: '', D_ToTime: '' }]
        }));
    };
    
    const removeWorkingHour = (index) => {
        const updatedHours = [...formData.workingHours];
        updatedHours.splice(index, 1);
        setFormData(prev => ({ ...prev, workingHours: updatedHours }));
    };
    
    const handleWorkingHourChange = (index, field, value) => {
        const updatedHours = [...formData.workingHours];
        updatedHours[index][field] = value;
        setFormData(prev => ({ ...prev, workingHours: updatedHours }));
    };


    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('items upload')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('items')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('items upload')}</li>
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
                            onChange={(e) => handleChange("itemname", e.target.value)}/></Col>
                            <Col xl={6}><LabelTextareaComponent label={t('Address')} fieldSize="mb-4 w-100 h-text-md" 
                            onChange={(e) => handleChange("itemaddress", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Pincode')} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("pincode", e.target.value)}/></Col>
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
                            onChange={(e) => handleChange("featured", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Contact Number')} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("contactperson", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Phone number')} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("phoneno", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Google Map Link')} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("googlemaplink", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('WebSite Link')} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("websitelink", e.target.value)}/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('Whatsapp Link')} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("whatsapplink", e.target.value)}/></Col>
                            <Col xl={6}>
                                <div className="form-group mb-4">
                                    <Form.Label>{t('keyfeatures')}</Form.Label>
                                    <input
                                        type="text"
                                        className="form-control w-100 h-md"
                                        placeholder='Enter features like: mall, restaurant'
                                        onChange={(e) => handleChange("keyfeatures", e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col xl={6}><LabelFieldComponent label={t('Is In Mall')} option={['No','Yes']} fieldSize="mb-4 w-100 h-md" 
                            onChange={(e) => handleChange("isinmall", e.target.value)}/></Col>
                            {formData.isinmall === "Yes" && (
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
                                            <option key={mall.N_T_M_Items_ID} value={mall.N_T_M_Items_ID}>
                                                {mall.V_ItemName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            )}
                            <Col>
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
                            onChange={(e) => handleChange("workingdays", e.target.value)}/></Col>
                            {formData.workingdays === "Yes" && (
                                <Col xl={12}>
                                    <div className="mc-working-hours-section mb-4">
                                        <h5 className="mb-3">{t("Working Hours")}</h5>
                                        {formData.workingHours.map((hour, index) => (
                                            <Row key={index} className="mb-3">
                                                <Col xl={3}>
                                                    <Form.Control
                                                        as="select"
                                                        value={hour.N_T_M_WeekDays_ID}
                                                        onChange={(e) => handleWorkingHourChange(index, "N_T_M_WeekDays_ID", e.target.value)}
                                                    >
                                                        <option value="">-- Day --</option>
                                                        {WeeksData.map((week) => (
                                                            <option key={week.N_T_M_WeekDays_ID} value={week.N_T_M_WeekDays_ID}>
                                                                {week.V_WeekDays}
                                                            </option>
                                                        ))}
                                                        {/* {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))} */}
                                                    </Form.Control>
                                                </Col>
                                                <Col xl={3}>
                                                    <Form.Control
                                                        type="time"
                                                        value={hour.D_FromTime}
                                                        onChange={(e) => handleWorkingHourChange(index, "D_FromTime", e.target.value)}
                                                    />
                                                </Col>
                                                <Col xl={3}>
                                                    <Form.Control
                                                        type="time"
                                                        value={hour.D_ToTime}
                                                        onChange={(e) => handleWorkingHourChange(index, "D_ToTime", e.target.value)}
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