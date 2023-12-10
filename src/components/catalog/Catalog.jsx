import React, { useEffect, useMemo, useState } from 'react';
import './Catalog.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogItems } from '../../store/redusers/asyncGetCatalogItems';
import CatalogSections from './CatalogItem/CatalogItem';
import { catalogVariableLangRu } from './lang';
import changeImg from '../../utilits/utilit';

function Catalog({ type }) {
   const dispatch = useDispatch();
   const [products, setProducts] = useState([]);
   let catalogItems = [];
   let basketItems = [];

   useEffect(() => {
      dispatch(getCatalogItems());
      changeImg();

   }, []);

   catalogItems = useSelector((state) => state.catalog.catalogItems);


   useMemo(() => {
      if (type == 'catalog' && catalogItems.length !== 0) {
         setProducts(catalogItems);
      }
   }, [catalogItems])



   return (
      <div className="catalog-page__wrapper">
         <h4 className='catalog-page__title'>
            {catalogVariableLangRu.catalogTitle}
         </h4>
         <div
            className="catalog-list"
         >
            {
               (products.length != 0) ?
                  products.map((section) => {
                     return <CatalogSections key={`section-${section.id}`} section={section} />
                  })
                  :
                  <>loadig...</>
            }
         </div>
      </div>
   );
};
export default Catalog;