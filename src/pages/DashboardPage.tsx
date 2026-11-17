import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { activities, alerts, appointments, elders, medications } from '../data/dashboard'
import { Icon } from '../components/Icon'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { SectionHeading, useApp } from '../app/AppShell'
import { formatLiters } from '../lib/storage'

export function DashboardPage() {
  const { selectedElder, toast, announce } = useApp()
  const [medicationDone, setMedicationDone] = useState(false)
  const { data: dayData } = useQuery({
    queryKey: ['dashboard', selectedElder.id],
    queryFn: async () => ({ dateLabel: 'terça-feira, 17 de novembro', greeting: 'Bom dia' }),
    staleTime: Infinity,
  })
  const hydrationPercent = Math.round((selectedElder.hydration / selectedElder.hydrationGoal) * 100)

  return (
    <div className="page-content dashboard-page">
      <div className="dashboard-hero">
        <div>
          <span className="eyebrow"><span className="live-dot" /> {dayData?.dateLabel ?? 'hoje'}</span>
          <h1>{dayData?.greeting ?? 'Bom dia'}, Marina <span className="wave">✦</span></h1>
          <p>O cuidado de hoje começa por aqui. Veja como está {selectedElder.name.split(' ')[1]}.</p>
        </div>
        <div className="hero-actions"><button className="secondary-button" onClick={() => announce(`Resumo do dia de ${selectedElder.name}: hidratação em ${hydrationPercent} por cento e próxima medicação ao meio-dia.`)}><Icon name="volume-2" size={16} /> Ouvir resumo</button><button className="primary-button" onClick={() => toast('Novo registro aberto para preenchimento')}><Icon name="plus" size={17} /> Novo registro</button></div>
      </div>

      <section className="next-care-card">
        <div className="next-care-icon"><Icon name="alarm-clock" size={24} /></div>
        <div className="next-care-copy"><span className="eyebrow">PRÓXIMO CUIDADO <span className="tiny-live">AGORA</span></span><h3>Medicação do almoço</h3><p>Metformina <strong>850 mg</strong> · 1 comprimido · dose às 12:00</p></div>
        <div className="next-care-time"><strong>12:00</strong><span>daqui a 1h 24min</span></div>
        <button className={`complete-button ${medicationDone ? 'completed' : ''}`} onClick={() => { setMedicationDone(true); toast('Metformina marcada como administrada') }}>{medicationDone ? <><Icon name="check" size={16} /> Administrada</> : <><Icon name="clipboard-check" size={16} /> Marcar como feita</>}</button>
      </section>

      <div className="metric-grid">
        <MetricCard icon="pill" label="Medicamentos" value={medicationDone ? '3/3' : '2/3'} helper="doses de hoje" trend="100%" tone="teal" />
        <MetricCard icon="droplets" label="Hidratação" value={formatLiters(selectedElder.hydration)} helper={`de ${formatLiters(selectedElder.hydrationGoal)}`} trend={`${hydrationPercent}%`} tone="blue" />
        <MetricCard icon="heart-pulse" label="Sinais vitais" value="Estáveis" helper="último registro 09:30" tone="violet" />
        <MetricCard icon="clipboard-check" label="Tarefas" value="4/6" helper="concluídas hoje" trend="+2" tone="amber" />
      </div>

      <div className="dashboard-grid">
        <section className="panel activity-panel">
          <SectionHeading eyebrow="ACOMPANHAMENTO" title="Atividade recente" detail="O que já aconteceu hoje" action={<Link to="/rotina" className="text-button">Ver tudo <Icon name="arrow-up-right" size={14} /></Link>} />
          <div className="activity-list">{activities.map((activity, index) => <div className={`activity-row ${index === activities.length - 1 ? 'activity-current' : ''}`} key={activity.id}><div className={`activity-icon activity-${activity.tone}`}><Icon name={activity.icon} size={17} /></div><div className="activity-line"><span className="activity-time">{activity.time}</span><span className="activity-dot" /></div><div className="activity-copy"><strong>{activity.title}</strong><span>{activity.detail}</span></div>{activity.done ? <span className="activity-check"><Icon name="check" size={14} /></span> : <span className="activity-now">próximo</span>}</div>)}</div>
          <div className="activity-footer"><span><span className="pulse-dot" /> Atualizado há 2 min</span><button className="icon-button" aria-label="Atualizar atividades" onClick={() => toast('Atividades atualizadas')}><Icon name="trending-up" size={16} /></button></div>
        </section>

        <section className="panel hydration-panel">
          <SectionHeading eyebrow="BEM-ESTAR" title="Hidratação" detail="Meta diária de ingestão" action={<button className="icon-button" aria-label="Adicionar água" onClick={() => toast('250 ml adicionados ao registro')}><Icon name="plus" size={17} /></button>} />
          <div className="hydration-visual"><div className="water-ring" style={{ '--hydration': `${Math.min(hydrationPercent, 100)}%` } as React.CSSProperties}><div><strong>{hydrationPercent}%</strong><span>da meta</span></div></div><div className="hydration-summary"><strong>{formatLiters(selectedElder.hydration)}</strong><span>de {formatLiters(selectedElder.hydrationGoal)}</span><StatusBadge tone="success">No ritmo certo</StatusBadge></div></div>
          <div className="water-bars"><span /><span /><span /><span className="bar-active" /><span /><span /><span /></div><div className="hydration-meta"><span><Icon name="droplets" size={14} /> Próximo lembrete</span><strong>11:30 · 250 ml</strong></div>
        </section>

        <section className="panel medication-panel">
          <SectionHeading eyebrow="MEDICAÇÃO" title="Hoje" detail="Controle de horários e estoque" action={<Link to="/saude" className="text-button">Gerenciar <Icon name="arrow-up-right" size={14} /></Link>} />
          <div className="medication-list">{medications.map((medication) => <div className="medication-row" key={medication.id}><div className={`medication-status med-${medication.status}`}><Icon name={medication.status === 'done' ? 'check' : medication.status === 'attention' ? 'triangle-alert' : 'clock-3'} size={15} /></div><div className="medication-copy"><strong>{medication.name}</strong><span>{medication.dose}</span></div><div className="medication-time"><strong>{medication.time}</strong><span>{medication.status === 'done' ? 'administrado' : medication.status === 'next' ? 'próximo' : 'atenção'}</span></div></div>)}</div>
        </section>

        <section className="panel agenda-panel">
          <SectionHeading eyebrow="AGENDA" title="Próximos compromissos" detail="Consultas e atividades" action={<Link to="/agenda" className="text-button">Calendário <Icon name="arrow-up-right" size={14} /></Link>} />
          <div className="appointment-list">{appointments.map((appointment) => <div className="appointment-row" key={appointment.id}><div className="appointment-date" style={{ '--accent': appointment.accent } as React.CSSProperties}><strong>{appointment.day}</strong><span>{appointment.month}</span></div><div className="appointment-copy"><strong>{appointment.title}</strong><span>{appointment.detail}</span></div><Icon name="chevron-right" size={17} /></div>)}</div>
        </section>
      </div>

      <section className="alerts-strip"><div className="alerts-title"><span className="alert-orb"><Icon name="bell" size={16} /></span><div><strong>Fique de olho</strong><span>{alerts.length} itens precisam da sua atenção</span></div></div>{alerts.map((alert) => <button className={`alert-item alert-${alert.level}`} key={alert.id} onClick={() => toast(alert.detail)}><span><Icon name={alert.level === 'attention' ? 'triangle-alert' : 'calendar-days'} size={15} /></span><div><strong>{alert.title}</strong><small>{alert.detail}</small></div><Icon name="arrow-up-right" size={14} /></button>)}</section>
    </div>
  )
}
