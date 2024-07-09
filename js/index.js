const url = "https://jsonplaceholder.typicode.com/photos";
const container = document.querySelector(".container");

const imageContainer = document.createElement("div");
imageContainer.classList.add("image_container");
container.appendChild(imageContainer);

const popUpImageContainer = document.createElement("div");
popUpImageContainer.classList.add("popup_image_container");
container.appendChild(popUpImageContainer);
const loader = document.getElementById("useless-loader");

fetch(url)
  .then((response) => response.json())
  .then((data) => displayImage(data));
function displayImage(data) {
  if (data) {
    loader.remove();
    data = Array.from(data);
    data.length = 110;

    data.forEach((element) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("image");
      imageContainer.appendChild(imgDiv);
      const img = document.createElement("img");
      img.src = element.thumbnailUrl;
      img.dataset.url = element.url;
      imgDiv.appendChild(img);
    });
    callback();
  }
}

function callback() {
  let imgNodes = document.querySelectorAll(".image_container img");
  imgNodes = Array.from(imgNodes);

  imgNodes.forEach((imgNode) => {
    imgNode.onclick = () => {
      const popupImageDiv = document.createElement("div");
      popupImageDiv.style.display = "block";
      popupImageDiv.classList.add("popup_image");
      popUpImageContainer.appendChild(popupImageDiv);

      const span = document.createElement("span");
      span.addEventListener("click", () => {
        popupImageDiv.remove();
      });
      span.innerHTML = `&times;`;
      popupImageDiv.appendChild(span);

      const popUpImage = document.createElement("img");
      popUpImage.src = imgNode.dataset.url;
      popupImageDiv.appendChild(popUpImage);
    };
  });
}
