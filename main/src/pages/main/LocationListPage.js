import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {  ButtonComponent } from "../../components/elements";
import { FloatCardComponent } from "../../components/cards";
import LocationsTableComponent from "../../components/tables/LocationsTableComponent";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import { PaginationComponent } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";
import LocationUploadTableComponent from "../../components/tables/LocationUploadTableComponent";


export default function LocationListPage() {

    const { t, n } = useContext(TranslatorContext);

    const [LocationData, setLocationData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);

    let N_T_M_City_ID = localStorage.getItem("cityID");

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/Location_list/${N_T_M_City_ID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setLocationData(data.info);
        } catch (error) {
            console.error("Error fetching Locations:", error);
        } 
    };

    const floats = [
        { "title": "total_City", "digit": 547, "icon": "shopping_bag", "variant": "lg blue" }, 
        // { "title": "total_Locations", "digit": 605, "icon": "widgets", "variant": "lg green" },
        // { "title": "total_barnds", "digit": 249, "icon": "verified_city", "variant": "lg purple" }
    ]

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('location_List')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('location')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('location_list')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {floats.map((float, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCardComponent 
                            variant={ float.variant }
                            digit={LocationData.filter(Location=>Location.B_Active === 1).length}
                            title={t('Total_Location')}
                            icon={ float.icon }
                        />
                    </Col>
                ))}
                <Col xl={12}>
                    <div className="mc-card">
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={5}>
                                <LabelFieldComponent
                                    type="search"
                                    label={t('search_by')}
                                    placeholder={ t('Locationname') }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={7} className="d-flex justify-content-end  mt-4">
                                <ButtonComponent  type="button" className="btn btn-success" style={{ height: '38px', width: '200px' }} onClick={() => setShowUploadModal(true)}>{t('add location')}</ButtonComponent>
                            </Col>

                            <Col xl={12}>
                                <LocationsTableComponent
                                     thead={ ["LocationName", "Status", "CityName", "Actions"]} 
                                     tbody={LocationData
                                        .filter(Location=> Location.V_LocationName?.toLowerCase().includes(searchTerm.toLowerCase()) )
                                        .map(Location => ({
                                            locationID: Location.N_T_M_Location_ID,
                                            cityid: Location.N_T_M_City_ID,
                                            cityname: Location.V_CityName,
                                            // digitalFile: Location.V_DigitalFile,
                                            locationname: Location.V_LocationName,
                                            status: Location.B_Active === 1 ? "Active" : "InActive",
                                            // date: new Date(Location.D_InsertedOn).toLocaleDateString(),
                                            action: { edit: "edit",  view: "visibility" }
                                        }))
                                    }
                                    fetchLocations={fetchLocations}
                                />
                                <PaginationComponent />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <LocationUploadTableComponent
            show={showUploadModal}
            onHide={() => setShowUploadModal(false)}
            fetchLocations={fetchLocations}
            />

        </PageLayout>
    );
}
