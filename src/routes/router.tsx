import { ProtectedRoute } from '@/components/ProtectedRoute'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { createBrowserRouter, RouteObject } from 'react-router'

export const routes: RouteObject[] = [
	{
		path: '/login',
		Component: Login,
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: '',
				Component: Home,
			},
		],
	},
]

export const router = createBrowserRouter(routes)
