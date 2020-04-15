const categoryNames = ['Action (set A)', 'Action (set B)', 'Emotions', 'Animal (set A)', 'Animal (set B)', 'City', 'Nature', 'Clothes'];

const cardsData = [
  [
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'src/assets/img/action-set-a/jump.png ',
      audioSrc: 'audio/cry.mp3'
    },
    {
      word: 'laugh',
      translation: 'смеяться',
      image: 'src/assets/img/action-set-a/laugh.png',
      audioSrc: 'audio/dance.mp3'
    },
    {
      word: 'open',
      translation: 'открывать',
      image: 'src/assets/img/action-set-a/open.png',
      audioSrc: 'audio/dive.mp3'
    },
    {
      word: 'eat',
      translation: 'есть',
      image: 'src/assets/img/action-set-a/eat.png',
      audioSrc: 'audio/draw.mp3'
    },
    {
      word: 'sleep',
      translation: 'спать',
      image: 'src/assets/img/action-set-a/sleep.png',
      audioSrc: 'audio/fish.mp3'
    },
    {
      word: 'sit',
      translation: 'сидеть',
      image: 'src/assets/img/action-set-a/sit.png',
      audioSrc: 'audio/fly.mp3'
    },
    {
      word: 'get up',
      translation: 'вставать',
      image: 'src/assets/img/action-set-a/get-up.png',
      audioSrc: 'audio/hug.mp3'
    },
    {
      word: 'watch',
      translation: 'смотреть',
      image: 'src/assets/img/action-set-a/watch.png',
      audioSrc: 'audio/jump.mp3'
    }
  ],
  [
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'src/assets/img/action-set-b/dance.jpg',
      audioSrc: 'audio/open.mp3'
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'src/assets/img/action-set-b/dive.jpg',
      audioSrc: 'audio/play.mp3'
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'src/assets/img/action-set-b/draw.jpg',
      audioSrc: 'audio/point.mp3'
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'src/assets/img/action-set-b/ride.jpg',
      audioSrc: 'audio/ride.mp3'
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'src/assets/img/action-set-b/run.jpg',
      audioSrc: 'audio/run.mp3'
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'src/assets/img/action-set-b/sing.jpg',
      audioSrc: 'audio/sing.mp3'
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'src/assets/img/action-set-b/fish.jpg',
      audioSrc: 'audio/skip.mp3'
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'src/assets/img/action-set-b/play.jpg',
      audioSrc: 'audio/swim.mp3'
    }
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'src/assets/img/emotions/sad.jpg',
      audioSrc: 'audio/sad.mp3'
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'src/assets/img/emotions/angry.jpg',
      audioSrc: 'audio/angry.mp3'
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'src/assets/img/emotions/happy.jpg',
      audioSrc: 'audio/happy.mp3'
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'src/assets/img/emotions/tired.jpg',
      audioSrc: 'audio/tired.mp3'
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'src/assets/img/emotions/surprised.jpg',
      audioSrc: 'audio/surprised.mp3'
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'src/assets/img/emotions/scared.jpg',
      audioSrc: 'audio/scared.mp3'
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'src/assets/img/emotions/smile.jpg',
      audioSrc: 'audio/smile.mp3'
    },
    {
      word: 'cry',
      translation: 'плач',
      image: 'src/assets/img/emotions/cry.jpg',
      audioSrc: 'audio/laugh.mp3'
    }
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'src/assets/img/animals-set-a/cat.jpg',
      audioSrc: 'audio/cat.mp3'
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'src/assets/img/animals-set-a/chick.jpg',
      audioSrc: 'audio/chick.mp3'
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'src/assets/img/animals-set-a/chicken.jpg',
      audioSrc: 'audio/chicken.mp3'
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'src/assets/img/animals-set-a/dog.jpg',
      audioSrc: 'audio/dog.mp3'
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'src/assets/img/animals-set-a/horse.jpg',
      audioSrc: 'audio/horse.mp3'
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'src/assets/img/animals-set-a/pig.jpg',
      audioSrc: 'audio/pig.mp3'
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'src/assets/img/animals-set-a/rabbit.jpg',
      audioSrc: 'audio/rabbit.mp3'
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'src/assets/img/animals-set-a/sheep.jpg',
      audioSrc: 'audio/sheep.mp3'
    }
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'src/assets/img/animals-set-b/bird.jpg',
      audioSrc: 'audio/bird.mp3'
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'src/assets/img/animals-set-b/fish.jpg',
      audioSrc: 'audio/fish.mp3'
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'src/assets/img/animals-set-b/frog.jpg',
      audioSrc: 'audio/frog.mp3'
    },
    {
      word: 'giraffe',
      translation: 'жираф',
      image: 'src/assets/img/animals-set-b/giraffe.jpg',
      audioSrc: 'audio/giraffe.mp3'
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'src/assets/img/animals-set-b/lion.jpg',
      audioSrc: 'audio/lion.mp3'
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'src/assets/img/animals-set-b/mouse.jpg',
      audioSrc: 'audio/mouse.mp3'
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'src/assets/img/animals-set-b/turtle.jpg',
      audioSrc: 'audio/turtle.mp3'
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'src/assets/img/animals-set-b/dolphin.jpg',
      audioSrc: 'audio/dolphin.mp3'
    }
  ],
  [
    {
      word: 'bus',
      translation: 'автобус',
      image: 'src/assets/img/city/bus.png',
      audioSrc: 'audio/cat.mp3'
    },
    {
      word: 'car',
      translation: 'машина',
      image: 'src/assets/img/city/car.png',
      audioSrc: 'audio/chick.mp3'
    },
    {
      word: 'город',
      translation: 'город',
      image: 'src/assets/img/city/city.png',
      audioSrc: 'audio/chicken.mp3'
    },
    {
      word: 'metro',
      translation: 'метро',
      image: 'src/assets/img/city/metro.png',
      audioSrc: 'audio/dog.mp3'
    },
    {
      word: 'phone',
      translation: 'телефон',
      image: 'src/assets/img/city/phone.png',
      audioSrc: 'audio/horse.mp3'
    },
    {
      word: 'house',
      translation: 'дом',
      image: 'src/assets/img/city/house.png',
      audioSrc: 'audio/pig.mp3'
    },
    {
      word: 'shop',
      translation: 'магазин',
      image: 'src/assets/img/city/shop.png',
      audioSrc: 'audio/rabbit.mp3'
    },
    {
      word: 'traffic light',
      translation: 'светофор',
      image: 'src/assets/img/city/traffic-light.png',
      audioSrc: 'audio/sheep.mp3'
    }
  ],
  [
    {
      word: 'sun',
      translation: 'солнце',
      image: 'src/assets/img/nature/sun.png',
      audioSrc: 'audio/bird.mp3'
    },
    {
      word: 'flower',
      translation: 'цветок',
      image: 'src/assets/img/nature/flower.png',
      audioSrc: 'audio/fish.mp3'
    },
    {
      word: 'mountain',
      translation: 'гора',
      image: 'src/assets/img/nature/mountain.png',
      audioSrc: 'audio/frog.mp3'
    },
    {
      word: 'sky',
      translation: 'небо',
      image: 'src/assets/img/nature/sky.png',
      audioSrc: 'audio/giraffe.mp3'
    },
    {
      word: 'watermelon',
      translation: 'арбуз',
      image: 'src/assets/img/nature/watermelon.png',
      audioSrc: 'audio/lion.mp3'
    },
    {
      word: 'wave',
      translation: 'волна',
      image: 'src/assets/img/nature/wave.png',
      audioSrc: 'audio/mouse.mp3'
    },
    {
      word: 'cloud',
      translation: 'облако',
      image: 'src/assets/img/nature/cloud.png',
      audioSrc: 'audio/turtle.mp3'
    },
    {
      word: 'tree',
      translation: 'дерево',
      image: 'src/assets/img/nature/tree.png',
      audioSrc: 'audio/dolphin.mp3'
    }
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'src/assets/img/clothes/skirt.jpg',
      audioSrc: 'audio/skirt.mp3'
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'src/assets/img/clothes/pants.jpg',
      audioSrc: 'audio/pants.mp3'
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'src/assets/img/clothes/blouse.jpg',
      audioSrc: 'audio/blouse.mp3'
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'src/assets/img/clothes/dress.jpg',
      audioSrc: 'audio/dress.mp3'
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'src/assets/img/clothes/boot.jpg',
      audioSrc: 'audio/boot.mp3'
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'src/assets/img/clothes/shirt.jpg',
      audioSrc: 'audio/shirt.mp3'
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'src/assets/img/clothes/coat.jpg',
      audioSrc: 'audio/coat.mp3'
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'src/assets/img/clothes/shoe.jpg',
      audioSrc: 'audio/shoe.mp3'
    }
  ],
]


