const buttonEl = document.querySelectorAll(".button");
const arrowEl = document.querySelectorAll("#arrow");

for (let i = 0; i < buttonEl.length; i++) {
  let arrowFun;

  const addAn = () => {
    const tog = (an) => arrowEl[i].classList.toggle(an);
    tog("fa-beat");

    if (!arrowFun) {
      arrowFun = setInterval(() => {
        tog("fa-beat");
        tog("fa-spin");
      }, 2000);
    }
  };

  const remAn = () => {
    arrowEl[i].classList.remove("fa-beat", "fa-spin");
    clearInterval(arrowFun);
    arrowFun = null;
  };

  buttonEl[i].addEventListener("mouseenter", addAn);
  buttonEl[i].addEventListener("mouseleave", remAn);
}
