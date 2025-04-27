import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-primary">&lt;/&gt;</span> Dev & Debate
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              Dev & Debate helps you learn, build, and grow. From coding services to creative mentoring, we empower ideas and celebrate digital innovation.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="https://twitter.com" icon="twitter" />
              <SocialIcon href="https://github.com" icon="github" />
              <SocialIcon href="https://linkedin.com" icon="linkedin" />
              <SocialIcon href="https://instagram.com" icon="instagram" />
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <FooterLink href="/services/web-development">Web Development</FooterLink>
              <FooterLink href="/services/mobile-apps">Mobile Apps</FooterLink>
              <FooterLink href="/services/branding">Branding</FooterLink>
              <FooterLink href="/services/mentorship">Mentorship</FooterLink>
              <FooterLink href="/services/consulting">Consulting</FooterLink>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@devanddebate.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Innovation Way<br />Digital District, Techland<br />DE123 4VB</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dev & Debate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-primary transition-colors duration-200">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors duration-200"
    >
      <Image 
        src={`/images/icons/${icon}.svg`}
        alt={icon}
        width={20}
        height={20}
        className="text-primary opacity-80 hover:opacity-100"
      />
    </a>
  );
} 