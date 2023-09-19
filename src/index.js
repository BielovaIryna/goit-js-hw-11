import { fetchImg } from "./js/pixabay-api";
import { renderGallery } from "./js/render-gallery";
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import { hitsPerPage, formEl, galleryEl, guardEl, submitEl } from "./js/const";

let page = 1;
let value = "";

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 0,
};
const handleIntersection = (entries, observer) => {

  entries.forEach(async (intersection) => {
    if (intersection.isIntersecting) {
      page += 1;
      try {
        const cards = await fetchImg(value, page);
        let cardsPage = Math.ceil(page * hitsPerPage);
        if (cardsPage >= cards.totalHits) {

          observer.unobserve(guardEl);
          return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");

        } else {
          renderGallery(cards, galleryEl);

        }

      } catch (error) {
        console.log(error);
      }

    }
  });

}
const observer = new IntersectionObserver(handleIntersection, options);


const onSubmit = async (e) => {
  page = 1;
  e.preventDefault();
  galleryEl.innerHTML = "";
  const { searchQuery } = formEl.elements;
  value = searchQuery.value.trim();

  if (value === "") {
    Notiflix.Notify.failure("Input is empty")
    galleryEl.innerHTML = "";
  } else {
    try {
      const cards = await fetchImg(value, page);


      if (cards.hits.length > 1) {
        Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
        console.log(cards);
        renderGallery(cards, galleryEl);
        if (cards.totalHits <= hitsPerPage) {
          return
        } else {
          observer.observe(guardEl)
        };
      } else { Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.") }

    } catch (error) {
      console.log(error);
    }
  }




}
submitEl.addEventListener("click", onSubmit);

