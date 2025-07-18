
import React, { useState, useContext, useEffect } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";
import config from "../../components/commonservices";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: "",
        UserName: "",
        Password: "",
        ConfirmPassword: "",
        UserType: "",
        cityname: ""
    });

    const[cityData, setcityData] = useState([]);

    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/get/user_city_list`, {
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

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            if (field === "ConfirmPassword" || field === "Password") {
                setPasswordError(
                    updated.Password && updated.ConfirmPassword && updated.Password !== updated.ConfirmPassword
                );
            }
    
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedCity = cityData.find(city => city.V_CityName === formData.cityname);
        const cityId = selectedCity?.N_T_M_City_ID || null;

        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({V_Name: formData.Name, 
                                      V_UserName: formData.UserName, 
                                      V_Password: formData.Password,
                                      V_UserType: formData.UserType,
                                      N_T_M_City_ID: cityId
                                     }) 
            });

            const data = await response.json();
            if (data?.status_code === 200) {
                navigate("/user-list"); 
            } else {
                alert(data.response || "Unable to Register the User.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    
    return (
        <div className="mc-register"  style = {{display: 'flex', justifyContent: 'center', alignitem: 'center', marginTop: "100px"}} onSubmit={handleSubmit} >
            <form className="mc-register-form" >
                <LogoComponent 
                    src="images/logo.webp"
                    alt="logo" 
                    href="/ecommerce"
                    className="mc-auth-logo"
                />
                <h4 className="mc-auth-title">Register a new account</h4>
                <IconFieldComponent 
                    icon="account_circle"
                    type="text"
                    classes="h-sm"
                    placeholder={t('enter_your_name')}
                    value={formData.Name}
                    onChange={(e) => handleChange("Name", e.target.value)}
                />
                <IconFieldComponent 
                    icon="email"
                    type="email"
                    classes="h-sm"
                    placeholder={t('enter_your_email')}
                    passwordVisible={true}
                    value={formData.UserName}
                    onChange={(e) => handleChange("UserName", e.target.value)}
                />
                <IconFieldComponent 
                    icon="lock"
                    type="password"
                    classes="h-sm"
                    placeholder={t('enter_your_password')}
                    passwordVisible={true}
                    value={formData.Password}
                    onChange={(e) => handleChange("Password", e.target.value)}
                />
                <IconFieldComponent 
                     icon="verified_user"
                     type="password"
                     classes={`h-sm ${passwordError ? "border-red" : ""}`}
                     placeholder={t('confirm_your_password')}
                     passwordVisible={true}
                     value={formData.ConfirmPassword}
                     onChange={(e) => handleChange("ConfirmPassword", e.target.value)}
                />
                {passwordError && (
                    <p style={{ color: "red", fontSize: "12px" , marginTop: "-20px"}}>
                        Passwords do not match.
                    </p>
                )}
                
                <IconFieldComponent 
                    icon="verified_user"
                    classes="w-100 h-sm"
                    option={["Super Admin", "Admin", "Member", "Client", "Manager", "Vendor"]}
                    activeOption="Select Role"
                    passwordVisible={true}
                    value={formData.UserType}
                    onChange={(e) => handleChange("UserType", e.target.value)}
                />
                {formData.UserType !== "Super Admin" && (
                    <IconFieldComponent 
                    icon="verified_user"
                    classes="w-100 h-sm"
                    option={cityData.map(city => city.V_CityName)}
                    activeOption="Select City"
                    passwordVisible={true}
                    value={cityData.cityname}
                    onChange={(e) => handleChange("cityname", e.target.value)}
                    />
                )}
                
                {/* <div className="mc-auth-checkbox">
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">I agree to the all Terms & Condiotions</label>
                </div> */}
                <ButtonComponent className="mc-auth-btn h-sm" type="submit">{t('sign_up')}</ButtonComponent>
                {/* <div className="mc-auth-divide"><span>{t('or')}</span></div>
                <div className="mc-auth-connect">
                    <AnchorComponent to="#" className="twitter h-sm">
                        <i className="icofont-twitter"></i>
                        <span>Continue with Twitter</span>
                    </AnchorComponent>
                    <AnchorComponent to="#" className="facebook h-sm">
                        <i className="icofont-facebook"></i>
                        <span>Continue with Facebook</span>
                    </AnchorComponent>
                </div>*/}
                <div className="mc-register-navigate">
                    <span>Already have an account?</span>
                    <AnchorComponent to="/login">{t('login')}</AnchorComponent>
                </div> 
            </form>
        </div>
    )
}