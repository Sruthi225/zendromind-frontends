import React, { useContext, useState, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { EcommerceCardComponent, SalesCardComponent, ProductsCardComponent, RevenueCardComponent, ClientsCardComponent, ActivityCardComponent, OrdersCardComponent } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import heros from "../../assets/data/heros.json";
import config from "../../components/commonservices";


export default function EcommercePage() {

    const { t, n } = useContext(TranslatorContext);

    const [cardData, setCardData] = useState([]);

    useEffect(() => {
            fetchCount();
        }, []);

    const fetchCount = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/dashboard/count`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data)
            setCardData(data.info || []);

        } catch (error) {
            console.error("Error fetching count:", error);
        } 
    };

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('ecommerce')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('dashboard')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('ecommerce')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xs={12} xl={12}>
                    <Row xs={1} sm={3}>
                        {cardData.map((card, index) => (
                        <Col key={index}>
                            <EcommerceCardComponent
                            icon={card.Icon}
                            trend={card.Trend}
                            title={t(card.Name)}
                            variant={card.Variant}
                            number={n(card.Count)}
                            percent={card.percent}
                            />
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </PageLayout>
    );
}
