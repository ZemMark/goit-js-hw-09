import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let intervalId = null;
const refs = {
  start: document.querySelector('[data-start]'),
  date: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  hint: document.querySelector('.hint'),
};
// refs.start.addEventListener('click', onStartClick);
const timer = flatpickr(refs.date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (refs.start.classList.contains('active')) {
      return;
    }
    // console.log(selectedDates[0]);
    window.addEventListener('keydown', enterPress);

    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }
    if (refs.start.classList.contains('active')) {
      return;
    }
    refs.start.classList.add('active');

    console.log(Date.now);
    refs.start.disabled = false;
    refs.hint.classList.add('visible');
    refs.start.addEventListener('click', timerEngine);

    function timerEngine() {
      // if (refs.start.classList.contains('active')) {
      //   return;
      // }
      refs.hint.classList.remove('visible');
      window.removeEventListener('keydown', enterPress);
      refs.start.removeEventListener('click', timerEngine);

      intervalId = setInterval(() => {
        // refs.start.disabled = false;

        const currentTime = Date.now();
        const deltaTime = selectedDates[0] - currentTime;
        if (selectedDates[0] < currentTime) {
          // refs.start.classList.remove('active');
          return;
        }
        updateTimerInterface(convertMs(deltaTime));
        console.log('deltaTime');
        if (deltaTime <= 1000) {
          console.log(deltaTime);
          clearInterval(intervalId);
        }
      }, 1000);
    }
    function enterPress(e) {
      if (e.code === 'Enter') {
        timerEngine();
      }
    }
  },
});
function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
//

//

//
function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
