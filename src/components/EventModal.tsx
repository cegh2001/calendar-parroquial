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
  Shield
} from 'lucide-react';

interface EventModalProps {
  event: ParochialEvent | null;
  onClose: () => void;
  onPrintSingle: (event: ParochialEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onPrintSingle }) => {
  // Prevent background body scrolling when modal is open
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} - ${event.dateString} (${event.time}) en ${event.location}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${event.title} - ${event.dateString} (${event.time}) - ${event.location}`);
      alert('¡Información del evento copiada al portapapeles!');
    }
  };

  return (
    <div 
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#060b18]/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* MODAL CARD CONTAINER */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#091530] border-2 border-sky-400/50 shadow-2xl shadow-sky-950/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER (FIXED TOP) */}
        <div className="relative shrink-0 w-full p-5 sm:p-7 bg-gradient-to-r from-[#091530] via-[#15397a] to-[#091530] border-b border-amber-400/30">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#060b18]/80 text-slate-300 hover:text-white hover:bg-[#15397a] border border-sky-400/30 hover:border-amber-400 transition-all cursor-pointer shadow-md"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
              <Flame className="w-3.5 h-3.5 text-slate-950 candle-flame" />
              #{event.doorNumber} • {event.dateString}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#060b18]/80 text-sky-200 border border-sky-400/40">
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Playfair_Display',serif] gold-gradient-text tracking-wide leading-tight">
            {event.title}
          </h2>
        </div>

        {/* MODAL BODY (SCROLLABLE MIDDLE) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-[#060b18]/60">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#091530]/90 border border-sky-500/30 shadow-inner">
              <div className="p-2 rounded-xl bg-[#15397a] border border-sky-400/40 text-amber-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Horario</span>
                <span className="text-sm font-bold text-slate-100">{event.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#091530]/90 border border-sky-500/30 shadow-inner">
              <div className="p-2 rounded-xl bg-[#15397a] border border-sky-400/40 text-amber-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Lugar</span>
                <span className="text-sm font-bold text-slate-100">{event.location}</span>
              </div>
            </div>

            {event.targetAudience && (
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#091530]/90 border border-sky-500/30 shadow-inner">
                <div className="p-2 rounded-xl bg-[#15397a] border border-sky-400/40 text-amber-300 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Dirigido A</span>
                  <span className="text-sm font-bold text-slate-100">{event.targetAudience}</span>
                </div>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#091530]/90 border border-sky-500/30 shadow-inner">
                <div className="p-2 rounded-xl bg-[#15397a] border border-sky-400/40 text-amber-300 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Organiza</span>
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
            <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Descripción de la Jornada
            </h4>
            <div className="p-5 rounded-2xl bg-[#091530]/70 border border-sky-900/80 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {event.fullDescription}
            </div>
          </div>

          {/* Note for Attendees */}
          {event.printableNotes && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#15397a]/40 to-[#091530] border border-amber-400/40 flex items-start gap-3.5">
              <FileText className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-extrabold text-amber-300">Nota para Asistentes</span>
                <p className="text-xs text-slate-200 mt-1 leading-snug">{event.printableNotes}</p>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER (FIXED BOTTOM) */}
        <div className="shrink-0 p-4 sm:p-5 border-t border-sky-900 bg-[#060b18] flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#091530] hover:bg-[#15397a] border border-sky-400/30 text-sky-200 text-xs font-extrabold transition-all cursor-pointer shadow-md"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span>Compartir Evento</span>
          </button>

          <button
            onClick={() => onPrintSingle(event)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha</span>
          </button>
        </div>

      </div>
    </div>
  );
};
