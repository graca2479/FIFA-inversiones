import { InvestmentStrategy, WorldCupPackage, HistoricalYearMetric, PortfolioAllocation, Transaction, PushNotificationItem, UserGoal } from '../types';

export const WORLD_CUP_PACKAGES: WorldCupPackage[] = [
  {
    id: 'pack-groups',
    title: 'Pack Fanático Fase de Grupos',
    subtitle: 'España, Portugal o Marruecos (3 Partidos)',
    targetUSD: 3800,
    recommendedMonths: 36,
    tag: 'Popular',
    includes: [
      'Entradas oficiales Categoría 2 para 3 partidos',
      '7 noches de hotel 4 estrellas con desayuno',
      'Vuelo intercontinental ida y vuelta',
      'Seguro de viaje internacional y asistencia deportiva',
      'Kit oficial del aficionado 2030'
    ]
  },
  {
    id: 'pack-knockout',
    title: 'Pack Cuartos & Semifinal',
    subtitle: 'Lisboa, Madrid & Casablanca (Partidos Decisivos)',
    targetUSD: 6500,
    recommendedMonths: 42,
    tag: 'Recomendado',
    includes: [
      'Entradas oficiales Categoría 1 para Cuartos y Semifinal',
      '10 noches en hoteles 4 y 5 estrellas',
      'Pases de tren alta velocidad entre sedes',
      'Hospitality Lounge previo a cada encuentro',
      'Traslados VIP aeropuerto-estadio'
    ]
  },
  {
    id: 'pack-final',
    title: 'Pack Gran Final 2030',
    subtitle: 'Santiago Bernabéu / Spotify Camp Nou',
    targetUSD: 9800,
    recommendedMonths: 45,
    tag: 'Exclusivo',
    includes: [
      'Entrada oficial para el partido por el Tercer Lugar y Gran Final',
      '12 noches en hotel 5 estrellas Gran Lujo',
      'Acceso exclusivo al FIFA Fan Club & Galas Oficiales',
      'Servicio de Concierge bilingüe 24/7',
      'Experiencia de campo y meet & greet con leyendas'
    ]
  },
  {
    id: 'pack-centenario',
    title: 'Pack Centenario Transcontinental',
    subtitle: 'Inauguración en Sudamérica + Fase Final en Europa',
    targetUSD: 14500,
    recommendedMonths: 48,
    tag: 'Ultra VIP',
    includes: [
      'Partido inaugural centenario en Montevideo/Buenos Aires',
      'Vuelos transoceánicos y estadías de lujo',
      'Entradas Hospitality Suite en todas las sedes',
      'Acceso backstage y acreditación conmemorativa',
      'Tour privado por los estadios históricos'
    ]
  }
];

export const INVESTMENT_STRATEGIES: InvestmentStrategy[] = [
  {
    id: 'conservative',
    name: 'Estrategia Defensiva Soberana',
    annualRate: 0.088, // 8.8%
    riskLevel: 'low',
    composition: [
      { label: 'Bonos Soberanos AAA (Tesoro / Bunds)', percentage: 60, color: '#3b82f6' },
      { label: 'Renta Fija Corporativa Grado Inversión', percentage: 25, color: '#10b981' },
      { label: 'Liquidez Monetaria Inmediata', percentage: 15, color: '#6366f1' }
    ]
  },
  {
    id: 'balanced',
    name: 'Estrategia Balanceada Mundialista',
    annualRate: 0.118, // 11.8%
    riskLevel: 'medium',
    composition: [
      { label: 'Bonos de Infraestructura Deportiva y Ciudades Sede', percentage: 40, color: '#2563eb' },
      { label: 'Fondos Indexados Globales (Acciones Multinacionales)', percentage: 35, color: '#f59e0b' },
      { label: 'Renta Fija Soberana y Cobertura Cambiaria', percentage: 25, color: '#10b981' }
    ]
  },
  {
    id: 'champion',
    name: 'Estrategia Campeón FIFA 2030',
    annualRate: 0.146, // 14.6%
    riskLevel: 'high',
    composition: [
      { label: 'Capital Privado en Entretenimiento y Derechos Deportivos', percentage: 45, color: '#ec4899' },
      { label: 'Índices Tecnológicos y Patrocinios Globales', percentage: 35, color: '#8b5cf6' },
      { label: 'Bonos de Alto Rendimiento con Cobertura', percentage: 20, color: '#06b6d4' }
    ]
  }
];

