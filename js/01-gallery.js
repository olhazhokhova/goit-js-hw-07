import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const galleryListMarkup = galleryItems
  .map(
    ({ description, original, preview }) =>
      `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", galleryListMarkup);
gallery.addEventListener("click", showModal);

function showModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" width="800" height="600">`,
    {
      onShow: (instance) => {
        instance.element().querySelector("img").onclick = instance.close;
      },
    }
  );

  instance.show();

  window.addEventListener('keydown', e => e.code === "Escape" && instance.close());
}