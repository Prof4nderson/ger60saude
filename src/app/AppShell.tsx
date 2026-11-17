import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { elders, navItems, type Elder, type FontScale, type ThemeMode } from '../data/dashboard'
import { Icon } from '../components/Icon'
import { preferences, speak } from '../lib/storage'

type AppContextValue = {
  theme: ThemeMode
  fontScale: FontScale
  selectedElder: Elder
  setTheme: (theme: ThemeMode) => void
  setFontScale: (scale: FontScale) => void
  selectElder: (elderId: string) => void
  announce: (text: string) => void
  toast: (message: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp deve ser usado dentro do AppShell')
  return context
}

export function AppShell() {
  const [theme, setThemeState] = useState<ThemeMode>(() => preferences.getTheme())
  const [fontScale, setFontScaleState] = useState<FontScale>(() => preferences.getFontScale())
  const [selectedElderId, setSelectedElderId] = useState(() => preferences.getSelectedElder())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const selectedElder = elders.find((elder) => elder.id === selectedElderId) ?? elders[0]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.fontScale = fontScale
    document.documentElement.style.colorScheme = theme === 'cyber' ? 'dark' : 'light'
  }, [theme, fontScale])

  useEffect(() => {
    if (!toastMessage) return
    const timeout = window.setTimeout(() => setToastMessage(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [toastMessage])

  const contextValue = useMemo<AppContextValue>(() => ({
    theme,
    fontScale,
    selectedElder,
    setTheme: (nextTheme) => { preferences.setTheme(nextTheme); setThemeState(nextTheme) },
    setFontScale: (nextScale) => { preferences.setFontScale(nextScale); setFontScaleState(nextScale) },
    selectElder: (elderId) => { preferences.setSelectedElder(elderId); setSelectedElderId(elderId) },
    announce: (text) => { speak(text); setToastMessage('Leitura iniciada') },
    toast: setToastMessage,
  }), [fontScale, selectedElder, theme])

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`app-shell ${mobileOpen ? 'mobile-nav-open' : ''}`}>
        <aside className="sidebar" aria-label="Navegação principal">
          <div className="brand-lockup">
            <div className="brand-mark"><Icon name="heart-pulse" size={21} strokeWidth={2.2} /></div>
            <div><strong>Geri60<span>+</span></strong><small>SAÚDE</small></div>
            <button className="icon-button sidebar-close" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}><Icon name="x" size={18} /></button>
          </div>

          <div className="care-context">
            <span className="eyebrow">ACOMPANHANDO AGORA</span>
            <button className="elder-switcher" onClick={() => setMobileOpen(false)}>
              <span className="avatar avatar-small" style={{ background: selectedElder.accent }}>{selectedElder.initials}</span>
              <span><strong>{selectedElder.name}</strong><small>{selectedElder.relation} · {selectedElder.age} anos</small></span>
              <Icon name="chevron-down" size={16} />
            </button>
          </div>

          <nav className="main-nav">
            <span className="nav-label">CUIDADO</span>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} activeProps={{ className: 'nav-item active' }} className="nav-item" activeOptions={{ exact: item.path === '/' }} onClick={() => setMobileOpen(false)}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.label === 'Agenda' && <span className="nav-count">3</span>}
              </Link>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <Link to="/configuracoes" className="nav-item" activeProps={{ className: 'nav-item active' }} onClick={() => setMobileOpen(false)}><Icon name="settings-2" size={18} /><span>Configurações</span></Link>
            <div className="help-card"><span className="help-icon"><Icon name="help-circle" size={17} /></span><strong>Precisa de ajuda?</strong><small>Estamos aqui para apoiar.</small><button onClick={() => setToastMessage('Mensagem enviada para o suporte')}>Falar com suporte <Icon name="arrow-up-right" size={13} /></button></div>
            <div className="profile-row"><span className="avatar avatar-profile">MS</span><span><strong>Marina Silva</strong><small>Familiar · acesso completo</small></span><button className="icon-button" aria-label="Mais opções" onClick={() => setToastMessage('Perfil conectado com segurança')}><Icon name="more-horizontal" size={18} /></button></div>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <button className="icon-button menu-toggle" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}><Icon name="menu" size={21} /></button>
            <div className="breadcrumb"><span>Geri60+ Saúde</span><Icon name="chevron-right" size={14} /><strong>Cuidado diário</strong></div>
            <div className="topbar-actions">
              <button className="accessibility-toggle" onClick={() => contextValue.setFontScale(fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'xlarge' : 'normal')}><Icon name="sliders-horizontal" size={16} /><span>Acessibilidade</span></button>
              <button className="icon-button" aria-label="Ler página em voz alta" onClick={() => contextValue.announce('O cuidado de hoje começa por aqui.')}><Icon name="volume-2" size={18} /></button>
              <button className="icon-button notification-button" aria-label="Notificações" onClick={() => setToastMessage('Você tem 2 alertas importantes')}><Icon name="bell" size={18} /><span /></button>
              <button className="theme-toggle" aria-label="Alternar tema" onClick={() => contextValue.setTheme(theme === 'holo' ? 'cyber' : 'holo')}><Icon name={theme === 'holo' ? 'moon' : 'sun-medium'} size={16} /><span>{theme === 'holo' ? 'Cyber' : 'Holo'}</span></button>
            </div>
          </header>
          <div className="page-wrap"><Outlet /></div>
        </main>
        {mobileOpen && <button className="mobile-overlay" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}
        {toastMessage && <div className="toast" role="status"><span className="toast-dot" /><span>{toastMessage}</span><button className="icon-button" onClick={() => setToastMessage('')} aria-label="Fechar aviso"><Icon name="x" size={15} /></button></div>}
      </div>
    </AppContext.Provider>
  )
}

export function SectionHeading({ eyebrow, title, detail, action }: { eyebrow?: string; title: string; detail?: string; action?: ReactNode }) {
  return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{detail && <p>{detail}</p>}</div>{action}</div>
}
