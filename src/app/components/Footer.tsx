import React from "react";
import { Wallet, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-zinc-400 py-16 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black text-white">NovaBank</span>
            </div>
            <p className="text-zinc-400 mb-6 max-w-sm font-medium">
              Building the financial ecosystem of the future. Seamless, borderless, and built around your lifestyle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Features</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Transfers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Budgeting</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Vaults</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Analytics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-medium">
          <p>&copy; {new Date().getFullYear()} NovaBank. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
