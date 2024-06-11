import { Container } from './Container'
import { Button } from '../Button'
import Script from 'next/script'

const contactCards = [
  {
    title: 'Chat with us now',
    text: 'Lorem ipsum dolor sit amet aliqua vitae curabitur libero urna dolore orci adipiscing.',
    href: '#',
    buttonLabel: 'Chat with us',
    icon: function ChatIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="77"
          viewBox="0 0 81 77"
          className="h-12 w-12 lg:h-16 lg:w-16"
        >
          <path
            d="M74.6563 35.2365C71.1229 49.73 55.3149 60.695 36.3999 60.695C33.363 60.6919 30.3331 60.3984 27.3506 59.8184L27.1699 59.9053C32.1892 66.798 41.6467 71.2242 51.9999 71.2242C54.9355 71.2244 57.8602 70.8638 60.7099 70.1503L70.8369 76.302C71.0376 76.4227 71.2665 76.4872 71.4999 76.4889C71.8447 76.4889 72.1754 76.3502 72.4192 76.1034C72.663 75.8566 72.7999 75.5218 72.7999 75.1727V64.2078C77.8361 60.0369 80.5999 54.6077 80.5999 48.8495C80.5566 46.2937 80.0084 43.7725 78.9876 41.4346C77.9669 39.0966 76.4942 36.9892 74.6563 35.2365Z"
            fill="#334155"
          />
          <path
            d="M9.1 65.9596C8.75522 65.9596 8.42456 65.8209 8.18076 65.5741C7.93696 65.3273 7.8 64.9925 7.8 64.6434V47.0069C5.39466 44.6942 3.46664 41.9212 2.12771 38.8486C0.788783 35.776 0.0655707 32.4648 0 29.1071C0 13.1408 16.3293 0.151581 36.4 0.151581C56.4707 0.151581 72.8 13.1408 72.8 29.1071C72.8 45.0734 56.4707 58.0626 36.4 58.0626C33.2364 58.0589 30.0818 57.7228 26.9867 57.0597L9.6811 65.828C9.50007 65.9168 9.30115 65.9618 9.1 65.9596Z"
            fill="#334155"
          />
        </svg>
      )
    },
  },
  {
    title: 'Send us a message',
    text: 'Lorem ipsum dolor sit amet aliqua vitae curabitur libero urna dolore orci adipiscing.',
    href: '#',
    buttonLabel: 'Send message',
    icon: function MessageIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="77"
          viewBox="0 0 81 77"
          className="h-12 w-12 lg:h-16 lg:w-16"
        >
          <path
            d="M80.2875 0.47097C80.0956 0.313203 79.8637 0.209035 79.6164 0.16945C79.369 0.129865 79.1154 0.156329 78.8821 0.246053L0.88402 30.235C0.650337 30.3247 0.445782 30.4746 0.29199 30.6688C0.138198 30.863 0.0408854 31.0942 0.010346 31.3381C-0.0201935 31.5819 0.0171751 31.8293 0.118499 32.0541C0.219824 32.2789 0.381337 32.4727 0.585956 32.615L13.1799 41.3799L45.0337 26.9416L19.4991 45.7788V75.1243C19.4979 75.3788 19.5696 75.6286 19.706 75.8454C19.8424 76.0621 20.0381 76.2371 20.2709 76.3506C20.5037 76.4641 20.7643 76.5115 21.0233 76.4875C21.2822 76.4635 21.5291 76.3691 21.736 76.2148L41.7648 61.2749L63.263 76.2352C63.4982 76.3998 63.7803 76.488 64.0694 76.4874C64.2443 76.4873 64.4176 76.4554 64.5806 76.3934C64.7964 76.3097 64.9874 76.1746 65.1362 76.0004C65.2851 75.8261 65.3871 75.6182 65.433 75.3956L80.7541 1.78639C80.8043 1.54633 80.7874 1.29746 80.7053 1.06598C80.6232 0.834488 80.4789 0.628943 80.2875 0.47097Z"
            fill="#334155"
          />
        </svg>
      )
    },
  },
]

export const OrganizationsHeader = () => {
  return (
    <section className="relative overflow-hidden bg-amber-100 pt-16 sm:pt-24">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="flex items-center space-x-3.5 text-xl font-medium text-amber-900/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={3}
              viewBox="0 0 28 3"
              fill="none"
            >
              <line
                y1="1.5"
                x2={28}
                y2="1.5"
                stroke="currentColor"
                strokeOpacity="0.65"
                strokeWidth={3}
              />
            </svg>

            <span>Book Demo</span>
          </p>
          <h1 className="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0">
            See Kyaria.ai in action.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700 sm:mt-6">
            Schedule a 30-minute product demo with expert Q&A.
          </p>
        </div>
      </Container>
      <div className="relative pt-16">
        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
          <div className="flex-1 bg-amber-100" />
          <div className="w-full flex-1 bg-vanilla" />
          <div className="flex-1 bg-vanilla" />
        </div>
        <Container className='flex w-full justify-center min-h-screen'>
          <div
            className="relative border border-gray-secondary-400/60 bg-white p-8 lg:px-12 lg:py-10 w-full max-w-3xl"
          >
            <div className="embedsocial-forms-iframe" data-ref="32bb37e7cb580f2d3785928ab27fc46373e838e8" data-widget="true" data-height="auto"></div>
            <Script
              dangerouslySetInnerHTML={{
                __html: `(function(d, s, id){var js; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "https://embedsocial.com/cdn/ef.js"; d.getElementsByTagName("head")[0].appendChild(js);}(document, "script", "EmbedSocialFormsScript"));`
              }}
            >
            </Script>
          </div>
        </Container>
      </div>

      <div className="h-16 bg-vanilla sm:h-24"></div>
    </section >
  )
}
