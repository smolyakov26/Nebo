export const certificateModalContent = {
  title: 'Купить сертификат',
  subtitle: 'Оформите подарочный сертификат на прыжок с парашютом',
  denominations: [
    { value: '18000', label: 'Тандем прыжок — 18 000 ₽' },
    { value: '5000', label: 'Ознакомительный прыжок — 5 000 ₽' },
    { value: '75000', label: 'Курс обучения — 75 000 ₽' },
    { value: 'custom', label: 'Своя сумма' }
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
    messagePlaceholder: 'С наилучшими пожеланиями...'
  },
  submit: 'Оформить сертификат',
  submitting: 'Оформляем...',
  privacy: 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных',
  success: {
    title: 'Сертификат оформлен!',
    message: 'Мы отправим сертификат на указанный email в течение часа'
  }
}
