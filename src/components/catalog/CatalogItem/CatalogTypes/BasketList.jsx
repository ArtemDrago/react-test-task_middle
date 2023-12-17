import React, { useContext, useMemo, useState } from 'react';
import { removeBasketItem } from '../../../../store/redusers/basketReduser';
import { useDispatch } from 'react-redux';
import { shopContext } from '../../../../context/context';

function BasketList({ el, section }) {
   const { sizes } = useContext(shopContext);
   const dispach = useDispatch();
   const [activeSize, setActiveSize] = useState(null);

   useMemo(() => {
      if (!sizes || sizes.length == 0) return;

      for (let i = 0; i < sizes.length; i++) {
         let sizeCur = sizes[i];

         if (sizeCur.id == section.selectSize) {
            setActiveSize(sizeCur);
            break;
         }
      }
   }, []);

   return (
      <section className="product">
         <div className="product-image">
            {
               (el.images.length != 0) ?
                  <>
                     {
                        el.images.map((img, index) => {
                           return (
                              <img
                                 className={(index === 0) ? 'img active' : 'img'}
                                 src={img}
                                 alt=""
                                 data-img={index}
                                 key={`img-${index}`}
                              />
                           )
                        })
                     }
                     {
                        el.images.map((img, index) => {
                           return (
                              <span
                                 className={(index === 0) ? 'picture active' : 'picture'}
                                 data-id={index}
                                 key={`position-${index}`}
                                 style={{ 'width': `calc(100%/${el.images.length})` }}
                              ></span>
                           )
                        })
                     }
                  </>
                  :
                  <>no image</>
            }
         </div>
         <div className="product-content">
            <h4>{section.name} </h4>
            <div className='filter-block'>
               <div className="filter-block-title">цвет:</div>
               {el.name}
            </div>
            {
               (activeSize != null) ?
                  <div className="size-block-wrapper filter-block">
                     <div className="size-title filter-block-title">
                        Размер:
                     </div>
                     <div className="size-wrapper basket-size">
                        <label
                           htmlFor={`size-${activeSize.number}`}
                        >
                           {activeSize.label}
                           <input
                              type="radio"
                              name='sizes'
                              id={`size-${activeSize.number}`}
                              value={activeSize.number}
                           />
                        </label>
                     </div>
                  </div>
                  : <></>
            }
            {
               (!!el.description && el.description.length != 0) ?
                  <div className="product-description">
                     {el.description}
                  </div>
                  :
                  <></>
            }

            {
               (!!el.price && el.price.length != 0) ?
                  <div className="product-price__wrapper">
                     <div className="product-price">
                        {el.price} &#8381;
                     </div>
                  </div>
                  :
                  <></>
            }
            <button
               className='btn remove-btn'
               onClick={() => dispach(removeBasketItem(section))}
            >
               Удалить
            </button>
         </div>
      </section>
   );
}

export default BasketList;