// сделать разметку для двух страниц, выкинуть их из дома и при переходе подставлять эти страницы в контейнер
// get each page after the document is loaded
const mainPage = document.querySelector('#main')
const categoryPage = document.querySelector('#category')
const pageContainer = document.querySelector('#pageContainer');
const mainCard = document.querySelectorAll('.main-card');

// remove templates from DOM
// pageContainer.removeChild(mainPage);
pageContainer.removeChild(categoryPage);

// append mainPage
// pageContainer.append(mainPage);

mainPage.addEventListener('click', (event) => {

  if (event.target.tagName === 'IMG' || event.target.tagName === 'A') {
    pageContainer.removeChild(mainPage);

    let currentCategory;
    categoryNames.forEach((item, idx) => {
      if (item === event.target.textContent || item === event.target.getAttribute("alt")) {
        currentCategory = idx;
      }
    })

    // create a card (in a container needed for flipping)
    cardsData[currentCategory].forEach(el => {
      const cardElement = document.createElement('div');
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
      categoryPage.append(cardElement);
    });
    // go back on main page we can only when click to menu
    categoryPage.insertAdjacentHTML('afterbegin', '<div class="rating"></div>')
    categoryPage.insertAdjacentHTML('beforeend', '<div class="buttons"></div>')
    pageContainer.append(categoryPage);
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
