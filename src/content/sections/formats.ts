export const formatsContent = {
  badge: 'Наши программы',
  title: 'ВЫБЕРИ СВОЙ',
  subtitle: 'ПУТЬ В НЕБО',
  description: 'От ознакомительных прыжков до профессионального обучения. Мы предлагаем полный спектр услуг для любителей неба.',
  formats: [
    {
      id: 'tandem',
      title: 'ТАНДЕМ ПРЫЖОК',
      subtitle: 'Первый шаг в бездну',
      price: 'от 18 000 ₽',
      description: 'Идеально для новичков. 60 секунд свободного падения с высоты 4000 метров в паре с опытным инструктором.',
      image: 'https://picsum.photos/seed/tandem/800/1000',
      stats: [
        { label: 'Высота', value: '4000м' },
        { label: 'Скорость', value: '200 км/ч' }
      ],
      color: 'from-orange-500 to-rose-500',
      route: '/tandem'
    },
    {
      id: 'solo',
      title: 'СОЛО ПРЫЖОК',
      subtitle: 'Первый самостоятельный',
      price: 'от 5 000 ₽',
      description: 'По программе ДОСААФ №1-2. Прыжок с круглым парашютом с высоты 800 метров. Принудительное раскрытие.',
      image: 'https://picsum.photos/seed/solo/800/1000',
      stats: [
        { label: 'Высота', value: '800м' },
        { label: 'Парашют', value: 'Д-1-5у' }
      ],
      color: 'from-sky-500 to-indigo-500',
      route: '/solo'
    },
    {
      id: 'sport',
      title: 'СПОРТ ПРЫЖОК',
      subtitle: 'Для опытных пилотов',
      price: 'от 5 000 ₽',
      description: 'Групповые построения, фристайл и другие дисциплины для профессионалов.',
      image: 'https://picsum.photos/seed/sport/800/1000',
      stats: [
        { label: 'Высота', value: '3500м' },
        { label: 'Группа', value: 'до 8' }
      ],
      color: 'from-emerald-500 to-teal-500',
      route: '/sport'
    }
  ]
}

export type FormatItem = typeof formatsContent.formats[number]
