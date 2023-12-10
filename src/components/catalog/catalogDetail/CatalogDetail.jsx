import React, { useEffect, useState } from 'react';
import './CatalogDetail.css';
import { getProduct, getSizes } from '../../../services/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import changeImg from '../../../utilits/utilit';
import colorsProduct from "../const";

function CatalogDetail() {
   const [sizes, setSezes] = useState([]);
   const [product, setProduct] = useState(null);
   const [countImages, setCountImages] = useState(0);
   let { sectionId, id } = useParams();
   const [activeSize, setActiveSize] = useState();
   const [activeSizes, setActiveSizes] = useState();
   const navigate = useNavigate();
   // sectionId - id секции, в данном случае товара
   // id - цвет

   const getProductInfo = async (id) => {
      let product = await getProduct(id);
      if (!!product && product.length != 0) {
         setProduct(product);
      }
   };
   const getSizesProduct = async () => {
      let sizes = await getSizes();
      if (!!sizes && sizes.length != 0) {
         setSezes(sizes);
      }
   };

   useEffect(() => {
      getSizesProduct();
      getProductInfo(sectionId);
   }, []);

   useEffect(() => {
      if (!!id && !!product) {
         setCountImages(product.colors[id - 1].images.length);
         setActiveSizes(product.colors[id - 1].sizes);
      }
   }, [product, id]);

   document.addEventListener('DOMContentLoaded', () => {
      changeImg();
   });

   if (!product) {
      return (
         <div className="">loading product ...</div>
      )
   }

   const isActiveSize = (sizeId) => {
      let isActive = true;
      if (!sizeId) return;

      if (activeSizes.indexOf(sizeId) != -1) {
         isActive = false;
      }
      return isActive;
   };

   const setActiveSizeFunc = (target) => {
      let labels = document.querySelectorAll('.size');

      if (labels.length == 0) return;

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

   return (
      <section>
         <button className="go-back" onClick={() => navigate(-1)}>
            Назад
         </button>
         <div className="detail-product-wrapper">
            <div className="detail-product-images product-image">
               {
                  (!!product && !!product.colors &&
                     !!product.colors[id - 1] && countImages != 0) ?
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
                  (!!sizes &&
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
                           (!!activeSizes && activeSizes.length != 0) ?
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
                                                onClick={(e) => setActiveSizeFunc(e.target)}
                                                className={(activeSizes.indexOf(size.id) != -1) ? 'size' : 'size disable'}
                                             >
                                                {size.label}
                                                <input
                                                   type="radio"
                                                   name='sizes'
                                                   id={`size-${size.number}`}
                                                   value={size.number}
                                                   disabled={isActiveSize(size.id)}
                                                   onChange={() => setActiveSize(size)}
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
                  (!!product.colors[id - 1].description && product.colors[id - 1].description.length != 0) ?
                     <div className="detail-product-description">
                        {product.colors[id - 1].description}
                     </div>
                     : <></>
               }


            </div>
         </div>
      </section>
   );
}

export default CatalogDetail;