import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="pt-6 pb-12 flex items-center justify-between px-8">
      <div>
        <Image
          src="/tpplogo.png"
          alt="The Product Papers Logo"
          width={80}
          height={70}
          priority
        />
      </div>
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link 
              href="/" 
              className="text-lg hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/now" 
              className="text-lg hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Now
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="text-lg hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
