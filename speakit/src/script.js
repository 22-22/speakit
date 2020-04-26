let image = document.querySelector('.image');
let wordsOnPage;
let imagesOnPage;

// start application
document.querySelector('.start-button').addEventListener('click', (e) => {
  document.querySelector('.start').classList.add('hidden');
})

function calculatePage() {
  let arr = [];
  for (let i = 0; i < 30; i++) {
    arr.push(i);
  }
  arr.sort(() => Math.random() - 0.5);
  let pseudoRandomPage = arr[0];
  return pseudoRandomPage;
}

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
          word.insertAdjacentHTML('afterbegin', `<div class="item--translation hidden"></div>`);
          word.insertAdjacentHTML('afterbegin', `<div class="item--transcript">${item.transcription}</div>`);
          word.insertAdjacentHTML('afterbegin', `<div class="item--word">${item.word}</div>`);
          word.insertAdjacentHTML('afterbegin', '<div class="item--icon"></div>');
          document.querySelector('.items').append(word);
          wordsOnPage.push(item.word);
          imagesOnPage.push(id);

          const urlTr = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T122428Z.8ca2d87f5b800f7e.9a40ebb21a85ec1dd1d616f3bb88861b71b6b3b7&text= ${item.word} &lang=en-ru`;
          fetch(urlTr)
            .then(res => res.json())
            .then(data => {
              document.querySelectorAll('.item--translation')[idx].textContent = data.text;
            });
        }
      })
    });
  return wordsOnPage;
}

function onItemClick(e) {
  let currentItem = e.target.closest('.item');
  image.src = `https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.jpg`
  let audio = new Audio(`https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.mp3`)
  audio.play();
  document.querySelectorAll('.item').forEach(el => {
    el.classList.remove('item-active');
  })
  currentItem.classList.add('item-active');
  document.querySelector('.translation-displayed').textContent = currentItem.lastChild.textContent;
}

document.querySelector('.items').addEventListener('click', onItemClick);
document.querySelector('.results-container').addEventListener('click', (e) => {
  let currentItem = e.target.closest('.item');
  image.src = `https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.jpg`
  let audio = new Audio(`https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.mp3`)
  audio.play();

});

// choose level
document.querySelector('.nav').addEventListener('click', (e) => {
  document.querySelector('.items').innerHTML = '';
  document.querySelectorAll('.nav--group').forEach(el => el.classList.remove('nav--group-active'));
  let currentNav = e.target.closest('.nav--group');
  currentNav.classList.add('nav--group-active');
  let group = currentNav.textContent - 1;
  let page = calculatePage();
  getWords(page, group);
  returnToRegularMode(e) 
})

function showResults(e) {
  document.querySelector('#app').classList.add('hidden');
  document.querySelector('.results').classList.remove('hidden');
  document.querySelectorAll('.item--translation').forEach(el => {
    el.classList.remove('hidden');
  })

  document.querySelectorAll('.item').forEach((el, idx, arr) => {
    if (el.classList.contains('item-guessed')) {
      let elCloneSuccess = el.cloneNode(true);
      document.querySelector('.success-items').append(elCloneSuccess);
      let successNumber = document.querySelector('.success-items').childElementCount;
      document.querySelector('.success-number').textContent = successNumber;
    } else {
      let elCloneError = el.cloneNode(true);
      document.querySelector('.error-items').append(elCloneError);
      let errorsNumber = document.querySelector('.error-items').childElementCount;
      document.querySelector('.errors-number').textContent = errorsNumber;
    }
  })
}

function checkIfCorrectWord(recognizedWordLowerCase) {
  wordsOnPage.forEach((el, idx) => {
    if (el.toLowerCase() === recognizedWordLowerCase) {
      image.src = `https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${imagesOnPage[idx]}.jpg`;
      document.getElementById(`${imagesOnPage[idx]}`).classList.add('item-guessed');
      document.querySelector('.rating').insertAdjacentHTML('beforeend', '<div class="star"></div>');
    }
  })
  if (document.querySelectorAll('.item-guessed').length === 10) {
    showResults(e);
  }
}

// speech recognition start
document.querySelector('.btn-speech').addEventListener('click', (e) => {
  document.querySelector('.input-speech').innerHTML = '';
  document.querySelector('.input-speech').classList.remove('hidden');
  document.querySelector('.translation-displayed').textContent = '';
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
  let recognizedWord = e.results[0][0].transcript;
  let recognizedWordLowerCase = recognizedWord.toLowerCase()
  document.querySelector('.input-speech').textContent = recognizedWordLowerCase;
  checkIfCorrectWord(recognizedWordLowerCase);
})

recognition.addEventListener('end', recognition.start)

function returnToRegularMode(e) {
  document.querySelectorAll('.item').forEach(el => {
    el.classList.remove('item-guessed');
  })
  document.querySelectorAll('.item--translation').forEach(el => {
    el.classList.add('hidden');
  })
  document.querySelector('.rating').innerHTML = '';
  document.querySelector('.input-speech').classList.add('hidden');
  document.querySelector('.input-speech').textContent = '';
  document.querySelector('.translation-displayed').textContent = '';
  document.querySelector('.items').addEventListener('click', onItemClick);
  image.src = './assets/img/main.jpg';
  document.querySelector('.success-number').textContent = '0';
}

// speech recognition end
document.querySelector('.btn-restart').addEventListener('click', (e) => {
  document.querySelector('.items').innerHTML = '';
  let group = document.querySelector('.nav--group-active').textContent - 1;
  let page = calculatePage();
  getWords(page, group);
  returnToRegularMode(e);
})

// results
document.querySelector('.btn-results').addEventListener('click', (e) => {
  showResults(e);
})

// return button
document.querySelector('.btn-return').addEventListener('click', (e) => {
  document.querySelector('#app').classList.remove('hidden');
  document.querySelector('.success-items').innerHTML = '';
  document.querySelector('.error-items').innerHTML = '';
  document.querySelector('.results').classList.add('hidden');
  document.querySelectorAll('.item--translation').forEach(el => {
    el.classList.add('hidden');
  })

})

//new game button
document.querySelector('.res--btn-restart').addEventListener('click', (e) => {
  document.querySelector('.success-items').innerHTML = '';
  document.querySelector('.error-items').innerHTML = '';
  document.querySelector('#app').classList.remove('hidden');
  document.querySelector('.results').classList.add('hidden');
  document.querySelector('.items').innerHTML = '';
  let group = document.querySelector('.nav--group-active').textContent - 1;
  let page = calculatePage();
  getWords(page, group);
  returnToRegularMode(e);
})

// page load
window.addEventListener('DOMContentLoaded', () => {
  let group = 0;
  let page = calculatePage();
  getWords(page, group);
});