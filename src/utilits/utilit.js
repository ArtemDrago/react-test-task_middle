export default function changeImg() {
   let catalogWrapper = document.querySelector('.content-wrapper');
   if (!catalogWrapper) return;
   let isDesctop = true;

   if (window.innerWidth > 767) {
      catalogWrapper.addEventListener('mousemove', catalogMouseMove);
      isDesctop = false;
   }

   window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
         if (isDesctop) {
            catalogWrapper.addEventListener('mousemove', catalogMouseMove);
         }
         isDesctop = false;
      } else {
         if (!isDesctop) {
            catalogWrapper.removeEventListener('mousemove', catalogMouseMove);
         }
         isDesctop = true;
      }
   });

};


const catalogMouseMove = (e) => {
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