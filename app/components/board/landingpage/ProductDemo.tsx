import { Container } from "../../landingpage/Container"

export const ProductDemo = () => {

  return (
    <section className="relative pt-16 md:pt-20 xl:pt-32">
      <Container>
        <div className="lg:px-4 lg:mt-6 w-full justify-center">
          <div className="flex flex-col items-center">
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

              <span>Product Demo</span>
            </p>
            <p className="ml-3 text-slate-700 lg:ml-4 xl:ml-5 xl:text-lg my-5 max-w-2xl text-center">
              Explore how our Kanban job application tracker streamlines your job search.
            </p>
            <Container className='flex w-full justify-center'>
              <iframe width="1120" height="630" src="https://www.youtube.com/embed/AmZ6dEviIwc?si=7lj6hHj0eXINj10t&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </Container>
          </div>
        </div>
      </Container>
    </section>
  )
}
