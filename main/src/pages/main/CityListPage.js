import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {  ButtonComponent } from "../../components/elements";
import { FloatCardComponent } from "../../components/cards";
import CitiesTableComponent from "../../components/tables/CitiesTableComponent";
import CitiesUploadTableComponent from "../../components/tables/CitiesUploadTableComponent";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import { PaginationComponent } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";


export default function CityListPage() {

    const { t, n } = useContext(TranslatorContext);

    const [cityData, setcityData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/city_list`, {
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

    const floats = [
        { "title": "total_City", "digit": 547, "icon": "shopping_bag", "variant": "lg blue" }, 
        // { "title": "total_categories", "digit": 605, "icon": "widgets", "variant": "lg green" },
        // { "title": "total_barnds", "digit": 249, "icon": "verified_city", "variant": "lg purple" }
    ]

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('City_List')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('city')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('city_list')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {floats.map((float, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCardComponent 
                            variant={ float.variant }
                            digit={n(float.digit)}
                            title={t(float.title)}
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
                                    placeholder={ t('cityname') }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                             <Col xs={12} sm={6} md={4} lg={7} className="d-flex justify-content-end  mt-4">
                                <ButtonComponent  type="button" className="btn btn-success" style={{ height: '38px', width: '200px' }} onClick={() => setShowUploadModal(true)}>{t('add city')}</ButtonComponent>
                            </Col>
                            <Col xl={12}>
                                <CitiesTableComponent 
                                     thead={ ["Image","CityName", "Status", "Date", "Actions"]} 
                                     tbody={cityData
                                        .filter(city=> city.V_CityName?.toLowerCase().includes(searchTerm.toLowerCase()) )
                                        .map(city => ({
                                            cityID: city.N_T_M_City_ID,
                                            digitalfile: null,
                                            digitalpreview: city.V_DigitalFile,
                                            cityname: city.V_CityName,
                                            status: city.B_Active === 1 ? "Active" : "InActive",
                                            date: new Date(city.D_InsertedOn).toLocaleDateString(),
                                            action: { edit: "edit",  view: "visibility" }
                                        }))
                                    }
                                    fetchCities={fetchCities}
                                />
                                <PaginationComponent />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <CitiesUploadTableComponent
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                fetchCities={fetchCities}
            />
        </PageLayout>
    );
}
