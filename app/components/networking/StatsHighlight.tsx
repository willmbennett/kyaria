import { Container } from "../landingpage/Container";

const stats = [
  { number: '250.7M', text: 'Organizations' },
  { number: '244+', text: 'Industries Represented' },
  { number: '99.9%', text: 'Employee Headcount Coverage' },
];

export const StatsHighlight = () => {
  return (
    <section className="py-12 bg-slate-100 space-y-10">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="mt-5 text-center text-4xl font-semibold leading-snug text-slate-900 sm:mt-6 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0">
            We're combining AI with the most comprehensive database of employee data.
          </h1>
        </div>
      </Container>
      <Container>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.text} className="flex flex-col items-center text-center">
                <span className="text-3xl font-semibold text-slate-900">{stat.number}</span>
                <span className="mt-2 text-lg text-slate-700">{stat.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-600">Powered by <a href="https://www.diffbot.com/" className="text-slate-900 font-medium underline">DiffBot</a></p>
          </div>
        </div>
      </Container>
    </section>
  );
};
