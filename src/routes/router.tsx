import { ProtectedRoute } from '@/components/ProtectedRoute'
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
			// {
			// 	path: '',
			// 	Component: Home,
			// 	children: [
			// 		{
			// 			path: 'test',
			// 			Component: ComponentsTest,
			// 		},
			// 	],
			// },
		],
	},
]

export const router = createBrowserRouter(routes)
