export default function ContactPage() {
  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="container mx-auto px-6 md:px-8 max-w-4xl pt-12 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Contact</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Have questions about product development? Want to share your own insights? 
            I'd love to hear from you and discuss all things product.
          </p>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Whether you're a seasoned product manager, an aspiring entrepreneur, or someone curious about 
            the product development process, let's start a conversation.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 md:p-12 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              You can reach me via email at:
            </p>
            <a 
              href="mailto:contact@productpapers.com" 
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              contact@productpapers.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
