import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid#dcdcdc', paddingTop: '24px', paddingBottom: '24px' }}>
      <div className="container mx-auto px-8 max-w-4xl">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/impressum">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutzerklaerung">Datenschutzerklärung</Link>
              </li>
            </ul>
          </div>
          <div>
            <p>Lorem ipsum</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
