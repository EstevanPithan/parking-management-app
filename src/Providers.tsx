import { AuthProvider } from './contexts/AuthContext'
import { router } from './routes/router'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
})

type ProvidersProps = {
	router: typeof router
}

export function Providers(props: ProvidersProps) {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<RouterProvider router={props.router} />
					<Toaster />
				</AuthProvider>
			</QueryClientProvider>
		</StrictMode>
	)
}
