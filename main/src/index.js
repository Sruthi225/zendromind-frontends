import * as React from "react";

// CSS & SCSS
import "./assets/fonts/inter.css";
import "./assets/fonts/material.css";
import "./assets/fonts/icofont/icofont.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/styles.scss";

// JS & COMPONENTS
import "./i18n";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/Themes"; 
import { SidebarProvider } from "./context/Sidebar"; 
import { LoaderProvider } from "./context/Preloader";
import { TranslatorProvider } from "./context/Translator"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "./pages/auth";
import {  DocumentationPage, ChangeLogPage, ErrorPage } from "./pages/others";
import { AvatarPage, AlertPage, ButtonPage, ChartPage, TablePage, FieldPage, HeadingPage, ColorPage } from "./pages/ui";
import { EcommercePage, AnalyticsPage, CRMPage, UserListPage, UserProfilePage, MyAccountPage, 
        CityListPage,  LocationListPage, ProductViewPage, ProductUploadPage,  InvoiceListPage, InvoiceDetailsPage, OrderListPage, MessagePage, 
        NotificationPage, BlankPage, SettingsPage } from "./pages/main";
import { UserProvider } from './context/localstorage';
import CategoryListPage from "./pages/main/CategoryListPage";
import CityCategoryLinkComponent from "./components/tables/CityCategoryLinkComponent";
import CategoryLocationLinkComponent from "./components/tables/CategoryLocationLinkComponent";


        

const router = createBrowserRouter([
    // MAIN PAGES
    { path: "/ecommerce", element: <EcommercePage /> },
    { path: "/analytics", element: <AnalyticsPage /> },
    { path: "/crm", element: <CRMPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/user-list", element: <UserListPage /> },
    { path: "/user-profile", element: <UserProfilePage /> },
    { path: "/my-account", element: <MyAccountPage /> },
    { path: "/city-list", element: <CityListPage /> },
    { path: "/product-view", element: <ProductViewPage /> },
    { path: "/product-upload", element: <ProductUploadPage /> },
    { path: "/category-list", element: <CategoryListPage /> },
    { path: "/location-list", element: <LocationListPage /> },
    { path: "/invoice-list", element: <InvoiceListPage /> },
    { path: "/invoice-details", element: <InvoiceDetailsPage /> },
    { path: "/order-list", element: <OrderListPage /> },
    { path: "/message", element: <MessagePage /> },
    { path: "/notification", element: <NotificationPage /> },
    { path: "/blank-page", element: <BlankPage /> },
    { path: "/settings", element: <SettingsPage /> },

    {path: "/city-category-link", element: <CityCategoryLinkComponent/>},
    {path: "/category-location-link", element: <CategoryLocationLinkComponent/>},

    // UI PAGES
    { path: "/avatars", element: <AvatarPage /> },                               
    { path: "/alerts", element: <AlertPage /> },                               
    { path: "/buttons", element: <ButtonPage /> },                               
    { path: "/charts", element: <ChartPage /> },                               
    { path: "/tables", element: <TablePage /> },                               
    { path: "/fields", element: <FieldPage /> },                               
    { path: "/headings", element: <HeadingPage /> },                               
    { path: "/colors", element: <ColorPage /> },   

    // OTHER PAGES
    { path: "/", element: <LoginPage /> },                               
    { path: "/documentation", element: <DocumentationPage /> },                               
    { path: "/changelog", element: <ChangeLogPage /> },                               
    { path: "/error", element: <ErrorPage /> },  
]);


// function User() {
//     return (
//         <UserProvider>
            
//         </UserProvider>
//     );
// }


// createRoot(document.getElementById("root")).render(
//     <ThemeProvider>
//         <LoaderProvider>
//             <TranslatorProvider>
//                 <SidebarProvider>
//                     <RouterProvider router={router} />
//                 </SidebarProvider>
//             </TranslatorProvider>
//         </LoaderProvider>
//     </ThemeProvider>
// );


createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <LoaderProvider>
            <TranslatorProvider>
                <SidebarProvider>
                    <UserProvider>
                        <RouterProvider router={router} />
                    </UserProvider>
                </SidebarProvider>
            </TranslatorProvider>
        </LoaderProvider>
    </ThemeProvider>
);
