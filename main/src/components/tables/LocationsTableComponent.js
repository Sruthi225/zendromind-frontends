import React, { useState, useEffect, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { AnchorComponent, ButtonComponent } from "../elements";
import { Modal, Form } from "react-bootstrap";
import config from "../../components/commonservices";

export default function LocationsTableComponent({ thead, tbody, fetchLocations }) {

    const { t } = useContext(TranslatorContext);

    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [LocationData, setLocationData] = React.useState("");
    const [cityData, setcityData] = useState([]);
    const [editModal, setEditModal] = React.useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    let N_T_M_City_ID = localStorage.getItem("cityID");

    useEffect(()=> { setData(tbody) }, [tbody]);

    const fetchCities = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/city_list/${N_T_M_City_ID}`, {
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


    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/create/Location`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    N_T_M_Location_ID: LocationData.locationID,
                    V_LocationName: LocationData.locationname,
                    N_T_M_City_ID: LocationData.cityid,
                    B_Active: LocationData.status === 'Active'? 1 :0,
                })
            });
    
            const result = await response.json();
    
            if (result.status_code === 200) {
                setEditModal(false); // Close modal
                fetchLocations();
            } else {
                alert("Failed to update Location: " + (result.response || "Unknown error"));
            }
        } catch (error) {
            alert("Failed to update Location." );
        }
    };

    return (
        <div className="mc-table-responsive">
            <table className="mc-table product">
                <thead className="mc-table-head primary">
                    <tr>
                        <th>
                            <div className="mc-table-check">
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
                                    <p>#{ item.locationID }</p>
                                </div>
                            </td>
                            {/* <td>
                                <div className="mc-table-product md">
                                    <img src={ item.digitalFile } alt='city' />
                                    <div className="mc-table-group">
                                        <h6>{ item.heading }</h6>
                                        <p>{ item.describe }</p>
                                    </div>
                                </div>
                            </td> */}
                            <td>{ item.locationname }</td>
                            <td>{ item.cityname }</td>
                            <td>{ item.status }</td>
                            {/* <td>{ item.date }</td> */}
                            <td>
                                <div className="mc-table-action">
                                    <AnchorComponent to="/product-view" title="View" className="material-icons view">{ item.action.view }</AnchorComponent>
                                    <ButtonComponent title="edit" className="material-icons edit" onClick={()=> setEditModal(true, setLocationData(item))}>{ item.action.edit }</ButtonComponent>
                                    <AnchorComponent to={`/category-location-link?locationid=${item.locationID}`} title="LocationLink" className="custom-location-button" 
                                                                            style={{backgroundColor: '#D3D3D3', 
                                                                                    color: 'white' , 
                                                                                    padding: '8px 12px',
                                                                                    borderRadius: '6px',
                                                                                    textDecoration: 'none',
                                                                                    display: 'inline-block',
                                                                                    border: 'none',
                                    }}>{('Category Link')}</AnchorComponent>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={ editModal } onHide={()=> setEditModal(false, setLocationData(""))}>
                <div className="mc-user-modal">
                    <Form.Group className=" inline mb-4 mt-5 ">
                        <Form.Label>{t('locationname')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={LocationData?.locationname || ""} 
                            onChange={(e) => setLocationData(prev => ({ ...prev, locationname: e.target.value }))}
                        />
                    </Form.Group>

                    <Form.Group className="inline">
                    <Form.Label>{t('city')}</Form.Label>
                    <Form.Select
                        value={LocationData.cityid || ""}
                        onChange={(e) =>
                        setLocationData({ ...LocationData, cityid: e.target.value })
                        }
                    >
                        {cityData.map((city) => (
                        <option key={city.N_T_M_City_ID} value={city.N_T_M_City_ID}>
                            {city.V_CityName}
                        </option>
                        ))}
                    </Form.Select>
                    </Form.Group>
                    
                   <Form.Group className=" inline">
                        <Form.Label>{t('status')}</Form.Label>
                        <Form.Select value={LocationData.status || ""} // default to empty string if undefined
                        onChange={(e) => setLocationData({ ...LocationData, status: e.target.value })}>
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