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
    <header className="no-print relative z-10 border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top bar with Branding */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Church className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  Comunidad Católica
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Estilo Adviento
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-['Cinzel',serif] mt-1">
                Calendario Parroquial
              </h1>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onPrintAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-all text-sm font-medium shadow-md shadow-amber-950/50 cursor-pointer"
              title="Imprimir fichas de eventos"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Fichas ({totalEventsCount})</span>
            </button>

            <button
              onClick={onOpenNewEventModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Agregar Evento</span>
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          {/* Month Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mes:</span>
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {['Todos', 'Julio', 'Agosto'].map((m) => (
                <button
                  key={m}
                  onClick={() => onSelectMonth(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider shrink-0">Categoría:</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {['Todas', 'Niños', 'Caridad', 'Salud', 'Juventud', 'Familia', 'Liturgia'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
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
