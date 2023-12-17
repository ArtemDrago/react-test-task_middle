import React, { useEffect, useMemo, useState } from 'react';
import './Catalog.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogItems } from '../../store/redusers/asyncGetCatalogItems';
import CatalogSections from './CatalogItem/CatalogItem';
import { catalogVariableLangRu } from './lang';
import appUtilit from '../../utilits/utilit';

function Catalog({ type }) {
   const dispatch = useDispatch();
   const [products, setProducts] = useState(null);
   let catalogItems = [];
   let basketItems = [];
   const [pageTitle, setPageTitle] = useState('Каталог');

   useEffect(() => {
      dispatch(getCatalogItems());
      appUtilit.changeImg();
   }, []);

   catalogItems = useSelector((state) => state.catalog.catalogItems);
   basketItems = useSelector((state) => state.basket.basketItems);

   useMemo(() => {
      switch (type) {
         case 'catalog':
            setPageTitle(catalogVariableLangRu.catalogTitle);
            setProducts(catalogItems);
            break;
         case 'basket':
            setPageTitle(catalogVariableLangRu.basketTitle);
            setProducts(basketItems);
            break;

         default:
            break;
      }
   }, [catalogItems, basketItems, type]);

   return (
      <div className="catalog-page__wrapper">
         <h4 className='catalog-page__title'>
            {pageTitle}
         </h4>
         <div
            className="catalog-list"
         >
            {
               (products !== null) ?
                  (products.length != 0) ?
                     products.map((section, index) => {
                        return <CatalogSections
                           key={`section-${index}`}
                           section={section}
                           type={type}
                        />
                     }) :
                     <div>
                        Нет товаров
                     </div>
                  :
                  <>loading...</>
            }
         </div>
      </div>
   );
};
export default Catalog;