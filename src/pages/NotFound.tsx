import { Link } from 'react-router'

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-white">
			<div className="w-full max-w-xl px-6 py-12 text-center">
				<img
					src="src/assets/not-found.png	"
					alt="Página não encontrada"
					className="mx-auto mb-6 h-80 w-auto object-contain"
				/>

				<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Página não encontrada</h1>
				<p className="mt-3 text-neutral-600">A página que você procura não existe ou foi movida.</p>

				<div className="mt-6">
					<Link
						to="/"
						className="bg-lime inline-block rounded px-4 py-2 text-sm font-medium text-white hover:bg-lime-600"
					>
						Voltar ao início
					</Link>
				</div>
			</div>
		</div>
	)
}
