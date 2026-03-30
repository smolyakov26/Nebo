export const PHONE = {
  display: '+7 (928) 630-91-44',
  link: 'tel:+79286309144',
  value: '+79286309144',
}

export const PHONE_REGEX = /^\+7\d{10}$/

export const JUMP_TYPES = {
  TANDEM: 'tandem',
  SOLO: 'solo',
  SPORT: 'sport',
  CALLBACK: 'callback',
} as const

export type JumpType = (typeof JUMP_TYPES)[keyof typeof JUMP_TYPES]

export const FORM_TYPES = {
  BOOKING: 'booking',
  CERTIFICATE: 'certificate',
  CALLBACK: 'callback',
} as const

export type FormType = (typeof FORM_TYPES)[keyof typeof FORM_TYPES]
