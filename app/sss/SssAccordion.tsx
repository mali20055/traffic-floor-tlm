"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { SssItem } from "@/lib/types";

export default function SssAccordion({ items }: { items: SssItem[] }) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  return (
    <div className="space-y-3 max-w-4xl">
      {items.map((item) => (
        <div key={item.id} className="border border-zinc-800 bg-[#16181b] rounded-none">
          <button
            onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
            className="w-full text-left p-5 flex justify-between items-center text-sm font-semibold text-white hover:text-[#f97316] transition-colors"
          >
            <span>{item.question}</span>
            <ChevronDown className={`w-4 h-4 text-[#f97316] transition-transform duration-200 ${openFaqId === item.id ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {openFaqId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-0 border-t border-zinc-800 text-sm text-zinc-400 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
