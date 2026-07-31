import React from 'react';
import { 
  ParochialEvent 
} from '../data/events';
import { 
  Baby, 
  Stethoscope, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  Sun, 
  Cross, 
  Church, 
  BookOpen, 
  Clock, 
  MapPin, 
  Eye, 
  Printer,
  Lock,
  Unlock
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
  Sun,
  Cross,
  Church,
  BookOpen,
};

export const AdventCard: React.FC<AdventCardProps> = ({
  event,
  isOpened,
  onToggleOpen,
  onOpenDetails,
  onPrintSingle,
}) => {
  const IconComponent = ICON_MAP[event.iconName] || Church;

  return (
    <div className="perspective-1000 h-[280px] w-full relative">
      <div
        className={`door-wrapper w-full h-full relative cursor-pointer group ${
          isOpened ? 'is-opened' : ''
        }`}
        onClick={() => onToggleOpen(event.id)}
      >
        {/* FRONT OF THE DOOR (UNOPENED WINDOW - ADVVENT / ADVENTJS STYLE) */}
        <div className="door-front absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 p-5 flex flex-col justify-between shadow-xl shadow-slate-950/80 group-hover:border-amber-400/60 group-hover:shadow-amber-500/10 transition-all overflow-hidden z-20">
          {/* Background Decorative Pattern / Stained Glass Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Door Header (Date & Category Badge) */}
          <div className="flex items-center justify-between relative z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-slate-800/80 text-amber-300 border border-amber-500/20">
              {event.dateString}
            </span>

            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-amber-300 transition-colors">
              {isOpened ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />}
              <span>{isOpened ? 'Abierta' : 'Abrir Puerta'}</span>
            </span>
          </div>

          {/* Center Door Number & Icon Emblem */}
          <div className="my-auto flex flex-col items-center justify-center relative z-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 group-hover:border-amber-400/60 transition-transform">
              <IconComponent className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />
            </div>

            {/* Giant Advent Day Stamp */}
            <div className="font-['Cinzel',serif] text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 tracking-tight">
              #{event.doorNumber}
            </div>

            <p className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[200px] mt-1">
              {event.title}
            </p>
          </div>

          {/* Door Footer */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
            <span className="px-2 py-0.5 rounded bg-slate-800/50 text-slate-300">
              {event.category}
            </span>
            <span className="text-amber-400/80 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Descubrir ✨
            </span>
          </div>
        </div>

        {/* BACK OF THE DOOR (REVEALED INTERIOR WINDOW) */}
        <div className={`door-back absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${event.colorGradient} bg-slate-950 border-2 border-amber-500/50 p-5 flex flex-col justify-between shadow-2xl overflow-hidden`}>
          {/* Header Inside */}
          <div className="flex items-center justify-between text-xs border-b border-amber-500/20 pb-2">
            <span className="font-semibold text-amber-300 font-['Cinzel',serif]">
              {event.dateString}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30">
              #{event.doorNumber}
            </span>
          </div>

          {/* Body Inside */}
          <div className="my-auto space-y-2">
            <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">
              {event.title}
            </h3>

            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
              {event.shortSummary}
            </p>

            <div className="space-y-1 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Inside Opened Window */}
          <div className="pt-2 border-t border-amber-500/20 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(event);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Detalle</span>
            </button>

            <button
              onClick={(e) => onPrintSingle(event, e)}
              className="flex items-center justify-center p-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs cursor-pointer"
              title="Imprimir esta ficha de evento"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
