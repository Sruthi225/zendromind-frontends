import React, { useState, useEffect, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { AnchorComponent, ButtonComponent } from "../elements";
import { Modal, Form } from "react-bootstrap";
import config from "../../components/commonservices";

export default function CategoriesTableComponent({ thead, tbody, fetchCategories }) {

    const { t } = useContext(TranslatorContext)

    // const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    // const [blockModal, setBlockModal] = React.useState(false);

    useEffect(()=> { setData(tbody) }, [tbody]);

    const handleSaveChanges = async () => {
        const formData = new FormData();
    
        formData.append("N_T_M_Category_ID", categoryData.categoryID);
        formData.append("V_CategoryName", categoryData.categoryname);
        formData.append("B_Active", categoryData.status === 'Active' ? 1 : 0);
    
        if (categoryData.logofile instanceof File) {
            formData.append("V_LogFile", categoryData.logofile);
        } else {
            formData.append("V_LogFile", '');
        }
    
        if (categoryData.digitalfile instanceof File) {
            formData.append("V_DigitalFile", categoryData.digitalfile);
        } else {
            formData.append("V_DigitalFile", '');
        }
    
        let response;
    
        try {
            response = await fetch(`${config.bmrServerURL}/api/admin/create/category`, {
                method: "POST",
                body: formData
            });
        } catch (fetchError) {
            console.error("Network error:", fetchError);
            alert("Network error while trying to save category.");
            return;
        }
    
        let result;
        try {
            result = await response.json();
        } catch (jsonError) {
            const text = await response.text(); 
            console.error("Failed to parse JSON:", jsonError);
            console.error("Raw response text:", text);
            alert("Server response is not valid JSON.");
            return;
        }
    
        if (result.status_code === 200) {
            setEditModal(false);
            fetchCategories();    
        } else {
            alert("Failed to update Category: " + (result.response || "Unknown error"));
        }
    };
    

    useEffect(()=> { setData(tbody) }, [tbody]);

    return (
        <div className="mc-table-responsive">
            <table className="mc-table product">
                <thead className="mc-table-head primary">
                    <tr>
                        <th>
                            <div className="mc-table-check">
                                {/* <input 
                                    type="checkbox" 
                                    name="allCheck"
                                    checked={ data?.filter((item)=> item.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                /> */}
                                <p>uid</p>
                            </div>
                        </th>
                        {thead.map((item, index) => (
                            <th key={ index }>{ t(item) }</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <tr key={ index }> 
                            <td title={ index + 1 }>
                                <div className="mc-table-check">
                                    {/* <input 
                                        type="checkbox" 
                                        name={'check' + index} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <p>#{ item.categoryID }</p>
                                </div>
                            </td>
                            <td>
                                <div className="mc-table-product md">
                                    <img src={ item.logopreview } alt='logo' />
                                    {/* <div className="mc-table-group">
                                        <h6>{ item.heading }</h6>
                                        <p>{ item.describe }</p>
                                    </div> */}
                                </div>
                            </td>
                            <td>
                                <div className="mc-table-product md">
                                    <img src={ item.digitalpreview } alt='city' />
                                    {/* <div className="mc-table-group">
                                        <h6>{ item.heading }</h6>
                                        <p>{ item.describe }</p>
                                    </div> */}
                                </div>
                            </td>
                            <td>{ item.categoryname }</td>
                            <td>{ item.status }</td>
                            <td>{ item.date }</td>
                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to="/product-view" title="View" className="material-icons view">{ item.action.view }</AnchorComponent>
                                    {/* <AnchorComponent  title="Edit" className="material-icons edit">{ item.action.edit }</AnchorComponent> */}
                                    <ButtonComponent title="edit" className="material-icons edit" onClick={()=> setEditModal(true, setCategoryData(item))}>{ item.action.edit }</ButtonComponent>
                                    <AnchorComponent to={`/city-category-link?categoryid=${item.categoryID}`} title="CategoryLink" className="custom-category-button" 
                                        style={{backgroundColor: '#D3D3D3', 
                                                color: 'white' , 
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                textDecoration: 'none',
                                                display: 'inline-block',
                                                border: 'none',
                                    }}>{('City Link')}</AnchorComponent>
                                    {/* <ButtonComponent type="button" title="Delete" className="material-icons delete" onClick={()=> setAlertModal(true)}>{ item.action.delete }</ButtonComponent> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={ editModal } onHide={()=> setEditModal(false, setCategoryData(""))}>
                <div className="mc-user-modal">
                    <Form.Group className=" inline mb-4 mt-5 ">
                        <Form.Label>{t('categoryname')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={categoryData?.categoryname || ""} 
                            onChange={(e) => setCategoryData(prev => ({ ...prev, categoryname: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group className="inline mb-4">
                        <Form.Label>{t('Logo')}</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setCategoryData((prev) => ({
                                    ...prev,
                                    logofile: file,
                                    }));
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                    setCategoryData((prev) => ({
                                        ...prev,
                                        logopreview: reader.result, 
                                    }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                                }}
                        />
                        {categoryData?.logopreview && (
                            <img
                                src={categoryData.logopreview}
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
                                    setCategoryData((prev) => ({
                                    ...prev,
                                    digitalfile: file,
                                    }));
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                    setCategoryData((prev) => ({
                                        ...prev,
                                        digitalpreview: reader.result, 
                                    }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                                }}
                        />
                        {categoryData?.digitalpreview && (
                            <img
                                src={categoryData.digitalpreview}
                                alt="Uploaded Preview"
                                style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "8px" }}
                            />
                        )}
                    </Form.Group>
                    
                   <Form.Group className=" inline">
                        <Form.Label>{t('status')}</Form.Label>
                        <Form.Select value={categoryData.status || ""} 
                        onChange={(e) => setCategoryData({ ...categoryData, status: e.target.value })}>
                            <option value="Active">{t('Active')}</option>
                            <option value="InActive">{t('InActive')}</option>
                        </Form.Select>
                    </Form.Group>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={()=> setEditModal(false)}>{t('close_popup')}</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-success" onClick={handleSaveChanges}>{t('save_changes')}</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>

            {/* <Modal show={ alertModal } onHide={()=> setAlertModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>are your sure!</h3>
                    <p>Want to delete this product?</p>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={()=> setAlertModal(false)}>{t('close')}</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-danger" onClick={()=> setAlertModal(false)}>{t('delete')}</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal> */}
        </div>
    );
}