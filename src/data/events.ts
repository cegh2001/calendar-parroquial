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
  category: 'Niños' | 'Salud' | 'Juventud' | 'Familia';
  targetAudience?: string;
  organizer?: string;
  socialHandle?: string;
  iconName: 'Baby' | 'Stethoscope' | 'HeartHandshake' | 'Users' | 'Sparkles';
  colorTheme: 'candelaria-blue' | 'candelaria-gold' | 'candelaria-carmin' | 'candelaria-white';
  printableNotes?: string;
}

const MONTH_INDEX_MAP: Record<string, number> = {
  Julio: 6, // 0-indexed: July is 6
  Agosto: 7, // August is 7
};

export function isEventPast(evt: ParochialEvent, referenceDate: Date = new Date()): boolean {
  const monthIdx = MONTH_INDEX_MAP[evt.month];
  if (monthIdx === undefined) return false;

  // Event date end of day
  const eventDate = new Date(referenceDate.getFullYear(), monthIdx, evt.doorNumber, 23, 59, 59);
  return referenceDate > eventDate;
}


export const INITIAL_EVENTS: ParochialEvent[] = [
  {
    id: 'evt-28-1',
    doorNumber: 28,
    dateString: '28 de Julio',
    month: 'Julio',
    title: 'Jornada de Niños: Entrega de Pañales y Donaciones',
    shortSummary: 'Jornada especial de apoyo infantil con entrega de pañales, insumos esenciales y donaciones.',
    fullDescription: 'Jornada dedicada al apoyo de las familias y la infancia temprana de la comunidad. Realizaremos la entrega gratuita de pañales, productos de cuidado para bebés y donaciones comunitarias.',
    time: '09:00 AM - 01:00 PM',
    location: 'Salón Parroquial Principal',
    category: 'Niños',
    targetAudience: 'Familias y Bebés de la Parroquia',
    organizer: 'Pastoral Social',
    iconName: 'Baby',
    colorTheme: 'candelaria-gold',
    printableNotes: 'Atención directa en el salón parroquial. Registro en puerta.'
  },
  {
    id: 'evt-28-2',
    doorNumber: 28,
    dateString: '28 de Julio',
    month: 'Julio',
    title: 'Jornada Médica San Julián Capilla',
    shortSummary: 'Atención médica gratuita, toma de presión y consulta preventiva en San Julián.',
    fullDescription: 'Jornada asistencial de salud para toda la comunidad en la Capilla San Julián. Consultas de medicina general, despistaje de hipertensión y orientación en salud.',
    time: '08:00 AM - 02:00 PM',
    location: 'Capilla San Julián',
    category: 'Salud',
    targetAudience: 'Comunidad en General',
    organizer: 'Equipo de Salud San Julián',
    iconName: 'Stethoscope',
    colorTheme: 'candelaria-blue',
    printableNotes: 'Atención por orden de llegada en las instalaciones de la Capilla San Julián.'
  },
  {
    id: 'evt-31-1',
    doorNumber: 31,
    dateString: '31 de Julio',
    month: 'Julio',
    title: 'Cierre de Actividad de Mamá Carolina',
    shortSummary: 'Encuentro de cierre del ciclo comunitario del programa Mamá Carolina (@ecodap).',
    fullDescription: 'Celebración y encuentro de cierre de actividades comunitarias del grupo Mamá Carolina. Un espacio de fraternidad, oración y balance del período.',
    time: '03:00 PM - 06:00 PM',
    location: 'Centro Comunitario Parroquial',
    category: 'Familia',
    targetAudience: 'Madres y Familia',
    organizer: 'Mamá Carolina',
    socialHandle: '@ecodap',
    iconName: 'HeartHandshake',
    colorTheme: 'candelaria-carmin',
    printableNotes: 'Cierre de actividades Mamá Carolina. Síguenos en Instagram @ecodap.'
  },
  {
    id: 'evt-31-2',
    doorNumber: 31,
    dateString: '31 de Julio',
    month: 'Julio',
    title: 'Atención Jóvenes de la Parroquia Manantial',
    shortSummary: 'Jornada de integración, escucha y convivencia para la juventud de Manantial.',
    fullDescription: 'Encuentro especial dedicado a los jóvenes de la Parroquia Manantial. Dinámicas de grupo, espacio de escucha activa y convivencia juvenil.',
    time: '04:00 PM - 07:30 PM',
    location: 'Parroquia Manantial',
    category: 'Juventud',
    targetAudience: 'Jóvenes de la Parroquia',
    organizer: 'Pastoral Juvenil Manantial',
    iconName: 'Users',
    colorTheme: 'candelaria-blue',
    printableNotes: 'Encuentro fraterno abierto para la juventud parroquial.'
  },
  {
    id: 'evt-4-1',
    doorNumber: 4,
    dateString: '4 de Agosto',
    month: 'Agosto',
    title: 'Jornada de Niños de Agosto (4 a 12 años)',
    shortSummary: 'Inicio de la jornada vacacional. Todos los Martes y Jueves de Agosto.',
    fullDescription: 'Gran jornada vacacional infantil para niños de 4 a 12 años. Se desarrollará todos los Martes y Jueves del mes de Agosto con actividades recreativas, talleres de valores y juegos comunitarios.',
    time: '09:00 AM - 04:00 PM',
    location: 'Instalaciones Parroquiales',
    category: 'Niños',
    targetAudience: 'Niños de 4 a 12 años',
    organizer: 'Catequesis e Infancia',
    iconName: 'Sparkles',
    colorTheme: 'candelaria-gold',
    printableNotes: 'Horario: 09:00 AM a 04:00 PM. Válido Martes y Jueves de Agosto para niños de 4 a 12 años.'
  }
];
