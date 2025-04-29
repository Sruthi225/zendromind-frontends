import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";
import config from "../../components/commonservices";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function NewPasswordPage() {

    const { t } = useContext(TranslatorContext);

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const UserID = query.get('userID');
    

    const [formData, setFormData] = useState({
        password: "",
        ConfirmPassword: "",
    });

    const [passwordError, setPasswordError] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            if (field === "ConfirmPassword" || field === "Password") {
                setPasswordError(
                    updated.password && updated.ConfirmPassword && updated.password !== updated.ConfirmPassword
                );
            }
    
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.bmrServerURL}/api/admin/user/newpasswordsave`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ V_Password: formData.password, N_T_M_User_ID: UserID}) 
            });

            const data = await response.json();

            if(data.status_code !== 200){
                alert(data.response); 
            }
            else{
                navigate(`/login`); 
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
                    type="password"
                    classes="h-sm"
                    placeholder={t('enter_your_password')}
                    passwordVisible={true}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
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
                    <ButtonComponent className="mc-auth-btn h-sm" type="submit">
                        {t('Save New Password')}
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