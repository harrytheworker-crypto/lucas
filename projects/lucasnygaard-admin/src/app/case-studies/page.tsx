export default function CaseStudiesPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container-site py-16">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-center">
          Real Results for Real Brands
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Long-term partnerships with fashion brands that wanted more than just ad management.
        </p>

        <div className="space-y-12">
          <CaseStudy 
            client="Blue Sportswear"
            duration="5+ Years"
            results={[
              "Conversion rate improved 133% (1.2% to 2.8%)",
              "Average order value increased 45%",
              "Customer lifetime value doubled",
              "ROAS stabilized at 4-5x across all channels",
            ]}
            description="From Pinterest ads to full growth strategy — a 5-year partnership that evolved as the brand scaled."
          />
          <CaseStudy 
            client="Fulcrum"
            duration="2 Years"
            results={[
              "Launched to first $10K month within 90 days",
              "Achieved profitability on first paid campaign",
              "Built email list of 5,000+ subscribers in 6 months",
            ]}
            description="Transitioning from hourly web development to fractional CMO role for a Malaysian fashion brand."
          />
        </div>
      </div>
    </div>
  );
}

function CaseStudy({ client, duration, results, description }: any) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Client</p>
          <p className="text-xl font-semibold">{client}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Duration</p>
          <p className="text-xl font-semibold">{duration}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Focus</p>
          <p className="text-xl font-semibold">Full Growth Strategy</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-lg mb-8">{description}</p>
      
      <div className="bg-white rounded-xl p-6">
        <h3 className="font-semibold mb-4">Key Results</h3>
        <ul className="space-y-2">
          {results.map((result: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm">✓</span>
              {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
