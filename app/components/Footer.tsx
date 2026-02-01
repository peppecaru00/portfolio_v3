"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp, Instagram, Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socials = [
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Email", href: "mailto:hello@example.com", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black pointer-events-none" />
      
      {/* Top Border Animation */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
      />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main CTA Section */}
        <div className="py-24 md:py-32 lg:py-40 border-b border-neutral-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              Let's create<br />
              something<br />
              <span className="text-neutral-500">extraordinary</span>
            </h2>
            
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-3 text-xl md:text-2xl font-medium hover:text-neutral-400 transition-colors duration-300"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>

        {/* Middle Section - Socials & Info Grid */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Location Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4 lg:col-span-3"
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6">
              Location
            </h3>
            <address className="not-italic text-lg md:text-xl font-medium leading-relaxed text-neutral-300">
              Based in<br />
              New York City<br />
              <span className="text-neutral-600 text-base mt-2 block">
                Working worldwide
              </span>
            </address>
          </motion.div>

          {/* Contact Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 lg:col-span-3"
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6">
              Contact
            </h3>
            <div className="space-y-2">
              <a 
                href="mailto:hello@example.com" 
                className="block text-lg md:text-xl font-medium hover:text-neutral-400 transition-colors"
              >
                hello@example.com
              </a>
              <a 
                href="tel:+1234567890" 
                className="block text-lg md:text-xl font-medium hover:text-neutral-400 transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
          </motion.div>

          {/* Social Links Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 lg:col-span-3 lg:col-start-10"
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6">
              Follow
            </h3>
            <div className="flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-neutral-800 hover:border-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright & Back to Top */}
        <div className="py-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-neutral-600">
            <span>© {currentYear} Portfolio. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-white transition-colors duration-300"
          >
            <span className="uppercase tracking-widest">Back to top</span>
            <div className="relative w-8 h-8 rounded-full border border-neutral-800 group-hover:border-white flex items-center justify-center transition-colors duration-300">
              <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Large Text Background */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.div 
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="whitespace-nowrap text-[20vw] font-bold tracking-tighter text-neutral-950 leading-none opacity-50"
        >
          CREATE • DESIGN • BUILD • IMAGINE • CREATE • DESIGN • BUILD • IMAGINE •
        </motion.div>
      </div>
    </footer>
  );
}