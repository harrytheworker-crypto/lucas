export default function ServicesPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container-site py-16">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-center">
          How We Can Work Together
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Three options depending on where you are in your journey.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            number="01"
            title="Growth Audit"
            price="5,000 DKK"
            description="One-time engagement. Perfect if you're not sure what's working and what isn't."
            features={[
              "2-hour comprehensive analysis",
              "Website conversion review",
              "Ad performance audit",
              "Prioritized 90-day action plan",
            ]}
          />
          <ServiceCard 
            number="02"
            title="Fractional CMO"
            price="20,000 DKK/month"
            description="Ongoing partnership. I become your strategic growth partner."
            features={[
              "1-1.5 hours/day dedicated time",
              "Full marketing strategy & execution",
              "Weekly performance reviews",
              "Priority support",
            ]}
            featured
          />
          <ServiceCard 
            number="03"
            title="Complete Package"
            price="30,000 DKK + 15,000/month"
            description="Website development plus ongoing growth management."
            features={[
              "Custom website development",
              "Conversion-optimized design",
              "All Fractional CMO services",
              "3-month minimum commitment",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ number, title, price, description, features, featured }: any) {
  return (
    <div className={`p-8 rounded-2xl border ${featured ? 'border-accent bg-white shadow-xl scale-105' : 'border-gray-200 bg-white'}`}>
      {featured && (
        <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full mb-4">
          Most Popular
        </span>
      )}
      <p className="text-accent font-semibold mb-2">{number}</p>
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-2xl font-bold text-accent mb-4">{price}</p>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-gray-600">
            <span className="text-accent">✓</span> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-medium ${featured ? 'btn-primary' : 'btn-secondary'}`}>
        Get Started
      </button>
    </div>
  );
}
