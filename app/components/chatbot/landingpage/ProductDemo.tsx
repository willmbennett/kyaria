'use client'
import { Container } from "../../landingpage/Container"
import { CldVideoPlayer, CloudinaryVideoPlayer } from "next-cloudinary"

import 'next-cloudinary/dist/cld-video-player.css';
export default function ProductDemo() {

  return (
    <section className="relative py-16 md:py-20 xl:py-32">
      <Container>
        <div className="lg:px-4 lg:mt-6 w-full justify-center">
          <div className="flex flex-col items-center gap-10">
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

              <span>Meet Eve</span>
            </p>
            <Container className='flex w-full justify-center'>
              <CldVideoPlayer
                width="1920"
                height="1080"
                src="21aea658-e7d2-4f1f-9b74-9bd1640567ea_jb5qkt"
              />
            </Container>
          </div>
        </div>
      </Container>
    </section>
  )
}
