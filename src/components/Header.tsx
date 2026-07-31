import React from 'react';
import { Calendar, Printer, Plus, Flame, Filter } from 'lucide-react';

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
    <header className="no-print relative z-20 border-b border-sky-500/20 bg-[#060b18]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-b from-[#15397a] to-[#091530] border border-amber-400/60 flex items-center justify-center shadow-lg">
              <Flame className="w-6 h-6 text-amber-400 candle-flame" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#15397a]/60 text-amber-300 border border-sky-400/30">
                  Nuestra Señora de la Candelaria
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-['Playfair_Display',serif] tracking-tight gold-gradient-text">
                Calendario Parroquial
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onPrintAll}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#15397a]/40 border border-sky-400/40 text-sky-200 hover:bg-[#15397a]/80 transition-all text-xs font-semibold shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Imprimir Fichas ({totalEventsCount})</span>
            </button>

            <button
              onClick={onOpenNewEventModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Agregar Evento</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Month Tabs */}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Mes:</span>
            <div className="flex items-center gap-1 bg-[#091530] p-1 rounded-xl border border-sky-900/60">
              {['Todos', 'Julio', 'Agosto'].map((m) => (
                <button
                  key={m}
                  onClick={() => onSelectMonth(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-[#15397a]/40'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0">Categoría:</span>
            <div className="flex items-center gap-1 shrink-0">
              {['Todas', 'Niños', 'Salud', 'Juventud', 'Familia'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#15397a] text-sky-200 border border-sky-400/60 shadow-sm'
                      : 'bg-[#091530]/60 text-slate-400 hover:text-slate-200 border border-slate-800'
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
