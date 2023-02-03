import Notiflix from 'notiflix';
const refs = {
  delay: document.querySelector('.delay'),
  step: document.querySelector('.step'),
  amount: document.querySelector('.amount'),
  submit: document.querySelector('.submitBtn'),
};
let firstDelay = refs.delay.value;
let secondDelay = refs.step.value;
let pAmount = refs.amount.value;

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
