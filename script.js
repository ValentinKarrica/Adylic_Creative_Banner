// Get the images container
const imagesContainer = document.getElementById("images-container");
// Get the last child of the container and clone it
const lastChildClone = imagesContainer.lastElementChild.cloneNode(true);
// Add the cloned image as the first child
imagesContainer.insertBefore(lastChildClone, imagesContainer.firstElementChild);

// Create Images for animation excluding the first one and reverse them so can achieve (fade in and out).
const images = Array.from(
  imagesContainer.querySelectorAll("img:not(:first-child)")
).reverse();
const titleContainer = document.getElementById("image-title");
// Initialize showing image index
let imgIndex = 0;

// Create timeline
const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 0,
});

// Add a tween with label to time line for each image
images.forEach((el, i, arr) => {
  const nextIndex = i === arr.length - 1 ? 0 : i + 1;
  const tween = gsap.to(el, {
    autoAlpha: 0,
    delay: 1.5,
    duration: 0.3,
    onStart: () => {
      // update image title
      titleContainer.innerHTML = images[nextIndex].alt;
    },
    onComplete: () => {
      // update showing image index
      imgIndex = nextIndex;
    },
  });
  tl.add(tween, `image-${i}`);
});

// Previous button click
document.getElementById("prevButton").addEventListener("click", function () {
  tl.pause();
  const prevIndex = imgIndex === 0 ? images.length - 1 : imgIndex - 1;
  imgIndex = prevIndex;
  titleContainer.innerHTML = images[prevIndex].alt;
  // play timeline with previous tween label
  tl.play(`image-${prevIndex}`);
});

// Next button click
document.getElementById("nextButton").addEventListener("click", function () {
  tl.pause();
  const nextIndex = imgIndex === images.length - 1 ? 0 : imgIndex + 1;
  imgIndex = nextIndex;
  titleContainer.innerHTML = images[nextIndex].alt;
  // play timeline with next tween label
  tl.play(`image-${nextIndex}`);
});
