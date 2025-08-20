import CardLink from '@/components/layout/CardLink'
import { Building2, Car } from 'lucide-react'

export default function Home() {
	return (
		<div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10">
			<div className="mb-12">
				<h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
					Bem-vindo ao Portal Estapar B2B
				</h1>
				<p className="mt-4 max-w-[65ch] text-lg text-neutral-600">
					Gerencie seus serviços de estacionamento, acesse relatórios, configure credenciados e contrate planos de
					mensalidade em um só lugar.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<CardLink
					icon={Building2}
					title="Garagens"
					description="Veja a lista de garagens disponíveis e suas configurações."
					href="/garagens"
				/>

				<CardLink
					icon={Car}
					title="Mensalistas"
					description="Contrate vagas adicionais para seus funcionários ou visitantes."
					href="/mensalistas"
				/>
			</div>
		</div>
	)
}
