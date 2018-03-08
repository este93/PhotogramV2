const App = () => import('./App')
//import App from './App'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/forgotPassword/ResetPassword'
//import DashboardPage from './pages/DashboardPage'
//const DashboardPage = () => import('./pages/DashboardPage')
const DashboardPage = resolve => require(['./pages/DashboardPage'], resolve)

//import HomePage from './pages/HomePage'
const HomePage = () => import('./pages/HomePage')
import ProfileEdit from './pages/ProfileEdit'
import Search from './pages/Search'
import Notifications from './pages/Notifications'
import Terms from './pages/Terms'

export default[
	{path: '/', component: App, name:'landing'},
    {path: '/forgot', component: ForgotPassword, name:'forgotPassword'},
    {path: '/reset', component: ResetPassword, name:'resetPassword'},
    {path: '/dashboard/:username', component: DashboardPage, name:'dashboard', meta: { requiresAuth: true} , props: true },
    {path: '/home', component: HomePage, name:'home', meta: { requiresAuth: true}},
    {path: '/profile-edit/:username/', component: ProfileEdit, meta: { requiresAuth: true}, name:'profile-edit' , props: true },
    {path: '/notifications', component: Notifications, meta: { requiresAuth: true}, name:'notifications'},
    {path: '/search', component: Search, meta: { requiresAuth: true}, name:'search'},
    {path: '/terms', component: Terms, name:'terms'}
]


