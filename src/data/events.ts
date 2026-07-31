export interface ParochialEvent {
  id: string;
  doorNumber: number; // Número visible en la puerta de adviento (e.g. 28, 31, 1, 4, 8, etc)
  dateString: string; // Ej: "28 de Julio"
  month: 'Julio' | 'Agosto' | 'Septiembre';
  title: string;
  shortSummary: string;
  fullDescription: string;
  time: string;
  location: string;
  category: 'Caridad' | 'Salud' | 'Juventud' | 'Niños' | 'Familia' | 'Liturgia';
  targetAudience?: string;
  organizer?: string;
  socialHandle?: string;
  iconName: 'Baby' | 'Stethoscope' | 'HeartHandshake' | 'Users' | 'Sparkles' | 'Sun' | 'Cross' | 'Church' | 'BookOpen';
  colorGradient: string; // Para el interior de la ventana desplegada estilo advent
  printableNotes?: string;
}

export const INITIAL_EVENTS: ParochialEvent[] = [
  {
    id: 'evt-28-1',
    doorNumber: 28,
    dateString: '28 de Julio',
    month: 'Julio',
    title: 'Jornada de Niños: Entrega de Pañales y Donaciones',
    shortSummary: 'Jornada especial dedicada a la infancia con entrega de pañales, insumos esenciales y actividades para familias.',
    fullDescription: 'Un espacio parroquial solidario dedicado a apoyar a las familias de la comunidad con bebés e infancia temprana. Realizaremos la entrega gratuita de pañales, ropa y productos de primera necesidad, acompañado de una merienda comunitaria.',
    time: '09:00 AM - 01:00 PM',
    location: 'Salón Parroquial Principal',
    category: 'Caridad',
    targetAudience: 'Familias, Bebés e Infancia',
    organizer: 'Pastoral Social Parroquial',
    iconName: 'Baby',
    colorGradient: 'from-amber-500/20 via-orange-500/10 to-amber-900/30',
    printableNotes: 'Presentar cédula o registro en el salón. Donaciones bienvenidas.'
  },
  {
    id: 'evt-28-2',
    doorNumber: 28,
    dateString: '28 de Julio',
    month: 'Julio',
    title: 'Jornada Médica San Julián Capilla',
    shortSummary: 'Atención médica gratuita, toma de presión, medicina general y despistaje para la comunidad de San Julián.',
    fullDescription: 'Jornada integral de atención en salud comunitaria en las instalaciones de la Capilla San Julián. Contaremos con médicos voluntarios para consultas generales, control de tensión arterial, glucemia y orientación farmacéutica.',
    time: '08:00 AM - 02:00 PM',
    location: 'Capilla San Julián',
    category: 'Salud',
    targetAudience: 'Comunidad en General y Adultos Mayores',
    organizer: 'Voluntariado de Salud Parroquial',
    iconName: 'Stethoscope',
    colorGradient: 'from-emerald-500/20 via-teal-500/10 to-emerald-900/30',
    printableNotes: 'Atención por orden de llegada. Se recomienda acudir en ayunas para exámenes de glicemia.'
  },
  {
    id: 'evt-31-1',
    doorNumber: 31,
    dateString: '31 de Julio',
    month: 'Julio',
    title: 'Cierre de Actividad de Mamá Carolina',
    shortSummary: 'Encuentro de cierre de ciclo, compartir y acción de gracias del programa Mamá Carolina.',
    fullDescription: 'Celebramos el cierre del ciclo de actividades comunitarias del programa Mamá Carolina. Un espacio de testimonio, oración compartida, agradecimiento a las colaboradoras y proyección para el próximo semestre.',
    time: '03:00 PM - 06:00 PM',
    location: 'Centro Comunitario Parroquial',
    category: 'Familia',
    targetAudience: 'Madres, Voluntarias y Comunidad',
    organizer: 'Equipo Mamá Carolina',
    socialHandle: '@ecodap',
    iconName: 'HeartHandshake',
    colorGradient: 'from-rose-500/20 via-pink-500/10 to-rose-900/30',
    printableNotes: 'Traer un plato o bebida para compartir en el agape comunal. Sigue @ecodap para más detalles.'
  },
  {
    id: 'evt-31-2',
    doorNumber: 31,
    dateString: '31 de Julio',
    month: 'Julio',
    title: 'Atención Jóvenes Parroquia Manantial',
    shortSummary: 'Encuentro de escucha, orientación, dinámicas y convivencia para la juventud de Manantial.',
    fullDescription: 'Jornada especial de acompañamiento juvenil. Actividades dinámicas, espacios de escucha activa, conversatorio sobre proyectos personales y momento de fraternidad con los jóvenes de la comunidad Manantial.',
    time: '04:00 PM - 07:30 PM',
    location: 'Parroquia Manantial - Casa Pastoral',
    category: 'Juventud',
    targetAudience: 'Jóvenes de 13 a 25 años',
    organizer: 'Pastoral Juvenil Manantial',
    iconName: 'Users',
    colorGradient: 'from-sky-500/20 via-indigo-500/10 to-indigo-900/30',
    printableNotes: 'Entrada libre. Invita a un amigo o compañero de estudio.'
  },
  {
    id: 'evt-4-1',
    doorNumber: 4,
    dateString: '4 de Agosto',
    month: 'Agosto',
    title: 'Jornada de Niños de Agosto (4 a 12 años)',
    shortSummary: 'Inicio de la gran jornada vacacional de niños. Todos los Martes y Jueves de Agosto.',
    fullDescription: '¡Arranca nuestra Jornada Vacacional Parroquial para niños de 4 a 12 años! Todos los Martes y Jueves del mes de Agosto. Un programa repleto de juegos, catequesis recreativa, talleres de manualidades, teatro, deportes y merienda.',
    time: '09:00 AM - 04:00 PM',
    location: 'Canchas y Salones Parroquiales',
    category: 'Niños',
    targetAudience: 'Niños y Niñas de 4 a 12 años',
    organizer: 'Catequesis e Infancia Misionera',
    iconName: 'Sparkles',
    colorGradient: 'from-amber-400/20 via-yellow-500/10 to-amber-900/30',
    printableNotes: 'Traer ropa cómoda, hidratación y merienda ligera. Se requiere inscripción previa del representante.'
  },
  {
    id: 'evt-6-1',
    doorNumber: 6,
    dateString: '6 de Agosto',
    month: 'Agosto',
    title: 'Fiesta de la Transfiguración & Hora Santa',
    shortSummary: 'Solemne Adoración Eucarística y Misa comunitaria por las familias.',
    fullDescription: 'Celebramos la Fiesta de la Transfiguración del Señor con una Hora Santa Eucarística especial de intercesión por las necesidades de nuestra parroquia y la bendición de los enfermos.',
    time: '05:30 PM - 07:30 PM',
    location: 'Templo Parroquial',
    category: 'Liturgia',
    targetAudience: 'Toda la comunidad',
    organizer: 'Equipo de Liturgia',
    iconName: 'Sun',
    colorGradient: 'from-yellow-500/20 via-amber-500/10 to-yellow-900/30',
    printableNotes: 'Asistir con espíritu de oración y devoción.'
  },
  {
    id: 'evt-13-1',
    doorNumber: 13,
    dateString: '13 de Agosto',
    month: 'Agosto',
    title: 'Jornada de Niños - Taller Recreativo (Martes y Jueves)',
    shortSummary: 'Continuación de la jornada vacacional infantil con arte, música y valores.',
    fullDescription: 'Segundo módulo de la jornada de niños de Agosto (Martes y Jueves de 4 a 12 años). Taller interactivo de pintura, canciones parroquiales y juegos comunitarios.',
    time: '09:00 AM - 04:00 PM',
    location: 'Patio Central de la Parroquia',
    category: 'Niños',
    targetAudience: 'Niños de 4 a 12 años',
    organizer: 'Equipo de Recreadores',
    iconName: 'Sparkles',
    colorGradient: 'from-purple-500/20 via-fuchsia-500/10 to-purple-900/30',
    printableNotes: 'Llevar gorra para el sol y camisa de repuesto.'
  },
  {
    id: 'evt-15-1',
    doorNumber: 15,
    dateString: '15 de Agosto',
    month: 'Agosto',
    title: 'Solemnidad de la Asunción de la Virgen María',
    shortSummary: 'Misa patronal, procesión mariana y convivencia comunitaria con bendición de flores.',
    fullDescription: 'Gran celebración parroquial de la Asunción de María a los cielos. Iniciaremos con el Santo Rosario Cantado, Santa Misa Solemne y bendición especial de los frutos y flores traídos por las familias.',
    time: '10:00 AM - 01:00 PM',
    location: 'Templo y Plaza Parroquial',
    category: 'Liturgia',
    targetAudience: 'Comunidad Parroquial',
    organizer: 'Cofradía Mariana',
    iconName: 'Church',
    colorGradient: 'from-blue-500/20 via-cyan-500/10 to-blue-900/30',
    printableNotes: 'Pueden traer flores y frutas para ser bendecidas en la Eucaristía.'
  }
];
