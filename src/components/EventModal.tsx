import React, { useEffect } from 'react';
import { ParochialEvent } from '../data/events';
import { 
  X, 
  Clock, 
  MapPin, 
  Users, 
  UserCheck, 
  Printer, 
  Share2, 
  Sparkles,
  AtSign,
  FileText,
  Flame,
  CalendarPlus
} from 'lucide-react';

interface EventModalProps {
  event: ParochialEvent | null;
  onClose: () => void;
  onPrintSingle: (event: ParochialEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onPrintSingle }) => {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  if (!event) return null;

  const handleShareWhatsApp = () => {
    const text = `*${event.title}*\n📅 Fechas: ${event.dateString} (${event.time})\n📍 Lugar: ${event.location}\nParroquia Nuestra Señora de la Candelaria. ¡Te esperamos!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddToCalendar = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.fullDescription)}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div 
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#060b17]/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* MODAL CARD CONTAINER */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0D172E] border-2 border-amber-500/40 shadow-2xl shadow-slate-950 overflow-hidden gold-border-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER (FIXED TOP) */}
        <div className="relative shrink-0 w-full p-5 sm:p-7 bg-gradient-to-r from-[#0A1329] via-[#163674] to-[#0A1329] border-b border-amber-500/30">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#070D1B]/80 text-slate-300 hover:text-white hover:bg-[#163674] border border-amber-500/30 transition-all cursor-pointer shadow-md"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
              <Flame className="w-3.5 h-3.5 text-slate-950 candle-flame" />
              #{event.doorNumber} • {event.dateString}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#070D1B]/90 text-amber-300 border border-amber-400/40">
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-black font-['Playfair_Display',serif] gold-gradient-text tracking-wide leading-tight">
            {event.title}
          </h2>
        </div>

        {/* MODAL BODY (SCROLLABLE MIDDLE) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-[#070D1B]/70">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#0D172E] border border-amber-500/20 shadow-inner">
              <div className="p-2 rounded-xl bg-[#163674] border border-amber-400/30 text-amber-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Horario</span>
                <span className="text-sm font-bold text-slate-100">{event.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#0D172E] border border-amber-500/20 shadow-inner">
              <div className="p-2 rounded-xl bg-[#163674] border border-amber-400/30 text-amber-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Lugar</span>
                <span className="text-sm font-bold text-slate-100">{event.location}</span>
              </div>
            </div>

            {event.targetAudience && (
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#0D172E] border border-amber-500/20 shadow-inner">
                <div className="p-2 rounded-xl bg-[#163674] border border-amber-400/30 text-amber-300 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Dirigido A</span>
                  <span className="text-sm font-bold text-slate-100">{event.targetAudience}</span>
                </div>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#0D172E] border border-amber-500/20 shadow-inner">
                <div className="p-2 rounded-xl bg-[#163674] border border-amber-400/30 text-amber-300 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Organiza</span>
                  <span className="text-sm font-bold text-slate-100">
                    {event.organizer}
                    {event.socialHandle && (
                      <span className="ml-1.5 text-amber-300 font-extrabold inline-flex items-center gap-0.5">
                        <AtSign className="w-3.5 h-3.5 inline" />
                        {event.socialHandle.replace('@', '')}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Descripción de la Jornada
            </h4>
            <div className="p-5 rounded-2xl bg-[#0D172E]/80 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-line font-['Plus_Jakarta_Sans',sans-serif]">
              {event.fullDescription}
            </div>
          </div>

          {/* Note for Attendees */}
          {event.printableNotes && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#163674]/40 to-[#0A1329] border border-amber-500/30 flex items-start gap-3.5">
              <FileText className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-black text-amber-300">Nota para Asistentes</span>
                <p className="text-xs text-slate-200 mt-1 leading-snug">{event.printableNotes}</p>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER (FIXED BOTTOM) */}
        <div className="shrink-0 p-4 sm:p-5 border-t border-slate-800 bg-[#070D1B] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0D172E] hover:bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0D172E] hover:bg-[#163674] border border-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Guardar en Calendario</span>
            </button>
          </div>

          <button
            onClick={() => onPrintSingle(event)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha</span>
          </button>
        </div>

      </div>
    </div>
  );
};

