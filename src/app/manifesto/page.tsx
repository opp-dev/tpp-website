export default function ManifestoPage() {
  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="container mx-auto px-6 md:px-8 max-w-4xl pt-12 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Manifesto</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            Product development is the art and science of turning ideas into reality. It's where creativity meets 
            strategy, where user needs intersect with business goals, and where innovation transforms into impact.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Principles</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">User-Centered Design</h3>
              <p className="text-gray-700">
                Always start with the user. Understand their needs, pain points, and aspirations before building solutions.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Iterate Quickly</h3>
              <p className="text-gray-700">
                Move fast, learn faster. Embrace experimentation and let data guide your decisions.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Keep the Bigger Picture</h3>
              <p className="text-gray-700">
                Balance short-term wins with long-term vision. Every decision should ladder up to your strategic goals.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Validate Assumptions</h3>
              <p className="text-gray-700">
                Question everything. Test your hypotheses before committing significant resources.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mt-12">
            This manifesto guides everything we publish at The Product Papers. It's our commitment to sharing 
            practical, actionable insights that respect both the art and science of product development.
          </p>
        </div>
      </main>
    </div>
  );
}
