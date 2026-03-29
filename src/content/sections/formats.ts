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
      description:
        'Прыжок с круглым парашютом с высоты 800 метров. Принудительное раскрытие.',
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
        'Групповые построения, фристайл и другие дисциплины для профессионалов. Высота 800-2500м.',
      image: '/images/home/sport_main.png',
      stats: [
        { label: 'Высота', value: '800-2500м' },
        { label: 'Группа', value: 'до 8' },
      ],
      color: 'from-emerald-500 to-teal-500',
      route: '/sport',
    },
  ],
}

export type FormatItem = (typeof formatsContent.formats)[number]