export const HISTORICAL_PERFORMANCE: HistoricalYearMetric[] = [
  {
    year: 2022,
    returnPercentage: 11.4,
    benchmarkPercentage: 5.2,
    monthlyData: [0.85, 0.92, 0.88, 0.95, 1.05, 0.91, 1.10, 0.89, 0.94, 1.02, 0.98, 1.01]
  },
  {
    year: 2023,
    returnPercentage: 12.8,
    benchmarkPercentage: 5.8,
    monthlyData: [0.95, 1.02, 1.15, 1.08, 0.98, 1.20, 1.12, 1.05, 1.18, 1.04, 1.11, 1.22]
  },
  {
    year: 2024,
    returnPercentage: 13.9,
    benchmarkPercentage: 4.9,
    monthlyData: [1.10, 1.08, 1.22, 1.15, 1.18, 1.25, 1.14, 1.20, 1.19, 1.28, 1.16, 1.25]
  },
  {
    year: 2025,
    returnPercentage: 14.5,
    benchmarkPercentage: 4.6,
    monthlyData: [1.15, 1.20, 1.25, 1.18, 1.22, 1.30, 1.24, 1.21, 1.26, 1.29, 1.22, 1.28]
  },
  {
    year: 2026,
    returnPercentage: 14.8,
    benchmarkPercentage: 4.3,
    monthlyData: [1.20, 1.22, 1.25, 1.28, 1.31, 1.24, 1.29, 1.26, 1.32, 1.30, 1.27, 1.33]
  }
];

export const PORTFOLIO_ALLOCATIONS: PortfolioAllocation[] = [
  {
    category: 'Infraestructura y Sedes 2030',
    percentage: 38,
    color: '#1d4ed8',
    description: 'Títulos de deuda garantizados para ampliación de estadios de alta eficiencia en Madrid, Barcelona, Lisboa y Casablanca.'
  },
  {
    category: 'Bonos Soberanos AAA / UE',
    percentage: 28,
    color: '#059669',
    description: 'Custodia institucional de máxima liquidez en bonos del Tesoro de la Zona Euro y EE.UU.'
  },
  {
    category: 'Renta Variable Deportiva & Media',
    percentage: 22,
    color: '#d97706',
    description: 'Acciones de líderes globales de transmisión deportiva, streaming internacional y patrocinadores de primer orden.'
  },
  {
    category: 'Fondo Monetario de Liquidez Inmediata',
    percentage: 12,
    color: '#7c3aed',
    description: 'Reservas operativas disponibles para aportaciones extraordinarias o rebalanceos tácticos.'
  }
];

export const INITIAL_USER_GOAL: UserGoal = {
  selectedPackageId: 'pack-knockout',
  targetAmountUSD: 6500,
  currentBalanceUSD: 3120,
  monthlyContributionUSD: 145,
  strategyId: 'balanced',
  startDate: '2025-01-15',
  targetDate: '2030-06-01',
  currency: 'USD'
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-8921-2026',
    date: '2026-08-30',
    type: 'yield',
    amountUSD: 36.80,
    status: 'completed',
    note: 'Rendimiento mensual capitalizado (Estrategia Balanceada)',
    hash: '0x4f8a92b...e371d5'
  },
  {
    id: 'TX-8845-2026',
    date: '2026-08-15',
    type: 'scheduled',
    amountUSD: 145.00,
    status: 'completed',
    note: 'Aportación programada domiciliada (Cuenta Débito Clave ***482)',
    hash: '0x9c31b4a...7201ef'
  },
  {
    id: 'TX-8710-2026',
    date: '2026-07-31',
    type: 'yield',
    amountUSD: 35.15,
    status: 'completed',
    note: 'Rendimiento mensual capitalizado',
    hash: '0x2b8109d...1a44c9'
  },
  {
    id: 'TX-8650-2026',
    date: '2026-07-22',
    type: 'extraordinary',
    amountUSD: 400.00,
    status: 'completed',
    note: 'Aportación extraordinaria (Bono de ahorro personal)',
    hash: '0x7e291f0...9834aa'
  },
  {
    id: 'TX-8520-2026',
    date: '2026-07-15',
    type: 'scheduled',
    amountUSD: 145.00,
    status: 'completed',
    note: 'Aportación programada domiciliada',
    hash: '0x12d59cf...b89410'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotificationItem[] = [
  {
    id: 'notif-1',
    title: '¡Rendimiento del Mes Acreditado!',
    message: 'Se han generado +$36.80 USD por intereses compuestos en tu fondo Inversión FIFA 2030.',
    date: 'Hace 2 horas',
    read: false,
    type: 'yield'
  },
  {
    id: 'notif-2',
    title: '¡Superaste el 48% de tu Meta!',
    message: 'Estás a solo $3,380 USD de asegurar tu Pack Cuartos & Semifinales en Europa.',
    date: 'Ayer a las 18:30',
    read: false,
    type: 'milestone'
  },
  {
    id: 'notif-3',
    title: 'Auditoría Criptográfica Verificada',
    message: 'La custodia biométrica y el cifrado AES-256 de tus saldos pasaron la validación periódica con éxito.',
    date: 'Hace 3 días',
    read: true,
    type: 'security'
  },
  {
    id: 'notif-4',
    title: 'Próxima Aportación Programada',
    message: 'Tu próxima aportación automática de $145.00 USD se aplicará el 15 de Septiembre.',
    date: 'Hace 5 días',
    read: true,
    type: 'progress'
  }
];
