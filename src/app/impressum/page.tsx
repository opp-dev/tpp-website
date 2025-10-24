export default function Impressum() {
  return (
    <div className="container mx-auto px-8 py-16 max-w-4xl">
      <main>
        <h2 className="text-3xl font-bold mb-8">Impressum</h2>
        <div className="prose prose-lg">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Legal Information</h3>
            <p className="mb-4">
              <strong>The Product Papers</strong>
            </p>
            <p className="mb-2">
              Responsible for content according to § 55 Abs. 2 RStV:
            </p>
            <p>
              Suryanshu Rai<br />
              Altona, Germany
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Disclaimer</h3>
            <p>
              The content of this website has been compiled with meticulous care and to the best of our knowledge. 
              However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}