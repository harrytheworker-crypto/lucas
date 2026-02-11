export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container-site py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-6">
            Let's Talk Growth
          </h1>
          <p className="text-xl text-gray-600">
            Book a free 30-minute call. I'll give you 3 actionable ideas you can use immediately.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                placeholder="Your fashion brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                placeholder="Tell me about your biggest growth challenge..."
              />
            </div>
            <button type="submit" className="w-full btn-primary py-4 text-lg">
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500">Or email me directly at</p>
            <a href="mailto:lucas@lucasnygaard.com" className="text-accent font-medium hover:underline">
              lucas@lucasnygaard.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
