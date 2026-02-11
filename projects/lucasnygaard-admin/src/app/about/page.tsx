export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container-site py-16">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-6">
          The Journey from IT Support to Growth Strategist
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          I'm not your typical marketer. My path started in doctor's offices in Denmark, 
          passed through one of Europe's most famous startup offices, and landed me in Bali.
        </p>
        
        <div className="prose prose-lg max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">How It Started</h2>
          <p className="text-gray-600 mb-6">
            My first real job was in IT support, fixing computer systems for doctors in my hometown 
            of Herning, Denmark. I had a company car (a Mercedes, actually) and good working conditions. 
            But I knew I wanted something different.
          </p>
          
          <p className="text-gray-600 mb-6">
            I moved to Copenhagen and landed a role at Jesper Buch's office. If you're Danish, 
            you know who he is — the founder of Just Eat. Working alongside him taught me what 
            real growth looks like.
          </p>

          <h2 className="text-2xl font-semibold mb-4">The Pivot to Marketing</h2>
          <p className="text-gray-600 mb-6">
            Four years ago, I moved to Bali. What started as helping friends with their businesses 
            evolved into working with major clients. Blue Sportswear became my first major client, 
            and five years later, we're still working together.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl my-8">
            <h3 className="font-semibold mb-4">My Philosophy</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Systems over hacks</li>
              <li>• Data over opinions</li>
              <li>• Efficiency over busywork</li>
              <li>• Long-term partnerships over transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
