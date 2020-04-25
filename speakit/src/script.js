let image = document.querySelector('.image');
let wordsOnPage;
let imagesOnPage;

document.querySelector('.start-button').addEventListener('click', (e) => {
  document.querySelector('.start').classList.add('hidden');
  document.querySelector('.start').classList.remove('start');
})

function getWords(page, group) {
  wordsOnPage = [];
  imagesOnPage = [];
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      result.forEach((item, idx) => {
        if (idx < 10) {
          let word = document.createElement('div');
          word.classList.add('item');
          let id = item.image.substr(-11, 7);
          word.setAttribute('id', id);
          word.insertAdjacentHTML('afterbegin', `<div class="item--transcript">${item.transcription}</div>`);
          word.insertAdjacentHTML('afterbegin', `<div class="item--word">${item.word}</div>`);
          word.insertAdjacentHTML('afterbegin', '<div class="item--icon"></div>');
          document.querySelector('.items').append(word);
          wordsOnPage.push(item.word);
          imagesOnPage.push(id);
        }
      })
    });
  return wordsOnPage;
}

function getTranslation(currentWord) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T122428Z.8ca2d87f5b800f7e.9a40ebb21a85ec1dd1d616f3bb88861b71b6b3b7&text= ${currentWord} &lang=en-ru`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.translation').textContent = data.text;
    });
}

function onItemClick(e){
  let currentItem = e.target.closest('.item');
  image.src = `https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.jpg`
  let audio = new Audio(`https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.mp3`)
  audio.play();
  document.querySelectorAll('.item').forEach(el => {
    el.classList.remove('item-active');
  })
  currentItem.classList.add('item-active');
  let currentWord = currentItem.childNodes[1].textContent;
  getTranslation(currentWord);
} 

document.querySelector('.items').addEventListener('click', onItemClick);

function calculatePage() {
  let arr = [];
  for (let i = 0; i < 30; i++) {
    arr.push(i);
  }
  arr.sort(() => Math.random() - 0.5);
  let pseudoRandomPage = arr[0];
  return pseudoRandomPage;
}

document.querySelector('.nav').addEventListener('click', (e) => {
  document.querySelector('.items').innerHTML = '';
  document.querySelectorAll('.nav--group').forEach(el => el.classList.remove('nav--group-active'));
  let currentNav = e.target.closest('.nav--group');
  currentNav.classList.add('nav--group-active');
  let group = currentNav.textContent - 1; 
  let page = calculatePage();
  getWords(page, group);
})

function checkIfCorrectWord(val){
  wordsOnPage.forEach((el, idx) => {
    if (el === val) {
      image.src = `https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${imagesOnPage[idx]}.jpg`;
      document.getElementById(`${imagesOnPage[idx]}`).classList.add('item-active');
      document.querySelector('.rating').insertAdjacentHTML('beforeend', '<div class="star"></div>');
    }
  })
}

// speech recognition start
document.querySelector('.btn-speech').addEventListener('click', (e) => {
  document.querySelector('.input-speech').classList.remove('hidden');
  document.querySelector('.translation').textContent = '';
  document.querySelector('.items').removeEventListener('click', onItemClick);
  document.querySelectorAll('.item').forEach(el => {
    el.classList.remove('item-active');
  })
  recognition.start();
})

// speech recognition
window.SpeechRecognition = window.SpeechRecognition
  || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'en-US';

recognition.addEventListener('result', (e) => {
  let val = e.results[0][0].transcript;
  document.querySelector('.input-speech').textContent = val;
  checkIfCorrectWord(val);
})

recognition.addEventListener('end', recognition.start)

// speech recognition end
document.querySelector('.btn-restart').addEventListener('click', (e) => {
  document.querySelectorAll('.item').forEach(el => {
    el.classList.remove('item-active');
  })
  document.querySelector('.rating').innerHTML = '';
  document.querySelector('.input-speech').classList.add('hidden');
  document.querySelector('.input-speech').textContent = '';
  document.querySelector('.translation').textContent = '';
  document.querySelector('.items').addEventListener('click', onItemClick);
})

// page load
window.addEventListener('DOMContentLoaded', () => {
  let group = 0;
  let page = calculatePage();
  getWords(page, group);
});