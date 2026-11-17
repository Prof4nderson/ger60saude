import { useState } from 'react'
import { Icon } from '../components/Icon'
import { StatusBadge } from '../components/StatusBadge'
import { SectionHeading, useApp } from '../app/AppShell'

const routineItems = [
  { time: '07:00', label: 'Café da manhã', detail: 'Mingau de aveia · banana', icon: 'utensils', done: true },
  { time: '09:30', label: 'Higiene da manhã', detail: 'Banho e cuidado com a pele', icon: 'sparkles', done: true },
  { time: '10:15', label: 'Caminhada leve', detail: '15 minutos · jardim', icon: 'footprints', done: false },
  { time: '11:30', label: 'Lembrete de hidratação', detail: '250 ml de água', icon: 'droplets', done: false },
  { time: '12:00', label: 'Almoço', detail: 'Dieta regular · baixa em sal', icon: 'leaf', done: false },
]

export function RoutinePage() {
  const { selectedElder, toast } = useApp()
  const [completed, setCompleted] = useState<string[]>(routineItems.filter((item) => item.done).map((item) => item.label))
  const toggle = (label: string) => { setCompleted((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]); toast(completed.includes(label) ? 'Registro reaberto' : 'Rotina marcada como concluída') }
  return <div className="page-content inner-page"><div className="page-title-row"><div><span className="eyebrow">GESTÃO FÍSICA</span><h1>Rotina de {selectedElder.name.split(' ')[1]}</h1><p>Pequenos cuidados, acompanhados ao longo do dia.</p></div><button className="primary-button" onClick={() => toast('Novo item de rotina aberto')}><Icon name="plus" size={17} /> Adicionar cuidado</button></div>
    <div className="routine-progress panel"><div><span className="eyebrow">PROGRESSO DE HOJE</span><h3>{completed.length} de {routineItems.length} cuidados concluídos</h3></div><div className="progress-track"><span style={{ width: `${(completed.length / routineItems.length) * 100}%` }} /></div><strong>{Math.round((completed.length / routineItems.length) * 100)}%</strong><StatusBadge tone="success">Bom ritmo</StatusBadge></div>
    <div className="routine-layout"><section className="panel"><SectionHeading eyebrow="LINHA DO DIA" title="Cuidados programados" detail="Toque em um item para atualizar o registro" /><div className="routine-timeline">{routineItems.map((item) => { const done = completed.includes(item.label); return <div className={`routine-item ${done ? 'done' : ''}`} key={item.label}><div className="routine-time">{item.time}</div><div className={`routine-icon ${done ? 'routine-done' : ''}`}><Icon name={item.icon} size={17} /></div><div className="routine-copy"><strong>{item.label}</strong><span>{item.detail}</span></div><button className={`check-button ${done ? 'checked' : ''}`} onClick={() => toggle(item.label)} aria-label={`${done ? 'Reabrir' : 'Concluir'} ${item.label}`}><Icon name="check" size={15} /></button></div> })}</div></section><div className="routine-side"><section className="panel meal-card"><span className="eyebrow">ALIMENTAÇÃO</span><h3>Aceitação das refeições</h3><div className="meal-rating"><span>Hoje</span><strong>Boa</strong><div className="rating-dots"><i className="selected" /><i className="selected" /><i className="selected" /><i /><i /></div></div><p>Sem restrições registradas para o próximo cardápio.</p><button className="text-button" onClick={() => toast('Registro de refeição aberto')}>Registrar refeição <Icon name="arrow-up-right" size={14} /></button></section><section className="panel fall-card"><div className="fall-head"><span className="note-bubble"><Icon name="shield-check" size={18} /></span><span className="eyebrow">SEGURANÇA</span></div><h3>Nenhuma queda registrada</h3><p>O último registro de mobilidade está dentro do esperado.</p><button className="secondary-button" onClick={() => toast('Registro de ocorrência aberto')}>Registrar ocorrência <Icon name="plus" size={14} /></button></section></div></div>
  </div>
}
