import cardsData from './data'
// import categories from './data'
const categories = ['Action (set A)', 'Action (set B)', 'Emotions', 'Animal (set A)', 'Animal (set B)', 'City', 'Nature', 'Clothes'];

// сделать разметку для двух страниц, выкинуть их из дома и при переходе подставлять эти страницы в контейнер
// get each page after the document is loaded
const mainPage = document.querySelector('#main');
let categoryPage = document.querySelector('#category');
const statsPage = document.querySelector('#stats');
const pageContainer = document.querySelector('#pageContainer');
const mainCard = document.querySelectorAll('.main-card');
const burger = document.querySelector('.burger');
const switcher = document.querySelector('.switcher');

// remove templates from DOM
// pageContainer.removeChild(mainPage);
pageContainer.removeChild(categoryPage);

// append mainPage
// pageContainer.append(mainPage);

function audioShuffle(categoryCount) {
  let arrShuffle = [];
  cardsData[categoryCount].forEach(el => {
    arrShuffle.push(el);
    for (let i = arrShuffle.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrShuffle[i], arrShuffle[j]] = [arrShuffle[j], arrShuffle[i]];
    }
    return arrShuffle;
  })
  return arrShuffle;
}

// function soundNext(arr, count) {
// }

function generateCards(categoryCount) {
  let soundCount = 0;
  let soundRandom;
  let soundCorrect = new Audio('./assets/audio/correct.mp3');
  let soundError = new Audio('./assets/audio/error.mp3');
  let soundSuccess = new Audio('./assets/audio/success.mp3');
  let soundFailure = new Audio('./assets/audio/failure.mp3');
  let random = audioShuffle(categoryCount);
  let errorCount = 0;

  categoryPage.innerHTML = '';
  let cardElement;
  cardsData[categoryCount].forEach(el => {
    cardElement = document.createElement('div');
    cardElement.classList.add('card-container');

    if (switcher.checked === false) {
      cardElement.innerHTML = ` <div class="card">
    <div class="card__front" data-word="${el.word}" style="background-image: url(${el.image}); ">
        <div class="card__word">${el.word}</div>
    </div>
    <div class="card__back" style="background-image: url(${el.image}); ">
        <div class="card__word">${el.translation}</div>
    </div>
    <div class="card__rotate"></div>
  </div>`;
    } else {
      cardElement.innerHTML = ` <div class="card">
    <div class="card__front card-cover" data-word="${el.word}" style="background-image: url(${el.image}); ">
        <div class="card__word hidden">${el.word}</div>
    </div>
    <div class="card__back" style="background-image: url(${el.image}); ">
        <div class="card__word hidden">${el.translation}</div>
    </div>
    <div class="card__rotate hidden"></div>
  </div>`;
    }

    // game
    cardElement.lastChild.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card__rotate') && switcher.checked === false) {
        let sound = new Audio(el.audioSrc);
        sound.play();
      } else {
        if (event.target.classList.contains('card-inactive')) return;
        if (document.querySelector('.btn').classList.contains('repeat')) {
          if (e.target.getAttribute('data-word') === random[soundCount].word) {
            soundCount++;
            soundCorrect.play();
            document.querySelector('.rating').insertAdjacentHTML('beforeend', '<div class="star-correct"></div>');
            e.target.classList.add('card-inactive');

            if (random[soundCount]) {
              setTimeout(function () {
                soundRandom = new Audio(random[soundCount].audioSrc);
                soundRandom.play();
              }, 800);
            } else {
              let gameResult = document.createElement('div');
              gameResult.classList.add('game-result');

              pageContainer.removeChild(categoryPage);
              pageContainer.append(gameResult);

              if (errorCount === 0) {
                soundSuccess.play();
                gameResult.insertAdjacentHTML('afterbegin', '<div class="game-result__info">Win!</div>')
                gameResult.insertAdjacentHTML('beforeend', '<div class="game-result__image" style="background-image: url(./assets/img/success.jpg); "></div>')
              } else {
                soundFailure.play();
                gameResult.insertAdjacentHTML('afterbegin', `<div class="game-result__info">Errors: ${errorCount}</div>`)
                gameResult.insertAdjacentHTML('beforeend', '<div class="game-result__image" style="background-image: url(./assets/img/failure.jpg); "></div>')
              }

              setTimeout(function () {
                pageContainer.removeChild(gameResult);
                pageContainer.append(mainPage)
              }, 3000);

            }

            // soundNext(random, count);
          } else {
            errorCount++;
            soundError.play();
            document.querySelector('.rating').insertAdjacentHTML('beforeend', '<div class="star-error"></div>');
          }
        }
      }
    })
    categoryPage.append(cardElement);
    return cardElement;
  });

  if (switcher.checked === false) {
    categoryPage.insertAdjacentHTML('beforeend', '<div class="btn-container"><button class="btn hidden">Start game</button></div>')
    categoryPage.insertAdjacentHTML('afterbegin', '<div class="rating none"></div>')
  } else {
    categoryPage.insertAdjacentHTML('beforeend', '<div class="btn-container"><button class="btn">Start game</button></div>')
    categoryPage.insertAdjacentHTML('afterbegin', '<div class="rating "></div>')
  }

  pageContainer.append(categoryPage);
  // return pageContainer;

  document.querySelector('.btn').addEventListener('click', (e) => {
    if (switcher.checked === true) {
      document.querySelector('.btn').classList.add('repeat');
      let soundRandomFirst = new Audio(random[soundCount].audioSrc);
      soundRandomFirst.play();

      // if correct 
      // success sound, success star, right card inactive, nextSound()

      // if wrong
      // error sound, error star
    }
  })
}

