import React, { useState, useEffect, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { AnchorComponent, ButtonComponent } from "../elements";
import { Modal, Form } from "react-bootstrap";
import config from "../../components/commonservices";
import { useNavigate } from 'react-router-dom';

export default function ItemTableComponent({ thead, tbody }) {

    const { t } = useContext(TranslatorContext);
    
    const navigate = useNavigate();

    const [alertModal, setAlertModal] = useState(false);
    // const [editModal, setEditModal] = useState(false);
    const [data, setData] = useState([]);
    // const [data, setData] = useState([]);
    // const [blockModal, setBlockModal] = React.useState(false);

    const [selectedItemId, setSelectedItemId] = useState(null);

    const deleteItems = async () => {
        try {
                const response = await fetch(`${config.bmrServerURL}/api/admin/delete/item/${selectedItemId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"                    }
                    });
                const data = await response.json();
                if(data.status_code === 200){
                    alert("Successfully Deleted the item.");
                    window.location.reload();
                }
        } catch (error) {
            console.error("Error fetching cities:", error);
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
                                    {/* <input 
                                        type="checkbox" 
                                        name={'check' + index} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <p>#{ item.itemID }</p>
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
                            <td>{ item.itemname }</td>
                            <td>{ item.cityname }</td>
                            <td>{ item.categoryname }</td>
                            <td>{ item.locationname }</td>
                            <td>{ item.status }</td>
                            <td>
                                <div className="mc-table-action mc-table-grid">
                                    <AnchorComponent to="/product-view" title="View" className="material-icons view">{ item.action.view }</AnchorComponent>
                                    <ButtonComponent title="edit" className="material-icons edit" onClick={() => navigate(`/items-update?itemsid=${item.itemID}`)}>{ item.action.edit }</ButtonComponent>
                                    {/* <ButtonComponent type="button" title="Block" className="material-icons block" onClick={()=> setAlertModal(true)}>{ item.action.block }</ButtonComponent>  */}
                                    <ButtonComponent type="button" title="Delete" className="material-icons delete" onClick={()=> {setSelectedItemId(item.itemID); setAlertModal(true);}}>{ item.action.delete }</ButtonComponent> 
                                    <AnchorComponent title="Details" className="custom-location-button" 
                                           style={{backgroundColor: 'blue', 
                                           color: 'white' , 
                                           padding: '8px 12px',
                                           borderRadius: '6px',
                                           textDecoration: 'none',
                                           display: 'inline-block',
                                           border: 'none',
                                    }} onClick={() => navigate(`/item-details-list?itemsid=${item.itemID}`)}>{('Details')}</AnchorComponent>
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