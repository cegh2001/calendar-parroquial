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
  Share2,
  CalendarPlus
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
    frontBorder: 'border-amber-500/30 hover:border-amber-400',
    backBg: 'from-[#0D172E] via-[#163674]/80 to-[#070D1B]',
    backBorder: 'border-amber-500/40',
    badge: 'bg-[#163674] text-amber-300 border-amber-400/50',
    accentText: 'text-amber-400',
  },
  'candelaria-gold': {
    frontBorder: 'border-amber-500/50 hover:border-amber-300',
    backBg: 'from-[#1C1304] via-[#0D172E] to-[#070D1B]',
    backBorder: 'border-amber-400/60',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    accentText: 'text-amber-300',
  },
  'candelaria-carmin': {
    frontBorder: 'border-rose-900/50 hover:border-amber-400',
    backBg: 'from-[#28090E] via-[#0D172E] to-[#070D1B]',
    backBorder: 'border-rose-500/50',
    badge: 'bg-rose-950 text-rose-300 border-rose-500/50',
    accentText: 'text-rose-400',
  },
  'candelaria-white': {
    frontBorder: 'border-slate-700 hover:border-amber-400',
    backBg: 'from-[#131D33] via-[#0D172E] to-[#070D1B]',
    backBorder: 'border-amber-400/40',
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

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `*${event.title}*\n📅 Fechas: ${event.dateString} (${event.time})\n📍 Lugar: ${event.location}\nParroquia Nuestra Señora de la Candelaria. ¡Te esperamos!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.fullDescription)}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="card-perspective h-[320px] w-full">
      <div className={`card-flipper ${isOpened ? 'is-flipped' : ''}`}>
        
        {/* FRONT FACE: PUERTA DE LA CANDELARIA */}
        <div
          onClick={() => onToggleOpen(event.id)}
          className={`card-face card-face-front sacred-glass-card border-2 ${theme.frontBorder} p-5 flex flex-col justify-between cursor-pointer group shadow-2xl transition-all overflow-hidden rounded-2xl gold-border-glow`}
        >
          {/* Ambient Flame Glow */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all pointer-events-none" />

          {/* Top Bar: Category Pill & Door Status */}
          <div className="flex items-center justify-between relative z-10">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#163674]/90 text-amber-300 border border-amber-400/40 shadow-sm">
              {event.category}
            </span>

            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-amber-300 transition-colors">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Abrir Ventana</span>
            </span>
          </div>

          {/* Center Seal: Icon + Large Date Number */}
          <div className="my-auto flex flex-col items-center justify-center relative z-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#163674] to-[#0A1329] border border-amber-400/60 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 group-hover:border-amber-300 transition-all gold-border-glow">
              <IconComponent className="w-7 h-7 text-amber-300 group-hover:text-white transition-colors" />
            </div>

            {/* Giant Day Number */}
            <div className="font-['Playfair_Display',serif] text-5xl font-black gold-gradient-text tracking-tight leading-none">
              {event.doorNumber}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1">
              {event.month}
            </span>
          </div>

          {/* Bottom Title Bar */}
          <div className="pt-3 border-t border-amber-900/30 relative z-10 text-center">
            <p className="text-xs text-slate-200 font-bold line-clamp-1 group-hover:text-amber-300 transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
              {event.title}
            </p>
          </div>
        </div>

        {/* BACK FACE: EVENTO DESVELADO */}
        <div className={`card-face card-face-back bg-gradient-to-b ${theme.backBg} border-2 ${theme.backBorder} p-5 flex flex-col justify-between shadow-2xl rounded-2xl overflow-hidden`}>
          
          {/* Header inside opened door: Date string + Close button */}
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-2.5">
            <span className={`px-3 py-0.5 rounded-full text-xs font-black border ${theme.badge}`}>
              {event.dateString}
            </span>

            <button
              onClick={() => onToggleOpen(event.id)}
              className="p-1 rounded-lg bg-[#070D1B]/80 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Cerrar ventana"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content inside opened card */}
          <div className="my-auto space-y-2.5">
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug font-['Playfair_Display',serif]">
              {event.title}
            </h3>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {event.shortSummary}
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 pt-1">
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
          <div className="pt-3 border-t border-amber-900/40 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(event);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Detalle</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="p-2 rounded-xl bg-[#09142A] border border-amber-500/30 text-amber-300 hover:bg-[#163674] transition-all text-xs cursor-pointer"
              title="Añadir a Google Calendar"
            >
              <CalendarPlus className="w-4 h-4" />
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-xl bg-[#09142A] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/60 transition-all text-xs cursor-pointer"
              title="Compartir por WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => onPrintSingle(event, e)}
              className="p-2 rounded-xl bg-[#09142A] border border-amber-500/30 text-amber-300 hover:bg-[#163674] transition-all text-xs cursor-pointer"
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

