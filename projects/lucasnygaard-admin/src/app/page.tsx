import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-site text-center">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-6">
              Fractional CMO for Fashion Brands
            </p>
            <h1 className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] mb-6">
              From Pinterest Ads to Full Growth Systems
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              I help fashion e-commerce brands scale their revenue with data-driven marketing strategies, 
              conversion optimization, and sustainable growth systems.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Book a Free Growth Audit
              </Link>
              <Link href="/case-studies" className="btn-secondary text-lg px-8 py-4">
                See Results
              </Link>
            </div>
            <div className="mt-16">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">Trusted by brands like</p>
              <div className="flex gap-8 justify-center text-gray-400 font-semibold">
                <span>Blue Sportswear</span>
                <span>Fulcrum</span>
                <span>Pinterestguy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="py-20">
          <div className="container-site">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4">
                Most Fashion Brands Leave Money on the Table
              </h2>
              <p className="text-gray-600 text-lg">You're running ads, posting on social, but the numbers don't add up.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ProblemCard 
                emoji="📉"
                title="Low Conversion Rates"
                description="Traffic comes in, but visitors bounce. Your website isn't optimized to turn browsers into buyers."
              />
              <ProblemCard 
                emoji="💸"
                title="Rising Ad Costs"
                description="Facebook and Google ads get more expensive every month. Without better targeting, you're burning budget."
              />
              <ProblemCard 
                emoji="🔄"
                title="No Repeat Customers"
                description="You acquire customers but they never come back. No retention system means constant new customer acquisition."
              />
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 bg-gray-50">
          <div className="container-site">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4">How I Help You Grow</h2>
              <p className="text-gray-600 text-lg">Three ways to work together.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard 
                number="01"
                title="Growth Audit"
                price="5,000 DKK"
                description="A deep dive into your current marketing, website, and growth opportunities."
                features={["2-hour comprehensive analysis", "Website conversion review", "Ad performance audit", "Prioritized action plan"]}
              />
              <ServiceCard 
                number="02"
                title="Fractional CMO"
                price="20,000 DKK/month"
                description="Ongoing growth leadership without the full-time executive cost."
                features={["1-1.5 hours/day dedicated time", "Full marketing strategy", "Weekly performance reviews", "Priority support"]}
                featured
              />
              <ServiceCard 
                number="03"
                title="Complete Package"
                price="30,000 DKK + 15,000/month"
                description="Website development plus ongoing growth management."
                features={["Custom website development", "Conversion-optimized design", "All Fractional CMO services", "3-month minimum"]}
              />
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-20 bg-primary text-white">
          <div className="container-site">
            <h2 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-center mb-16">Real Results</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <ResultCard number="5+" label="Years with Blue Sportswear" />
              <ResultCard number="2x" label="Average conversion improvement" />
              <ResultCard number="4hrs" label="My daily work limit" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container-site text-center">
            <h2 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4">
              Ready to Scale Your Fashion Brand?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Book a free 30-minute call. I'll give you 3 actionable ideas you can implement immediately.
            </p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-primary text-white">
          <div className="container-site">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-2">Lucas Nygaard</h3>
                <p className="text-gray-400">Fractional CMO for fashion brands. Based in Bali.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="/about" className="block hover:text-white">About</Link>
                  <Link href="/services" className="block hover:text-white">Services</Link>
                  <Link href="/case-studies" className="block hover:text-white">Case Studies</Link>
                  <Link href="/contact" className="block hover:text-white">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-gray-400">lucas@lucasnygaard.com</p>
                <p className="text-gray-400">Bali, Indonesia</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
              <p>&copy; 2026 Lucas Nygaard. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function ProblemCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="p-8 bg-gray-50 rounded-2xl text-center">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ServiceCard({ number, title, price, description, features, featured }: any) {
  return (
    <div className={`p-8 rounded-2xl border ${featured ? 'border-accent bg-white shadow-lg scale-105' : 'border-gray-200 bg-white'}`}>
      {featured && <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full mb-4">Most Popular</span>}
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
      <Link href="/contact" className={`w-full block text-center py-3 rounded-lg font-medium transition-colors ${featured ? 'btn-primary' : 'btn-secondary'}`}>
        Get Started
      </Link>
    </div>
  );
}

function ResultCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-5xl font-bold text-accent font-[family-name:var(--font-playfair)] mb-2">{number}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
