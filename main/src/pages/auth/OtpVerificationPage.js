import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";
import config from "../../components/commonservices";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function OtpVerificationPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const UserID = query.get('userID');
    

    const [formData, setFormData] = useState({
        otp: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/user/otpverification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ V_OTP: formData.otp, N_T_M_User_ID: UserID}) 
            });

            const data = await response.json();

            if(data.status_code !== 200){
                alert(data.response); 
            }
            else{
                navigate(`/newpassword-save?userID=${data.info[0].N_T_M_User_ID}`); 
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
                <h4 className="mc-auth-title">{t('Enter OTP')}</h4>
                <form className="mc-auth-form">
                <IconFieldComponent 
                        icon="lock"
                        type="text"
                        classes="w-100 h-sm"
                        placeholder={t('enter otp')}
                        value={formData.otp}
                        maxLength={6}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Only digits
                            if (value.length <= 6) handleChange("otp", value);
                        }}
                    />
                    <ButtonComponent className="mc-auth-btn h-sm" type="submit">
                        {t('Verify OTP')}
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