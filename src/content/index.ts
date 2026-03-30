// ============================================================
// SHARED — used across multiple sections/pages
// ============================================================

export const phone_shared = '+7 (928) 630-91-44'
export const phoneHref_shared = 'tel:+79286309144'
export const email_shared = 'info@nebo-kavkaz.ru'
export const emailHref_shared = 'mailto:info@nebo-kavkaz.ru'
export const address_shared = 'Ставропольский край, г. Ессентуки, Суворовское шоссе, 1'
export const hours_shared = 'Среда — Воскресенье, с 09:00 до 18:00'
export const socials_shared = [
  { name: 'VK', url: 'https://vk.com' },
  { name: 'TG', url: 'https://t.me' },
  { name: 'YT', url: 'https://youtube.com' },
]

// ============================================================
// SECTIONS
// ============================================================

export const heroContent = {
  badge: 'Сезон 2026 открыт',
  title: 'НЕБО',
  titleAccent: 'ТВОЯ СТИХИЯ',
  description:
    'Прыжки с парашютом в Ессентуках. Почувствуйте абсолютную свободу в свободном падении с высоты 3000 метров. Тандем с инструктором — идеальный первый прыжок.',
  primaryCta: 'Выбрать прыжок',
  secondaryCta: 'Смотреть видео',
  image: '/images/home/hero-sky.jpg',
}

export const quoteContent = {
  text: 'Для большинства небо — это предел. Для нас небо — это дом.',
  author: '',
}

export const formatsContent = {
  badge: 'Наши программы',
  title: 'ВЫБЕРИ СВОЙ',
  subtitle: 'ПУТЬ В НЕБО',
  description:
    'От ознакомительных прыжков до профессионального обучения. Мы предлагаем полный спектр услуг для любителей неба.',
  formats: [
    {
      id: 'tandem',
      title: 'ТАНДЕМ ПРЫЖОК',
      subtitle: 'Первый шаг в небо с инструктором',
      price: 'от 17 000 ₽',
      description:
        'Идеально для новичков. 60 секунд свободного падения с высоты 3000 метров в паре с опытным инструктором.',
      image: '/images/home/tandem_main_page.jpg',
      stats: [
        { label: 'Высота', value: '3000м' },
        { label: 'Скорость', value: '200 км/ч' },
      ],
      color: 'from-orange-500 to-rose-500',
      route: '/tandem',
    },
    {
      id: 'solo',
      title: 'СОЛО ПРЫЖОК',
      subtitle: 'Первый самостоятельный',
      price: '7 500 ₽',
      description: 'Прыжок с круглым парашютом с высоты 800 метров. Принудительное раскрытие.',
      image: '/images/home/solo_main.jpg',
      stats: [
        { label: 'Высота', value: '800м' },
        { label: 'Парашют', value: 'Д-10' },
      ],
      color: 'from-sky-500 to-indigo-500',
      route: '/solo',
    },
    {
      id: 'sport',
      title: 'СПОРТ ПРЫЖОК',
      subtitle: 'Для тех у кого уже есть опыт',
      price: '2 000 ₽',
      description:
        'Групповые построения, фристайл и другие дисциплины для профессионалов. Высота 1200-3000.',
      image: '/images/home/sport_main.png',
      stats: [
        { label: 'Высота', value: '1200-3000м.' },
        { label: 'Группа', value: 'до 8' },
      ],
      color: 'from-emerald-500 to-teal-500',
      route: '/sport',
    },
  ],
}

export type FormatItem = (typeof formatsContent.formats)[number]

export const experienceContent = {
  badge: 'Обучение',
  title: 'ТВОЙ ПУТЬ',
  subtitle: 'В НЕБО',
  subtitleAccent: 'НАЧИНАЕТСЯ ЗДЕСЬ',
  image: '/images/home/eask.jpg',
  features: [
    {
      icon: 'Award',
      title: 'Сертифицированные инструкторы',
      description: 'Наши мастера имеют более 5000 прыжков и международные лицензии категории D.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Безопасность прежде всего',
      description: 'Современное оборудование, ежегодные экзамены и курсы повышения квалификации.',
    },
  ],
  cta: 'Узнать программу обучения',
}

