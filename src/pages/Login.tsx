import { Icon } from '@/components/icon/Icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { User, Lock } from 'lucide-react'
import { useState } from 'react'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const { login, loading } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		try {
			const success = await login({ username, password })
			if (!success) {
				setError('Credenciais inválidas. Tente novamente.')
			}
		} catch {
			setError('Erro ao fazer login. Tente novamente.')
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md space-y-8">
				<div className="flex justify-center">
					<div className="flex items-center space-x-3">
						<Icon name="Estapar" />
					</div>
				</div>

				<div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
					<div className="mb-6">
						<h2 className="text-center text-base font-medium text-gray-600">
							Entre com suas credenciais para acessar o sistema
						</h2>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						{error && (
							<div className="rounded-md bg-red-50 p-4">
								<div className="text-sm text-red-700">{error}</div>
							</div>
						)}

						<div className="space-y-2">
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								Usuário
							</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<User className="h-4 w-4 text-gray-400" />
								</div>
								<Input
									id="username"
									type="text"
									placeholder="Digite seu usuário"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="h-12 pl-10"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Senha
							</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Lock className="h-4 w-4 text-gray-400" />
								</div>
								<Input
									id="password"
									type="password"
									placeholder="Digite sua senha"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="h-12 pl-10"
									required
								/>
							</div>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="bg-lime h-12 w-full text-base font-medium text-white hover:bg-lime-600 disabled:opacity-50"
						>
							{loading ? 'Entrando...' : 'Entrar'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}