mainPage.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG' || event.target.tagName === 'A') {
    pageContainer.removeChild(mainPage);
    let currentCategory = 0;
    categories.forEach((item, idx) => {
      if (item === event.target.textContent || item === event.target.getAttribute("alt")) {
        currentCategory = idx;
      }
    })
    generateCards(currentCategory);
  }
})

// flip cards
categoryPage.addEventListener('click', (event) => {
  document.querySelectorAll('.card__rotate').forEach(el => {
    if (el === event.target) {
      document.querySelectorAll('.card').forEach(el => {
        event.target.parentElement.classList.add('translate');
      })
    }
  });

  document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('mouseleave', (e) => {
      el.classList.remove('translate');
    })
  })
})

// where to keep layout?
// where to keep logic how to render lists?

// menu links
document.querySelector('.menu').addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    document.querySelectorAll('.menu__item').forEach(el => el.classList.remove('link__active'));
    event.target.classList.add('link__active');
    if (pageContainer.children[0].id === 'main') {
      if (event.target.textContent === 'Main Page') {
        burger.classList.remove('burger-active');
        document.querySelector('.menu').classList.remove('menu-active');
      } else {
        pageContainer.removeChild(mainPage);
        let currentCategory = 0;
        categories.forEach((item, idx) => {
          if (item === event.target.textContent) {
            currentCategory = idx;
          }
        })
        generateCards(currentCategory);
      }
    } else {
      if (event.target.textContent === 'Main Page') {
        pageContainer.removeChild(categoryPage);
        pageContainer.append(mainPage);
      } else {
        pageContainer.removeChild(categoryPage);
        let currentCategory = 0;
        categories.forEach((item, idx) => {
          if (item === event.target.textContent) {
            currentCategory = idx;
          }
        })
        generateCards(currentCategory);
      }
    }
    burger.classList.remove('burger-active');
    document.querySelector('.menu').classList.remove('menu-active');
  }
})

// open or close burger menu
document.addEventListener('click', (e) => {
  if (e.target === burger || e.target === document.querySelector('.burger__line')) {
    if (burger.classList.contains('burger-active')) {
      burger.classList.remove('burger-active');
      document.querySelector('.menu').classList.remove('menu-active');
    } else {
      if (switcher.checked === true) {
        document.querySelector('.menu').classList.add('menu-red');
      }
      burger.classList.add('burger-active');
      document.querySelector('.menu').classList.add('menu-active');
    }
  } else if (e.target === document.querySelector('.menu')) {
    return;
  } else {
    burger.classList.remove('burger-active');
    document.querySelector('.menu').classList.remove('menu-active');
  }
})

