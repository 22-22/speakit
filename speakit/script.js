let image = document.querySelector('.image')

document.querySelector('.start-button').addEventListener('click', (e) => {
  document.querySelector('.start').classList.add('hidden');
  document.querySelector('.start').classList.remove('start');

})

async function getWords(page, group) {

  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const response = await fetch(url);
  const result = await response.json();

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
    }
  })
}

function getTranslation(currentWord) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T122428Z.8ca2d87f5b800f7e.9a40ebb21a85ec1dd1d616f3bb88861b71b6b3b7&text= ${currentWord} &lang=en-ru`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.translation').textContent = data.text;
    });
}

document.querySelector('.items').addEventListener('click', (e) => {
  let currentItem = e.target.closest('.item');
  image.src = `https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.jpg`
  let audio = new Audio(`https://raw.githubusercontent.com/22-22/rslang/rslang-data/data/files/${currentItem.id}.mp3`)
  audio.play();
  document.querySelectorAll('.item').forEach(el => {
    el.classList.remove('item-active');
  })
  currentItem.classList.add('item-active');
  
  let currentWord = currentItem.childNodes[1].textContent;
  getTranslation(currentWord)
})

//document.querySelector('.speak').classList.remove('hidden');

function calculatePage() {
  let arr = [];
  for (let i = 0; i < 30; i++) {
    arr.push(i);
  }
  arr.sort(() => Math.random() - 0.5);
  let pseudoRandomPage = arr[0];
  return pseudoRandomPage;
}

document.querySelector('.navigation').addEventListener('click', (e) => {
  document.querySelector('.items').innerHTML = '';

  let group = 0;
  let page = calculatePage();
  getWords(page, group);

})

window.addEventListener('DOMContentLoaded', () => {
  let group = 0;
  let page = calculatePage();
  getWords(page, group);
});
