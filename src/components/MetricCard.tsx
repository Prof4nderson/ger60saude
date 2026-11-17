import { Icon } from './Icon'

export function MetricCard({ icon, label, value, helper, trend, tone }: { icon: string; label: string; value: string; helper: string; trend?: string; tone: 'teal' | 'violet' | 'amber' | 'blue' }) {
  return (
    <article className={`metric-card metric-${tone}`}>
      <div className="metric-icon"><Icon name={icon} size={19} /></div>
      <div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{helper}</small></div>
      {trend && <span className="metric-trend"><Icon name="arrow-up-right" size={14} />{trend}</span>}
    </article>
  )
}
