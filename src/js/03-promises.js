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
        console.log('reject');
        reject({ position, delay });
      } else {
        // Reject
        console.log('resolve');
        resolve({ position, delay });
      }
    }, delay);
  });
}
function onSubmitClick(e) {
  e.preventDefault();
  pAmount = Number(refs.amount.value);
  secondDelay = Number(refs.step.value);
  firstDelay = Number(refs.delay.value);
  for (let i = 0; i < pAmount; i++) {
    createPromise(pAmount, firstDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    // Number(firstDelay + delay);
    firstDelay = +secondDelay;
    // console.log(secondDelay + firstDelay);
    // firstDelay = +secondDelay;
  }
}
