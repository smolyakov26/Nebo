export interface Format {
  id: string
  title: string
  subtitle: string
  price: string
  description: string
  image: string
  stats: { label: string; value: string }[]
  color: string
  route: string
}

export const FORMATS: Format[] = [
  {
    id: "tandem",
    title: "ТАНДЕМ ПРЫЖОК",
    subtitle: "Первый шаг в бездну",
    price: "от 18 000 ₽",
    description: "Идеально для новичков. 60 секунд свободного падения с высоты 4000 метров в паре с опытным инструктором.",
    image: "https://picsum.photos/seed/tandem/800/1000",
    stats: [
      { label: "Высота", value: "4000м" },
      { label: "Скорость", value: "200 км/ч" }
    ],
    color: "from-orange-500 to-rose-500",
    route: "/tandem"
  },
  {
    id: "solo",
    title: "СОЛО ПРЫЖОК",
    subtitle: "Самостоятельный полёт",
    price: "от 8 000 ₽",
    description: "Для тех, кто уже прошёл обучение. Прыжки в своём темпе с полной свободой пилотирования.",
    image: "https://picsum.photos/seed/solo/800/1000",
    stats: [
      { label: "Высота", value: "3000м" },
      { label: "Скорость", value: "180 км/ч" }
    ],
    color: "from-sky-500 to-indigo-500",
    route: "/solo"
  },
  {
    id: "sport",
    title: "СПОРТ ПРЫЖОК",
    subtitle: "Для опытных пилотов",
    price: "от 5 000 ₽",
    description: "Групповые построения, фристайл и другие дисциплины для профессионалов.",
    image: "https://picsum.photos/seed/sport/800/1000",
    stats: [
      { label: "Высота", value: "3500м" },
      { label: "Группа", value: "до 8" }
    ],
    color: "from-emerald-500 to-teal-500",
    route: "/sport"
  }
]
