import React from 'react';
import { ParochialEvent } from '../data/events';
import { Clock, MapPin, Users, CalendarPlus, Share2, Printer, Eye, ChevronRight } from 'lucide-react';

interface AgendaViewProps {
  events: ParochialEvent[];
  onOpenDetails: (event: ParochialEvent) => void;
  onPrintSingle: (event: ParochialEvent, e: React.MouseEvent) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  events,
  onOpenDetails,
  onPrintSingle,
}) => {
  const handleShareWhatsApp = (evt: ParochialEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `*${evt.title}*\n📅 Fechas: ${evt.dateString} (${evt.time})\n📍 Lugar: ${evt.location}\nParroquia Nuestra Señora de la Candelaria. ¡Te esperamos!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddToCalendar = (evt: ParochialEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title)}&details=${encodeURIComponent(evt.fullDescription)}&location=${encodeURIComponent(evt.location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {events.map((evt) => (
        <div
          key={evt.id}
          onClick={() => onOpenDetails(evt)}
          className="sacred-glass-card rounded-2xl border border-amber-900/40 hover:border-amber-400/70 p-5 transition-all shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group gold-border-glow"
        >
          {/* Left: Date Badge */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-[#163674] to-[#0A1329] border border-amber-400/50 text-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <span className="text-2xl font-black font-['Playfair_Display',serif] gold-gradient-text leading-none">
                {evt.doorNumber}
              </span>
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider mt-0.5">
                {evt.month}
              </span>
            </div>

            {/* Event Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#163674]/90 text-amber-300 border border-amber-400/40">
                  {evt.category}
                </span>
                {evt.organizer && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" />
                    {evt.organizer}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors font-['Playfair_Display',serif]">
                {evt.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2 border-t md:border-t-0 border-amber-900/30 pt-3 md:pt-0 shrink-0">
            <button
              onClick={(e) => handleAddToCalendar(evt, e)}
              className="p-2.5 rounded-xl bg-[#09142A] border border-amber-500/30 text-amber-300 hover:bg-[#163674] transition-all text-xs flex items-center gap-1.5 font-semibold cursor-pointer"
              title="Añadir a Google Calendar"
            >
              <CalendarPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Calendario</span>
            </button>

            <button
              onClick={(e) => handleShareWhatsApp(evt, e)}
              className="p-2.5 rounded-xl bg-[#09142A] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/60 transition-all text-xs flex items-center gap-1.5 font-semibold cursor-pointer"
              title="Compartir por WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={(e) => onPrintSingle(evt, e)}
              className="p-2.5 rounded-xl bg-[#09142A] border border-amber-500/30 text-amber-300 hover:bg-[#163674] transition-all text-xs cursor-pointer"
              title="Imprimir Ficha"
            >
              <Printer className="w-4 h-4" />
            </button>

            <div className="p-2 text-slate-400 group-hover:text-amber-300 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
