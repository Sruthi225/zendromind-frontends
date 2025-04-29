import React, { useState, useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";
import config from "../../components/commonservices";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {


    const { t } = useContext(TranslatorContext);
    
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        Email: "",
        Password: "",
        UserType: "",
    });

    // 👉 STEP 2: Handle input changes
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // 👉 STEP 3: Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ V_UserName: formData.Email, V_Password: formData.Password, V_UserType: formData.UserType }) // send more fields as needed
            });

            const data = await response.json();

            if (data?.status_code === 200) {
                localStorage.setItem("userId", data.info[0].N_T_M_User_ID);
                localStorage.setItem("cityID", data.info[0].N_T_M_City_ID);
                localStorage.setItem("userType", data.info[0].V_UserType);

                navigate("/ecommerce"); 
            } else {
                alert(data.response || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="mc-auth" onSubmit={handleSubmit}>
            <img src="images/pattern.webp" alt="pattern" className="mc-auth-pattern" />
            <div className="mc-auth-group">
                <LogoComponent 
                    src="images/logo.webp"
                    alt="logo"
                    href="/ecommerce"
                    className="mc-auth-logo"
                />
                <h4 className="mc-auth-title">Login to Zendrominds</h4>
                <form className="mc-auth-form">
                    <IconFieldComponent 
                        icon="email"
                        type="email"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_email')}
                        passwordVisible={true}
                        value={formData.Email}
                        onChange={(e) => handleChange("Email", e.target.value)}
                    />
                    <IconFieldComponent 
                        icon="lock"
                        type="password"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_password')}
                        passwordVisible={true}
                        value={formData.Password}
                        onChange={(e) => handleChange("Password", e.target.value)}
                    />
                    <IconFieldComponent 
                        icon="verified_user"
                        classes="w-100 h-sm"
                        option={["Super Admin", "Admin", "Member", "Client", "Manager", "Vendor"]}
                        passwordVisible={true}
                        value={formData.UserType}
                        onChange={(e) => handleChange("UserType", e.target.value)}
                    />
                    <ButtonComponent className='mc-auth-btn h-sm' type='submit'>{t('sign_in')}</ButtonComponent>
                    {formData.UserType === "Super Admin" && (
                        <AnchorComponent className="mc-auth-forgot" to="/forgot-password">{t('forgot_password')}</AnchorComponent>
                    )}
                </form>
                {/* <div className="mc-auth-navigate">
                    <span>Don't have an account?</span>
                    <AnchorComponent to="/register">{t('register')}</AnchorComponent>
                </div> */}
            </div>
        </div>
    );
}