export const renderGallery = (obj, container) => {
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