switcher.addEventListener('click', (e) => {
  if (switcher.checked === false) {
    document.querySelector('.menu').classList.remove('menu-red');
  } else {
    document.querySelector('.menu').classList.add('menu-red');
  }

  if (pageContainer.children[0].id === 'main') {
    mainCard.forEach(el => {
      if (switcher.checked === true) {
        el.classList.add('card-red');
      } else {
        el.classList.remove('card-red');
      }
    })
  } else {
    if (switcher.checked === true) {
      document.querySelectorAll('.card__rotate').forEach(el => {
        el.classList.add('hidden');
      })
      document.querySelectorAll('.card__word').forEach(el => {
        el.classList.add('hidden');
      })
      document.querySelectorAll('.card__front').forEach(el => {
        el.classList.add('card-cover');
      })
      document.querySelector('.btn').classList.remove('hidden');
    } else {
      document.querySelectorAll('.card__rotate').forEach(el => {
        el.classList.remove('hidden');
      })
      document.querySelectorAll('.card__word').forEach(el => {
        el.classList.remove('hidden');
      })
      document.querySelectorAll('.card__front').forEach(el => {
        el.classList.remove('card-cover');
        el.classList.remove('card-inactive');
      })
      document.querySelector('.btn').classList.add('hidden');
      document.querySelector('.rating').innerHTML = '';
    }
  }
})

// stats
function generateStats() {
  let words = [];
  let translations = [];
  let categoryNamesAll = []
  let arrows = '<div class="arrows arrows-active" style="background-image: url(./assets/img/arrows.png); "></div>';
  let wordsRow = document.createElement('div');
  wordsRow.insertAdjacentHTML('afterbegin', `<div style="order:1;" class="table-cell col-name">words</div>`);
  wordsRow.insertAdjacentHTML('afterbegin', arrows);
  let translationRow = document.createElement('div');
  translationRow.insertAdjacentHTML('afterbegin', `<div style="order:1;" class="table-cell col-name">translations</div>`);
  translationRow.insertAdjacentHTML('afterbegin', arrows);

  let categoryRow = document.createElement('div');
  categoryRow.insertAdjacentHTML('afterbegin', `<div style="order:1;" class="table-cell col-name">categories</div>`);
  categoryRow.insertAdjacentHTML('afterbegin', arrows);

  wordsRow.classList.add('col');
  translationRow.classList.add('col');
  categoryRow.classList.add('col');
  for (let i = 0; i < cardsData.length; i++) {
    for (let j = 0; j < cardsData[i].length; j++) {
      wordsRow.insertAdjacentHTML('beforeend', `<div style="order:${i};" class="table-cell">${cardsData[i][j].word}</div>`);
      translationRow.insertAdjacentHTML('beforeend', `<div style="order:${i};" class="table-cell">${cardsData[i][j].translation}</div>`);
      categoryRow.insertAdjacentHTML('beforeend', `<div style="order:${i};" class="table-cell">${categories[i]}</div>`);

      words.push(cardsData[i][j].word);
      translations.push(cardsData[i][j].translation);
      categoryNamesAll.push(categories[i]);

    }

  }



  statsPage.append(wordsRow);
  statsPage.append(translationRow);
  statsPage.append(categoryRow);
  pageContainer.append(statsPage);

  document.querySelectorAll('.arrows').forEach(el => {

    el.addEventListener('click', (e) => {
      let colName = e.target.nextElementSibling.textContent;
    //  if (el.classList.contains('arrows-active')) {
        
      //  el.classList.remove('arrows-active');
        if (colName === 'words') {
          wordsRow.innerHTML = '';
          wordsRow.insertAdjacentHTML('afterbegin', `<div style="order:1;" class="table-cell col-name">words</div>`);
          wordsRow.insertAdjacentHTML('afterbegin', arrows);
          words.sort();
          words.forEach((item, idx) => {
            wordsRow.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
          })

        } else if (colName === 'translations') {
          translationRow.innerHTML = '';
          translationRow.insertAdjacentHTML('afterbegin', `<div style="order:1;" class="table-cell col-name">translations</div>`);
          translationRow.insertAdjacentHTML('afterbegin', arrows);
          translations.sort();
          translations.forEach((item, idx) => {
            translationRow.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
          })
        } else {
          categoryRow.innerHTML = '';
          categoryRow.insertAdjacentHTML('afterbegin', `<div style="order:1;" class="table-cell col-name">categories</div>`);
          categoryRow.insertAdjacentHTML('afterbegin', arrows);
          categoryNamesAll.sort();
          categoryNamesAll.forEach((item, idx) => {
            categoryRow.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
          })
        }
    //  } 
    })
  })
}

// open close stats
document.querySelector('.stats-btn').addEventListener('click', (e) => {
  if (document.querySelector('.stats-btn').checked === true) {
    if (pageContainer.children[0].id === 'main') {
      pageContainer.removeChild(mainPage);
      generateStats();
    } else {
      pageContainer.removeChild(categoryPage);
      generateStats();
    }
  } else {
    pageContainer.removeChild(statsPage);
    pageContainer.append(mainPage);
  }
})

