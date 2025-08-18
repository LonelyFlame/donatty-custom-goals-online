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
  widget: {
    label: 'Ссылка на виджет',
    placeholder: 'https://widgets.donatty.com/goal/?ref=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee&token=ffffffffffffffffffffffffffffff',
    required: 'Ссылка на виджет обязательна для заполнения',
    format: 'Недействительная ссылка',
  },
  crProject: {
    label: 'Ссылка на проект',
    placeholder: 'https://crowdrepublic.ru/projects/1234567',
    required: 'Ссылка на проект обязательна для заполнения',
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
  parts: {
    label: 'Промежуточные цели',
    available: 'Только целые числа',
  },
  color: {
    label: 'Цвет',
  },
  colorEmpty: {
    label: 'Цвет при 0%',
  },
  colorMin: {
    label: 'Цвет мин.',
  },
  colorMax: {
    label: 'Цвет макс.',
  },
  colorFull: {
    label: 'Цвет при 100%',
  },
  colorFunded: {
    label: 'Цвет заливки',
  },
  colorGoals: {
    label: 'Цвет границ сверхцелей',
  },
  colorLabel: {
    label: 'Цвет текста',
  },
  colorAdditional: {
    label: 'Доп. цвет',
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
    hint: 'График сжимается к середине по краям',
  },
  sfx: {
    label: 'Со звуком?',
    hint: {
      beeps: 'Если осталось менее 5% появляется звук сердечного ритма.',
      death: 'Непрерывный "мертвый" писк при 0%.',
    },
  },
  plot: {
    label: 'График',
    sin: 'Синусоида',
    heart: 'ЭКГ',
  },
  crGoal: {
    label: 'Цели для отображения',
    nearest: 'Ближайшая цель',
    main: 'Только основная цель',
    full: 'Все цели',
  },
  maxValue: {
    label: 'Макс. значение',
    placeholder: 'В рублях',
  },
  lifetime: {
    label: 'Время жизни',
    placeholder: 'В минутах',
    hint: {
      units: 'В минутах',
      description: 'Время, за которое "жизнь" падает со 100% до 0%',
      ticks: 'Уровень жизни будет уменьшать на 1% за шаг',
    },
  },
  submit: {
    create: 'Создать',
    update: 'Сохранить',
    success: 'Виджет успещно сохранен!'
  },
  validation: {
    required: 'Это поле обязательно для заполнения',
  },
  alertVisibility: {
    label: 'Время отображения (в секундах)',
    placeholder: '0',
  },
  labelTemplate: {
    label: 'Текст цели',
    placeholder: 'Собрано {amount}₽ из {goal}₽!',
    hint: {
      amount: 'уже собранная сумма.',
      goal: 'основная цель крауда. Для предзаказов всегда равна 1000.',
      goalPercentage: 'процент от основной цели.',
      next: 'следующая ближайшая цель(основаня, сверхцели).',
      nextPercentage: 'процент от следующей ближайшей цели.',
      nextName: 'название следующей ближайшей сверхцели. Пустая строка, если сверхцелей нет.',
      max: 'самая дорогая цель. Если нет сверхцелей - равна основной цели.',
      maxPercentage: 'процент от самой дорогой цели.',
      maxName: 'название самой дорогой сверхцели. Пустая строка, если сверхцелей нет.',
    },
  },
  labelAlertTemplate: {
    label: 'Текст оповещения',
    placeholder: 'Только что купили {soldCopies}: {title}!',
    hint: {
      title: 'название награды',
      copies: 'всего копий продано',
      soldCopies: 'новых копий продано(с последнего обновления)',
      backers: 'кол-во участников',
    },
  },
  oppositeVariant: {
    label: 'Тип отображения',
    options: {
      filling: 'Заполнение',
      contestation: 'Перетягивание',
    },
  },
};

export default translations;
