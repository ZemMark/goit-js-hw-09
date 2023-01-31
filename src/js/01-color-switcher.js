const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.onclick = e => {
  changeBodyBgc();
  e.target.disabled = true;
  if (refs.stop.disabled) {
    refs.stop.disabled = false;
  }
};
refs.stop.onclick = e => {
  if (refs.start.disabled) {
    clearInterval(intervalId);
    e.target.disabled = true;
    refs.start.disabled = false;
  }
};

let intervalId = null;
function changeBodyBgc() {
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