export const aboutContent = {
  badge: 'О нас',
  title: 'Мы любим',
  titleAccent: 'небо',
  description:
    'Ессентукский аэроклуб — крупнейшая дропзона Кавказа. С 2000 года мы помогаем людям исполнить мечту о полёте. Прыжки с парашютом в Ессентуках для новичков и профессионалов.',
  descriptionExtended:
    'Наша команда — это более 20 сертифицированных инструкторов, каждый из которых имеет тысячи прыжков и непрерывно совершенствует своё мастерство. Мы используем только современное оборудование и строго соблюдаем все стандарты безопасности. Аэродром в Ессентуках работает среда — воскресенье.',
  yearsExperience: '25+',
  yearsLabel: 'лет опыта',
  image: '/images/home/training.jpg',
  imageAlt: 'Команда НЕБО КАВКАЗА — прыжки с парашютом в Ессентуках',
  stats: [
    { icon: 'Users', value: '5 000+', label: 'Прыжков в год' },
    { icon: 'Shield', value: '10000+', label: 'Довольных гостей' },
    { icon: 'Award', value: '20+', label: 'Профессиональных инструкторов' },
    { icon: 'Plane', value: '6', label: 'Самолётов в парке' },
  ],
}

export const contactsContent = {
  badge: 'Контакты',
  title: 'Свяжитесь',
  titleAccent: 'с нами',
  cta: 'Забронировать прыжок',
  address: address_shared,
  phone: phone_shared,
  email: email_shared,
  hours: hours_shared,
  socials: socials_shared,
  mapUrl: 'https://yandex.ru/map-widget/v1/?ll=42.832953%2C44.057855&z=15&pt=42.832953%2C44.057855',
}

export const footerContent = {
  logo: 'НЕБО КАВКАЗА',
  description: '',
  navigation: [
    { label: 'Прыжки в тандеме', href: '#formats' },
    { label: 'Обучение', href: '/training' },
    { label: 'Сертификат', href: '/certificate' },
    { label: 'Спортивные прыжки', href: '#formats' },
  ],
  contacts: [
    { label: 'Адрес', value: address_shared, icon: 'MapPin' },
    { label: 'Телефон', value: phone_shared, href: phoneHref_shared, icon: 'Phone' },
    { label: 'Email', value: email_shared, href: emailHref_shared, icon: 'Mail' },
    { label: 'Режим', value: hours_shared, icon: 'Clock' },
  ],
  copyright: '© 2026 НЕБО КАВКАЗА',
}

export const bookingContent = {
  title: 'Забронировать',
  subtitle: 'Оставьте заявку и мы перезвоним вам',
  callbackTitle: 'Обратный звонок',
  callbackSubtitle: 'Оставьте номер телефона и мы вам перезвоним',
  fields: {
    name: 'Ваше имя',
    namePlaceholder: 'Александр',
    phone: 'Телефон',
    phonePlaceholder: '+7 (999) 123-45-67',
    jumpType: 'Тип прыжка',
    date: 'Предпочитаемая дата',
    message: 'Комментарий',
    messagePlaceholder: 'Дополнительные вопросы...',
  },
  jumpTypes: [
    { value: 'tandem', label: 'Тандем прыжок' },
    { value: 'solo', label: 'Одиночный прыжок' },
    { value: 'sport', label: 'Спортивный прыжок' },
    { value: 'training', label: 'Обучение' },
  ],
  submit: 'Отправить заявку',
  submitting: 'Отправка...',
  privacy: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности',
  success: {
    title: 'Заявка отправлена!',
    message: 'Мы свяжемся с вами в ближайшее время',
  },
}

