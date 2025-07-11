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
import ItemDetailTableComponent from "../../components/tables/ItemDetailTableComponent";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function ItemDetailsListPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    const [ItemDetailData, setItemDetailData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // const [showUploadModal, setShowUploadModal] = useState(false);

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const itemsid = query.get('itemsid');
   
    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/items_detail_list/${itemsid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setItemDetailData(data.info);
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
                            <h3 className="mc-breadcrumb-title">{t('items_Detail_List')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('Items')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('items_Detail_list')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {floats.map((float, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCardComponent 
                            variant={ float.variant }
                            digit={ItemDetailData.filter(Items=>Items.B_Active === 1).length}
                            title={t('Total_Items_Details')}
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
                                    placeholder={ t('heading') }
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={7} className="d-flex justify-content-end  mt-4">
                                <ButtonComponent  type="button" className="btn btn-success" style={{ height: '38px', width: '200px' }} 
                                onClick={() => navigate(`/item-details-upload?itemsid=${itemsid}`)}>{t('add Item Details')}</ButtonComponent>
                            </Col>
                            <Col xl={12}>
                                <ItemDetailTableComponent
                                    thead={ ["Heading",  "HeadingDetails", "Actions"]} 
                                    tbody={ItemDetailData
                                        .filter(Item=> Item.V_HeadingName?.toLowerCase().includes(searchTerm.toLowerCase()) )
                                        .map(Item=> ({
                                            headingid: Item.N_T_M_ItemHeading_ID,
                                            headingname: Item.V_HeadingName,
                                            itemid: Item.N_T_M_Items_ID,
                                            headingdetail:Item.HeadingDetail,
                                            action: { edit: "edit",  view: "visibility",  delete: "delete"}
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
