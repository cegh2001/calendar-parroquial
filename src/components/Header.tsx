import React from 'react';
import { Calendar, Printer, Plus, Flame, Sparkles, Filter, Shield } from 'lucide-react';

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
  openedEventsCount,
}) => {
  const progressPercentage = Math.round((openedEventsCount / Math.max(totalEventsCount, 1)) * 100);

  return (
    <header className="no-print relative z-20 border-b border-sky-500/20 bg-[#060b18]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Logo & Brand: Virgen de la Candelaria Theme */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-sky-500 to-rose-500 rounded-2xl blur-md opacity-50 group-hover:opacity-85 transition-opacity" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-[#15397a] to-[#091530] border-2 border-amber-400/60 flex items-center justify-center shadow-lg shadow-sky-950/60">
                <Flame className="w-8 h-8 text-amber-400 candle-flame" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full bg-[#15397a]/60 text-sky-200 border border-sky-400/30 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-300" /> Manto de la Candelaria
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300/90 font-medium">
                  <Sparkles className="w-3 h-3" /> Luz & Adviento
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Playfair_Display',serif] tracking-tight gold-gradient-text mt-0.5">
                Calendario Parroquial de Jornadas
              </h1>
            </div>
          </div>

          {/* Progress & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Progress Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs">
              <Flame className="w-4 h-4 text-amber-400 candle-flame" />
              <span className="text-slate-300 font-medium">
                Desveladas: <strong className="text-amber-300 font-bold">{openedEventsCount} de {totalEventsCount}</strong>
              </span>
              <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700 ml-1">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-sky-400 transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
            </div>

            <button
              onClick={onPrintAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15397a]/40 border border-sky-400/40 text-sky-200 hover:bg-[#15397a]/80 transition-all text-xs font-semibold shadow-lg shadow-sky-950/50 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Imprimir Fichas ({totalEventsCount})</span>
            </button>

            <button
              onClick={onOpenNewEventModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
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
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Mes:</span>
            <div className="flex items-center gap-1 bg-[#091530] p-1 rounded-xl border border-sky-900/60">
              {['Todos', 'Julio', 'Agosto'].map((m) => (
                <button
                  key={m}
                  onClick={() => onSelectMonth(m)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
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
            <Filter className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider shrink-0">Categoría:</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {['Todas', 'Niños', 'Salud', 'Juventud', 'Familia'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
