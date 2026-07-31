import React from 'react';
import { ParochialEvent } from '../data/events';
import { Flame, Clock, MapPin, Users, UserCheck, Calendar, Info, ShieldCheck } from 'lucide-react';

interface PrintableCardSheetProps {
  events: ParochialEvent[];
  singleEventToPrint?: ParochialEvent | null;
}

export const PrintableCardSheet: React.FC<PrintableCardSheetProps> = ({ events, singleEventToPrint }) => {
  // SINGLE EVENT FLYER MODE
  if (singleEventToPrint) {
    const evt = singleEventToPrint;
    return (
      <div className="print-only w-full bg-white text-slate-950 font-['Plus_Jakarta_Sans',sans-serif] p-4">
        <div className="border-4 border-amber-800 rounded-3xl p-8 bg-[#FFFDF9] min-h-[95vh] flex flex-col justify-between relative shadow-none">
          
          {/* Header Banner */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-amber-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center font-bold">
                  <Flame className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-amber-900 block">
                    PARROQUIA NUESTRA SEÑORA DE LA CANDELARIA
                  </span>
                  <h1 className="text-2xl font-black text-slate-950 tracking-tight">
                    Ficha Oficial de Jornada Parroquial
                  </h1>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-black uppercase bg-amber-200 text-amber-950 border border-amber-800">
                  {evt.category}
                </span>
                <span className="block text-[11px] text-slate-700 font-mono mt-1">
                  ID: #{evt.doorNumber} • {evt.month}
                </span>
              </div>
            </div>

            {/* Giant Date & Title Banner */}
            <div className="bg-amber-900 text-white rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                  Fecha Programada
                </span>
                <h2 className="text-3xl font-black text-amber-100">
                  {evt.dateString}
                </h2>
              </div>
              <div className="bg-amber-950/80 px-5 py-3 rounded-xl border border-amber-600/50">
                <span className="text-xs font-bold text-amber-300 block">Horario Atendido:</span>
                <span className="text-lg font-black text-white">{evt.time}</span>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Left 2 Cols: Main Info */}
              <div className="col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-950 mb-2 leading-tight">
                    {evt.title}
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {evt.fullDescription}
                  </p>
                </div>

                {evt.printableNotes && (
                  <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-400/80 text-xs text-amber-950 space-y-1">
                    <strong className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900">
                      <Info className="w-4 h-4 text-amber-800" /> Nota e Indicaciones para los Asistentes:
                    </strong>
                    <p className="leading-snug">{evt.printableNotes}</p>
                  </div>
                )}
              </div>

              {/* Right 1 Col: Summary Box */}
              <div className="col-span-1 bg-amber-50/80 border-2 border-amber-700/50 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 border-b border-amber-300 pb-2">
                  Datos de Coordinación
                </h4>

                <div className="space-y-3 text-xs text-slate-900 font-medium">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Lugar / Sede</span>
                    <span className="font-bold text-slate-950 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-800" />
                      {evt.location}
                    </span>
                  </div>

                  {evt.targetAudience && (
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Dirigido A</span>
                      <span className="font-bold text-slate-950 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-800" />
                        {evt.targetAudience}
                      </span>
                    </div>
                  )}

                  {evt.organizer && (
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Organiza</span>
                      <span className="font-bold text-slate-950 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-amber-800" />
                        {evt.organizer} {evt.socialHandle && `(${evt.socialHandle})`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Seal & Parish Signature */}
          <div className="pt-6 border-t-2 border-amber-800 flex items-end justify-between text-xs text-slate-700">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-800" />
                <span>Nuestra Señora de la Candelaria • Cartelera Oficial</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Documento parroquial generado para difusión comunitaria.
              </p>
            </div>

            <div className="text-right border-t border-slate-400 pt-2 px-6">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Sello / Firma Pastoral</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // MULTIPLE CARDS GRID PRINT MODE
  return (
    <div className="print-only w-full bg-white text-slate-950 font-['Plus_Jakarta_Sans',sans-serif] p-2">
      {/* Document Header */}
      <div className="text-center pb-4 mb-4 border-b-2 border-amber-800">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Flame className="w-6 h-6 text-amber-800" />
          <h1 className="text-xl font-black text-slate-950 uppercase tracking-wider">
            PARROQUIA NUESTRA SEÑORA DE LA CANDELARIA
          </h1>
        </div>
        <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
          Boletín de Jornadas y Actividades Comunitarias • {new Date().getFullYear()}
        </p>
      </div>

      {/* Grid of Cards (High Density 2 Columns) */}
      <div className="grid grid-cols-2 gap-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="printable-card relative border-2 border-amber-800 rounded-xl p-4 bg-[#FFFDF9] flex flex-col justify-between page-break-inside-avoid"
          >
            {/* Cut indicator */}
            <div className="absolute -top-2.5 right-3 bg-white px-1.5 text-[8px] font-mono text-slate-500 border border-slate-300 rounded">
              ✂ Recortar Ficha
            </div>

            <div>
              <div className="flex items-center justify-between pb-2 border-b border-amber-300">
                <span className="font-black text-xs text-amber-900">
                  📅 {evt.dateString}
                </span>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950 border border-amber-400">
                  {evt.category}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-950 mt-2 leading-tight">
                {evt.title}
              </h2>

              <p className="text-xs text-slate-700 mt-1.5 leading-snug line-clamp-3">
                {evt.shortSummary || evt.fullDescription}
              </p>

              <div className="mt-3 space-y-1 text-[11px] text-slate-800 font-medium bg-amber-50/60 p-2 rounded-lg border border-amber-200">
                <div><strong>Horario:</strong> {evt.time}</div>
                <div><strong>Lugar:</strong> {evt.location}</div>
                {evt.targetAudience && <div><strong>Para:</strong> {evt.targetAudience}</div>}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-amber-200 text-[10px] text-slate-600 flex items-center justify-between">
              <div>
                <strong>Organiza:</strong> {evt.organizer || 'Comunidad Parroquial'}
              </div>
              <span className="font-bold text-amber-900">#{evt.doorNumber}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
