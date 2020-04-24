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
      word.insertAdjacentHTML('afterbegin', `<div class="item--transcript">${item.transcription}</div>`);
      word.insertAdjacentHTML('afterbegin', `<div class="item--word">${item.word}</div>`);
      word.insertAdjacentHTML('afterbegin', '<div class="item--icon"></div>');
      document.querySelector('.items').append(word);
    }
  })
}

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
  let group = 0;
  let page = calculatePage();
   
  getWords(page, group);

})
