import AppLayout from './layout/AppLayout'
import { Loading } from './ui/loading'
import { useAuth } from '@/contexts/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router'

export function ProtectedRoute() {
	const { isAuthenticated, isInitialized } = useAuth()
	const location = useLocation()

	if (!isInitialized) {
		return <Loading className="absolute inset-0 m-auto" />
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
			/>
		)
	}

	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	)
}
