import React, { useState, useEffect, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { AnchorComponent, ButtonComponent } from "../elements";
import { Modal, Form } from "react-bootstrap";
import config from "../../components/commonservices";

export default function CitiesTableComponent({ thead, tbody, fetchCities }) {

    const { t } = useContext(TranslatorContext)

    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [cityData, setCityData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    const [blockModal, setBlockModal] = React.useState(false);

    useEffect(()=> { setData(tbody) }, [tbody]);

    

    const handleSaveChanges = async () => {
        const formData = new FormData();
    
        formData.append("N_T_M_City_ID", cityData.cityID);
        formData.append("V_CityName", cityData.cityname);
        formData.append("B_Active", cityData.status === 'Active' ? 1 : 0);
        if (cityData.digitalfile instanceof File) {
            
            formData.append("V_DigitalFile", cityData.digitalfile);
        } else {
            formData.append("V_DigitalFile", '');
        }
        try {
            
            const response = await fetch(`${config.bmrServerURL}/api/admin/create/city`, {
                method: "POST", 
                body: formData
            });
    
            const result = await response.json();
    
            if (result.status_code === 200) {
                setEditModal(false); // Close modal
                fetchCities();
            } else {
                alert("Failed to update City: " + (result.response || "Unknown error"));
            }
        } catch (error) {
            alert("Failed to update City." );
        }
    };
    

    useEffect(()=> { setData(tbody) }, [tbody]);

    // const handleCheckbox = (event) => {
    //     const { name, checked } = event.target;

    //     if(name === "allCheck") {
    //         const checkData = data?.map((item)=> {
    //             return { ...item, isChecked: checked };
    //         });
    //         setData(checkData);
    //     }
    //     else {
    //         const checkData = data?.map((item) => 
    //             item.name === name ? {...item, isChecked: checked} : item
    //         );
    //         setData(checkData);
    //     }
    // }

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
                                    <p>#{ item.cityID }</p>
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
                            <td>{ item.cityname }</td>
                            <td>{ item.status }</td>
                            <td>{ item.date }</td>
                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to="/product-view" title="View" className="material-icons view">{ item.action.view }</AnchorComponent>
                                    {/* <AnchorComponent  title="Edit" className="material-icons edit">{ item.action.edit }</AnchorComponent> */}
                                     <ButtonComponent title="edit" className="material-icons edit" onClick={()=> setEditModal(true, setCityData(item))}>{ item.action.edit }</ButtonComponent>
                                    {/* <ButtonComponent type="button" title="Delete" className="material-icons delete" onClick={()=> setAlertModal(true)}>{ item.action.delete }</ButtonComponent> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={ editModal } onHide={()=> setEditModal(false, setCityData(""))}>
                <div className="mc-user-modal">
                    <Form.Group className=" inline mb-4 mt-5 ">
                        <Form.Label>{t('cityname')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={cityData?.cityname || ""} 
                            onChange={(e) => setCityData(prev => ({ ...prev, cityname: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group className="inline mb-4">
                        <Form.Label>{t('Image')}</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setCityData((prev) => ({
                                ...prev,
                                digitalfile: file, // raw file for backend
                                }));
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                setCityData((prev) => ({
                                    ...prev,
                                    digitalpreview: reader.result, // base64 preview
                                }));
                                };
                                reader.readAsDataURL(file);
                            }
                            }}
                        />
                        {cityData?.digitalpreview && (
                            <img
                            src={cityData.digitalpreview}
                            alt="Uploaded Preview"
                            style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "8px" }}
                            />
                        )}
                    </Form.Group>
                    
                   <Form.Group className=" inline">
                        <Form.Label>{t('status')}</Form.Label>
                        <Form.Select value={cityData.status || ""} 
                        onChange={(e) => setCityData({ ...cityData, status: e.target.value })}>
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