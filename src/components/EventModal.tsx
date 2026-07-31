import React from 'react';
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
  FileText
} from 'lucide-react';

interface EventModalProps {
  event: ParochialEvent | null;
  onClose: () => void;
  onPrintSingle: (event: ParochialEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onPrintSingle }) => {
  if (!event) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} - ${event.dateString} de ${event.time} en ${event.location}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${event.title} - ${event.dateString} (${event.time})`);
      alert('¡Información del evento copiada al portapapeles!');
    }
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Banner */}
        <div className="w-full py-8 px-6 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border-b border-amber-500/30 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-slate-400 hover:text-slate-100 hover:bg-slate-950 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-slate-950 shadow-sm">
              #{event.doorNumber} • {event.dateString}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-amber-300 border border-amber-500/30">
              {event.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-['Playfair_Display',serif] tracking-wide leading-tight">
            {event.title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Quick Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Horario</span>
                <span className="text-sm font-medium text-slate-200">{event.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lugar</span>
                <span className="text-sm font-medium text-slate-200">{event.location}</span>
              </div>
            </div>

            {event.targetAudience && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <Users className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Dirigido A</span>
                  <span className="text-sm font-medium text-slate-200">{event.targetAudience}</span>
                </div>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <UserCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Organiza</span>
                  <span className="text-sm font-medium text-slate-200">
                    {event.organizer}
                    {event.socialHandle && (
                      <span className="ml-1.5 text-amber-400 font-bold inline-flex items-center gap-0.5">
                        <AtSign className="w-3.5 h-3.5 inline" />
                        {event.socialHandle.replace('@', '')}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Descripción del Evento
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 whitespace-pre-line">
              {event.fullDescription}
            </p>
          </div>

          {/* Printable Notes */}
          {event.printableNotes && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-amber-300">Nota para Asistentes</span>
                <p className="text-xs text-slate-300 mt-0.5">{event.printableNotes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir</span>
          </button>

          <button
            onClick={() => {
              onPrintSingle(event);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha</span>
          </button>
        </div>
      </div>
    </div>
  );
};
