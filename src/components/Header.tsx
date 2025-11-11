import Link from "next/link";
import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/manifesto", label: "Manifesto" },
  { 
    href: "/now", 
    label: "Now",
    className: "link-mono italic px-2 py-.5 hover:underline hover:underline-offset-4 transition-all duration-200",
    style: { backgroundColor: '#8ADD90', fontWeight: 600, letterSpacing: '0.1em' }
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 pt-6 pb-4 pl-8 pr-12 flex items-center justify-between">
      {/* Strong blur at top */}
      <div className="absolute inset-0 backdrop-blur-[10px] -z-10" 
           style={{
             backgroundColor: 'rgba(166, 142, 253, 0.25)',
             maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
           }}
      />
      {/* Medium blur in middle */}
      <div className="absolute inset-0 backdrop-blur-[4px] -z-10" 
           style={{
             backgroundColor: 'rgba(178, 157, 252, 0.05)',
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, transparent 100%)'
           }}
      />
      {/* Light blur at bottom */}
      <div className="absolute inset-0 backdrop-blur-[1px] -z-10" 
           style={{
             backgroundColor: 'rgba(178, 157, 252, 0)',
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
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className={link.className || "link-mono hover:underline hover:underline-offset-4 transition-all duration-200"}
                style={link.style}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
