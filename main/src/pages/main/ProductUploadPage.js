import React, { useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import { AnchorComponent, ButtonComponent } from "../../components/elements"; 
import { LabelFieldComponent, LabelTextareaComponent } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";

export default function ProductUploadPage() {

    const { t } = useContext(TranslatorContext);

    const [uploadFile, setUploadFile] = React.useState('image upload');

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('product_upload')}</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('home')}</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">{t('products')}</Link></li>
                                <li className="mc-breadcrumb-item">{t('product_upload')}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl={7}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('basic_information')}</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>{t('edit')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>{t('delete')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>{t('download')}</span></button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Row>
                            <Col xl={12}><LabelFieldComponent type="text" label={t('title')} fieldSize="mb-4 w-100 h-md"/></Col>
                            <Col xl={12}><LabelTextareaComponent label={t('description')} fieldSize="mb-4 w-100 h-text-md" /></Col>
                            <Col xl={6}><LabelFieldComponent label={t('category')} option={['mans', 'womans', 'accessory']} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={6}><LabelFieldComponent label={t('brand')} option={['richman', 'lubana', 'ecstasy']} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('regular_price')} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('discount_price')} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('shipping_fee')} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('tax_rate')} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={12}><LabelTextareaComponent label={t('tags')} fieldSize="w-100 h-text-md" /></Col>
                        </Row>
                    </div>
                </Col>
                <Col xl={5}>
                    <div className="mc-card mb-4">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('organization')}</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>{t('edit')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>{t('delete')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>{t('download')}</span></button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Row>
                            <Col xl={12}>
                                <div className="mc-product-upload-organize mb-4">
                                    <LabelFieldComponent type="text" label={t('add_category')} fieldSize="w-100 h-sm" />
                                    <ButtonComponent className="mc-btn primary">{t('add')}</ButtonComponent>
                                </div>
                                <div className="mc-product-upload-organize mb-4">
                                    <LabelFieldComponent type="text" label={t('add_brand')} fieldSize="w-100 h-sm" />
                                    <ButtonComponent className="mc-btn primary">{t('add')}</ButtonComponent>
                                </div>
                                <div className="mc-product-upload-organize mb-4">
                                    <LabelFieldComponent type="text" label={t('add_color')} fieldSize="w-100 h-sm" />
                                    <ButtonComponent className="mc-btn primary">{t('add')}</ButtonComponent>
                                </div>
                                <div className="mc-product-upload-organize">
                                    <LabelFieldComponent type="text" label={t('add_size')} fieldSize="w-100 h-sm" />
                                    <ButtonComponent className="mc-btn primary">{t('add')}</ButtonComponent>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('specification')}</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>{t('edit')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>{t('delete')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>{t('download')}</span></button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Row>
                            <Col xl={6}><LabelFieldComponent label={t('size')} option={['sm', 'md', 'lg', 'xl', 'xxl']} fieldSize="mb-4 w-100 h-multiple" multiple/></Col>
                            <Col xl={6}><LabelFieldComponent label={t('color')} option={['red', 'green', 'blue', 'pink', 'black']} fieldSize="mb-4 w-100 h-multiple" multiple/></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('stock')} fieldSize="mb-4 w-100 h-md" /></Col>
                            <Col xl={6}><LabelFieldComponent type="text" label={t('weight')} fieldSize="mb-4 w-100 h-md" /></Col>
                        </Row>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('media_and_published')}</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>{t('edit')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>{t('delete')}</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>{t('download')}</span></button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="mc-product-upload-media">
                            <div className="mc-product-upload-image"><img src="images/product/single/01.webp" alt="product" /></div>
                            <div className="mc-product-upload-image"><img src="images/product/single/02.webp" alt="product" /></div>
                            <div className="mc-product-upload-image"><img src="images/product/single/03.webp" alt="product" /></div>
                            <div className="mc-product-upload-image"><img src="images/product/single/04.webp" alt="product" /></div>
                            <div className="mc-product-upload-file">
                                <input type="file" id="product" onChange={(e)=> setUploadFile(e.target.files[0].name)} />
                                <label htmlFor="product">
                                    <i className="material-icons">collections</i>
                                    <span>{ uploadFile }</span>
                                </label>
                            </div>
                        </div>
                        <AnchorComponent 
                            className="mc-btn w-100 primary mt-5" 
                            text={t('publish_and_view')} 
                            icon="cloud_upload" 
                            to="#"
                        />
                    </div>
                </Col>
            </Row>
        </PageLayout>
    )
}