export const galleryContent = {
  badge: 'Галерея',
  title: 'ФОТО И ВИДЕО',
  titleAccent: 'Незабываемые моменты',
  description:
    'Взгляните на наши прыжки, полеты и события через объектив камеры. Здесь собраны лучшие моменты из жизни нашего аэроклуба.',
  categories: [
    { value: 'all', label: 'Все' },
    { value: 'tandem', label: 'Тандем' },
    { value: 'solo', label: 'Соло' },
    { value: 'sport', label: 'Спорт' },
    { value: 'training', label: 'Обучение' },
  ],
  media: [
    {
      id: 1,
      type: 'image',
      src: '/images/gallery/skydiver-1.jpg',
      title: 'Свободное падение',
      description: 'Момент свободного падения на высоте 3000 метров.',
      category: 'sport',
      date: '15.03.2024',
      participants: '1',
    },
    {
      id: 2,
      type: 'image',
      src: '/images/gallery/skydiver-2.jpg',
      title: 'Групповой прыжок',
      description: 'Командная работа в свободном падении.',
      category: 'sport',
      date: '20.03.2024',
      participants: '4',
    },
    {
      id: 3,
      type: 'image',
      src: '/images/gallery/skydiver-3.jpg',
      title: 'Захват флага',
      description: 'Спортивный прыжок с захватом флага.',
      category: 'sport',
      date: '25.03.2024',
      participants: '2',
    },
    {
      id: 4,
      type: 'image',
      src: '/images/gallery/skydiver-4.jpg',
      title: 'Тренировочный прыжок',
      description: 'Отработка учебных элементов.',
      category: 'training',
      date: '28.03.2024',
      participants: '1',
    },
    {
      id: 5,
      type: 'image',
      src: '/images/gallery/skydiver-5.jpg',
      title: 'Посадка на точность',
      description: 'Приземление в заданную точку.',
      category: 'sport',
      date: '01.04.2024',
      participants: '1',
    },
    {
      id: 6,
      type: 'image',
      src: '/images/gallery/skydiver-6.jpg',
      title: 'Прыжок с Ан-2',
      description: 'Прыжок с учебного самолета Ан-2.',
      category: 'training',
      date: '05.04.2024',
      participants: '3',
    },
    {
      id: 7,
      type: 'image',
      src: '/images/gallery/skydiver-7.jpg',
      title: 'Ночной прыжок',
      description: 'Спортивный прыжок в вечернее время.',
      category: 'sport',
      date: '10.04.2024',
      participants: '2',
    },
    {
      id: 8,
      type: 'image',
      src: '/images/gallery/skydiver-8.jpg',
      title: 'Соло-прыжок',
      description: 'Самостоятельный прыжок курсанта.',
      category: 'solo',
      date: '12.04.2024',
      participants: '1',
    },
    {
      id: 9,
      type: 'image',
      src: '/images/gallery/skydiver-9.jpg',
      title: 'Тандем-прыжок',
      description: 'Совместный прыжок с инструктором.',
      category: 'tandem',
      date: '15.04.2024',
      participants: '2',
    },
    {
      id: 10,
      type: 'image',
      src: '/images/gallery/skydiver-10.jpg',
      title: 'Групповая акробатика',
      description: 'Выполнение групповых фигур в свободном падении.',
      category: 'sport',
      date: '18.04.2024',
      participants: '6',
    },
  ],
}

export const certificateModalContent = {
  title: 'Купить сертификат',
  subtitle: 'Оформите подарочный сертификат на прыжок с парашютом',
  denominations: [
    { value: '17400', label: 'Тандем прыжок — 17 400 ₽' },
    { value: '7900', label: 'Самостоятельный прыжок — 7 900 ₽' },
    { value: '130000', label: 'Курс обучения — 130 000 ₽' },
    { value: 'custom', label: 'Своя сумма' },
  ],
  fields: {
    recipientName: 'Имя получателя',
    recipientNamePlaceholder: 'Иван',
    recipientLastName: 'Фамилия получателя',
    recipientLastNamePlaceholder: 'Петров',
    recipientPhone: 'Телефон получателя',
    recipientPhonePlaceholder: '+7 (999) 123-45-67',
    denomination: 'Номинал сертификата',
    customAmount: 'Своя сумма',
    senderName: 'Ваше имя (необязательно)',
    senderNamePlaceholder: 'Александр',
    message: 'Пожелание (необязательно)',
    messagePlaceholder: 'С наилучшими пожеланиями...',
  },
  submit: 'Оформить сертификат',
  submitting: 'Оформляем...',
  privacy: 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных',
  success: {
    title: 'Сертификат оформлен!',
    message: 'Мы отправим сертификат на указанный email в течение часа',
  },
}

// ============================================================
// PAGES
// ============================================================

