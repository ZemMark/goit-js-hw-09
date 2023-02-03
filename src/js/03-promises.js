import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
const refs = {
  delay: document.querySelector('.delay'),
  step: document.querySelector('.step'),
  amount: document.querySelector('.amount'),
  submit: document.querySelector('.submitBtn'),
  form: document.querySelector('.form'),
};

let firstDelay = refs.delay.value;
let secondDelay = refs.step.value;
let pAmount = refs.amount.value;
const STORAGE_DATA = 'default-values';
let dataToRestore = null;
const formData = JSON.parse(localStorage.getItem(STORAGE_DATA)) || {};
// const fd = JSON.parse(localStorage.getItem(FEEDBACK_DATA)) || {};

// console.log(formData);
valuesRestor();
refs.submit.addEventListener('click', onSubmitClick);

function createPromise(position, delay) {
  return new Promise((reject, resolve) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        reject({ position, delay });
      } else {
        // Reject
        resolve({ position, delay });
      }
    }, delay);
  });
}
function onSubmitClick(e, delay) {
  e.preventDefault();
  pAmount = Number(refs.amount.value);
  secondDelay = Number(refs.step.value);
  firstDelay = Number(refs.delay.value);
  delay = firstDelay;
  for (let i = 0; i < pAmount; i++) {
    console.log(delay);
    createPromise(pAmount, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(delay);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += secondDelay;
  }
}

refs.form.addEventListener('input', throttle(onInputSet, 1000));
function onInputSet(e) {
  formData[e.target.name] = e.target.value;
  fdJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_DATA, fdJSON);
}
function valuesRestor() {
  try {
    dataToRestore = JSON.parse(localStorage.getItem(STORAGE_DATA));
    refs.delay.value = dataToRestore.delay;
    refs.step.value = dataToRestore.step;
    refs.amount.value = dataToRestore.amount;
  } catch (error) {
    console.log('does not work');
  }
  console.log(dataToRestore);
}
