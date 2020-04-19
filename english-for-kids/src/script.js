import cardsData from './data'

// get each page when the document is loaded
const mainPage = document.querySelector('#main');
let categoryPage = document.querySelector('#category');
const pageContainer = document.querySelector('#pageContainer');
const burger = document.querySelector('.burger');
const switcher = document.querySelector('.switcher');
const wordsCol = document.querySelector('.words-col');
const translationsCol = document.querySelector('.translations-col');
const categoriesCol = document.querySelector('.categories-col');
const categories = ['Action (set A)', 'Action (set B)', 'Emotions', 'Animal (set A)', 'Animal (set B)', 'City', 'Nature', 'Clothes'];

// remove templates from DOM
pageContainer.removeChild(categoryPage);

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
                document.querySelectorAll('.main-card').forEach(el => {
                  el.classList.add('card-red');

                })

              }, 3000);
            }
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

  document.querySelector('.btn').addEventListener('click', (e) => {
    if (switcher.checked === true) {
      document.querySelector('.btn').classList.add('repeat');
      let soundRandomFirst = new Audio(random[soundCount].audioSrc);
      soundRandomFirst.play();
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

// menu links
document.querySelector('.menu').addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    document.querySelectorAll('.menu__item').forEach(el => el.classList.remove('link-active'));
    event.target.classList.add('link-active');
    if (pageContainer.children[0].id === 'main') {
      if (event.target.textContent === 'Main Page') {
        burger.classList.remove('active');
        document.querySelector('.burger__line').classList.remove('burger-active')
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
    burger.classList.remove('active');
    document.querySelector('.burger__line').classList.remove('burger-active')
    document.querySelector('.menu').classList.remove('menu-active');
  }
})

// open or close burger menu
document.addEventListener('click', (e) => {
  if (e.target === burger || e.target === document.querySelector('.burger__line')) {
    if (burger.classList.contains('active')) {
      burger.classList.remove('active');
      document.querySelector('.burger__line').classList.remove('burger-active')
      document.querySelector('.menu').classList.remove('menu-active');
    } else {
      if (switcher.checked === true) {
        document.querySelector('.menu').classList.add('menu-red');
      }
      burger.classList.add('active');
      document.querySelector('.burger__line').classList.add('burger-active')
      document.querySelector('.menu').classList.add('menu-active');
    }
  } else if (e.target === document.querySelector('.menu')) {
    return;
  } else {
    burger.classList.remove('active');
    document.querySelector('.burger__line').classList.remove('burger-active')
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
    document.querySelectorAll('.main-card').forEach(el => {
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

// stats generation
let words = [];
let translations = [];
let categoryNamesAll = [];

function generateStats() {
  for (let i = 0; i < cardsData.length; i++) {
    for (let j = 0; j < cardsData[i].length; j++) {
      wordsCol.insertAdjacentHTML('beforeend', `<div style="order:${i};" class="table-cell">${cardsData[i][j].word}</div>`);
      translationsCol.insertAdjacentHTML('beforeend', `<div style="order:${i};" class="table-cell">${cardsData[i][j].translation}</div>`);
      categoriesCol.insertAdjacentHTML('beforeend', `<div style="order:${i};" class="table-cell">${categories[i]}</div>`);
      words.push(cardsData[i][j].word);
      translations.push(cardsData[i][j].translation);
      categoryNamesAll.push(categories[i]);
    }
  }
  return words, translations, categoryNamesAll;
}

// stats sort
document.querySelectorAll('.arrow-down').forEach(el => {
  el.addEventListener('click', (e) => {
    let colNameCurrent = e.target.parentElement.attributes["id"].value;
    if (colNameCurrent === 'words') {
      wordsCol.innerHTML = '';
      words.sort().reverse();
      words.forEach((item, idx) => {
        wordsCol.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
      })

    } else if (colNameCurrent === 'translations') {
      translationsCol.innerHTML = '';
      translations.sort().reverse();
      translations.forEach((item, idx) => {
        translationsCol.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
      })
    } else {
      categoriesCol.innerHTML = '';
      categoryNamesAll.sort().reverse();
      categoryNamesAll.forEach((item, idx) => {
        categoriesCol.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
      })
    }
  })
})

document.querySelectorAll('.arrow-up').forEach(el => {
  el.addEventListener('click', (e) => {
    console.log(e.target)
    let colNameCurrent = e.target.nextElementSibling.textContent;
    if (colNameCurrent === 'words') {
      wordsCol.innerHTML = '';
      words.sort();
      words.forEach((item, idx) => {
        wordsCol.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
      })
    } else if (colNameCurrent === 'translations') {
      translationsCol.innerHTML = '';
      translations.sort();
      translations.forEach((item, idx) => {
        translationsCol.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
      })
    } else {
      categoriesCol.innerHTML = '';
      categoryNamesAll.sort();
      categoryNamesAll.forEach((item, idx) => {
        categoriesCol.insertAdjacentHTML('beforeend', `<div style="order:${idx};" class="table-cell">${item}</div>`);
      })
    }
  })
})

// open close stats
document.querySelector('.stats-btn').addEventListener('click', (e) => {
  if (document.querySelector('.stats-btn').checked === true) {
    document.querySelector('#table').classList.remove('hidden');
    document.querySelector('#table').classList.add('table');
    document.querySelectorAll('.col').forEach(el => {
      el.classList.remove('hidden');
    })
    generateStats();
  } else {
    document.querySelector('#table').classList.remove('table');
    document.querySelector('#table').classList.add('hidden');
    document.querySelectorAll('.col').forEach(el => {
      el.classList.add('hidden');
    })
  }
})

