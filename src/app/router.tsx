import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { AppShell } from './AppShell'
import { DashboardPage } from '../pages/DashboardPage'
import { HealthPage } from '../pages/HealthPage'
import { RoutinePage } from '../pages/RoutinePage'
import { AgendaPage } from '../pages/AgendaPage'
import { DiaryPage } from '../pages/DiaryPage'
import { SettingsPage } from '../pages/SettingsPage'

const rootRoute = createRootRoute({ component: AppShell })
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: DashboardPage })
const healthRoute = createRoute({ getParentRoute: () => rootRoute, path: '/saude', component: HealthPage })
const routineRoute = createRoute({ getParentRoute: () => rootRoute, path: '/rotina', component: RoutinePage })
const agendaRoute = createRoute({ getParentRoute: () => rootRoute, path: '/agenda', component: AgendaPage })
const diaryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/diario', component: DiaryPage })
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/configuracoes', component: SettingsPage })

const routeTree = rootRoute.addChildren([dashboardRoute, healthRoute, routineRoute, agendaRoute, diaryRoute, settingsRoute])
export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}