export const homeCtaContent = {
  badge: 'Твой вызов',
  title: 'ГОТОВ',
  titleAccent: 'ВЗЛЕТЕТЬ?',
  primaryCta: 'ЗАБРОНИРОВАТЬ ПРЫЖОК',
  phone: phone_shared,
}

export const tandemContent = {
  badge: 'Тандем прыжок',
  title: 'ПЕРВЫЙ ШАГ',
  titleAccent: 'В НЕБО',
  description:
    'Испытайте незабываемые ощущения свободного падения с высоты 3000 метров! 60 секунд абсолютной свободы в паре с опытным инструктором. Идеальный старт для тех, кто хочет познать небо.',
  price: '17 000 ₽',
  priceNote: 'Цена включает всё снаряжение и инструктаж. Вес пассажира до 85 кг.',
  features: [
    { icon: 'Clock', title: '60 секунд', subtitle: 'Свободное падение' },
    { icon: 'Ruler', title: '3000 метров', subtitle: 'Высота выброски' },
    { icon: 'Wind', title: '200 км/ч', subtitle: 'Скорость падения' },
    { icon: 'ShieldCheck', title: '100%', subtitle: 'Безопасность' },
  ],
  schedule: [
    { step: '01', activity: 'Прибытие и регистрация' },
    { step: '02', activity: 'Прохождение медосмотра для допуска к прыжку' },
    { step: '03', activity: 'Теоретический инструктаж' },
    { step: '04', activity: 'Подготовка снаряжения' },
    { step: '05', activity: 'Вылет и прыжок' },
    { step: '06', activity: 'Посадка и награждение' },
  ],
  requirements: [
    'Возраст от 18 лет',
    'Вес до 85 кг',
    'Отсутствие противопоказаний по здоровью',
    'Предварительная запись обязательна',
    'Не употреблять алкоголь за 24 часа до прыжка',
  ],
  videoOptions: [
    {
      title: 'Видео с руки тандем-мастера',
      description: 'Инструктор снимает ваши эмоции на экшн-камеру во время прыжка.',
      price: '+3 000 ₽',
    },
    {
      title: 'Видео от видео-оператора',
      description:
        'Профессиональный оператор прыгает вместе с вами и снимает всё свободное падение.',
      price: '+5 000 ₽',
    },
  ],
  groupTitle: 'Групповые прыжки',
  groupDescription:
    'Организуем прыжок для компании от 5 человек. Специальные условия и скидки для корпоративов и дружеских мероприятий.',
  cta: {
    primary: 'ЗАБРОНИРОВАТЬ',
    secondary: 'ПОЗВОНИТЬ',
  },
  ctaSection: {
    title: 'ГОТОВЫ К ПЕРВОМУ ПРЫЖКУ?',
    description:
      'Забронируйте свой тандем-прыжок прямо сейчас. Мы свяжемся с вами для подтверждения.',
  },
}

export const soloContent = {
  badge: 'Ознакомительный прыжок',
  title: 'ПЕРВЫЙ',
  titleAccent: 'САМОСТОЯТЕЛЬНЫЙ',
  description:
    'По программе ДОСААФ №1-2. Прыжок с круглым парашютом Д-10 с высоты 800 метров. Принудительное раскрытие ранца. Отделение от самолёта — и вы летите!',
  price: '7 500 ₽',
  priceNote: 'Включает снаряжение, страховку, наземную подготовку',
  programSteps: [
    {
      step: '1',
      title: 'Теория',
      description:
        '3 часа наземной подготовки: история парашютизма, основы прыжка, конструкция парашюта, правила безопасности.',
    },
    {
      step: '2',
      title: 'Наземная отработка',
      description:
        '1 час на тренажёрах. Отработка действий при раскрытии парашюта, в полёте, приземления.',
    },
    {
      step: '3',
      title: 'Прыжок',
      description:
        'Прыжок с принудительным раскрытием. Отделение, управление куполом, приземление.',
    },
    {
      step: '4',
      title: 'Анализ',
      description: 'Разбор прыжка с инструктором.',
    },
  ],
  features: [
    { icon: 'Ruler', title: '800 метров', subtitle: 'Высота прыжка' },
    { icon: 'CircleDot', title: 'Круглый', subtitle: 'Парашют Д-10' },
    { icon: 'Wind', title: '5 минут', subtitle: 'Время снижения' },
    { icon: 'Target', title: '300 м', subtitle: 'Точность посадки' },
  ],
  requirements: [
    'Возраст от 16 лет (с согласия родителей до 18 лет)',
    'Отсутствие медицинских противопоказаний',
    'Отсутствие алкоголя и наркотиков за 24 часа до прыжка',
    'Наличие документа, удостоверяющего личность',
  ],
  trainingLink: 'Смотрите курс обучения',
  cta: {
    primary: 'ЗАБРОНИРОВАТЬ',
    secondary: 'ПОЗВОНИТЬ',
  },
  ctaSection: {
    title: 'ГОТОВ К САМОСТОЯТЕЛЬНОМУ ПОЛЁТУ?',
    description: 'Забронируйте прыжок или узнайте больше о дисциплинах и снаряжении.',
  },
}

