import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './CatalogDetail.css';
import { getProduct } from '../../../services/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appUtilit from '../../../utilits/utilit';
import colorsProduct from "../const";
import { addItemToBasket } from '../../../store/redusers/basketReduser';
import { shopContext } from '../../../context/context';


function CatalogDetail() {
   const { sizes } = useContext(shopContext);
   const [product, setProduct] = useState(null);
   const [countImages, setCountImages] = useState(0);
   let { sectionId, id } = useParams();
   const [activeSize, setActiveSize] = useState(null);
   const [activeSizes, setActiveSizes] = useState();
   const navigate = useNavigate();
   const dispach = useDispatch();
   // sectionId - id секции, в данном случае товара
   // id - цвет

   const getProductInfo = async (id) => {
      let product = await getProduct(id);
      if (!!product && product.length != 0) {
         setProduct(product);
      }
   };

   useEffect(() => {
      getProductInfo(sectionId);
   }, []);

   useEffect(() => {
      if (!!id && !!product) {
         setCountImages(product.colors[id - 1].images.length);
         setActiveSizes(product.colors[id - 1].sizes);
         setActiveSize(null);
         removeActive();
      }
   }, [product, id]);

   const removeActive = () => {
      let labelsWrapper = document.querySelector('.size-wrapper');
      if (!labelsWrapper) return;

      let activeLabel = labelsWrapper.querySelector('.active');
      if (!activeLabel) return;

      activeLabel.classList.remove('active');
   }

   document.addEventListener('DOMContentLoaded', () => {
      appUtilit.changeImg();
   });

   const isActiveSize = (sizeId) => {
      let isActive = true;
      if (!sizeId) return;

      if (activeSizes.indexOf(sizeId) != -1) {
         isActive = false;
      }
      return isActive;
   };

   const setActiveSizeFunc = (target, id) => {
      let labels = document.querySelectorAll('.size');

      if (labels.length == 0) return;
      setActiveSize(id);

      if (target.classList.contains('size') && !target.classList.contains('disable')) {
         labels.forEach(label => {
            if (label == target) {
               label.classList.add('active');
            } else {
               label.classList.remove('active');
            }
         });
      }
   };

   const addToBasketItem = () => {
      let key = appUtilit.createKey(sectionId, id, activeSize);
      let selectProduct = appUtilit.returnSelectProduct(product, id, activeSize);

      if (!key || !selectProduct) return;
      selectProduct.keyProduct = key;
      dispach(addItemToBasket(selectProduct));
   };

   if (!product) {
      return (
         <div className="">loading product ...</div>
      )
   }
   return (
      <section>
         <button className="go-back" onClick={() => navigate(-1)}>
            Назад
         </button>
         <div className="detail-product-wrapper">
            <div className="detail-product-images product-image">
               {
                  (!!product && !!product.colors &&
                     product.colors != null && countImages != 0) ?
                     <>
                        {
                           product.colors[id - 1].images.map((img, index) => {
                              return (
                                 <img
                                    className={(index === 0) ? 'img active' : 'img'}
                                    src={img}
                                    alt=""
                                    key={'img-' + index}
                                    data-img={index}
                                 />
                              )
                           })
                        }
                        {
                           product.colors[id - 1].images.map((img, index) => {
                              return (
                                 <span
                                    id={`${countImages}`}
                                    className={(index === 0) ? 'picture active' : 'picture'}
                                    data-id={index}
                                    key={'picture-' + index}
                                    style={{ 'width': `calc(100%/${countImages})` }}
                                 ></span>
                              )
                           })
                        }
                     </>
                     :
                     <>no image</>
               }
            </div>
            <div className="detail-product-content">
               <div className="detail-product-title">
                  {product.name}
               </div>
               {
                  (
                     !!product.colors &&
                     product.colors.length != 0
                  ) ?
                     <div className="product-detail-filter">
                        <div className="color-block-wrapper filter-block">
                           <div className="color-title filter-block-title">
                              Цвет:
                           </div>
                           <div className="colors-wrapper">
                              {
                                 product.colors.map((color) => {
                                    return (
                                       <Link
                                          key={`${color.id}`}
                                          to={`/catalog/${sectionId}/${color.id}`}
                                          className={(color.id == id) ? 'color-block active ' + colorsProduct[`${color.name}`] : 'color-block ' + colorsProduct[`${color.name}`]}
                                       >
                                       </Link>
                                    )
                                 })
                              }
                           </div>
                        </div>
                        {
                           (!!sizes && !!activeSizes && activeSizes.length != 0) ?
                              <div className="size-block-wrapper filter-block">
                                 <div className="size-title filter-block-title">
                                    Размеры:
                                 </div>
                                 <div className="size-wrapper">
                                    {
                                       sizes.map((size) => {
                                          return (
                                             <label
                                                htmlFor={`size-${size.number}`}
                                                key={size.id}
                                                id={size.id}
                                                onClick={(e) => setActiveSizeFunc(e.target, size.id)}
                                                className={
                                                   (activeSizes.indexOf(size.id) != -1) ? 'size' : 'size disable'
                                                }
                                             >
                                                {size.label}
                                                <input
                                                   type="radio"
                                                   name='sizes'
                                                   id={`size-${size.number}`}
                                                   value={size.number}
                                                   disabled={isActiveSize(size.id)}
                                                />
                                             </label>
                                          )
                                       })
                                    }
                                 </div>
                              </div>
                              :
                              <></>
                        }

                     </div>
                     :
                     <></>
               }
               {
                  (!!product.colors.description && product.colors.description.length != 0) ?
                     <div className="detail-product-description">
                        {product.colors.description}
                     </div>
                     : <></>
               }
               <button
                  className={(!activeSize) ? 'add-item-basket disable' : 'add-item-basket'}
                  onClick={addToBasketItem}
                  disabled={(!activeSize) ? true : false}
               >
                  Добавить в корзину
                  <span className='is-select-size'>
                     Выберите размер
                  </span>
               </button>
            </div>
         </div>
      </section>
   );
}

export default CatalogDetail;