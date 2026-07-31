import React from 'react';
import { Calendar, Printer, Plus, Flame, Filter, Sparkles } from 'lucide-react';

interface HeaderProps {
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenNewEventModal: () => void;
  onPrintAll: () => void;
  totalEventsCount: number;
  openedEventsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedMonth,
  onSelectMonth,
  selectedCategory,
  onSelectCategory,
  onOpenNewEventModal,
  onPrintAll,
  totalEventsCount,
}) => {
  return (
    <header className="no-print relative z-20 border-b border-amber-900/30 bg-[#070D1B]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Sacred Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-b from-[#163674] to-[#0A1329] border border-amber-400/70 flex items-center justify-center shadow-lg gold-border-glow">
              <Flame className="w-6 h-6 text-amber-400 candle-flame" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Nuestra Señora de la Candelaria
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] tracking-tight gold-gradient-text">
                Calendario Parroquial
              </h1>
            </div>
          </div>

          {/* Primary Action CTAs */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              onClick={onPrintAll}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#122042] border border-amber-500/30 text-amber-200 hover:bg-[#163674] hover:border-amber-400/60 transition-all text-xs font-semibold shadow-md cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir Fichas ({totalEventsCount})</span>
            </button>

            <button
              onClick={onOpenNewEventModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer active:scale-95 border border-amber-300/40"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Nuevo Evento</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          
          {/* Month Tabs */}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mes:</span>
            <div className="flex items-center gap-1 bg-[#09142A] p-1 rounded-xl border border-amber-900/40">
              {['Todos', 'Julio', 'Agosto'].map((m) => (
                <button
                  key={m}
                  onClick={() => onSelectMonth(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-[#163674]/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Categoría:</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {['Todas', 'Niños', 'Salud', 'Juventud', 'Familia'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-[#163674] text-amber-300 border-amber-400/70 shadow-md'
                      : 'bg-[#09142A]/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

