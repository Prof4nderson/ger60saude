export type ThemeMode = 'holo' | 'cyber'
export type FontScale = 'normal' | 'large' | 'xlarge'

export type Elder = {
  id: string
  name: string
  age: number
  relation: string
  initials: string
  accent: string
  conditions: string[]
  bloodType: string
  hydration: number
  hydrationGoal: number
}

export type Medication = {
  id: string
  name: string
  dose: string
  time: string
  status: 'done' | 'next' | 'attention'
  stock: number
  stockLabel: string
  responsible: string
}

export type Activity = {
  id: string
  time: string
  title: string
  detail: string
  icon: string
  tone: 'teal' | 'violet' | 'amber' | 'blue'
  done?: boolean
}

export type Appointment = {
  id: string
  date: string
  day: string
  month: string
  title: string
  detail: string
  type: 'consulta' | 'fisioterapia' | 'exame'
  accent: string
}

export const elders: Elder[] = [
  {
    id: 'lucia',
    name: 'Dona Lúcia Almeida',
    age: 78,
    relation: 'Mãe',
    initials: 'LA',
    accent: '#6f61e8',
    conditions: ['Hipertensão', 'Diabetes tipo 2'],
    bloodType: 'O+',
    hydration: 1250,
    hydrationGoal: 1800,
  },
  {
    id: 'joao',
    name: 'Seu João Almeida',
    age: 82,
    relation: 'Pai',
    initials: 'JA',
    accent: '#2bb9a8',
    conditions: ['Parkinson', 'Mobilidade reduzida'],
    bloodType: 'A+',
    hydration: 980,
    hydrationGoal: 1600,
  },
]

export const medications: Medication[] = [
  { id: 'm1', name: 'Losartana', dose: '50 mg · 1 comprimido', time: '08:00', status: 'done', stock: 18, stockLabel: '18 cápsulas', responsible: 'Marina' },
  { id: 'm2', name: 'Metformina', dose: '850 mg · 1 comprimido', time: '12:00', status: 'next', stock: 12, stockLabel: '12 cápsulas', responsible: 'Você' },
  { id: 'm3', name: 'Atorvastatina', dose: '20 mg · 1 comprimido', time: '20:00', status: 'attention', stock: 4, stockLabel: 'Repor em 4 dias', responsible: 'Marina' },
]

export const activities: Activity[] = [
  { id: 'a1', time: '08:12', title: 'Losartana administrada', detail: 'Marina confirmou a dose de 50 mg', icon: 'pill', tone: 'teal', done: true },
  { id: 'a2', time: '08:45', title: 'Café da manhã', detail: 'Aceitação boa · mingau e banana', icon: 'utensils', tone: 'amber', done: true },
  { id: 'a3', time: '09:30', title: 'Pressão arterial registrada', detail: '12 × 8 mmHg · dentro do esperado', icon: 'heart-pulse', tone: 'violet', done: true },
  { id: 'a4', time: '10:15', title: 'Caminhada leve', detail: '15 minutos pelo jardim', icon: 'footprints', tone: 'blue' },
]

export const appointments: Appointment[] = [
  { id: 'c1', date: '18/11', day: '18', month: 'NOV', title: 'Consulta cardiologista', detail: 'Dr. Ricardo Nunes · 14:30', type: 'consulta', accent: '#6f61e8' },
  { id: 'c2', date: '20/11', day: '20', month: 'NOV', title: 'Fisioterapia', detail: 'Clínica Movimento · 09:00', type: 'fisioterapia', accent: '#2bb9a8' },
  { id: 'c3', date: '27/11', day: '27', month: 'NOV', title: 'Exame de sangue', detail: 'Laboratório Vida · 07:30', type: 'exame', accent: '#f2ad55' },
]

export const alerts = [
  { id: 'alert-1', level: 'attention', title: 'Estoque baixo', detail: 'Atorvastatina · repor em 4 dias', action: 'Ver medicamento' },
  { id: 'alert-2', level: 'info', title: 'Consulta se aproxima', detail: 'Cardiologista amanhã, às 14:30', action: 'Abrir agenda' },
]

export const navItems = [
  { label: 'Painel', path: '/', icon: 'layout-dashboard' },
  { label: 'Saúde', path: '/saude', icon: 'heart-pulse' },
  { label: 'Rotina', path: '/rotina', icon: 'sun-medium' },
  { label: 'Agenda', path: '/agenda', icon: 'calendar-days' },
  { label: 'Diário', path: '/diario', icon: 'book-heart' },
]
