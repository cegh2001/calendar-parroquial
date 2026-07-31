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
        
        {/* FRONT FACE: PUERTA DE ADVIENTO (MANTO AZUL & CANDELA DE LA CANDELARIA) */}
        <div
          onClick={() => onToggleOpen(event.id)}
          className={`card-face card-face-front bg-gradient-to-b from-[#091530] via-slate-950 to-[#060b18] border-2 ${theme.frontBorder} p-5 flex flex-col justify-between cursor-pointer group shadow-2xl transition-all overflow-hidden rounded-2xl`}
        >
          {/* Candle Flame Header Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#060b18]/80 border border-amber-400/40 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-amber-400 candle-flame" />
            <span className="text-[10px] font-extrabold text-amber-300 tracking-wider">CANDELA</span>
          </div>

          {/* Background Stained Glass Light Beam */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-amber-400/15 transition-all pointer-events-none" />

          {/* Date Tag */}
          <div className="flex items-center relative z-10 pt-1">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#15397a]/80 text-sky-100 border border-sky-400/40 shadow-sm">
              {event.dateString}
            </span>
          </div>

          {/* Center Door Medallion */}
          <div className="my-auto flex flex-col items-center justify-center relative z-10 text-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#15397a] to-[#091530] border-2 border-amber-400/60 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-amber-300 transition-transform">
                <IconComponent className="w-8 h-8 text-amber-300 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Door Number Stamp */}
            <div className="font-['Cinzel',serif] text-5xl font-black gold-gradient-text tracking-tight mt-1">
              #{event.doorNumber}
            </div>

            <p className="text-xs text-slate-200 font-bold line-clamp-1 max-w-[200px] mt-1 group-hover:text-amber-300 transition-colors">
              {event.title}
            </p>
          </div>

          {/* Bottom Bar: Action */}
          <div className="pt-3 border-t border-sky-900/60 flex items-center justify-between text-xs relative z-10">
            <span className="px-2.5 py-0.5 rounded bg-slate-900/80 text-slate-300 font-bold border border-slate-800">
              {event.category}
            </span>
            <span className="text-amber-300 font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" /> Abrir Puerta →
            </span>
          </div>
        </div>

        {/* BACK FACE: EVENTO DESVELADO */}
        <div className={`card-face card-face-back bg-gradient-to-b ${theme.backBg} border-2 ${theme.backBorder} p-5 flex flex-col justify-between shadow-2xl rounded-2xl overflow-hidden`}>
          
          {/* Header inside opened door */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${theme.badge}`}>
                {event.dateString}
              </span>
              <span className="text-xs text-amber-300 font-black">#{event.doorNumber}</span>
            </div>

            <button
              onClick={() => onToggleOpen(event.id)}
              className="p-1 rounded-lg bg-[#060b18]/80 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Cerrar ventana"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
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
