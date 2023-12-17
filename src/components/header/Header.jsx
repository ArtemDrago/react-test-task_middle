import React, { useMemo, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
   const [basketItems, setBasketItems] = useState(0);
   const state = useSelector(state => state.basket.basketItems);

   useMemo(() => {
      let count = state.length;
      setBasketItems(count);
   }, [state]);

   return (
      <header>
         <div className="container">
            <div className="header-content">
               <span>Header</span>
               <nav className='navigate'>
                  <Link className='btn-navigate' to={'/catalog'}>
                     Каталог
                  </Link>
                  <Link className='btn-navigate' to={'/basket'}>
                     Корзина
                     <span
                        id='basket-counter'
                     >
                        {basketItems}
                     </span>
                  </Link>
               </nav>
            </div>
         </div>
      </header>
   );
}

export default Header;