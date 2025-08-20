import { ProtectedRoute } from '@/components/ProtectedRoute'
import GarageList from '@/pages/GarageList'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
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
			{
				path: '/garagens',
				Component: GarageList,
			},
			{
				path: '*',
				Component: NotFound,
			},
		],
	},
]

export const router = createBrowserRouter(routes)
