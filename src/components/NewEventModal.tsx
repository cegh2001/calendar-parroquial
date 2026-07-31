import React, { useState } from 'react';
import { ParochialEvent } from '../data/events';
import { X, Sparkles, Flame } from 'lucide-react';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (newEvent: ParochialEvent) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [doorNumber, setDoorNumber] = useState<number>(10);
  const [dateString, setDateString] = useState<string>('10 de Agosto');
  const [month, setMonth] = useState<'Julio' | 'Agosto'>('Agosto');
  const [title, setTitle] = useState<string>('');
  const [shortSummary, setShortSummary] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const [time, setTime] = useState<string>('09:00 AM - 04:00 PM');
  const [location, setLocation] = useState<string>('Salón Parroquial');
  const [category, setCategory] = useState<'Niños' | 'Salud' | 'Juventud' | 'Familia'>('Niños');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [organizer, setOrganizer] = useState<string>('Equipo Parroquial');
  const [socialHandle, setSocialHandle] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateString.trim()) return;

    const iconName: ParochialEvent['iconName'] = 
      category === 'Niños' ? 'Baby' : 
      category === 'Salud' ? 'Stethoscope' : 
      category === 'Juventud' ? 'Users' : 'HeartHandshake';

    const colorTheme: ParochialEvent['colorTheme'] = 
      category === 'Niños' ? 'candelaria-gold' : 
      category === 'Salud' ? 'candelaria-blue' : 
      category === 'Juventud' ? 'candelaria-blue' : 'candelaria-carmin';

    const newEvent: ParochialEvent = {
      id: `evt-${Date.now()}`,
      doorNumber: Number(doorNumber) || Math.floor(Math.random() * 30) + 1,
      dateString,
      month,
      title,
      shortSummary: shortSummary || title,
      fullDescription: fullDescription || shortSummary || title,
      time,
      location,
      category,
      targetAudience: targetAudience || undefined,
      organizer: organizer || undefined,
      socialHandle: socialHandle || undefined,
      iconName,
      colorTheme,
      printableNotes: 'Presentarse a tiempo en la ubicación del evento.',
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#091530] border-2 border-sky-400/50 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900 bg-[#060b18]">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 candle-flame" />
            <h3 className="text-lg font-bold text-slate-100 font-['Playfair_Display',serif]">
              Agregar Evento Parroquial
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Número (#)</label>
              <input
                type="number"
                value={doorNumber}
                onChange={(e) => setDoorNumber(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Fecha Visible (Ej: 10 de Agosto)</label>
              <input
                type="text"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Mes</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              >
                <option value="Julio">Julio</option>
                <option value="Agosto">Agosto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              >
                <option value="Niños">Niños</option>
                <option value="Salud">Salud</option>
                <option value="Juventud">Juventud</option>
                <option value="Familia">Familia</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Título del Evento</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Jornada Vacacional de Niños"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Horario</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:00 AM - 04:00 PM"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Lugar</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Salón Parroquial"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Resumen Corto</label>
            <input
              type="text"
              value={shortSummary}
              onChange={(e) => setShortSummary(e.target.value)}
              placeholder="Breve vista previa para la tarjeta"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Descripción Completa</label>
            <textarea
              rows={3}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Detalles adicionales sobre la actividad"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Organizador</label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Ej: Pastoral de la Juventud"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Red Social / Tag (Opcional)</label>
              <input
                type="text"
                value={socialHandle}
                onChange={(e) => setSocialHandle(e.target.value)}
                placeholder="Ej: @ecodap"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-sky-900 text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-sky-900 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Guardar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
