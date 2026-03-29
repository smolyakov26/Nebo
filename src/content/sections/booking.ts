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