export const sportContent = {
  badge: 'Спорт прыжок',
  title: 'СВОБОДНЫЙ',
  titleAccent: 'ПРЫЖОК',
  description:
    'Для парашютистов с действующей лицензией. Совершайте самостоятельные прыжки с собственной системой в нашем аэроклубе.',
  price: '2 000 ₽',
  priceNote: 'Высота 1200-3000м, самолёт АН-2',
  altitudes: {
    min: 1200,
    max: 3000,
    unit: 'метров',
  },
  requiredDocuments: [
    {
      title: '1. Паспорт',
      description: 'Действующий паспорт гражданина РФ',
      icon: 'IdCard',
      required: true,
    },
    {
      title: '2. Книжка парашютиста',
      description:
        'Допуск на текущий год с указанием парашютной системы. Обязательны печати на странице с последним прыжком',
      icon: 'BookOpen',
      required: true,
      note: 'В допуске должен быть указан парашют, с которым вы прыгаете',
    },
    {
      title: '3. Страховка',
      description: 'Страховая сумма от 300 000 ₽. В полисе обязательно указание "парашютный спорт"',
      icon: 'Shield',
      required: true,
      note: 'Можно оформить на аэродроме',
    },
    {
      title: '4. Паспорт на ПС',
      description:
        'Отметки о техническом осмотре (ТО) и укладке (ЗП) не позднее 6 месяцев. Все комплектующие вписаны в паспорт',
      icon: 'FileText',
      required: true,
      note: 'Обязательны отметки ТО и укладки ЗП',
    },
    {
      title: '5. Медицинский допуск',
      description:
        'ВЛК, ВЛЭК, медсправка на водительское удостоверение либо на получение оружия (действительна 1 год), или справка из спортдиспансера',
      icon: 'HeartPulse',
      required: true,
    },
  ],
  features: [
    { icon: 'Plane', title: '1200-3000 метров', subtitle: 'Высота выброски' },
    { icon: 'Wind', title: 'АН-2', subtitle: 'Самолёт' },
    { icon: 'Calendar', title: 'Среда-Воскресенье', subtitle: 'Дни прыжков' },
    { icon: 'MapPin', title: 'Ессентуки', subtitle: 'Аэродром' },
  ],
  cta: {
    primary: 'ЗАПЛАНИРОВАТЬ ПРЫЖОК',
    secondary: 'ПОЗВОНИТЬ',
  },
  ctaSection: {
    title: 'ГОТОВЫ К ПРЫЖКУ?',
    description:
      'Соберите необходимые документы и свяжитесь с нами для согласования даты прыжка. Проверьте все документы заранее, чтобы избежать отказа на аэродроме.',
  },
  additionalInfo: {
    title: 'ВАЖНАЯ ИНФОРМАЦИЯ',
    items: [
      'Все документы должны быть действительны на момент прыжка',
      'Страховку можно оформить непосредственно на аэродроме',
      'При отсутствии любого из документов в прыжке будет отказано',
      'Рекомендуем прибыть на аэродром заранее для проверки документов и подготовки к прыжку',
    ],
  },
}

