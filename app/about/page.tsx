import PageHeroBanner from "@/components/shared/PageHeroBanner";

export default function AboutPage() {
  return (
    <main>
      <PageHeroBanner title="About Us" />

      {/*Mission & Vission*/}
      <section className="bg-white px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">

            {/*Mission*/}
            <div className="border-l-4 border-[#C85A1A] bg-[#F5F5F5] p-6 sm:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#C85A1A]">Our Mission</p>
              <h2 className="mb-4 text-2xl font-bold text-[#2C2C2C] sm:text-3xl">Advancing health through Earth Observation.</h2>
              <p className="leading-7 text-[#6B7280]">To leverage satellite technologies, artificial intelligence, geospatial science, and predictive analytics to improve disease surveillance, strengthen public health systems, and support sustainable development in Africa.</p>
            </div>

            {/*Vision*/}
            <div className="border-l-4 border-[#C85A1A] bg-[#F5F5F5] p-6 sm:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#C85A1A]">Our Vision</p>
              <h2 className="mb-4 text-2xl font-bold text-[#2C2C2C] sm:text-3xl">A continent where data closes the health gap.</h2>
              <p className="leading-7 text-[#6B7280]">To become Africa&apos;s leading Earth observation and health analytics consortium driving resilient, data-driven healthcare systems and environmental intelligence across the continent</p>
            </div>
          </div>
        </div>
      </section>

      {/*Focus Areas*/}
      <section className="bg-gray-50 px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-black sm:text-3xl">Our Focus Areas</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/*Disease Surveillance*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">🦠</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Disease Surveillance</h3>
              <p className="text-gray-600">Using data and technonology to monitor and respond to disease outbreaks, ensuring timely interventions and improved public health outcomes.</p>
            </div>

            {/*Climate and Health*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">🌍</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Climate and Health</h3>
              <p className="text-gray-600">Exploring the intersection of climate change and health, developing strategies to mitigate health risks associated with environmental changes.</p>
            </div>

            {/*Remote Sensing*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">📡</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Remote Sensing</h3>
              <p className="text-gray-600">Utilizing satellite and aerial imagery to assess health risks, monitor environmental changes, and support evidence-based decision-making.</p>
            </div>

            {/*Health Intelligence & Analytics*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">📈</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Health Intelligence & Analytics</h3>
              <p className="text-gray-600">EOHA, health data analytics, Geospatial intelligence, health-risk assessment and Evidence based decision support.</p>
            </div>

            {/*Healthcare Research & Consulting*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">🔍</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Healthcare Research & Consulting</h3>
              <p className="text-gray-600">Health Research, assessment, and consulting services, programme support and multidisciplinary consulting.</p>
            </div>

            {/*Technical Services*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">👩‍💻</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Technical Services</h3>
              <p className="text-gray-600">Technical support and related operational services.</p>
            </div>

            {/*Capacity Building & Project Delivery*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">📑</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Capacity Building & Project Delivery</h3>
              <p className="text-gray-600">Training, skills development, project management, implementation support and stakeholder engagement.</p>
            </div>

            {/*Earth Observational climate change mitigation and adaptation*/}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 text-3xl">🔭</div>
              <h3 className="mb-4 text-xl font-semibold text-[#2C2C2C] sm:text-2xl">Earth Observational climate change mitigation and adaptation</h3>
              <p className="text-gray-600">Using satellite data and other Earth Observation (EO) technologies to monitor climate change, identify environmental risks, predict potential impacts, and support actions that reduce greenhouse gas emissions and help communities adapt to changing climate conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/*CTA*/}
      <section className="px-6 py-16 text-center sm:px-8">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Join Us in Making a Difference</h2>
        <a href="/contact" className="inline-flex items-center justify-center bg-[#C85A1A] px-8 py-4 font-semibold text-white transition hover:bg-[#a94814]">Get in Touch</a>
      </section>
    </main>
  );
}
