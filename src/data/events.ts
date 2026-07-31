export interface ParochialEvent {
  id: string;
  doorNumber: number;
  dateString: string;
  month: 'Julio' | 'Agosto';
  title: string;
  shortSummary: string;
  fullDescription: string;
  time: string;
  location: string;
  category: 'Niños' | 'Salud' | 'Juventud' | 'Familia' | 'Caridad';
  targetAudience?: string;
  organizer?: string;
  socialHandle?: string;
  iconName: 'Baby' | 'Stethoscope' | 'HeartHandshake' | 'Users' | 'Sparkles';
  colorTheme: 'gold' | 'rose' | 'emerald' | 'indigo' | 'amber';
  printableNotes?: string;
}

export const INITIAL_EVENTS: ParochialEvent[] = [
  {
    id: 'evt-28-1',
    doorNumber: 28,
    dateString: '28 de Julio',
    month: 'Julio',
    title: 'Jornada de Niños: Entrega de Pañales y Donaciones',
    shortSummary: 'Entrega especial de pañales, insumos esenciales y atención para familias de la comunidad.',
    fullDescription: 'Jornada dedicada al apoyo de la primera infancia y familias de la parroquia. Se realizará la entrega de pañales, insumos de cuidado infantil y donaciones comunitarias.',
    time: 'Por la mañana',
    location: 'Salón Parroquial',
    category: 'Niños',
    targetAudience: 'Familias y Bebés',
    organizer: 'Pastoral Social',
    iconName: 'Baby',
    colorTheme: 'amber',
    printableNotes: 'Presentarse en el salón parroquial. Actividad comunitaria de apoyo infantil.'
  },
  {
    id: 'evt-28-2',
    doorNumber: 28,
    dateString: '28 de Julio',
    month: 'Julio',
    title: 'Jornada Médica San Julián Capilla',
    shortSummary: 'Atención médica comunitaria, toma de tensión y consultas en la Capilla San Julián.',
    fullDescription: 'Jornada integral de salud para toda la comunidad en la Capilla San Julián. Atención médica general, orientación preventiva y toma de constantes vitales.',
    time: 'Por la mañana',
    location: 'Capilla San Julián',
    category: 'Salud',
    targetAudience: 'Comunidad en General',
    organizer: 'Equipo de Salud San Julián',
    iconName: 'Stethoscope',
    colorTheme: 'emerald',
    printableNotes: 'Atención médica por orden de llegada en la Capilla San Julián.'
  },
  {
    id: 'evt-31-1',
    doorNumber: 31,
    dateString: '31 de Julio',
    month: 'Julio',
    title: 'Cierre de Actividad de Mamá Carolina',
    shortSummary: 'Encuentro de cierre de actividades comunitarias del programa Mamá Carolina.',
    fullDescription: 'Actividad de cierre y encuentro especial del programa Mamá Carolina. Espacio de compartir, balance de actividades y convivencia comunitaria.',
    time: 'Por la tarde',
    location: 'Centro Comunitario Parroquial',
    category: 'Familia',
    targetAudience: 'Madres y Familia',
    organizer: 'Mamá Carolina',
    socialHandle: '@ecodap',
    iconName: 'HeartHandshake',
    colorTheme: 'rose',
    printableNotes: 'Cierre de actividad del grupo Mamá Carolina. Sigue @ecodap para novedades.'
  },
  {
    id: 'evt-31-2',
    doorNumber: 31,
    dateString: '31 de Julio',
    month: 'Julio',
    title: 'Atención Jóvenes de la Parroquia Manantial',
    shortSummary: 'Jornada de atención, escucha y espacio fraterno para la juventud parroquial.',
    fullDescription: 'Encuentro dedicado a los jóvenes de la Parroquia Manantial. Actividades de integración, espacio de escucha activa y convivencia juvenil.',
    time: 'Por la tarde',
    location: 'Parroquia Manantial',
    category: 'Juventud',
    targetAudience: 'Jóvenes Parroquiales',
    organizer: 'Pastoral Juvenil Manantial',
    iconName: 'Users',
    colorTheme: 'indigo',
    printableNotes: 'Encuentro abierto para todos los jóvenes de la Parroquia Manantial.'
  },
  {
    id: 'evt-4-1',
    doorNumber: 4,
    dateString: '4 de Agosto',
    month: 'Agosto',
    title: 'Jornada de Niños de Agosto (4 a 12 años)',
    shortSummary: 'Jornada vacacional infantil. Todos los Martes y Jueves de Agosto.',
    fullDescription: 'Gran jornada vacacional para niños de 4 a 12 años. Se llevará a cabo todos los Martes y Jueves del mes de Agosto con juegos, recreación y talleres comunitarios.',
    time: '09:00 AM a 04:00 PM',
    location: 'Instalaciones Parroquiales',
    category: 'Niños',
    targetAudience: 'Niños de 4 a 12 años',
    organizer: 'Catequesis e Infancia',
    iconName: 'Sparkles',
    colorTheme: 'gold',
    printableNotes: 'Horario: 09:00 AM a 04:00 PM. Válido Martes y Jueves de Agosto para niños de 4 a 12 años.'
  }
];