export const trainingContent = {
  badge: 'Программа №2 ДОСААФ',
  title: 'ПОДГОТОВКА',
  titleAccent: 'ПАРАШЮТИСТА',
  image: '/images/home/eask.jpg',
  description:
    'Программа ДОСААФ №2 — базовая подготовка к выполнению прыжков с парашютной системой «Крыло». Включает 10 часов теоретической подготовки и практические упражнения , и прыжки с круглым парашютом и парашютной системой «Крыло». Группы до 6 человек.',
  price: 'от 30 000 ₽',
  priceNote: 'Стоимость зависит от выбранных упражнений и интенсивности подготовки',
  features: [
    { icon: 'Award', title: '50+', subtitle: 'Инструкторов' },
    { icon: 'ShieldCheck', title: '100%', subtitle: 'Безопасность' },
    { icon: 'Users', title: '5000+', subtitle: 'Курсантов' },
    { icon: 'Plane', title: '6', subtitle: 'Самолётов' },
  ],
  programSteps: [
    {
      step: '01',
      title: 'Теория',
      description:
        '10 часов: история парашютизма, основы прыжка, конструкция парашютов «Крыло», страхующие приборы, укладка, безопасность, особые случаи.',
      duration: '10 часов',
    },
    {
      step: '02',
      title: 'Принудительное раскрытие',
      description:
        'Прыжки на отработку техники управления куполом с принудительным раскрытием основного парашюта и отработкой особых случаев.',
      duration: '3 прыжка',
    },
    {
      step: '03',
      title: 'Упр. №8 (Стабилизация)',
      description: 'Прыжки со стабилизацией свободного падения с парашютной системой типа «Крыло».',
      duration: '6 прыжков',
    },
    {
      step: '04',
      title: 'Прыжки с парашютной системой «Крыло»',
      description:
        'Прыжки с парашютной системой «Крыло» на отработку техники управления куполом и посадки.',
      duration: '5 прыжков',
    },
  ],
  requirements: [
    'Возраст от 16 лет (с согласия родителей до 18 лет)',
    'Отсутствие медицинских противопоказаний',
    'Отсутствие алкоголя и наркотиков за 24 часа до прыжка',
    'Наличие документа, удостоверяющего личность',
  ],
  included: [
    '10 часов теоретической подготовки',
    'Практические прыжки',
    'Снаряжение на время обучения',
    'Допуски к прыжкам',
  ],
  cta: {
    primary: 'ЗАПИСАТЬСЯ НА КУРС',
    secondary: 'ПОЗВОНИТЬ',
  },
  ctaSection: {
    title: 'ГОТОВЫ НАЧАТЬ?',
    description:
      'Запишитесь на курс обучения прямо сейчас. Мы свяжемся с вами для согласования дат и ответим на все вопросы.',
  },
}

export const certificateContent = {
  badge: 'Подарочный сертификат',
  title: 'ПОДАРИ',
  titleAccent: 'НЕБО',
  description:
    'Подарочный сертификат на прыжок с парашютом — идеальный подарок для тех, кто мечтает о небе.',
  priceNote: 'Номинал сертификата',
  denominations: [
    { value: '17000', amount: '17 000 ₽', description: 'Тандем прыжок' },
    { value: '7500', amount: '7 500 ₽', description: 'Самостоятельный прыжок' },
  ],
  features: [
    {
      icon: 'Gift',
      title: 'Электронный или печатный',
      description: 'Выберите формат: красивый PDF или доставка оригинала',
    },
    {
      icon: 'Sparkles',
      title: 'Персонализация',
      description: 'Добавим имя получателя и ваше поздравление',
    },
  ],
  howItWorks: [
    {
      step: '01',
      title: 'Выберите номинал',
      description: 'Укажите сумму или выберите конкретный тип прыжка',
    },
    {
      step: '02',
      title: 'Оформите заказ',
      description: 'Укажите данные получателя и ваши пожелания',
    },
    {
      step: '03',
      title: 'Получите сертификат',
      description: 'На email придёт сертификат или отправим почтой',
    },
    {
      step: '04',
      title: 'Назначьте дату',
      description: 'Получатель бронирует удобную дату по сертификату',
    },
  ],
  cta: {
    primary: 'КУПИТЬ СЕРТИФИКАТ',
    secondary: 'ПОЗВОНИТЬ',
  },
  ctaSection: {
    title: 'ГОТОВЫ ПОДАРИТЬ НЕЗАБЫВАЕМЫЕ ЭМОЦИИ?',
    description: 'Оформите подарочный сертификат прямо сейчас. Доставка в день заказа!',
  },
}
