import React from "react";
import { Modal, Form } from "react-bootstrap";
import { ButtonComponent } from "../elements";
import { useContext, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import config from "../../components/commonservices";

export default function CategoriesUploadTableComponent({ show, onHide, fetchCategories }) {
    const { t } = useContext(TranslatorContext);

    const [formData, setFormData] = useState({
            categoryname: "",
            logofile: "",
            logopreview: "",
            digitalfile: "",
            digitalpreview: "",
            status: "Active"
    });

    const form = new FormData();
    
        form.append("N_T_M_Category_ID", formData.categoryID);
        form.append("V_CategoryName", formData.categoryname);
        form.append("B_Active", formData.status === 'Active' ? 1 : 0);
    
        if (formData.logofile instanceof File) {
            form.append("V_LogFile", formData.logofile);
        } else {
            form.append("V_LogFile", '');
        }
    
        if (formData.digitalfile instanceof File) {
            form.append("V_DigitalFile", formData.digitalfile);
        } else {
            form.append("V_DigitalFile", '');
        }

    const handleChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

  const handleUpload = async() => {

    try {
        const response = await fetch(`${config.bmrServerURL}/api/admin/create/category`, {
            method: "POST",
            body: form
        });

        const result = await response.json();

        if (result.status_code === 200) {
            onHide(); 
            fetchCategories();
        } else {
            alert("Failed to update City: " + (result.response || "Unknown error"));
        }
    } catch (error) {
        alert("Failed to update City." );
    }
   
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <div className="mc-user-modal p-4">

        <Form.Group className="inline mb-4 mt-3">
          <Form.Label>{t("categoryname")}</Form.Label>
          <Form.Control type="text" placeholder={t("categoryname") } value={formData.categoryname}
                    onChange={(e) => handleChange("categoryname", e.target.value)} />
        </Form.Group>

        <Form.Group className="inline mb-4">
            <Form.Label>{t('Logo')}</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        setFormData((prev) => ({
                        ...prev,
                        logofile: file, 
                        }));
                        const reader = new FileReader();
                        reader.onloadend = () => {
                        setFormData((prev) => ({
                            ...prev,
                            logopreview: reader.result, 
                        }));
                        };
                        reader.readAsDataURL(file);
                    }
                    }}
            />
            {formData.logopreview && (
                <img
                src={formData.logopreview}
                alt="Uploaded Preview"
                style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "8px" }}
                />
            )}
        </Form.Group>
        <Form.Group className="inline mb-4">
            <Form.Label>{t('Image')}</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        setFormData((prev) => ({
                        ...prev,
                        digitalfile: file, 
                        }));
                        const reader = new FileReader();
                        reader.onloadend = () => {
                        setFormData((prev) => ({
                            ...prev,
                            digitalpreview: reader.result, 
                        }));
                        };
                        reader.readAsDataURL(file);
                    }
                    }}
            />
                                
            {formData.digitalpreview && (
                <img
                src={formData.digitalpreview}
                alt="Uploaded Preview"
                style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "8px" }}
                />
            )}
        </Form.Group>

        <Form.Group className="inline mb-4">
          <Form.Label>{t("status")}</Form.Label>
          <Form.Select value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}>
            <option value="Active">{t("Active")}</option>
            <option value="InActive">{t("InActive")}</option>
          </Form.Select>
        </Form.Group>

        <Modal.Footer>
          <ButtonComponent className="btn btn-secondary" onClick={onHide}>
            {t("close_popup")}
          </ButtonComponent>
          <ButtonComponent className="btn btn-success" onClick={handleUpload}>
            {t("add")}
          </ButtonComponent>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
