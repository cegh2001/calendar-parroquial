import React from 'react';
import { ParochialEvent } from '../data/events';
import { Church, Clock, MapPin, Users, Sparkles, AtSign } from 'lucide-react';

interface PrintableCardSheetProps {
  events: ParochialEvent[];
  singleEventToPrint?: ParochialEvent | null;
}

export const PrintableCardSheet: React.FC<PrintableCardSheetProps> = ({ events, singleEventToPrint }) => {
  const eventsToRender = singleEventToPrint ? [singleEventToPrint] : events;

  return (
    <div className="print-only w-full bg-white text-slate-950 p-6">
      {/* Print Document Header */}
      <div className="text-center pb-6 mb-6 border-b-2 border-amber-600">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Church className="w-8 h-8 text-amber-700" />
          <h1 className="text-2xl font-black font-['Cinzel',serif] uppercase tracking-wider text-amber-950">
            Comunidad Parroquial • Fichas de Eventos
          </h1>
        </div>
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
          Jornadas y Actividades Comunitarias - {new Date().getFullYear()}
        </p>
      </div>

      {/* Printable Grid */}
      <div className="printable-card-grid grid grid-cols-2 gap-6">
        {eventsToRender.map((evt) => (
          <div
            key={evt.id}
            className="printable-card relative border-2 border-amber-700 rounded-xl p-5 bg-amber-50/40 flex flex-col justify-between"
          >
            {/* Cut line indicator */}
            <div className="absolute -top-3 right-4 bg-white px-2 text-[9px] font-mono text-slate-400">
              ✂ Recortar Ficha
            </div>

            <div>
              {/* Event Badge Header */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-300">
                <span className="font-['Cinzel',serif] font-bold text-sm text-amber-900">
                  📅 {evt.dateString}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950 border border-amber-400">
                  {evt.category}
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-base font-bold text-slate-900 mt-2 leading-tight">
                {evt.title}
              </h2>

              <p className="text-xs text-slate-700 mt-2 leading-snug font-normal">
                {evt.fullDescription}
              </p>

              {/* Specs */}
              <div className="mt-4 space-y-1.5 text-xs text-slate-800 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span><strong>Horario:</strong> {evt.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span><strong>Lugar:</strong> {evt.location}</span>
                </div>
                {evt.targetAudience && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <span><strong>Para:</strong> {evt.targetAudience}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer inside Card */}
            <div className="mt-4 pt-3 border-t border-amber-200 text-[10px] text-slate-600 flex items-center justify-between">
              <div>
                <strong>Organiza:</strong> {evt.organizer || 'Comunidad Parroquial'}
                {evt.socialHandle && (
                  <span className="ml-1 text-amber-800 font-bold">
                    ({evt.socialHandle})
                  </span>
                )}
              </div>
              <span className="font-bold text-amber-900">#{evt.doorNumber}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
