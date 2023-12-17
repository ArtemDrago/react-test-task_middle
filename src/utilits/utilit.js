'use strict';
let appUtilit = {};

appUtilit.changeImg = function() {
   let catalogWrapper = document.querySelector('.content-wrapper');
   if (!catalogWrapper) return;
   let isDesctop = true;

   if (window.innerWidth > 767) {
      catalogWrapper.addEventListener('mousemove', appUtilit.catalogMouseMove);
      isDesctop = false;
   }

   window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
         if (isDesctop) {
            catalogWrapper.addEventListener('mousemove', appUtilit.catalogMouseMove);
         }
         isDesctop = false;
      } else {
         if (!isDesctop) {
            catalogWrapper.removeEventListener('mousemove', appUtilit.catalogMouseMove);
         }
         isDesctop = true;
      }
   });

};

appUtilit.catalogMouseMove = (e) => {
   let target = e.target;
   let parent = target.closest('.product-image');
   let idActiveImg = 0;

   if (!!parent && parent.classList.contains('product-image')) {
      let images = parent.querySelectorAll('.img');
      let imgSections = parent.querySelectorAll('.picture');

      if (!images || !imgSections || images.length != imgSections.length || !target.dataset.id) return;
      idActiveImg = target.dataset.id;
      images.forEach((img, index) => {
         if (img.dataset.img == idActiveImg) {
            img.classList.add('active');
            imgSections[index].classList.add('active');
         } else {
            img.classList.remove('active');
            imgSections[index].classList.remove('active');
         }
      });
   }
};

appUtilit.createKey = function(productId, colorId, sizeId) {
   return `${productId}.${colorId}.${sizeId}`;
};

appUtilit.returnSelectProduct = function(product, colorId, sizeId) {
   if (!product || !colorId || !sizeId) return;
   
   let selectProduct = {};
   Object.assign(selectProduct, product);
   let colorItem = null;

   for (let i = 0; i < product.colors.length; i++) {
      const color = product.colors[i];

      if (color.id == colorId) {
         colorItem = color;
         break;
      }
   }

   if (colorItem != null) {
      selectProduct.selectColor = [colorItem];
      selectProduct.selectSize = sizeId;
      colorItem = null;
   }

   return selectProduct;
};

export default appUtilit;