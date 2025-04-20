import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {  ButtonComponent } from "../../components/elements";
import { FloatCardComponent } from "../../components/cards";
import CategoriesTableComponent from "../../components/tables/CategoriesTableComponent";
import CategoriesUploadTableComponent from "../../components/tables/CategoriesUploadTableComponent";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import { PaginationComponent } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";


export default function CategoryListPage() {

    const { t, n } = useContext(TranslatorContext);

    const [categoryData, setCategoryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/category_list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCategoryData(data.info);
        } catch (error) {
            console.error("Error fetching categories:", error);
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
                            <h3 className="mc-breadcrumb-title">{t('Category_List')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('category')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('category_list')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {floats.map((float, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCardComponent 
                            variant={ float.variant }
                            digit={categoryData.filter(category=>category.B_Active === 1).length}
                            title={t('Total_Category')}
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
                                    placeholder={ t('categoryname') }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={7} className="d-flex justify-content-end  mt-4">
                                <ButtonComponent  type="button" className="btn btn-success" style={{ height: '38px', width: '200px' }} onClick={() => setShowUploadModal(true)}>{t('add category')}</ButtonComponent>
                            </Col>
                            <Col xl={12}>
                                <CategoriesTableComponent
                                     thead={ ["Logo","Image","CategoryName", "Status", "Date", "Actions"]} 
                                     tbody={categoryData
                                        .filter(category=> category.V_CategoryName?.toLowerCase().includes(searchTerm.toLowerCase()) )
                                        .map(category => ({
                                            categoryID: category.N_T_M_Category_ID,
                                            logofile: "",
                                            logopreview: category.V_LogFile,
                                            digitalfile: "",
                                            digitalpreview: category.V_DigitalFile,
                                            categoryname: category.V_CategoryName,
                                            status: category.B_Active === 1 ? "Active" : "InActive",
                                            date: new Date(category.D_InsertedOn).toLocaleDateString(),
                                            action: { edit: "edit",  view: "visibility" }
                                        }))
                                    }
                                    fetchCategories={fetchCategories}
                                />
                                <PaginationComponent />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <CategoriesUploadTableComponent
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                fetchCategories={fetchCategories}
            />
        </PageLayout>
    );
}
