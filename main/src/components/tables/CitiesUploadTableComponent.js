import React from "react";
import { Modal, Form } from "react-bootstrap";
import { ButtonComponent } from "../elements";
import { useContext, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import config from "../../components/commonservices";

export default function CitiesUploadTableComponent({ show, onHide, fetchCities }) {
    const { t } = useContext(TranslatorContext);

    const [formData, setFormData] = useState({
        cityname: "",
        digitalfile: "",       // actual File object
        digitalpreview: "",      // base64 preview (optional)
        status: "Active"
      });
      

    const form = new FormData();
    form.append("N_T_M_City_ID", '');
    form.append("V_CityName", formData.cityname);
    form.append("B_Active", formData.status);
    form.append("V_DigitalFile", formData.digitalfile); // The file object

    const handleChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

  const handleUpload = async() => {

    try {
        const response = await fetch(`${config.bmrServerURL}/api/admin/create/city`, {
            method: "POST", // or "PUT" depending on your backend
            body: form
        });


        const result = await response.json();
        if (result.status_code === 200) {
            onHide(); // Close modal after upload
            fetchCities();
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
          <Form.Label>{t("cityname")}</Form.Label>
          <Form.Control type="text" placeholder={t("cityname") } value={formData.cityname}
                    onChange={(e) => handleChange("cityname", e.target.value)} />
        </Form.Group>

        <Form.Group className="inline mb-4">
            <Form.Label>{t('Image')}</Form.Label>
            <Form.Control
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                // onChange={(e) => handleChange("digitalfile", e.target.files[0].name)}
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Store the raw file for upload
                      setFormData(prev => ({
                        ...prev,
                        digitalfile: file
                      }));
              
                      // Optional: Generate preview
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          digitalpreview: reader.result // used only for preview
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
            />
                                
                                {/* Image Preview */}
                {formData.digitalpreview && (
                    <img
                    src={formData.digitalpreview}
                    alt="Uploaded Preview"
                    style={{
                        marginTop: "10px",
                        maxHeight: "150px",
                        borderRadius: "8px"
                    }}
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
