interface PageHeroBannerProps {
  title: string;
}

export default function PageHeroBanner({ title }: PageHeroBannerProps) {
  return (
    <section className="relative bg-[#2C2C2C] py-16 sm:py-20 md:py-28">

      {/*Orange accent*/}
      <div className="absolute left-0 top-0 h-1 w-full bg-[#C85A1A]"/>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C85A1A]">Medical Consortium of Africa</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
