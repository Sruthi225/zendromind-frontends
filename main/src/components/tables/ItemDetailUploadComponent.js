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
    const itemsid = query.get('itemsid');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        features: [{ V_HeadingName: '', descriptionType: 'text', V_HeadingDetails: '' }],
    });

    const handleUpload = async () => {
        try {
            for (const feature of formData.features) {
                let api = '';
                let body;
                let isFormData = false;
    
                if (feature.descriptionType === 'text') {
                    api = `${config.bmrServerURL}/api/admin/create_details/item`;
                    body = JSON.stringify({
                        N_T_M_Items_ID: itemsid,
                        V_HeadingName: feature.V_HeadingName,
                        V_DescriptionType: feature.descriptionType,
                        V_HeadingDetails: feature.V_HeadingDetails
                    });
                } else {
                    api = `${config.bmrServerURL}/api/admin/create_image/item`;
                    isFormData = true;
                    body = new FormData();
                    body.append("N_T_M_Items_ID", itemsid);
                    body.append("V_HeadingName", feature.V_HeadingName);
                    body.append("V_DescriptionType", feature.descriptionType);
                    feature.V_HeadingDetails.forEach((file) => {
                        body.append("V_HeadingDetails", file); 
                    });
                    
                }
    
                const response = await fetch(api, {
                    method: "POST",
                    headers: isFormData ? {} : { "Content-Type": "application/json" },
                    body: body
                });

    
                const result = await response.json();
    
                if (result.status_code !== 200) {
                    alert(`Failed to add feature "${feature.V_HeadingName}": ${result.response || "Unknown error"}`);
                    
                }
                else{
                    alert("All features successfully uploaded.");
                    setIsSubmitting(false);
                    navigate(`/item-details-list?itemsid=${itemsid}`);
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

    const handleRemoveFile = (featureIndex, fileIndex) => {
        const updatedFeatures = [...formData.features];
        const updatedFiles = [...updatedFeatures[featureIndex].V_HeadingDetails];
        updatedFiles.splice(fileIndex, 1);
        updatedFeatures[featureIndex].V_HeadingDetails = updatedFiles;
        setFormData({ ...formData, features: updatedFeatures });
    };
      
    
    const addFeatureBlock = () => {
        setFormData((prevState) => ({
            ...prevState,
            features: [
                ...prevState.features,
                { V_HeadingName: '', descriptionType: 'text', V_HeadingDetails: '' }
            ]
        }));
    };
    
    const handleFileUpload = (index, type, files) => {
        const updatedFeatures = [...formData.features];
        const currentFeature = updatedFeatures[index];
        const newFiles = Array.from(files);
    
        if (type === 'image') {
            const existingFiles = currentFeature.V_HeadingDetails || [];
            if (existingFiles.length + newFiles.length > 10) {
                alert("You can only upload up to 10 images.");
                return;
            }
            currentFeature.V_HeadingDetails = [...existingFiles, ...newFiles];
        } else if (type === 'video') {
            if (newFiles.length > 1) {
                alert("Only one video can be uploaded.");
                return;
            }
            currentFeature.V_HeadingDetails = newFiles; // replace or set single video file
        }
    
        setFormData({ ...formData, features: updatedFeatures });
    };
    
    
    return (
        <PageLayout>
        <div>
            {formData.features.map((feature, index) => (
                <div key={index} className="feature-block border p-3 mb-3 rounded">
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
                    {feature.descriptionType === 'text' && (
                        <Row>
                            <Col xl={12}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={feature.V_HeadingDetails}
                                    onChange={(e) => handleFeatureChange(index, 'V_HeadingDetails', e.target.value)}
                                />
                            </Col>
                        </Row>
                    )}
    
                    {feature.descriptionType === 'image' && (
                        <Row>
                            <Col xl={12}>
                                <Form.Label>Upload Images</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleFileUpload(index, 'image', e.target.files)}
                                />
                                {feature.V_HeadingDetails && feature.V_HeadingDetails.length > 0 && (
                                <div className="mt-2 d-flex flex-wrap gap-2">
                                    {feature.V_HeadingDetails.map((file, idx) => (
                                    <div key={idx} className="position-relative" style={{ display: "inline-block" }}>
                                        <img
                                        src={URL.createObjectURL(file)}
                                        alt={`image-${idx}`}
                                        width="100"
                                        style={{ borderRadius: 8 }}
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
                                    ))}
                                </div>
                                )}
                            </Col>
                        </Row>
                    )}

                    
    
                    {feature.descriptionType === 'video' && (
                        <Row>
                            <Col xl={12}>
                                <Form.Label>Upload Videos</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={(e) => handleFileUpload(index, 'video', e.target.files)}
                                />
                                {feature.V_HeadingDetails && feature.V_HeadingDetails.length > 0 && (
                                <div className="mt-2 d-flex flex-wrap gap-2">
                                    {feature.V_HeadingDetails.map((file, idx) => (
                                    <div key={idx} className="position-relative" style={{ display: "inline-block" }}>
                                        <video width="150" controls>
                                        <source src={URL.createObjectURL(file)} type="file" />
                                        </video>
                                        <button
                                        type="button"
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                        style={{ borderRadius: "50%", padding: "2px 6px", transform: "translate(50%, -50%)" }}
                                        onClick={() => handleRemoveFile(index, idx)}
                                        >
                                        &times;
                                        </button>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </Col>
                        </Row>
                    )}
                    <Col xl={12} className="text-center mt-4">
                        <ButtonComponent className="mc-btn green" onClick={handleUpload}>
                        {t('Add Details')}
                        </ButtonComponent>
                    </Col>
                </Row>
            </div>
        ))}
    </div>
    </PageLayout>
    );
    
}
  
  