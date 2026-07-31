import React from 'react';
import { Calendar, Printer, Plus, Church, Sparkles, Filter } from 'lucide-react';

interface HeaderProps {
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenNewEventModal: () => void;
  onPrintAll: () => void;
  totalEventsCount: number;
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
    <header className="no-print relative z-20 border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 flex items-center justify-center shadow-inner">
                <Church className="w-7 h-7 text-amber-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Parroquia Manantial & San Julián
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Formato Adviento
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Playfair_Display',serif] tracking-tight gold-gradient-text mt-0.5">
                Calendario de Jornadas Parroquiales
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onPrintAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition-all text-xs font-semibold shadow-lg shadow-amber-950/40 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir Fichas ({totalEventsCount})</span>
            </button>

            <button
              onClick={onOpenNewEventModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Agregar Evento</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          {/* Month Tabs */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mes:</span>
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {['Todos', 'Julio', 'Agosto'].map((m) => (
                <button
                  key={m}
                  onClick={() => onSelectMonth(m)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Categorías:</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {['Todas', 'Niños', 'Salud', 'Juventud', 'Familia'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                      : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800'
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
