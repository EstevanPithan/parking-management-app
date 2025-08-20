import { Link } from 'react-router'

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-xl px-6 py-12 text-center">
				{/* Substitua a string abaixo pela rota da imagem quando estiver disponível */}
				<img
					src="REPLACE_WITH_404_IMAGE_SRC"
					alt="Página não encontrada"
					className="mx-auto mb-6 h-48 w-auto object-contain"
				/>

				<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">404 — Página não encontrada</h1>
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
