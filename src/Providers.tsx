import { AuthProvider } from './contexts/AuthContext'
import { router } from './routes/router'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'

type ProvidersProps = {
	router: typeof router
}

export function Providers(props: ProvidersProps) {
	return (
		<StrictMode>
			<AuthProvider>
				<RouterProvider router={props.router} />
			</AuthProvider>
		</StrictMode>
	)
}
