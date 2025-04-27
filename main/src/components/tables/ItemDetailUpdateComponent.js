import React, { useContext, useState, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { AnchorComponent, ButtonComponent } from "../elements"; 
import { LabelFieldComponent, LabelTextareaComponent } from "../fields";
import PageLayout from "../../layouts/PageLayout";
import config from "../commonservices";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function ItemDetailUploadComponent() {

    const { t } = useContext(TranslatorContext);

     const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const headingid = query.get('headingid');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        features: [{
            itemheadingid: `${headingid}`,
            itemid: '',
            V_HeadingName: '',
            descriptionType: '',
            HeadingDetail: []  
        }],
    });

    useEffect(() => {
            ViewDetails(headingid);
    }, []);
    

    const ViewDetails = async (headingid)=>{
        try{
            const response = await fetch(`${config.bmrServerURL}/api/admin/view/items_details_heading/${headingid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (result.status_code === 200 && result.info) {
                const formattedData = {
                    features: [{
                        itemheadingid: headingid,
                        itemid: result.info[0].N_T_M_Items_ID,
                        V_HeadingName: result.info[0].V_HeadingName,
                        descriptionType: result.info[0].V_DescriptionType,
                        HeadingDetail: result.info[0].HeadingDetail,
                    }]
                };
                setFormData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
        } 
    }
    

    const handleUpload = async () => {
            try {
                for (const feature of formData.features) {
                    let api = '';
                    let body;
                    let isFormData = false;
                    let  hasNewFiles = false;
                    let newImageFiles = [];
        
                    if (feature.descriptionType === 'text') {
                        api = `${config.bmrServerURL}/api/admin/update_details/item/${headingid}`;
                        body = JSON.stringify({
                            N_T_M_ItemHeading_ID: headingid,
                            N_T_M_Items_ID: feature.itemid,
                            V_HeadingName: feature.V_HeadingName,
                            V_DescriptionType: feature.descriptionType,
                            N_T_M_ItemHeadingDt_ID: feature.HeadingDetail[0].N_T_M_ItemHeadingDt_ID,
                            V_HeadingDetails: feature.HeadingDetail[0].V_HeadingDetails,
                        });
                    } else {
                        api = `${config.bmrServerURL}/api/admin/update_details_image/item/${headingid}`;
                        isFormData = true;
                        body = new FormData();
                        body.append("N_T_M_Items_ID", feature.itemid);
                        body.append("V_HeadingName", feature.V_HeadingName);
                        body.append("V_DescriptionType", feature.descriptionType);
                        // feature.HeadingDetail.forEach((file) => {
                        //     body.append("HeadingDetail", file.V_HeadingDetails); 
                        // });
                        feature.HeadingDetail.forEach((fileObj) => {
                            if (fileObj.file) {  // Only append files that have been uploaded
                                hasNewFiles = true;  // Mark that new files exist
                                newImageFiles.push(fileObj.file); // Add new file to array
                            }
                        });
        
                        // If new images are found, add them to the body
                        if (newImageFiles.length > 0) {
                            newImageFiles.forEach((file) => {
                                body.append("HeadingDetail", file);
                            });
                        }
                        
                    }

        
                    const response = await fetch(api, {
                        method: "PUT",
                        headers: isFormData ? undefined : { "Content-Type": "application/json" },
                        body: body
                    });
    
        
                    const result = await response.json();
        
                    if (result.status_code !== 200) {
                        alert(`Failed to add feature "${feature.V_HeadingName}": ${result.response || "Unknown error"}`);
                        
                    }
                    else{
                        alert("All features successfully uploaded.");
                        setIsSubmitting(false);
                        navigate(`/item-details-list?itemsid=${feature.itemid}`);
                    }
                }
                
            } catch (error) {
                console.error(error);
                alert("An error occurred while uploading features.");
            }
        };
    
    

    
    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index][field] = value;
        setFormData({ ...formData, features: updatedFeatures });
    };

    const handleRemoveFile = async (featureIndex, fileIndex) => {
        const updatedFeatures = [...formData.features];
        const updatedFiles = [...updatedFeatures[featureIndex].HeadingDetail];
        const fileToDelete = updatedFiles[fileIndex]; 

        if (fileToDelete && fileToDelete.N_T_M_ItemHeadingDt_ID) {
            try {
                const deleteResponse = await fetch(`${config.bmrServerURL}/api/admin/delete/item_image/${fileToDelete.N_T_M_ItemHeadingDt_ID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                const deleteResult = await deleteResponse.json();
    
                if (deleteResult.status_code !== 200) {
                    alert(`Failed to delete the file: ${deleteResult.response || "Unknown error"}`);
                    return; 
                }
                updatedFiles.splice(fileIndex, 1); 
                updatedFeatures[featureIndex].HeadingDetail = updatedFiles;
                setFormData({ ...formData, features: updatedFeatures });
    
                alert("File deleted successfully.");
            } catch (error) {
                console.error("Error deleting the file:", error);
                alert("An error occurred while deleting the file.");
            }
        } else {
            updatedFiles.splice(fileIndex, 1); 
            updatedFeatures[featureIndex].HeadingDetail = updatedFiles;
            setFormData({ ...formData, features: updatedFeatures });
            alert("File removed successfully.");
        }
    };
    
    const handleFileUpload = (index, type, files) => {
        const updatedFeatures = [...formData.features];
        const currentFeature = updatedFeatures[index];
        const newFiles = Array.from(files);
    
        if (type === 'image') {
            const existingFiles = currentFeature.HeadingDetail || [];
    
            if (existingFiles.length + newFiles.length > 10) {
                alert("You can only upload up to 10 images.");
                return;
            }
    
            const newImageFiles = newFiles.map((file) => ({
                V_HeadingDetails: URL.createObjectURL(file),
                file
            }));
    
            currentFeature.HeadingDetail = [...existingFiles, ...newImageFiles];
        } else if (type === 'video') {
            if (newFiles.length > 1) {
                alert("Only one video can be uploaded.");
                return;
            }
            currentFeature.HeadingDetail = newFiles.map((file) => ({
                V_HeadingDetails: URL.createObjectURL(file),
                file
            }));
        }
    
        setFormData({ ...formData, features: updatedFeatures });
    };
    

    return (
        <PageLayout>
        <div>
            {formData.features.map((feature, index) => (
                <div key={index} className="feature-block border p-3 mb-3 rounded ">
                    <Row className="mb-2">
                    <Col xl={4}>
                            <Form.Label>Description Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={feature.descriptionType}
                                onChange={(e) => handleFeatureChange(index, 'descriptionType', e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </Form.Control>
                        </Col>
                        <Col xl={4}>
                            <Form.Label>Heading</Form.Label>
                            <Form.Control
                                type="text"
                                value={feature.V_HeadingName}
                                onChange={(e) => handleFeatureChange(index, 'V_HeadingName', e.target.value)}
                            />
                        </Col>
                    {/* Render description input based on the selected type */}
                    {feature.descriptionType === 'text' && Array.isArray(feature.HeadingDetail) && (
                        <Col xl={12}>
                            <Form.Label>Description</Form.Label>
                            {feature.HeadingDetail.map((detail, detailIndex) => (
                                <div key={detailIndex} className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={detail.V_HeadingDetails}
                                        placeholder={`Description ${detailIndex + 1}`}
                                        onChange={(e) => {
                                            const updatedFeatures = [...formData.features];
                                            updatedFeatures[index].HeadingDetail[detailIndex].V_HeadingDetails = e.target.value;
                                            setFormData({ ...formData, features: updatedFeatures });
                                        }}
                                    />
                                </div>
                            ))}
                        </Col>
                    )}

                   
                    {feature.descriptionType === 'image' && Array.isArray(feature.HeadingDetail) && (
                        <div className="mc-product-upload-media mt-4">
                            {feature.HeadingDetail.length > 0 && feature.HeadingDetail.map((fileObj, idx) => {
                                const { V_HeadingDetails, file } = fileObj;

                                if ((file && file.type && file.type.startsWith('image')) ||
                                    (!file && V_HeadingDetails && /\.(jpeg|jpg|png|gif|webp)$/i.test(V_HeadingDetails))) {
                                    return (
                                        <div key={idx} className="position-relative mc-product-upload-image">
                                            <img 
                                                src={V_HeadingDetails} 
                                                alt={`product-${idx}`} 
                                                style={{ width: "100%", borderRadius: 8 }} 
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                style={{ borderRadius: "50%", padding: "2px 6px", transform: "translate(50%, -50%)" }}
                                                onClick={() => handleRemoveFile(index, idx)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    );
                                }

                                return null;
                            })}

                            <div className="mc-product-upload-file">
                                <input
                                    type="file"
                                    id={`product-${index}`}
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(index, 'image', e.target.files)}
                                />
                                <label htmlFor={`product-${index}`}>
                                    <i className="material-icons">collections</i>
                                    <span>Image Upload</span>
                                </label>
                            </div>
                        </div>
                    )}


                    {feature.descriptionType === 'video' && Array.isArray(feature.HeadingDetail) && (
                        <div className="mc-product-upload-media mt-4">
                            {feature.HeadingDetail.length > 0 && feature.HeadingDetail.map((fileObj, idx) => {
                                const { V_HeadingDetails, file } = fileObj;

                                // Check if the file is a video or URL points to a video
                                if ((file && file.type && file.type.startsWith('video')) || 
                                    (!file && V_HeadingDetails && /\.(mp4|webm|ogg)$/i.test(V_HeadingDetails))) {
                                    return (
                                        <div key={idx} className="position-relative mc-product-upload-image" >
                                            <video
                                                src={V_HeadingDetails} 
                                                alt={`product-video-${idx}`} 
                                                style={{ width: "100%", borderRadius: 8 }} 
                                                controls
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                style={{ borderRadius: "50%", padding: "2px 6px", transform: "translate(50%, -50%)" }}
                                                onClick={() => handleRemoveFile(index, idx)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    );
                                }

                                return null;
                            })}

                            <div className="mc-product-upload-file">
                                <input
                                    type="file"
                                    id={`product-${index}`}
                                    accept="video/*"
                                    onChange={(e) => handleFileUpload(index, 'video', e.target.files)}
                                />
                                <label htmlFor={`product-${index}`}>
                                    <i className="material-icons">collections</i>
                                    <span>Video Upload</span>
                                </label>
                            </div>
                        </div>
                    )}



                    <Col xl={12} className="text-center mt-4">
                        <ButtonComponent className="mc-btn green" onClick={handleUpload}>
                        {t('Update Details')}
                        </ButtonComponent>
                    </Col>
                </Row>
            </div>
        ))}
    </div>
    </PageLayout>
    );
    
}
  
  