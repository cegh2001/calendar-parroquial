import React, { useState, useEffect } from 'react';
import { INITIAL_EVENTS, ParochialEvent } from './data/events';
import { Header } from './components/Header';
import { HeroLiturgico } from './components/HeroLiturgico';
import { AdventCard } from './components/AdventCard';
import { AgendaView } from './components/AgendaView';
import { EventModal } from './components/EventModal';
import { NewEventModal } from './components/NewEventModal';
import { PrintableCardSheet } from './components/PrintableCardSheet';
import { Info, Flame, Church } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'doors' | 'agenda'>('doors');
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

  // Advanced Filter with Search Query
  const filteredEvents = events.filter((evt) => {
    const matchesMonth = selectedMonth === 'Todos' || evt.month === selectedMonth;
    const matchesCategory = selectedCategory === 'Todas' || evt.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      evt.title.toLowerCase().includes(query) ||
      evt.shortSummary.toLowerCase().includes(query) ||
      evt.fullDescription.toLowerCase().includes(query) ||
      evt.location.toLowerCase().includes(query) ||
      (evt.organizer && evt.organizer.toLowerCase().includes(query));

    return matchesMonth && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen candelaria-bg text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* BRANDING HEADER */}
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

      {/* HERO LITÚRGICO & SEARCH BANNER */}
      <HeroLiturgico
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalEvents={filteredEvents.length}
      />

      {/* MAIN CONTENT AREA */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-3xl sacred-glass-card border border-amber-500/30 my-6 gold-border-glow max-w-xl mx-auto">
            <Church className="w-14 h-14 text-amber-400 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-bold text-slate-100 font-['Playfair_Display',serif]">
              No se encontraron actividades parroquiales
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              No hay eventos coincidentes con tu búsqueda o filtros. Probá seleccionando otro mes o agregando un nuevo evento al calendario.
            </p>
            {(searchQuery || selectedMonth !== 'Todos' || selectedCategory !== 'Todas') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMonth('Todos');
                  setSelectedCategory('Todas');
                }}
                className="mt-5 px-4 py-2 rounded-xl bg-[#163674] border border-amber-400/50 text-amber-300 text-xs font-bold hover:bg-[#1C428C] transition-all cursor-pointer"
              >
                Restablecer Filtros
              </button>
            )}
          </div>
        ) : viewMode === 'doors' ? (
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
        ) : (
          <AgendaView
            events={filteredEvents}
            onOpenDetails={setSelectedEventDetails}
            onPrintSingle={handlePrintSingle}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="no-print border-t border-amber-900/40 bg-[#070D1B] py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 candle-flame" />
            <span className="font-semibold text-slate-300">
              Calendario Parroquial • Nuestra Señora de la Candelaria
            </span>
          </div>
          <span className="text-slate-400">Jornadas, Caridad y Servicios Comunitarios</span>
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

