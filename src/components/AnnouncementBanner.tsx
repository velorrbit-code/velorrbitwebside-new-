import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useSiteContent } from "../context/ContentContext";

export default function AnnouncementBanner() {
  const { content } = useSiteContent();

  if (!content?.banner?.enabled || !content?.banner?.text) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative z-40 bg-gradient-to-r from-purple-950 via-[#190a33] to-amber-950/80 border-b border-purple-500/30 px-4 py-2.5 text-center text-xs font-mono text-purple-200 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-amber-300 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest text-[10px] bg-amber-950/80 border border-amber-500/40 px-1.5 py-0.2 rounded">
            Notice
          </span>
        </span>
        <span className="text-slate-200">{content.banner.text}</span>
        {content.banner.linkText && content.banner.linkHref && (
          <a
            href={content.banner.linkHref}
            onClick={(e) => handleLinkClick(e, content.banner.linkHref)}
            className="inline-flex items-center gap-1 text-amber-300 hover:text-white font-bold underline underline-offset-2 ml-1"
          >
            <span>{content.banner.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
