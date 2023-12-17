import React, { useMemo, useState } from 'react';
import './CatalogItem.css';
import CatalogList from './CatalogTypes/CatalogList';
import BasketList from './CatalogTypes/BasketList';

function CatalogSections({ section, type }) {
   const [printSection, setPrintSection] = useState([]);

   useMemo(() => {
      switch (type) {
         case 'catalog':
            setPrintSection(section.colors);
            break;
         case 'basket':
            setPrintSection(section.selectColor);
            break;

         default:
            break;
      }
   }, [type]);

   return (
      <>
         {
            printSection && printSection.map((el) => {
               return ((type === 'basket') ?
                  <BasketList el={el} section={section} key={el.id} /> :
                  <CatalogList el={el} section={section} key={el.id} />
               );
            })
         }
      </>
   );
}

export default CatalogSections;