import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 pt-6 pb-4 pl-8 pr-12 flex items-center justify-between">
      {/* Strong blur at top */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[10px] -z-10" 
           style={{
             maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
           }}
      />
      {/* Medium blur in middle */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[4px] -z-10" 
           style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, transparent 100%)'
           }}
      />
      {/* Light blur at bottom */}
      <div className="absolute inset-0 bg-white/0 backdrop-blur-[1px] -z-10" 
           style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
           }}
      />
      <Link href="/">
        <Image
          src="/tpplogo.png"
          alt="The Product Papers Logo"
          width={80}
          height={70}
          priority
          className="cursor-pointer"
        />
      </Link>
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link 
              href="/" 
              className="font-mono link-mono hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className="link-mono hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="link-mono hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className="link-mono hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              href="/manifesto" 
              className="link-mono hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Manifesto
            </Link>
          </li>
          <li>
            <Link 
              href="/now" 
              className="link-mono italic px-2 py-.5 hover:underline hover:underline-offset-4 transition-all duration-200"
              style={{ backgroundColor: '#8ADD90', fontWeight: 600, letterSpacing: '0.1em' }}
            >
              Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
