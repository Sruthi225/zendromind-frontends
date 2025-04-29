
import React, { useState, useEffect, useContext } from "react";
import PageLayout from "../../layouts/PageLayout";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import config from "../../components/commonservices";
import { useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

export default function CategoryLocationLinkComponent() {
    
    const { t } = useContext(TranslatorContext);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const locationid = query.get('locationid');

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (locationid) {
            fetchCategories();
        }
    }, [locationid]);
    

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/categorylists/${locationid}`, {
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
          N_T_M_Location_ID: locationid,
          Location: categories.map(cat => ({
            N_T_M_LocationCategoryLink_ID: cat.N_T_M_LocationCategoryLink_ID,
            N_T_M_Category_ID: cat.N_T_M_Category_ID ,
            N_T_M_Location_ID: locationid,
            Selected: cat.Selected
          }))
        };
      
        try {
          const response = await fetch(`${config.bmrServerURL}/api/admin/create/locationcategorylink`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
      
          const result = await response.json();

          if (result.status_code === 200) {
            
            alert("Categories Linked with location saved successfully!");
            fetchCategories();

          } 
          else {
            alert("Failed to link category with location: " + (result.response || "Unknown error"));
            fetchCategories();
          }
        } catch (error) {
          console.error("Error saving location:", error);
          alert("Error saving location");
        }
      };

  const handleCheckboxChange = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.N_T_M_Category_ID === id
          ? { ...cat, Selected: !cat.Selected }
          : cat
      )
    );
  };


    return (
         <PageLayout>
            <div className="mc-checkbox">
                <div>
                    <h3>Category List</h3>
                    <hr></hr>
                    <div className = 'mc-check-wrap' style = {{display: 'inline-flex',
                    flexDirection: 'row',
                    gap: '45px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: '20px'}}>
                        {categories.map((Category) => (
                            <div className="mc-table-check check" key={Category.N_T_M_Category_ID}>
                            <input
                                type="checkbox"
                                checked={Category.Selected}
                                onChange={() => handleCheckboxChange(Category.N_T_M_Category_ID)}
                            />
                            <label style={{ marginLeft: '8px' }}>{Category.V_CategoryName}</label>
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
                                                <p>CategoryName</p>
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
                                                    <p>#{ item.N_T_M_LocationCategoryLink_ID }</p>
                                                </div>
                                            </td>
                                            <td>{ item.V_CategoryName }</td>
                                        </tr>
                                    ))}  
                                </tbody>
                            </table>
                        </div>
            </div>
        </PageLayout>

    );
}