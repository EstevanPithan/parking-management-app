import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
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
				<ThemeProvider>
					<RouterProvider router={props.router} />
				</ThemeProvider>
			</AuthProvider>
		</StrictMode>
	)
}
