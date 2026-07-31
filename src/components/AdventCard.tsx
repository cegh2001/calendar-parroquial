import React from 'react';
import { ParochialEvent } from '../data/events';
import { 
  Baby, 
  Stethoscope, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  Clock, 
  MapPin, 
  Eye, 
  Printer, 
  Lock, 
  RotateCcw,
  AtSign
} from 'lucide-react';

interface AdventCardProps {
  event: ParochialEvent;
  isOpened: boolean;
  onToggleOpen: (eventId: string) => void;
  onOpenDetails: (event: ParochialEvent) => void;
  onPrintSingle: (event: ParochialEvent, e: React.MouseEvent) => void;
}

const ICON_MAP = {
  Baby,
  Stethoscope,
  HeartHandshake,
  Users,
  Sparkles,
};

const THEME_STYLES = {
  amber: {
    bgGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    border: 'border-amber-500/40',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    glow: 'shadow-amber-500/10',
    accentText: 'text-amber-400',
  },
  emerald: {
    bgGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
    border: 'border-emerald-500/40',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    glow: 'shadow-emerald-500/10',
    accentText: 'text-emerald-400',
  },
  rose: {
    bgGradient: 'from-rose-950/60 via-slate-900 to-slate-950',
    border: 'border-rose-500/40',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    glow: 'shadow-rose-500/10',
    accentText: 'text-rose-400',
  },
  indigo: {
    bgGradient: 'from-indigo-950/60 via-slate-900 to-slate-950',
    border: 'border-indigo-500/40',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    glow: 'shadow-indigo-500/10',
    accentText: 'text-indigo-400',
  },
  gold: {
    bgGradient: 'from-yellow-950/60 via-slate-900 to-slate-950',
    border: 'border-amber-400/50',
    badge: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
    glow: 'shadow-amber-400/10',
    accentText: 'text-amber-300',
  },
};

export const AdventCard: React.FC<AdventCardProps> = ({
  event,
  isOpened,
  onToggleOpen,
  onOpenDetails,
  onPrintSingle,
}) => {
  const IconComponent = ICON_MAP[event.iconName] || Sparkles;
  const theme = THEME_STYLES[event.colorTheme] || THEME_STYLES.amber;

  return (
    <div className="card-perspective h-[310px] w-full">
      <div className={`card-flipper ${isOpened ? 'is-flipped' : ''}`}>
        
        {/* FRONT FACE: UNOPENED ADVENT DOOR */}
        <div
          onClick={() => onToggleOpen(event.id)}
          className="card-face card-face-front bg-gradient-to-b from-slate-900 via-slate-950 to-[#0b0e1b] border-2 border-amber-500/30 hover:border-amber-400/70 p-6 flex flex-col justify-between cursor-pointer group shadow-2xl shadow-slate-950/80 transition-all overflow-hidden rounded-2xl"
        >
          {/* Cathedral Arch & Glow Background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-700/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar: Date & Status */}
          <div className="flex items-center justify-between relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {event.dateString}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-amber-300 transition-colors">
              <Lock className="w-3.5 h-3.5 text-amber-500/70 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Abrir Puerta</span>
            </span>
          </div>

          {/* Center Emblem: Door Number & Icon */}
          <div className="my-auto flex flex-col items-center justify-center relative z-10 text-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-amber-500/40 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-amber-400 transition-transform">
                <IconComponent className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
              </div>
              <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center shadow">
                ✨
              </span>
            </div>

            {/* Door Number Stamp */}
            <div className="font-['Cinzel',serif] text-5xl font-extrabold gold-gradient-text tracking-tight mt-1">
              #{event.doorNumber}
            </div>

            <p className="text-xs text-slate-300 font-semibold line-clamp-1 max-w-[200px] mt-1 group-hover:text-amber-200 transition-colors">
              {event.title}
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
            <span className="px-2.5 py-0.5 rounded bg-slate-800/60 text-slate-300 font-medium">
              {event.category}
            </span>
            <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Desplegar →
            </span>
          </div>
        </div>

        {/* BACK FACE: REVEALED EVENT CARD */}
        <div className={`card-face card-face-back bg-gradient-to-b ${theme.bgGradient} border-2 ${theme.border} p-5 flex flex-col justify-between shadow-2xl rounded-2xl overflow-hidden`}>
          
          {/* Header inside opened door */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${theme.badge}`}>
                {event.dateString}
              </span>
              <span className="text-xs text-slate-400 font-bold">#{event.doorNumber}</span>
            </div>

            <button
              onClick={() => onToggleOpen(event.id)}
              className="p-1 rounded-lg bg-slate-900/80 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Volver a cerrar la puerta"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content inside opened door */}
          <div className="my-auto space-y-2">
            <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
              {event.title}
            </h3>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
              {event.shortSummary}
            </p>

            <div className="space-y-1 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <Clock className={`w-3.5 h-3.5 ${theme.accentText} shrink-0`} />
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`w-3.5 h-3.5 ${theme.accentText} shrink-0`} />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Footer Actions inside opened card */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(event);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-md cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Detalle</span>
            </button>

            <button
              onClick={(e) => onPrintSingle(event, e)}
              className="flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs cursor-pointer"
              title="Imprimir esta ficha de evento"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
