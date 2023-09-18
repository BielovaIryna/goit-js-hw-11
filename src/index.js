import { fetchImg } from "./js/utils";
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import { hitsPerPage, formEl, galleryEl, guardEl, submitEl} from "./js/const";

let page = 1;
let value = "";


const renderGallery = (obj, container) => {
  const markup = obj.hits.map((e) =>
    `<div class="photo-card">
  <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"  />
  <div class="info">
    <p class="info-item">
      <b>Likes <span>${e.likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views <span>${e.views}</span></b>
    </p>
    <p class="info-item">
      Comments <span>${e.comments}</span>
    </p>
    <p class="info-item">
      Downloads <span> ${e.downloads}</span>
    </p>
  </div>
</div>`
  ).join("");

  container.insertAdjacentHTML("beforeend", markup);
  
}

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 0,
};
const handleIntersection = (entries, observer) => {
    entries.forEach(async(intersection) => {
    if  (intersection.isIntersecting) {
      page += 1;
        try {
        const cards = await fetchImg(value, page);
        let cardsPage=Math.ceil(page*hitsPerPage);
         if (cardsPage >= cards.totalHits) {
         
        observer.unobserve(guardEl);
       return  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  
        } else{renderGallery(cards, galleryEl);
         
        }
       
          } catch (error) {
        console.log(error);
      }
      
    }
  });
  
}
const observer = new IntersectionObserver (handleIntersection, options);


const onSubmit = async (e) => {
  e.preventDefault();
  galleryEl.innerHTML="";
  const { searchQuery } = formEl.elements;
  value = searchQuery.value;
  
  if (value) {
    try {
      const cards = await fetchImg(value, page);
     console.log(cards);
      if (cards.hits.length > 1) {
        Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
       
        renderGallery(cards, galleryEl);
        observer.observe(guardEl);
      } else {Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}

        } catch (error) {
      console.log(error);
    }

  }
  
  
  
}
submitEl.addEventListener("click", onSubmit);

