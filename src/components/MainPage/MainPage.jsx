import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Outlet } from "react-router-dom";
import './MainPage.css';

function MainPage() {
   return (
      <>
         <Header />
         <div className="content-wrapper container">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}

export default MainPage;