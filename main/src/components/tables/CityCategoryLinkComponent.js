
import React, { useState, useEffect, useContext } from "react";
import PageLayout from "../../layouts/PageLayout";
import { TranslatorContext } from "../../context/Translator";
import { Modal, Form } from "react-bootstrap";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
// import IconFieldComponent from "../../components/fields/IconFieldComponent";
 import LogoComponent from "../../components/LogoComponent";
import config from "../../components/commonservices";
import { useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

export default function CityCategoryLinkComponent() {
    const { t } = useContext(TranslatorContext);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const categoryid = query.get('categoryid');

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (categoryid) {
            fetchCategories();
        }
    }, [categoryid]);
    
    let N_T_M_City_ID = localStorage.getItem("cityID");

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/citylist/${categoryid}/${N_T_M_City_ID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCategories(data.info);
        } catch (error) {
            console.error("Error fetching cities:", error);
        } 
    };


    const handleSaveChanges = async () => {
        const payload = {
          N_T_M_Category_ID: categoryid,
          Categories: categories.map(cat => ({
            N_T_M_CityCategoryLink_ID: cat.N_T_M_CityCategoryLink_ID,
            N_T_M_City_ID: cat.N_T_M_City_ID ,
            N_T_M_Category_ID: categoryid,
            Selected: cat.Selected
          }))
        };
      
        try {
          const response = await fetch(`${config.bmrServerURL}/api/admin/create/citycategorylink`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
      
          const result = await response.json();

          if (result.status_code === 200) {
            
            alert("Categories Linked with City saved successfully!");
            fetchCategories();

          } 
          else {
            alert("Failed to link category with City: " + (result.response || "Unknown error"));
            fetchCategories();
          }
        } catch (error) {
          console.error("Error saving categories:", error);
          alert("Error saving categories");
        }
      };

  const handleCheckboxChange = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.N_T_M_City_ID === id
          ? { ...cat, Selected: !cat.Selected }
          : cat
      )
    );
  };


    return (
         <PageLayout>
            <div className="mc-checkbox">
                <div>
                    <h3>City List</h3>
                    <hr></hr>
                    <div className = 'mc-check-wrap' style = {{display: 'inline-flex',
                    flexDirection: 'row',
                    gap: '45px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: '20px'}}>
                        {categories.map((city) => (
                            <div className="mc-table-check check" key={city.N_T_M_City_ID}>
                            <input
                                type="checkbox"
                                checked={city.Selected}
                                onChange={() => handleCheckboxChange(city.N_T_M_City_ID)}
                            />
                            <label style={{ marginLeft: '8px' }}>{city.V_CityName}</label>
                            </div>
                        ))}
                    </div>    
                </div> 
                <div className="Button">
                <ButtonComponent type="button" className="btn btn-success " style = {{margin:'auto'}} onClick={handleSaveChanges}>{t('save_changes')}</ButtonComponent>
                </div>
                <div className="mc-table-responsive mt-4">
                            <table className="mc-table product">
                                <thead className="mc-table-head primary">
                                    <tr>
                                        <th>
                                            <div className="mc-table-check">
                                                <p>uid</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="mc-table-check">
                                                <p>CityName</p>
                                            </div>
                                        </th>
                                    
                                    </tr>
                                </thead>
                                 <tbody className="mc-table-body even">
                                    {categories
                                        .filter((item) => item.Selected)
                                        .map((item, index) => (
                                        <tr key={ index }> 
                                            <td title={ index + 1 }>
                                                <div className="mc-table-check">
                                                    <p>#{ item.N_T_M_CityCategoryLink_ID }</p>
                                                </div>
                                            </td>
                                            <td>{ item.V_CityName }</td>
                                        </tr>
                                    ))}  
                                </tbody>
                            </table>
                        </div>
            </div>
        </PageLayout>

    );
}