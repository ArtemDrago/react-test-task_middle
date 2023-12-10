import React from 'react';
import { Link } from 'react-router-dom';
import './MainPageContent.css';

function MainPageContent() {
   return (
      <div className="main-content">
         <Link className='btn-to' to={'/catalog'}>Каталог</Link>
      </div>
   );
}

export default MainPageContent;