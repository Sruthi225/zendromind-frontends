import React, { useState, useEffect, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Modal, Form } from "react-bootstrap";
import { ButtonComponent, AnchorComponent } from "../elements";
import config from "../../components/commonservices";
import {fetchUsers} from "../../pages/main/UserListPage";

export default function UsersTableComponent({ thead, tbody,  fetchUsers }) {

    const { t } = useContext(TranslatorContext)

    const [data, setData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [userData, setUserData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/user_city_list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCityData(data.info);
        } catch (error) {
            console.error("Error fetching cities:", error);
        } 
    };


    useEffect(()=> { setData(tbody) }, [tbody]);

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/update/users/${userData.N_T_M_User_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    V_Name: userData.name,
                    V_UserName: userData.username,
                    V_UserType: userData.role,
                    N_T_M_City_ID: userData.cityid,
                    B_Active: userData.status === 'Active'? 1 :0,
                })
            });
    
            const result = await response.json();
    
            if (result.status_code === 200) {
                setEditModal(false);
                fetchUsers();
            } else {
                alert("Failed to update user: " + (result.response || "Unknown error"));
            }
        } catch (error) {
            alert("Failed to update user." );
        }
    };
    

    return (
        <div className="mc-table-responsive">
            <table className="mc-table">
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
                            <th key={ index }>{ item }</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mc-table-body even">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={thead.length + 1} style={{ textAlign: "center" }}>
                                {t('No User Found')}
                            </td>
                        </tr>
                    ) : (

                    data?.map((item, index) => (
                        <tr key={ index }> 
                            <td title="id">
                                <div className="mc-table-check">
                                    {/* <input 
                                        type="checkbox" 
                                        name={item.name} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <p>#{ index + 1 }</p>
                                </div>
                            </td>
                            <td title={ item.name }>
                                <div className="mc-table-profile">
                                    {/* <img src={ item.src } alt={ item.alt } /> */}
                                    <p>{ item.name }</p>
                                </div>
                            </td>
                            <td title={ item.username }>{ item.username }</td>
                            <td title={ item.role }>{ item.role }
                                {/* <div className="mc-table-icon role">
                                    { item.role.text === "Vendor" && <i className="material-icons yellow">{ item.role.icon }</i> }
                                    { item.role.text === "Member" && <i className="material-icons green">{ item.role.icon }</i> }
                                    { item.role.text === "Admin" && <i className="material-icons purple">{ item.role.icon }</i> }
                                    { item.role.text === "Super Admin" && <i className="material-icons blue">{"person"}</i> }
                                    <span>{ item.role }</span>
                                </div> */}
                            </td>
                            <td title={ item.cityname }>{ item.cityname || 'All' }</td>
                            <td title={ item.status }>
                                { item.status === "Active" && <p className="mc-table-badge green">{ item.status }</p> }
                                { item.status === "InActive" && <p className="mc-table-badge purple">{ item.status }</p> }
                            </td>
                            <td title={ item.date }>{ item.date }</td>
                            <td>
                                <div className="mc-table-action">
                                    {/* <AnchorComponent to="/user-profile" title="view" className="material-icons view">{ item.action.view }</AnchorComponent> */}
                                    <ButtonComponent title="edit" className="material-icons edit" onClick={()=> setEditModal(true, setUserData(item))}>{ item.action.edit }</ButtonComponent>
                                    {/* <ButtonComponent title="block" className="material-icons block" onClick={()=> setBlockModal(true)}>{ item.action.block }</ButtonComponent> */}
                                </div>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>

            <Modal show={ editModal } onHide={()=> setEditModal(false, setUserData(""))}>
                <div className="mc-user-modal">
                    <Form.Group className=" inline mb-4 mt-5 ">
                        <Form.Label>{t('name')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={userData?.name || ""} 
                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group className=" inline mb-4">
                        <Form.Label>{t('username')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={userData?.username || ""} 
                            onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group className=" inline mb-4">
                        <Form.Label>{t('role')}</Form.Label>
                        <Form.Select value={userData.role || ""} 
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
                            <option value="Super Admin">{t('Super Admin')}</option>
                            <option value="Admin">{t('Admin')}</option>
                            <option value="Member">{t('Member')}</option>
                            <option value="Client">{t('Client')}</option>
                            <option value="Vendor">{t('Vendor')}</option>
                        </Form.Select>
                    </Form.Group>
                    {userData.role !== "Super Admin" && (
                        <Form.Group className="inline mb-4">
                            <Form.Label>{t('City')}</Form.Label>
                            <Form.Select
                                value={userData.cityid || ""} 
                                onChange={(e) => setUserData({ ...userData, cityid: e.target.value })} 
                            >
                                <option value="">{t('Select City')}</option>
                                {cityData.map((city) => (
                                    <option key={city.N_T_M_City_ID} value={city.N_T_M_City_ID}>
                                        {city.V_CityName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    )}
                    <Form.Group className=" inline">
                        <Form.Label>{t('status')}</Form.Label>
                        <Form.Select value={userData.status || ""}
                        onChange={(e) => setUserData({ ...userData, status: e.target.value })}>
                            <option value="Active">{t('Active')}</option>
                            <option value="InActive">{t('InActive')}</option>
                            {/* <option value="blocked">{t('blocked')}</option> */}
                        </Form.Select>
                    </Form.Group>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={()=> setEditModal(false)}>{t('close_popup')}</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-success" onClick={handleSaveChanges}>{t('save_changes')}</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>
            
            {/* <Modal show={ blockModal } onHide={()=> setBlockModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>are your sure!</h3>
                    <p>Want to block this user's account?</p>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={()=> setBlockModal(false)}>{t('close')}</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-danger" onClick={()=> setBlockModal(false)}>{t('block')}</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal> */}
        </div>
    )
}