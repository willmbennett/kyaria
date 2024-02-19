import { Container } from '../landingpage/Container';

export const NetworkingDemo = () => {
    return (
        <section className="w-full text-center py-8 md:py-10 xl:py-16 space-y-10">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">Kyaria's Networking AI
            </h1>
            <Container className='flex w-full justify-center'>
                <iframe width="1120" height="630" src="https://www.youtube.com/embed/p_IuK0SL9Hs?si=6ZzSsCImLd8JEBcm&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </Container>
        </section >
    );
}
