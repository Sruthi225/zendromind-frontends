import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {  ButtonComponent } from "../../components/elements";
import { FloatCardComponent } from "../../components/cards";
import LabelFieldComponent from "../../components/fields/LabelFieldComponent";
import { PaginationComponent } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import config from "../../components/commonservices";
import ItemTableComponent from "../../components/tables/ItemTableComponent";
import { useNavigate } from 'react-router-dom';


export default function ItemsListPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    const [ItemData, setItemData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // const [showUploadModal, setShowUploadModal] = useState(false);

    const cityid =  localStorage.getItem("cityID"); 

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/item_list/${cityid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setItemData(data.info);
        } catch (error) {
            console.error("Error fetching Items:", error);
        } 
    };

    const floats = [
        { "title": "total_City", "digit": 547, "icon": "shopping_bag", "variant": "lg blue" }, 
        // { "title": "total_Item", "digit": 605, "icon": "widgets", "variant": "lg green" },
        // { "title": "total_barnds", "digit": 249, "icon": "verified_city", "variant": "lg purple" }
    ]

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('items_List')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('Items')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('items_list')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {floats.map((float, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCardComponent 
                            variant={ float.variant }
                            digit={ItemData.filter(Items=>Items.B_Active === 1).length}
                            title={t('Total_Items')}
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
                                    placeholder={ t('Itemsname') }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={7} className="d-flex justify-content-end  mt-4">
                                <ButtonComponent  type="button" className="btn btn-success" style={{ height: '38px', width: '200px' }} onClick={() => navigate(`/items-upload`)}>{t('add item')}</ButtonComponent>
                            </Col>
                            <Col xl={12}>
                                <ItemTableComponent
                                    thead={ ["ItemName",  "CityName",  "LocationName", "CategoryName", "status","Actions"]} 
                                    tbody={ItemData
                                        .filter(Item=> Item.V_ItemName?.toLowerCase().includes(searchTerm.toLowerCase()) )
                                        .map(Item=> ({
                                            itemID: Item.N_T_M_Items_ID,
                                            cityid: Item.N_T_M_City_ID,
                                            cityname: Item.V_CityName,
                                            locationid: Item.N_T_M_Location_ID,
                                            locationname: Item.V_LocationName,
                                            categoryid: Item.N_T_M_Category_ID,
                                            categoryname: Item.V_CategoryName,
                                            itemname: Item.V_ItemName,
                                            itemaddress: Item.V_ItemAddress,
                                            status: Item.B_Active === 1 ? "Active" : "InActive",
                                            action: { edit: "edit",  view: "visibility", block: "block", delete: "delete", details:"details" }
                                        }))
                                    }
                                />
                                <PaginationComponent />
                            </Col> 
                        </Row>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    );
}
