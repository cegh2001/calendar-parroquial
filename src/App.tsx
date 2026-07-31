import React, { useState, useEffect } from 'react';
import { INITIAL_EVENTS, ParochialEvent } from './data/events';
import { Header } from './components/Header';
import { AdventCard } from './components/AdventCard';
import { EventModal } from './components/EventModal';
import { NewEventModal } from './components/NewEventModal';
import { PrintableCardSheet } from './components/PrintableCardSheet';
import { Info, Flame } from 'lucide-react';

export function App() {
  const [events, setEvents] = useState<ParochialEvent[]>(() => {
    const saved = localStorage.getItem('parochial_events_candelaria_v2');
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
    localStorage.setItem('parochial_events_candelaria_v2', JSON.stringify(events));
  }, [events]);

  const handleToggleDoor = (id: string) => {
    setOpenedEventIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
    <div className="min-h-screen candelaria-bg text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HEADER COMPONENT */}
      <Header
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenNewEventModal={() => setIsNewEventModalOpen(true)}
        onPrintAll={handlePrintAll}
        totalEventsCount={filteredEvents.length}
        openedEventsCount={openedEventIds.length}
      />

      {/* MAIN CALENDAR GRID */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#091530]/80 border border-sky-900/60 my-6">
            <Info className="w-12 h-12 text-amber-400/80 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200 font-['Playfair_Display',serif]">
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
      <footer className="no-print border-t border-sky-950 bg-[#060b18] py-5 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 candle-flame" />
            <span>Calendario Parroquial • Nuestra Señora de la Candelaria</span>
          </div>
          <span>Jornadas y Actividades Comunitarias</span>
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
