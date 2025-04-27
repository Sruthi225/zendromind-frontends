import React, { useState, useEffect, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { AnchorComponent, ButtonComponent } from "../elements";
import { Modal, Form } from "react-bootstrap";
import config from "../../components/commonservices";
import { useNavigate } from 'react-router-dom';

export default function ItemDetailTableComponent({ thead, tbody }) {

    const { t } = useContext(TranslatorContext);
    
    const navigate = useNavigate();

    const [alertModal, setAlertModal] = useState(false);

    const [data, setData] = useState([]);

    const [selectedItemId, setSelectedItemId] = useState(null);

    const deleteItems = async () => {
        try {
                const response = await fetch(`${config.bmrServerURL}/api/admin/delete/itemdetail/${selectedItemId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"                    
                    }
                    });
                const data = await response.json();
                if(data.status_code === 200){
                    alert("Successfully Deleted the Item.");
                    window.location.reload();
                }
        } catch (error) {
            console.error("Error fetching Item:", error);
        } 
    };

    useEffect(()=> { setData(tbody) }, [tbody]);

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
                                    <p>#{ item.headingid }</p>
                                </div>
                            </td>
                            <td>{ item.headingname }</td>
                            <td>
                            {item.headingdetail.map((detail, idx) => (
                                <div key={idx}>
                                {detail.V_HeadingDetails.match(/\.(jpeg|jpg|gif|png|webp|svg|mpv4)$/i) ? (
                                    <img
                                    src={detail.V_HeadingDetails}
                                    alt={`detail-${idx}`}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} // adjust as needed
                                    />
                                ) : (
                                    <p>{detail.V_HeadingDetails}</p>
                                )}
                                </div>
                            ))}
                            </td>
                            <td>
                                <div className="mc-table-action mc-table-grid">
                                    <AnchorComponent to="/product-view" title="View" className="material-icons view">{ item.action.view }</AnchorComponent>
                                    <ButtonComponent title="edit" className="material-icons edit" onClick={() => navigate(`/item-details-update?headingid=${item.headingid}`)}>{ item.action.edit }</ButtonComponent>
                                    {/* <ButtonComponent type="button" title="Block" className="material-icons block" onClick={()=> setAlertModal(true)}>{ item.action.block }</ButtonComponent>  */}
                                    <ButtonComponent type="button" title="Delete" className="material-icons delete" onClick={()=> {setSelectedItemId(item.headingid); setAlertModal(true);}}>{ item.action.delete }</ButtonComponent> 
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={ alertModal } onHide={()=> setAlertModal(false)}>
                <div className="mc-alert-modal">
                    <i className="material-icons">new_releases</i>
                    <h3>are your sure!</h3>
                    <p>Want to delete this Item?</p>
                    <Modal.Footer>
                        <ButtonComponent type="button" className="btn btn-secondary" onClick={()=> setAlertModal(false)}>{t('close')}</ButtonComponent>
                        <ButtonComponent type="button" className="btn btn-danger" onClick={() => {
                            setAlertModal(false);
                            deleteItems();
                        }}>{t('delete')}</ButtonComponent>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}