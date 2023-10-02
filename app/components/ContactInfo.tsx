import { Container } from './Container'

const contactCards = [
  {
    title: 'General enquiries',
    label: 'Email address',
    value: 'info@wavy.com',
    icon: function MailIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="h-8 w-8"
        >
          <g clipPath="url(#clip0_98_405)">
            <path
              d="M7.0002 15.9V11V2H25.0002V11V15.9L30.8002 12.7L27.0002 10.4V1C27.0002 0.4 26.6002 0 26.0002 0H6.0002C5.4002 0 5.0002 0.4 5.0002 1V10.4L1.2002 12.6L7.0002 15.9Z"
              fill="#334155"
            />
            <path
              d="M16.5 22.9C16.3 23 16.2 23 16 23C15.8 23 15.7 23 15.5 22.9L0 14.3V31C0 31.6 0.4 32 1 32H31C31.6 32 32 31.6 32 31V14.3L16.5 22.9Z"
              fill="#334155"
            />
            <path d="M22 6H10V8H22V6Z" fill="#334155" />
            <path d="M22 11H10V13H22V11Z" fill="#334155" />
          </g>
          <defs>
            <clipPath id="clip0_98_405">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    },
  },
  {
    title: 'Phone support',
    label: 'Phone number',
    value: '(323) 123-4567',
    icon: function PhoneIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="h-8 w-8"
        >
          <path
            d="M30 15C29.7348 15 29.4804 14.8946 29.2929 14.7071C29.1054 14.5196 29 14.2652 29 14C28.9966 11.0837 27.8365 8.28778 25.7744 6.22563C23.7122 4.16347 20.9163 3.00344 18 3C17.7348 3 17.4804 2.89464 17.2929 2.70711C17.1054 2.51957 17 2.26522 17 2C17 1.73478 17.1054 1.48043 17.2929 1.29289C17.4804 1.10536 17.7348 1 18 1C21.4466 1.00397 24.7509 2.37488 27.188 4.812C29.6251 7.24911 30.996 10.5534 31 14C31 14.2652 30.8946 14.5196 30.7071 14.7071C30.5196 14.8946 30.2652 15 30 15Z"
            fill="#334155"
          />
          <path
            d="M24 15C23.7348 15 23.4804 14.8946 23.2929 14.7071C23.1054 14.5196 23 14.2652 23 14C22.9984 12.6744 22.4711 11.4036 21.5338 10.4662C20.5964 9.52888 19.3256 9.00159 18 9C17.7348 9 17.4804 8.89464 17.2929 8.70711C17.1054 8.51957 17 8.26522 17 8C17 7.73478 17.1054 7.48043 17.2929 7.29289C17.4804 7.10536 17.7348 7 18 7C19.8559 7.00212 21.6351 7.7403 22.9474 9.05259C24.2597 10.3649 24.9979 12.1441 25 14C25 14.2652 24.8946 14.5196 24.7071 14.7071C24.5196 14.8946 24.2652 15 24 15Z"
            fill="#334155"
          />
          <path
            d="M21.0281 19.528L18.5831 22.585C14.7966 20.3592 11.6409 17.2036 9.41513 13.417L12.4721 10.972C12.8301 10.6851 13.0831 10.2879 13.1916 9.84216C13.3001 9.39645 13.2581 8.92736 13.0721 8.50802L10.2861 2.23502C10.0866 1.78485 9.73366 1.42024 9.29019 1.20629C8.84671 0.992337 8.34163 0.942977 7.86513 1.06702L2.56513 2.44302C2.06959 2.57133 1.63844 2.87719 1.35361 3.30251C1.06877 3.72782 0.950096 4.24295 1.02013 4.75002C1.95087 11.3774 5.0139 17.5217 9.74617 22.254C14.4785 26.9862 20.6227 30.0493 27.2501 30.98C27.7566 31.0499 28.2712 30.9315 28.6962 30.6473C29.1213 30.3631 29.4272 29.9328 29.5561 29.438L30.9321 24.138C31.0555 23.6619 31.0059 23.1575 30.7922 22.7145C30.5785 22.2715 30.2146 21.9188 29.7651 21.719L23.4921 18.93C23.073 18.7436 22.604 18.7012 22.1583 18.8094C21.7126 18.9176 21.3152 19.1703 21.0281 19.528Z"
            fill="#334155"
          />
        </svg>
      )
    },
  },
  {
    title: 'Sales',
    label: 'Email address',
    value: 'sales@wavy.com',
    icon: function RocketIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="h-8 w-8"
        >
          <g clipPath="url(#clip0_98_419)">
            <path
              d="M14.5999 3.60001C12.3071 3.27563 9.96955 3.64174 7.88567 4.65162C5.80179 5.6615 4.06604 7.26936 2.89993 9.27001C2.78729 9.46095 2.74129 9.68391 2.76917 9.90384C2.79705 10.1238 2.89721 10.3282 3.05393 10.485L5.66993 13.1C8.01743 9.39587 11.0479 6.17193 14.5999 3.60001Z"
              fill="#334155"
            />
            <path
              d="M18.8921 26.319L21.5151 28.942C21.672 29.099 21.8766 29.1993 22.0967 29.2272C22.3169 29.255 22.54 29.2089 22.7311 29.096C23.5839 28.5962 24.3707 27.9915 25.0731 27.296C26.3663 26.0123 27.34 24.443 27.916 22.7143C28.4919 20.9856 28.654 19.1458 28.3891 17.343C25.8175 20.9069 22.5952 23.9524 18.8921 26.319Z"
              fill="#334155"
            />
            <path
              d="M31.7079 0.299788C31.6088 0.199776 31.49 0.121463 31.3589 0.0698184C31.2279 0.018174 31.0876 -0.00567393 30.9469 -0.000211941C12.3599 0.971788 5.49992 17.5188 5.43192 17.6858C5.35887 17.8677 5.34087 18.067 5.38016 18.259C5.41946 18.451 5.5143 18.6272 5.65292 18.7658L13.2349 26.3468C13.3742 26.4863 13.5516 26.5815 13.7448 26.6204C13.938 26.6594 14.1385 26.6404 14.3209 26.5658C14.4869 26.4998 30.9479 19.5578 31.9999 1.05779C32.007 0.918044 31.9846 0.778373 31.9344 0.647804C31.8841 0.517235 31.8069 0.398674 31.7079 0.299788ZM18.4999 15.9998C18.0055 15.9998 17.5221 15.8532 17.111 15.5785C16.6999 15.3038 16.3794 14.9133 16.1902 14.4565C16.001 13.9997 15.9515 13.497 16.048 13.0121C16.1444 12.5271 16.3825 12.0817 16.7322 11.732C17.0818 11.3824 17.5272 11.1443 18.0122 11.0478C18.4971 10.9514 18.9998 11.0009 19.4566 11.1901C19.9134 11.3793 20.3039 11.6997 20.5786 12.1109C20.8533 12.522 20.9999 13.0053 20.9999 13.4998C20.9999 14.1628 20.7365 14.7987 20.2677 15.2676C19.7988 15.7364 19.163 15.9998 18.4999 15.9998Z"
              fill="#334155"
            />
            <path
              d="M7.828 24.172C8.57788 24.9221 8.99915 25.9393 8.99915 27C8.99915 28.0607 8.57788 29.0779 7.828 29.828C6.266 31.391 0 32 0 32C0 32 0.609 25.734 2.172 24.172C2.92211 23.4221 3.93934 23.0009 5 23.0009C6.06066 23.0009 7.07789 23.4221 7.828 24.172Z"
              fill="#334155"
            />
          </g>
          <defs>
            <clipPath id="clip0_98_419">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    },
  },
  {
    title: 'Press and media',
    label: 'Email address',
    value: 'press@wavy.com',
    icon: function PressIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="h-8 w-8"
        >
          <g clipPath="url(#clip0_98_416)">
            <path
              d="M29 0H3C2.73478 0 2.48043 0.105357 2.29289 0.292893C2.10536 0.48043 2 0.734784 2 1V31C2 31.2652 2.10536 31.5196 2.29289 31.7071C2.48043 31.8946 2.73478 32 3 32H29C29.2652 32 29.5196 31.8946 29.7071 31.7071C29.8946 31.5196 30 31.2652 30 31V1C30 0.734784 29.8946 0.48043 29.7071 0.292893C29.5196 0.105357 29.2652 0 29 0V0ZM25 26H7V24H25V26ZM25 20H7V18H25V20ZM25 14H7V6H25V14Z"
              fill="#334155"
            />
          </g>
          <defs>
            <clipPath id="clip0_98_416">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    },
  },
]

export function ContactInfo() {
  return (
    <section className="relative bg-vanilla py-16 sm:py-20">
      <Container>
        <div className="mx-auto grid max-w-lg items-center gap-12 sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="text-4xl font-semibold leading-snug text-slate-900 sm:text-[40px] sm:leading-snug xl:mx-0">
              Contact Information
            </h1>
            <p className="mt-4 max-w-sm leading-relaxed text-slate-700 lg:mt-5">
              Pellentesque massa consequat eleifend turpis eiusmod cras
              facilisis faucibus enim habitasse at vivamus pharetra.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:gap-5 xl:gap-8">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-8 xl:p-10"
              >
                <div className="flex space-x-6 xl:space-x-8">
                  <card.icon />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-6 text-md font-medium text-slate-900">
                      {card.label}:
                    </p>
                    <p className="mt-1 text-sm text-slate-700">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
