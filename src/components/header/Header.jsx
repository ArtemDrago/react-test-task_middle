import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
   return (
      <header>
         <div className="container">
            <div className="header-content">
               <span>Header</span>
               <Link className='btn-navigate' to={'/catalog'}>Каталог</Link>
            </div>
         </div>
      </header>
   );
}

export default Header;