import { Icon } from './Icon'

export function StatusBadge({ tone, children }: { tone: 'success' | 'warning' | 'info' | 'neutral'; children: React.ReactNode }) {
  const icon = tone === 'success' ? 'check' : tone === 'warning' ? 'triangle-alert' : tone === 'info' ? 'sparkles' : 'clock-3'
  return <span className={`status-badge status-${tone}`}><Icon name={icon} size={13} />{children}</span>
}
