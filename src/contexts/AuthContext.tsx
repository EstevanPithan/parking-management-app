import { authenticate, AuthenticateVariables } from '@/api/requests/auth/authenticate'
import { deauthenticate } from '@/api/requests/auth/deauthenticate'
import api from '@/config/api'
import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react'

interface AuthContextValues {
	login: (data: AuthenticateVariables) => Promise<boolean>
	logout: () => void
	loading: boolean
	isAuthenticated: boolean
	token: string | null
	isInitialized: boolean
}

interface AuthProviderProps {
	children: ReactNode
}

const AuthContext = createContext<AuthContextValues>({
	login: async () => false,
	logout: () => {},
	loading: false,
	isAuthenticated: false,
	token: null,
	isInitialized: false,
})

export function useAuth() {
	const authContext = useContext(AuthContext)

	if (!authContext) throw new Error('useAuth must be used within an AuthProvider')

	return authContext
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [token, setToken] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	async function login(data: AuthenticateVariables) {
		setLoading(true)
		try {
			const response = await authenticate(data)
			if (!response.data) throw new Error()
			const accessToken = response.data.token
			setToken(accessToken)
			localStorage.setItem('accessToken', accessToken)
			return true
		} catch {
			setToken(null)
			localStorage.removeItem('accessToken')
			return false
		} finally {
			setLoading(false)
		}
	}

	async function logout() {
		setLoading(true)
		try {
			await deauthenticate()
		} finally {
			setToken(null)
			localStorage.removeItem('accessToken')
			setLoading(false)
		}
	}

	useEffect(() => {
		function initializeAuth() {
			try {
				const storedToken = localStorage.getItem('accessToken')
				if (storedToken) {
					setToken(storedToken)
				}
			} catch {
				setToken(null)
				localStorage.removeItem('accessToken')
			} finally {
				setIsInitialized(true)
			}
		}

		initializeAuth()
	}, [])

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use((config) => {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		})

		return () => {
			api.interceptors.request.eject(authInterceptor)
		}
	}, [token])

	useLayoutEffect(() => {
		const responseInterceptor = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				if (error.response?.status === 401 || error.response?.status === 403) {
					setToken(null)
					localStorage.removeItem('accessToken')
				}
				return Promise.reject(error)
			},
		)

		return () => {
			api.interceptors.response.eject(responseInterceptor)
		}
	}, [])

	if (!isInitialized) {
		return null
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				loading,
				isAuthenticated: !!token,
				token,
				isInitialized,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
