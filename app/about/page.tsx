import PageHeroBanner from "@/components/shared/PageHeroBanner";

export default function AboutPage() {
  return (
    <main>
      <PageHeroBanner title="About Us" />

      {/*Mission & Vission*/}
<section className="bg-white x-6 py-16 md:py-20">
  <div className= "mx-auto max-w-7xl">
    <div className="grid gap-8 md:grid-cols-2">



      {/*Mission*/}
      <div className="border-1-4 boarder-[#C85A1A] bg-[#F5F5F5] p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#C85A1A]">Our Mission</p>
        <h2 className="mb-4 text-3xl font-bold text-[#2C2C2C]">Advancing health through Earth Observation.</h2>
        <p className="leading-7 text-[#6B7280]">We are dedicated to leveraging data and technology to address health challenges, foster collaboration among stakeholders, and drive positive change in healthcare across the continent.</p>

      </div>


      {/*Vision*/}
<div className="boarder-1-4 boarder-[#C85A1A] bg-[#F5F5F5] p-8">
  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#C85A1A]">Our Vision</p>
  <h2 className="mb-4 text-3xl font-bold text-[#2C2C2C]">A continent where data closes the health gap.</h2>
  <p className="leading-7 text-[#6B7280]">We envision a future where data-driven health solutions and collaborative efforts lead to improved health outcomes, stronger healthcare systems, and empowered communities across Africa.</p>


</div>
</div>
</div>
</section>

    


      {/*Focus Areas*/}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold">Our Focus Areas</h2>
          <div className= "grid gap-6 md:grid-cols-3">

            {/*Disease Surveillance*/}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">🦠</div>
              <h3 className="mb-4 text-3xl font-semibold">Disease Surveillance</h3>
              <p className="text-gray-600">Using data and technonology to monitor and respond to disease outbreaks, ensuring timely interventions and improved public health outcomes.</p>
            </div>

            {/*Climate and Health*/}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">🌍</div>
              <h3 className="mb-4 text-3xl font-semibold">Climate and Health</h3>
              <p className="text-gray-600">Exploring the intersection of climate change and health, developing strategies to mitigate health risks associated with environmental changes.</p>
            </div>

            {/*Remote Sensing*/}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">📡</div>
              <h3 className="mb-4 text-3xl font-semibold">Remote Sensing</h3>
              <p className="text-gray-600">Utilizing satellite and aerial imagery to assess health risks, monitor environmental changes, and support evidence-based decision-making.</p>
            </div>
          </div>
        </div>
      </section>

      {/*CTA*/}
      <section className= "px-6 py-6 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Join Us in Making a Difference</h2>
        <a href="/contact" className="inline-flex items-center justify-center bg-[#C85A1A] text-white px-8 py-4 font-semibold transition hover:bg-[#a94814]">Get in Touch</a>
      </section>
    </main>
  )
}
