export default function Impressum() {
  return (
    <div className="container mx-auto px-8 py-16 max-w-4xl">
      <main>
        <h2 className="text-3xl font-bold mb-8">Imprint</h2>
        <div className="prose prose-lg">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Information pursuant to Sect. 5 DDG</h3>
            <p className="mb-4">
              Suryanshu Rai<br />
              Max-Brauer-Allee 22<br />
              22765 Hamburg<br />
              Germany
            </p>

            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="mb-4">
              E-Mail: <a href="mailto:suryanshu.rai@orbitlabs.de" className="text-blue-600 hover:underline">suryanshu.rai@orbitlabs.de</a>
            </p>

            <h3 className="text-xl font-semibold mb-4">Person responsible for editorial</h3>
            <p className="mb-4">
              Suryanshu Rai<br />
              Max-Brauer-Allee 22<br />
              22765 Hamburg
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Disclaimer</h3>
            <p className="mb-4">
              <strong>Liability for Contents</strong><br />
              As service providers, we are liable for own contents of these websites according to Sect. 7, Para. 1 DDG. However, according to Sect. 8 to 10 DDG, service providers are not obligated to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.
            </p>
            <p>
              Legal obligations to removing information or to blocking the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of them.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}