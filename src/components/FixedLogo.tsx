import Link from "next/link";
import Image from "next/image";

export default function FixedLogo() {
    return (
        <Link href="/" className="fixed bottom-8 right-8 z-50 hover:opacity-80 transition-opacity">
            <Image
                src="/tpp-logo.png"
                alt="The Product Papers Logo"
                width={160}
                height={140}
                priority
            />
        </Link>
    );
}
