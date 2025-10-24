import Link from "next/link";

export default function Header() {
  return (
    <header className="py-20 text-center">
      <h1 className="text-[40px] font-bold mb-8">
        The Product Papers
      </h1>
      <nav>
        <ul className="flex justify-center space-x-8">
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
