import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";
import config from "../../components/commonservices";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        Email: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let userID = localStorage.getItem("userId");
            const response = await fetch(`${config.bmrServerURL}/api/admin/user/emailroleverification_otpsend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ V_UserName: formData.Email, N_T_M_User_ID: userID}) 
            });

            const data = await response.json();

            if(data.status_code !== 200){
                alert(data.response); 
            }
            else{
                navigate(`/otp-verification?userID=${data.info[0].N_T_M_User_ID}`); 
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="mc-auth" onSubmit={handleSubmit}>
            <img 
                className="mc-auth-pattern" 
                src="images/pattern.webp"
                alt="pattern"
            />
            <div className="mc-auth-group">
                <LogoComponent 
                    src="images/logo.webp"
                    alt="logo" 
                    href="/ecommerce"
                    className="mc-auth-logo"
                />
                <h4 className="mc-auth-title">{t('reset_the_password')}</h4>
                <form className="mc-auth-form">
                    <IconFieldComponent 
                        icon="email"
                        type="email"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_email')}
                        value={formData.Email}
                        onChange={(e) => handleChange("Email", e.target.value)}
                    />
                    <ButtonComponent className="mc-auth-btn h-sm" type="submit">
                        {t('send otp')}
                    </ButtonComponent>
                </form>
                <div className="mc-auth-navigate">
                    <span>{t('remember_the_password')}?</span>
                    <AnchorComponent to="/login">{t('login')}</AnchorComponent>
                </div>
            </div>
        </div>
    );
}