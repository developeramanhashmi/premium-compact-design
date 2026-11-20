import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "+919334000000",
  defaultMessage = "Hi Aman! Saw your portfolio at founder.devgronix.com and would like to discuss a project.",
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const encodedMsg = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${cleanPhone || "919334000000"}?text=${encodedMsg}`;

  return (
    <aside aria-label="WhatsApp quick connect" className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl border border-emerald-500/30 bg-neutral-900/95 p-4 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-neutral-900" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Aman Alam</p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for chat</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-neutral-400 hover:bg-white/5 hover:text-white transition"
              aria-label="Close message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-neutral-300">
            Have a project in mind or need full-stack / data expertise? Let's connect directly on WhatsApp.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-2 text-xs font-semibold text-neutral-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-neutral-900/90 px-3.5 py-2 text-xs font-medium text-emerald-300 shadow-xl backdrop-blur-md hover:border-emerald-500/50 hover:bg-neutral-800/90 transition group"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Quick Connect</span>
          <span className="text-[10px] rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400 border border-emerald-500/20">
            WhatsApp
          </span>
        </button>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Aman on WhatsApp"
          className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-950/50 ring-1 ring-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md group-hover:blur-lg transition-all" />
          <svg className="relative h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.779.98-.955 1.18-.176.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.635-.93-2.241-.244-.59-.493-.51-.678-.519-.176-.008-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.201 2.123 3.242 5.143 4.547.718.311 1.278.497 1.716.636.722.23 1.378.197 1.898.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.125-.276-.201-.577-.351zM12.04 21.688c-1.74 0-3.447-.464-4.945-1.344l-.354-.21-3.676.964.981-3.583-.231-.368A9.638 9.638 0 011.8 12.04C1.8 6.393 6.393 1.8 12.04 1.8c2.734 0 5.304 1.065 7.237 2.999a10.18 10.18 0 013 7.241c0 5.648-4.593 10.248-10.237 10.248zM12.04 0C5.4 0 0 5.4 0 12.04c0 2.12.553 4.19 1.603 6.012L0 24l6.126-1.607a11.98 11.98 0 005.914 1.547c6.64 0 12.04-5.4 12.04-12.04C24.08 5.4 18.68 0 12.04 0z" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
