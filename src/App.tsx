import React, { useState, useEffect } from 'react';
import { INITIAL_EVENTS, ParochialEvent } from './data/events';
import { Header } from './components/Header';
import { AdventCard } from './components/AdventCard';
import { EventModal } from './components/EventModal';
import { NewEventModal } from './components/NewEventModal';
import { PrintableCardSheet } from './components/PrintableCardSheet';
import { Church, Sparkles, Calendar as CalendarIcon, Info, Unlock } from 'lucide-react';

export function App() {
  const [events, setEvents] = useState<ParochialEvent[]>(() => {
    // Reset/load events strictly matching INITIAL_EVENTS length (5 events)
    const saved = localStorage.getItem('parochial_events_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        return INITIAL_EVENTS;
      }
    }
    return INITIAL_EVENTS;
  });

  const [openedEventIds, setOpenedEventIds] = useState<string[]>(['evt-28-1']);
  const [selectedMonth, setSelectedMonth] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedEventDetails, setSelectedEventDetails] = useState<ParochialEvent | null>(null);
  const [singleEventToPrint, setSingleEventToPrint] = useState<ParochialEvent | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('parochial_events_v2', JSON.stringify(events));
  }, [events]);

  const handleToggleDoor = (id: string) => {
    setOpenedEventIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenAllDoors = () => {
    setOpenedEventIds(events.map((e) => e.id));
  };

  const handleAddEvent = (newEvent: ParochialEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setOpenedEventIds((prev) => [...prev, newEvent.id]);
  };

  const handlePrintSingle = (event: ParochialEvent, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSingleEventToPrint(event);
    setTimeout(() => {
      window.print();
      setSingleEventToPrint(null);
    }, 150);
  };

  const handlePrintAll = () => {
    setSingleEventToPrint(null);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Filter events
  const filteredEvents = events.filter((evt) => {
    const matchesMonth = selectedMonth === 'Todos' || evt.month === selectedMonth;
    const matchesCategory = selectedCategory === 'Todas' || evt.category === selectedCategory;
    return matchesMonth && matchesCategory;
  });

  return (
    <div className="min-h-screen cathedral-bg text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HEADER */}
      <Header
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenNewEventModal={() => setIsNewEventModalOpen(true)}
        onPrintAll={handlePrintAll}
        totalEventsCount={filteredEvents.length}
      />

      {/* MAIN CONTAINER */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HERO BANNER */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-950/95 to-amber-950/40 border border-amber-500/30 p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Adviento Comunitaria Parroquial
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Playfair_Display',serif] tracking-tight gold-gradient-text leading-tight">
                Descubrí los Eventos y Jornadas de Nuestra Comunidad
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Hacé clic en cada <strong className="text-amber-300 font-semibold">ventana de adviento</strong> para abrir la puerta en 3D y descubrir las actividades de Julio y Agosto (Jornadas de niños, insumos, salud y juventud).
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleOpenAllDoors}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Unlock className="w-4 h-4 text-amber-400" />
                <span>Abrir Todas las Ventanas</span>
              </button>
            </div>
          </div>
        </div>

        {/* CALENDAR ADVENT GRID */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/60 border border-slate-800">
            <Info className="w-12 h-12 text-amber-400/60 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300 font-['Playfair_Display',serif]">
              No hay eventos para el filtro seleccionado
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Seleccioná "Todos" los meses o agregá un nuevo evento al calendario.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((evt) => (
              <AdventCard
                key={evt.id}
                event={evt}
                isOpened={openedEventIds.includes(evt.id)}
                onToggleOpen={handleToggleDoor}
                onOpenDetails={setSelectedEventDetails}
                onPrintSingle={handlePrintSingle}
              />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-950/90 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Church className="w-4 h-4 text-amber-400" />
            <span>Calendario Parroquial Católico • Inspirado en adviento.dev & AdventJS</span>
          </div>
          <span>Eventos de Julio y Agosto • Formato 3D e Imprimible</span>
        </div>
      </footer>

      {/* MODALS */}
      <EventModal
        event={selectedEventDetails}
        onClose={() => setSelectedEventDetails(null)}
        onPrintSingle={handlePrintSingle}
      />

      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* PRINTABLE CARDS SHEET */}
      <PrintableCardSheet
        events={filteredEvents}
        singleEventToPrint={singleEventToPrint}
      />
    </div>
  );
}
export default App;
