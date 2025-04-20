import React from "react";
import { Modal, Form } from "react-bootstrap";
import { ButtonComponent } from "../elements";
import { useContext, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import config from "../../components/commonservices";

export default function LocationUploadTableComponent({ show, onHide, fetchLocations }) {
    const { t } = useContext(TranslatorContext);
    const [formData, setFormData] = useState({
            locationname: "",
            status: "Active"
    });
    const handleChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

  const handleUpload = async() => {

    try {
        const response = await fetch(`${config.bmrServerURL}/api/admin/create/Location`, {
            method: "POST", // or "PUT" depending on your backend
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                N_T_M_Location_ID: '',
                V_LocationName: formData.locationname,
                B_Active: formData.status === 'Active'? 1 :0,
                // Add more fields as needed
            })
        });

        const result = await response.json();

        if (result.status_code === 200) {
            onHide(); // Close modal after upload
            fetchLocations();
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
          <Form.Label>{t("locationname")}</Form.Label>
          <Form.Control type="text" placeholder={t("locationname") } value={formData.locationname}
                    onChange={(e) => handleChange("locationname", e.target.value)} />
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
