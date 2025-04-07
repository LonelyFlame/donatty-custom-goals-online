const translations = {
  leverage: {
    negative: 'Негативное плечо',
    positive: 'Позитивное плечо',
    hintOptionalNegative: 'Если заполнить то сбор будет вести себя как соревновательный.',
    hintOptionalNegativeClock: 'Одинаковые - на 12 часов, максимальная разница - на 6 часов',
    hintOptionalNegativeCircle: 'Одинаковые - наверху, максимальная разница - внизу',
  },
  name: {
    label: 'Название',
    placeholder: 'Введите название виджета',
    required: 'Название обязательно для заполнения',
  },
  delay: {
    label: 'Задержка',
    placeholder: '0',
  },
  goal: {
    label: 'Ссылка на сбор',
    placeholder: 'https://widgets.donatty.com/goal/?ref=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee&token=ffffffffffffffffffffffffffffff',
    required: 'Ссылка на сбор обязательна для заполнения',
    format: 'Недействительная ссылка',
  },
  animationDuration: {
    label: 'Длительность',
    placeholder: 'В секундах',
  },
  animationFunction: {
    label: 'Функция анимации',
    placeholder: 'linear',
    hint: 'Можно выбрать и скопировать тут:'
  },
  liquid: {
    label: 'Это жидкость?',
  },
  color: {
    label: 'Цвет',
  },
  colorEmpty: {
    label: 'Цвет пустого',
  },
  colorFill: {
    label: 'Цвет заполненного',
  },
  colorFull: {
    label: 'Цвет при 100%',
  },
  bubbles: {
    colorLabel: 'Цвет пузырьков',
  },
  image: {
    label: 'Картинка',
  },
  half: {
    label: 'Полукруг?',
    hint: 'Для 100% совершит не полный оборот, а половину',
  },
  infinite: {
    label: 'Бесконечный?',
    hint: 'Даже после полного оборота(завершение цели) стрелка будет вращаться дальше. Не может быть полукругом и/или соревновательным',
  },
  rotate: {
    label: 'С поворотом?',
    hint: 'Должна ли картинка поворачиваться вслед за заполнением цели или быть статичной',
  },
  fade: {
    label: 'Fade-in-out',
  },
  plot: {
    label: 'График',
  },
  submit: {
    create: 'Создать',
    update: 'Сохранить',
    success: 'Виджет успещно сохранен!'
  },
  validation: {
    required: 'Это поле обязательно для заполнения',
  },
};

export default translations;
