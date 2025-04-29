import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import { FloatCardComponent } from "../../components/cards";
import { PaginationComponent } from "../../components";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import UsersTableComponent from "../../components/tables/UsersTableComponent";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";



export default function UserListPage() {

    const { t } = useContext(TranslatorContext);
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("");


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/user_list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setUserData(data.info);
        } catch (error) {
            console.error("Error fetching users:", error);
        } 
    };

   

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('user_list')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('users')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('user_list')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {/* {floats.map((float, index) => ( */}
                    <Col xl={6} /*key={ index }*/>
                        <FloatCardComponent 
                            variant= "lg green" 
                            digit={  userData.filter(user => user.B_Active === 1).length }
                            title="Active Users" 
                            icon="check_circle"
                        />
                    </Col>
                    <Col xl={6} /*key={ index }*/>
                        <FloatCardComponent 
                            variant= "lg red" 
                            digit={  userData.filter(user => user.B_Active === 0).length }
                            title="InActive Users" 
                            icon="remove_circle"
                        />
                    </Col>
                {/* ))} */}
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('registered_users')}</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                {/* <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>{t('edit')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>{t('delete')}</span></button>
                                </Dropdown.Menu> */}
                            </Dropdown>
                        </div>
                        <Row xs={1} sm={2} xl={4}>
                            <Col>
                                <LabelFieldComponent
                                    label={t('role_by')}
                                    option={["Select Role","Super Admin","Admin", "Member", "Client", "Manager", "Vendor"]}
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <LabelFieldComponent
                                    type="search"
                                    label={t('search_by')}
                                    placeholder={ t('name') + ' / ' + t('username') }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <UsersTableComponent 
                            thead={["Name", "UserName", "Role", "Status", "Date", "Actions"]}
                            tbody={userData
                                .filter(user => {
                                    const name = user.V_Name?.toLowerCase() || "";
                                    const username = user.V_UserName?.toLowerCase() || "";

                                    const matchesRole = selectedRole && selectedRole !== "Select Role" ? user.V_UserType === selectedRole : true;

                                    const matchesSearch = searchTerm
                                        ? (
                                            name.includes(searchTerm.toLowerCase()) ||
                                            username.includes(searchTerm.toLowerCase())
                                        )
                                        : true;
                            
                                    return matchesRole && matchesSearch;
                                })
                                .map(user => ({
                                    N_T_M_User_ID: user.N_T_M_User_ID,
                                    name: user.V_Name,
                                    username: user.V_UserName,
                                    role: user.V_UserType,
                                    cityid: user.N_T_M_City_ID,
                                    cityname: user.V_CityName,
                                    status: user.B_Active === 1 ? "Active" : "InActive",
                                    date: new Date(user.D_InsertedOn).toLocaleDateString(),
                                    action: { edit: "edit",  view: "visibility" }
                                }))
                            }
                            fetchUsers={fetchUsers}

                        />

                        <PaginationComponent />
                    </div>
                </Col>
            </Row>
        </PageLayout>
    );
}