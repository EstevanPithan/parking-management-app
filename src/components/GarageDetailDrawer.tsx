import PlanModal from '@/components/PlanModal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGarage, useIsMobile, usePlans } from '@/hooks'
import { formatCurrency } from '@/lib/utils'
import { Building2, Edit, MapPin, Plus, QrCode, UserCheck, UserMinus, Users } from 'lucide-react'
import { useState } from 'react'

interface GarageDetailDrawerProps {
	garageId: string | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function GarageDetailDrawer({ garageId, open, onOpenChange }: GarageDetailDrawerProps) {
	const isMobile = useIsMobile()
	const [planModalOpen, setPlanModalOpen] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null)

	const { data: garage, isLoading } = useGarage(garageId || '', !!garageId && open)
	const { data: plans = [], isLoading: plansLoading } = usePlans({
		garageId: garageId || '',
		enabled: !!garageId && open,
	})

	const availableSpaces = garage ? garage.countSpaces - garage.occupiedSpaces : 0

	const handleNewPlan = () => {
		setSelectedPlan(null)
		setPlanModalOpen(true)
	}

	const handleEditPlan = (plan: (typeof plans)[0]) => {
		setSelectedPlan(plan)
		setPlanModalOpen(true)
	}

	if (!garageId) return null

	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetContent
				side="right"
				className="w-full max-w-2xl overflow-y-auto sm:max-w-xl md:max-w-2xl"
			>
				{isLoading ?
					<div className="flex h-full items-center justify-center">
						<span className="text-sm text-gray-500">Carregando...</span>
					</div>
				: garage ?
					<div className="flex h-full flex-col gap-4">
						<SheetHeader>
							<div className="flex items-center gap-3">
								<Building2 className="text-lime" />
								<div className="flex-1">
									<SheetTitle className="text-xl font-semibold text-gray-900">{garage.name}</SheetTitle>
									<p className="text-sm text-gray-500">Código: {garage.code}</p>
								</div>
							</div>
						</SheetHeader>

						<div className="flex-1 space-y-4 overflow-y-auto">
							{/* Location and Basic Info */}
							<Card className="p-4">
								<div className="flex items-start gap-3">
									<MapPin className="mt-1 h-5 w-5 text-gray-500" />
									<div className="flex-1">
										<h2 className="text-sm font-medium text-gray-900">{garage.address}</h2>
										<p className="text-xs text-gray-500">
											{garage.subsidiary ? `Filial: ${garage.subsidiary} • ` : ''}
											Regional: {garage.region}
										</p>
									</div>
								</div>
							</Card>

							{/* Parking Stats */}
							<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
								<Card className="p-4">
									<div className="flex items-center gap-3">
										<Users className="h-5 w-5 text-gray-500" />
										<div>
											<p className="text-sm text-gray-500">Total de Vagas</p>
											<p className="text-xl font-semibold text-gray-900">{garage.countSpaces}</p>
										</div>
									</div>
								</Card>

								<Card className="p-4">
									<div className="flex items-center gap-3">
										<UserCheck className="h-5 w-5 text-orange-500" />
										<div>
											<p className="text-sm text-gray-500">Ocupadas</p>
											<p className="text-xl font-semibold text-orange-600">{garage.occupiedSpaces}</p>
										</div>
									</div>
								</Card>

								<Card className="p-4">
									<div className="flex items-center gap-3">
										<UserMinus className="h-5 w-5 text-lime-600" />
										<div>
											<p className="text-sm text-gray-500">Disponíveis</p>
											<p className="text-xl font-semibold text-lime-600">{availableSpaces}</p>
										</div>
									</div>
								</Card>
							</div>

							{/* QR Code Section */}
							<Card className="p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<QrCode className="h-5 w-5 text-gray-500" />
										<div>
											<h3 className="text-sm font-medium text-gray-900">Mensalista Digital</h3>
											<p className="text-xs text-gray-500">QR Code para acesso de mensalistas digitais</p>
										</div>
									</div>
									<div className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
										<div className="flex h-full w-full items-center justify-center">
											<QrCode className="h-8 w-8 text-gray-400" />
										</div>
									</div>
								</div>
							</Card>

							{/* Plans Section */}
							<Card className="flex-1 p-4">
								<div className="mb-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="h-1 w-6 bg-lime-500"></div>
										<h3 className="text-base font-semibold text-gray-900">Planos</h3>
									</div>
									<Button
										size="sm"
										className="bg-lime-600 text-white hover:bg-lime-700"
										onClick={handleNewPlan}
									>
										<Plus className="mr-2 h-4 w-4" />
										Novo Plano
									</Button>
								</div>

								<div className="mb-4 text-sm text-gray-600">
									<h4 className="font-medium">Planos Disponíveis</h4>
								</div>

								{!isMobile ?
									<div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className="table-header-cell">Descrição</TableHead>
													<TableHead className="table-header-cell">Valor</TableHead>
													<TableHead className="table-header-cell">Vagas</TableHead>
													<TableHead className="table-header-cell">Status</TableHead>
													<TableHead className="table-header-cell w-16">Ações</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody className="divide-y divide-gray-200 bg-white">
												{plansLoading ?
													<TableRow>
														<TableCell
															colSpan={5}
															className="empty-state-cell"
														>
															Carregando planos...
														</TableCell>
													</TableRow>
												: plans.length > 0 ?
													plans.map((plan) => (
														<TableRow
															key={plan.idPlan}
															className="hover:bg-gray-50"
														>
															<TableCell className="table-cell-compact font-medium">{plan.description}</TableCell>
															<TableCell className="table-cell-compact">
																{formatCurrency(plan.priceInCents / 100)}
															</TableCell>
															<TableCell className="table-cell-compact">{plan.totalVacancies}</TableCell>
															<TableCell className="table-cell-compact">
																<span
																	className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
																		plan.active ? 'bg-lime-100 text-lime-800' : 'bg-gray-100 text-gray-600'
																	}`}
																>
																	{plan.active ? 'Ativo' : 'Inativo'}
																</span>
															</TableCell>
															<TableCell className="table-cell-action">
																<div className="flex items-center gap-1">
																	<Button
																		variant="ghost"
																		size="icon"
																		className="size-6 text-gray-400 hover:text-gray-600"
																		onClick={() => handleEditPlan(plan)}
																	>
																		<Edit className="h-4 w-4" />
																	</Button>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="size-6 text-gray-400 hover:text-gray-600"
																	>
																		<QrCode className="h-4 w-4" />
																	</Button>
																</div>
															</TableCell>
														</TableRow>
													))
												:	<TableRow>
														<TableCell
															colSpan={5}
															className="empty-state-cell"
														>
															Nenhum plano encontrado
														</TableCell>
													</TableRow>
												}
											</TableBody>
										</Table>
									</div>
								:	<div className="space-y-3 overflow-y-auto">
										{plansLoading ?
											<div className="flex items-center justify-center py-8">
												<span className="text-sm text-gray-500">Carregando planos...</span>
											</div>
										: plans.length > 0 ?
											plans.map((plan) => (
												<div
													key={plan.idPlan}
													className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
												>
													<div className="mb-2 flex items-start justify-between">
														<div className="flex-1">
															<h4 className="text-sm font-medium leading-tight text-gray-900">{plan.description}</h4>
															<p className="mt-1 text-xs text-gray-500">{formatCurrency(plan.priceInCents / 100)}</p>
														</div>
														<div className="flex items-center gap-2">
															<span
																className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
																	plan.active ? 'bg-lime-100 text-lime-800' : 'bg-gray-100 text-gray-600'
																}`}
															>
																{plan.active ? 'Ativo' : 'Inativo'}
															</span>
															<Button
																variant="ghost"
																size="icon"
																className="size-6 flex-shrink-0 text-gray-400 hover:text-gray-600"
																onClick={() => handleEditPlan(plan)}
															>
																<Edit className="h-3 w-3" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="size-6 flex-shrink-0 text-gray-400 hover:text-gray-600"
															>
																<QrCode className="h-3 w-3" />
															</Button>
														</div>
													</div>

													<div className="grid grid-cols-2 gap-2 text-xs">
														<div>
															<span className="text-gray-500">Vagas:</span>
															<p className="text-gray-900">{plan.totalVacancies}</p>
														</div>
														<div>
															<span className="text-gray-500">Disponíveis:</span>
															<p className="text-gray-900">{plan.totalVacancies}</p>
														</div>
													</div>
												</div>
											))
										:	<div className="flex items-center justify-center py-8">
												<span className="text-sm text-gray-500">Nenhum plano encontrado</span>
											</div>
										}
									</div>
								}
							</Card>
						</div>
					</div>
				:	<div className="flex h-full items-center justify-center">
						<span className="text-sm text-gray-500">Garagem não encontrada</span>
					</div>
				}
			</SheetContent>

			<PlanModal
				open={planModalOpen}
				onOpenChange={setPlanModalOpen}
				plan={selectedPlan}
				garageId={garageId}
			/>
		</Sheet>
	)
}
