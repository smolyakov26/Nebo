import { useHead } from '@unhead/vue'

interface BreadcrumbItem {
  name: string
  url: string
}

interface ServiceSchema {
  name: string
  description: string
  price: string
  priceCurrency?: string
}

export function useSchemaOrg() {
  const SITE_URL = 'https://nebo-kavkaz.ru'

  function addLocalBusiness() {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsActivityLocation',
            name: 'НЕБО КАВКАЗА',
            description:
              'Крупнейшая дропзона Кавказа. Тандем прыжки, обучение парашютизму, спортивные прыжки.',
            url: SITE_URL,
            telephone: '+7-928-630-91-44',
            email: 'info@nebo-kavkaz.ru',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Ессентуки',
              addressRegion: 'Ставропольский край',
              streetAddress: 'Суворовское шоссе, 1',
              addressCountry: 'RU',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 44.057855,
              longitude: 42.832953,
            },
            openingHours: ['We-Su 09:00-18:00'],
            priceRange: '2000₽ - 130000₽',
            image: `${SITE_URL}/images/og-image.svg`,
            sameAs: ['https://vk.com', 'https://t.me', 'https://youtube.com'],
          }),
        },
      ],
    })
  }

  function addBreadcrumb(items: BreadcrumbItem[]) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          }),
        },
      ],
    })
  }

  function addService(schema: ServiceSchema) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: schema.name,
            name: schema.name,
            description: schema.description,
            provider: {
              '@type': 'SportsActivityLocation',
              name: 'НЕБО КАВКАЗА',
              url: SITE_URL,
            },
            areaServed: {
              '@type': 'Country',
              name: 'Russia',
            },
            offers: {
              '@type': 'Offer',
              price: schema.price.replace(/\s/g, ''),
              priceCurrency: schema.priceCurrency || 'RUB',
            },
          }),
        },
      ],
    })
  }

  return { addLocalBusiness, addBreadcrumb, addService }
}
