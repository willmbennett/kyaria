import { Container } from './Container'
import { Button } from '../Button'

export function SignedInHero({ userId }: { userId: string }) {
  return (
    <section className="relative overflow-hidden">
      <Container>
          <div className='flex w-full flex-col md:flex-row'>
            <div className="lg:w-1/3 lg:p-3 py-2">
              <a href={`/profile/${userId}`}>
                <div
                  className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <img
                      className="rounded-t-lg"
                      src="/create-profile.png"
                      alt="" />

                    <div
                      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>

                  </div>
                  <div className="p-6">
                    <h5
                      className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                      1. Create a profile
                    </h5>
                    <p className="mb-4 text-base text-neutral-600">
                      Go to the Profile tab and copy  paste all your resume content into the text box. Don’t worry about formatting. After uploading, make sure the content is accurate, and add any additional details. This info will be used across all Jobs to populate interview prep materials.
                    </p>
                    <Button
                      className="mt-3.5 w-full sm:mt-0 sm:w-auto"
                    >
                      Go to my profile
                    </Button>
                  </div>
                </div>
              </a>
            </div>
            <div className="lg:w-1/3 lg:p-3 py-2">
              <a href="/board">
                <div
                  className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <img
                      className="rounded-t-lg"
                      src="/job-board.png"
                      alt="" />
                    <div
                      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>

                  </div>
                  <div className="p-6">
                    <h5
                      className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                      2. Add a job post
                    </h5>
                    <p className="mb-4 text-base text-neutral-600">
                      Next, we'll create tailored interview prep material for you. Find an online job posting page (for example one on Linkedin), ctrl a + ctrl c the job posting page, and paste the contents into the text box in the jobs tab in Kyaria. We'll scan your job post using AI and format it perfectly.
                    </p>
                    <Button
                      className="mt-3.5 w-full sm:mt-0 sm:w-auto"
                    >
                      Go to my board
                    </Button>
                  </div>
                </div>
              </a>
            </div>
            <div className="lg:w-1/3 lg:p-3 py-2">
              <a href="/board">
                <div
                  className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <img
                      className="rounded-t-lg"
                      src="/job-application.png"
                      alt="" />
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                  </div>
                  <div className="p-6">
                    <h5
                      className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                      3. Get your results
                    </h5>
                    <p className="mb-4 text-base text-neutral-600">
                      Navigate to the Jobs tab, and click on the job you want to see the interview prep materials for. On the left hand side of the screen, you'll find a menu with a tailored resume, cover letters, networking emails, “tell me about yourself” story, and STAR format behavioral interview answers.
                    </p>
                    <Button
                      className="mt-3.5 w-full sm:mt-0 sm:w-auto"
                    >
                      Go to my board
                    </Button>
                  </div>
                </div>
              </a>
            </div>
        </div>
      </Container>
    </section>
  )
}
