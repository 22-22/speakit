import cardsData from './data'
// import categoryNames from './data'
const categoryNames = ['Action (set A)', 'Action (set B)', 'Emotions', 'Animal (set A)', 'Animal (set B)', 'City', 'Nature', 'Clothes'];


// сделать разметку для двух страниц, выкинуть их из дома и при переходе подставлять эти страницы в контейнер
// get each page after the document is loaded
const mainPage = document.querySelector('#main')
let categoryPage = document.querySelector('#category')
const pageContainer = document.querySelector('#pageContainer');
const mainCard = document.querySelectorAll('.main-card');
const burger = document.querySelector('.burger');
const switcher = document.querySelector('.switcher');

// remove templates from DOM
// pageContainer.removeChild(mainPage);
pageContainer.removeChild(categoryPage);

// append mainPage
// pageContainer.append(mainPage);

function generateCard(categoryCount) {
  categoryPage.innerHTML = '';
  let cardElement;
  cardsData[categoryCount].forEach(el => {

    cardElement = document.createElement('div');
    cardElement.classList.add('card-container');
    cardElement.innerHTML = ` <div class="card">
  <div class="card__front" style="background-image: url(${el.image}); ">
      <div class="card__word">${el.word}</div>
  </div>
  <div class="card__back  " style="background-image: url(${el.image}); ">
      <div class="card__word">${el.translation}</div>
  </div>
  <div class="card__rotate"></div>
</div>`;
    cardElement.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card__rotate') && switcher.checked === false) {
        let sound = new Audio(el.audioSrc);
        sound.play();
      }
    })
    categoryPage.append(cardElement);
    return cardElement;
  });
  // go back on main page we can only when click to menu
  categoryPage.insertAdjacentHTML('afterbegin', '<div class="rating"></div>')
  categoryPage.insertAdjacentHTML('beforeend', '<div class="btn-container"><button class="btn hidden">Start game</button></div>')
  pageContainer.append(categoryPage);
  return pageContainer;
}

mainPage.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG' || event.target.tagName === 'A') {
    pageContainer.removeChild(mainPage);
    let currentCategory = 0;
    categoryNames.forEach((item, idx) => {
      if (item === event.target.textContent || item === event.target.getAttribute("alt")) {
        currentCategory = idx;
      }
    })
    generateCard(currentCategory);
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
})

categoryPage.addEventListener('mouseout', (event) => {
  document.querySelectorAll('.card').forEach(el => {
    el.classList.remove('translate');
  })
})

// where to keep layout?
// where to keep logic how to render lists?

// burger
burger.addEventListener('click', (e) => {
  if (burger.classList.contains('burger-active')) {
    burger.classList.remove('burger-active');
    document.querySelector('.menu').classList.remove('menu-active');
  } else {
    burger.classList.add('burger-active');
    document.querySelector('.menu').classList.add('menu-active');
  }
})

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
        categoryNames.forEach((item, idx) => {
          if (item === event.target.textContent) {
            currentCategory = idx;
          }
        })

        generateCard(currentCategory);
      }
    } else {
      if (event.target.textContent === 'Main Page') {
        pageContainer.removeChild(categoryPage);
        pageContainer.append(mainPage);
      } else {

        pageContainer.removeChild(categoryPage);
        let currentCategory = 0;
        categoryNames.forEach((item, idx) => {
          if (item === event.target.textContent) {
            currentCategory = idx;
          }
        })
        generateCard(currentCategory);
      }
    }

    burger.classList.remove('burger-active');
    document.querySelector('.menu').classList.remove('menu-active');
  }
})


// document.querySelector('main').addEventListener('click', (e) => {
//     burger.classList.remove('burger-active');
//     document.querySelector('.menu').classList.remove('menu-active');
// })

switcher.addEventListener('click', (e) => {
  if (pageContainer.children[0].id === 'main') {
    mainCard.forEach(el => {
      if (switcher.checked === true) {
        el.classList.add('red');
      } else {
        el.classList.remove('red');
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
        el.classList.add('card__cover');
      document.querySelector('.btn').classList.remove('hidden');
      })
    } else {
      document.querySelectorAll('.card__rotate').forEach(el => {
        el.classList.remove('hidden');
      })
      document.querySelectorAll('.card__word').forEach(el => {
        el.classList.remove('hidden');
      })
      document.querySelectorAll('.card__front').forEach(el => {
        el.classList.remove('card__cover');
      })
      document.querySelector('.btn').classList.add('hidden');
    }
  }
})

