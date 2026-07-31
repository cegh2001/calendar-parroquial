import React from 'react';
import { Search, Grid, List, ShieldCheck, ChevronDown } from 'lucide-react';

interface HeroLiturgicoProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'doors' | 'agenda';
  onViewModeChange: (mode: 'doors' | 'agenda') => void;
  totalEvents: number;
}

export const HeroLiturgico: React.FC<HeroLiturgicoProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalEvents,
}) => {
  return (
    <div className="no-print relative border-b border-amber-900/30 bg-gradient-to-b from-[#091226] via-[#0D1833] to-[#070D1B] pt-4 pb-5 px-4 sm:px-6 lg:px-8 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Sacred Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        
        {/* Compact Title Row & Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Nuestra Señora de la Candelaria • {totalEvents} Jornadas Registradas</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Calendario de Eventos y Jornadas Parroquiales
            </h1>
          </div>

          {/* Quick Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar jornada o lugar..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#09142A] border border-amber-900/40 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-amber-300 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Switcher: Puertas vs Agenda */}
            <div className="flex items-center bg-[#09142A] border border-amber-900/50 rounded-xl p-1 shadow-inner self-stretch sm:self-auto shrink-0">
              <button
                onClick={() => onViewModeChange('doors')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'doors'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Puertas del Mes</span>
              </button>
              
              <button
                onClick={() => onViewModeChange('agenda')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'agenda'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Vista Agenda</span>
              </button>
            </div>
          </div>

        </div>

        {/* Clear Indicator Pointing to the Event Doors Grid */}
        <div className="pt-2 flex items-center justify-center border-t border-slate-800/60">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300/90 animate-bounce">
            <span>Tocá cualquier ventana abajo para abrir la puerta del evento</span>
            <ChevronDown className="w-4 h-4 text-amber-400" />
          </div>
        </div>

      </div>
    </div>
  );
};

