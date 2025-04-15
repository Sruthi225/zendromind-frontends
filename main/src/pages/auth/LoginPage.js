import React, { useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";

export default function LoginPage() {

    const { t } = useContext(TranslatorContext);

    return (
        <div className="mc-auth">
            <img src="images/pattern.webp" alt="pattern" className="mc-auth-pattern" />
            <div className="mc-auth-group">
                <LogoComponent 
                    src="images/logo.webp"
                    alt="logo"
                    href="/ecommerce"
                    className="mc-auth-logo"
                />
                <h4 className="mc-auth-title">Login to Hotash</h4>
                <form className="mc-auth-form">
                    <IconFieldComponent 
                        icon="email"
                        type="email"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_email')}
                    />
                    <IconFieldComponent 
                        icon="lock"
                        type="password"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_password')}
                        passwordVisible={true}
                    />
                    <IconFieldComponent 
                        icon="verified_user"
                        classes="w-100 h-sm"
                        option={["select user role", "admin", "member", "client", "manager", "vendor"]}
                    />
                    <ButtonComponent className='mc-auth-btn h-sm' type='button'>{t('sign_in')}</ButtonComponent>
                    <AnchorComponent className="mc-auth-forgot" to="/forgot-password">{t('forgot_password')}</AnchorComponent>
                    <div className="mc-auth-divide"><span>{t('or')}</span></div>
                    <div className="mc-auth-connect">
                        <AnchorComponent to="#" className="twitter h-sm">
                            <i className="icofont-twitter"></i>
                            <span>Continue with Twitter</span>
                        </AnchorComponent>
                        <AnchorComponent to="#" className="facebook h-sm">
                            <i className="icofont-facebook"></i>
                            <span>Continue with Facebook</span>
                        </AnchorComponent>
                    </div>
                </form>
                <div className="mc-auth-navigate">
                    <span>Don't have an account?</span>
                    <AnchorComponent to="/register">{t('register')}</AnchorComponent>
                </div>
            </div>
        </div>
    );
}