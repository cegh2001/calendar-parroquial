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
  Flame
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

const CANDELARIA_THEMES = {
  'candelaria-blue': {
    frontBorder: 'border-sky-500/40 hover:border-amber-400/80',
    backBg: 'from-[#091530] via-[#15397a]/60 to-[#060b18]',
    backBorder: 'border-sky-400/60',
    badge: 'bg-[#15397a] text-sky-200 border-sky-400/40',
    accentText: 'text-sky-300',
  },
  'candelaria-gold': {
    frontBorder: 'border-amber-500/40 hover:border-amber-300',
    backBg: 'from-amber-950/70 via-slate-900 to-[#060b18]',
    backBorder: 'border-amber-400/60',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentText: 'text-amber-400',
  },
  'candelaria-carmin': {
    frontBorder: 'border-rose-500/40 hover:border-amber-400/80',
    backBg: 'from-rose-950/70 via-slate-900 to-[#060b18]',
    backBorder: 'border-rose-400/60',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    accentText: 'text-rose-400',
  },
  'candelaria-white': {
    frontBorder: 'border-slate-400/40 hover:border-amber-400/80',
    backBg: 'from-slate-900 via-[#15397a]/40 to-[#060b18]',
    backBorder: 'border-slate-300/50',
    badge: 'bg-slate-800 text-slate-200 border-slate-700',
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
  const theme = CANDELARIA_THEMES[event.colorTheme] || CANDELARIA_THEMES['candelaria-blue'];

  return (
    <div className="card-perspective h-[310px] w-full">
      <div className={`card-flipper ${isOpened ? 'is-flipped' : ''}`}>
        
        {/* FRONT FACE: PUERTA DE ADVIENTO */}
        <div
          onClick={() => onToggleOpen(event.id)}
          className={`card-face card-face-front bg-gradient-to-b from-[#091530] via-slate-950 to-[#060b18] border-2 ${theme.frontBorder} p-5 flex flex-col justify-between cursor-pointer group shadow-xl transition-all overflow-hidden rounded-2xl`}
        >
          {/* Subtle Ambient Light Beam */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-amber-400/15 transition-all pointer-events-none" />

          {/* Top Bar: Category Pill on Left, Lock Status on Right */}
          <div className="flex items-center justify-between relative z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#15397a]/80 text-sky-200 border border-sky-400/30">
              {event.category}
            </span>

            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-amber-300 transition-colors">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Abrir Puerta</span>
            </span>
          </div>

          {/* Center Emblem: Day Number & Month */}
          <div className="my-auto flex flex-col items-center justify-center relative z-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#15397a] to-[#091530] border border-amber-400/50 flex items-center justify-center shadow-md mb-2 group-hover:scale-105 group-hover:border-amber-300 transition-transform">
              <IconComponent className="w-7 h-7 text-amber-300 group-hover:text-white transition-colors" />
            </div>

            {/* Giant Day Number */}
            <div className="font-['Cinzel',serif] text-5xl font-black gold-gradient-text tracking-tight leading-none">
              {event.doorNumber}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">
              {event.month}
            </span>
          </div>

          {/* Bottom Bar: Title */}
          <div className="pt-2.5 border-t border-sky-900/60 relative z-10 text-center">
            <p className="text-xs text-slate-200 font-bold line-clamp-1 group-hover:text-amber-300 transition-colors">
              {event.title}
            </p>
          </div>
        </div>

        {/* BACK FACE: EVENTO DESVELADO */}
        <div className={`card-face card-face-back bg-gradient-to-b ${theme.backBg} border-2 ${theme.backBorder} p-5 flex flex-col justify-between shadow-2xl rounded-2xl overflow-hidden`}>
          
          {/* Header inside opened door: Date string + Close button */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${theme.badge}`}>
              {event.dateString}
            </span>

            <button
              onClick={() => onToggleOpen(event.id)}
              className="p-1 rounded-lg bg-[#060b18]/80 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Cerrar ventana"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content inside opened card */}
          <div className="my-auto space-y-2">
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
              {event.title}
            </h3>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {event.shortSummary}
            </p>

            <div className="space-y-1 text-xs text-slate-300 pt-1">
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

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(event);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-md cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Detalle</span>
            </button>

            <button
              onClick={(e) => onPrintSingle(event, e)}
              className="flex items-center justify-center p-2 rounded-xl bg-[#091530] border border-sky-400/40 text-amber-300 hover:bg-[#15397a] transition-all text-xs cursor-pointer"
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
