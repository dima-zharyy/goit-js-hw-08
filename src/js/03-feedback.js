import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-msg';
const parsedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
let inputData = localStorage.getItem(STORAGE_KEY) ? parsedFormData : {};

populateUserInput();

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput(event) {
  inputData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputData));
}

function populateUserInput() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedData) return;

  if (savedData.email) {
    form.elements.email.value = savedData.email;
  }

  if (savedData.message) {
    form.elements.message.value = savedData.message;
  }
}

function onSubmit(event) {
  event.preventDefault();

  if (!event.currentTarget.elements.email.value || !event.currentTarget.elements.message.value) {
    alert('All fields must be filled!');
    return;
  }

  const submittedData = new FormData(event.currentTarget);
  const sendOnServerData = {};
  submittedData.forEach((value, name) => (sendOnServerData[name] = value));

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  inputData = {};
  console.log(sendOnServerData);
}
