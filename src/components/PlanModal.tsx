import { CreatePlanVariables } from '@/api/requests/plans/create-plan'
import { GetPlansResponse } from '@/api/requests/plans/get-plans'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCreatePlan } from '@/hooks'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type PlanItem = GetPlansResponse[0]

interface PlanModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	plan?: PlanItem | null
	garageId: string
}

export default function PlanModal({ open, onOpenChange, plan, garageId }: PlanModalProps) {
	const createPlanMutation = useCreatePlan()

	const [formData, setFormData] = useState({
		description: '',
		priceInCents: '',
		totalVacancies: 1,
		active: 'true',
		vehicleType: '1',
		amountDailyCancellationInCents: '',
		startValidity: '',
		endValidity: '',
		descriptionAvailable: '',
	})

	const isEditing = !!plan

	useEffect(() => {
		if (plan) {
			setFormData({
				description: plan.description,
				priceInCents: plan.priceInCents.toString(),
				totalVacancies: plan.totalVacancies,
				active: plan.active ? 'true' : 'false',
				vehicleType: (plan.veichleType || plan.VeichleType || 1).toString(),
				amountDailyCancellationInCents: plan.amountDailyCancellationInCents.toString(),
				startValidity: plan.startValidity,
				endValidity: plan.endValidity || '',
				descriptionAvailable: plan.descriptionAvailable,
			})
		} else {
			setFormData({
				description: '',
				priceInCents: '',
				totalVacancies: 1,
				active: 'true',
				vehicleType: '1',
				amountDailyCancellationInCents: '',
				startValidity: '',
				endValidity: '',
				descriptionAvailable: '',
			})
		}
	}, [plan, open])

	const handleSave = async () => {
		if (!formData.description.trim()) {
			toast.error('Descrição é obrigatória')
			return
		}
		if (!formData.startValidity) {
			toast.error('Data de início é obrigatória')
			return
		}
		if (!formData.endValidity) {
			toast.error('Data de fim é obrigatória')
			return
		}
		if (!formData.priceInCents.trim()) {
			toast.error('Preço é obrigatório')
			return
		}
		if (!formData.amountDailyCancellationInCents.trim()) {
			toast.error('Valor de cancelamento é obrigatório')
			return
		}
		if (!formData.descriptionAvailable.trim()) {
			toast.error('Descrição disponível é obrigatória')
			return
		}

		try {
			const planData: CreatePlanVariables = {
				garageId,
				description: formData.description.trim(),
				startValidity: formData.startValidity,
				endValidity: formData.endValidity,
				priceInCents: formData.priceInCents.trim(),
				active: formData.active,
				descriptionAvailable: formData.descriptionAvailable.trim(),
				amountDailyCancellationInCents: formData.amountDailyCancellationInCents.trim(),
				vehicleType: formData.vehicleType,
				totalVacancies: formData.totalVacancies,
			}

			if (isEditing && plan?.idPlan) {
				planData.id = plan.idPlan.toString()
			}

			await createPlanMutation.mutateAsync(planData)
			toast.success(isEditing ? 'Plano atualizado com sucesso!' : 'Plano criado com sucesso!')
			onOpenChange(false)
		} catch {
			toast.error('Erro ao salvar plano. Tente novamente.')
		}
	}

	const handleCancel = () => {
		onOpenChange(false)
	}

	const handleInputChange = (field: keyof typeof formData, value: any) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}))
	}

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="max-w-2xl overflow-y-auto">
				<DialogHeader className="relative">
					<DialogTitle className="text-xl font-semibold text-gray-900">
						{isEditing ? 'Editar Plano' : 'Novo Plano'}
					</DialogTitle>
					<p className="text-sm text-gray-500">
						{isEditing ? 'Edite os dados do plano existente.' : 'Preencha os dados para criar um novo plano.'}
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="absolute right-0 top-0 h-8 w-8 p-0"
						onClick={handleCancel}
					>
						<X className="h-4 w-4" />
					</Button>
				</DialogHeader>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="md:col-span-2">
						<Label
							htmlFor="description"
							className="text-sm font-medium text-gray-700"
						>
							Descrição
						</Label>
						<Input
							id="description"
							placeholder="Digite a descrição do plano"
							value={formData.description}
							onChange={(e) => handleInputChange('description', e.target.value)}
							className="mt-1"
						/>
					</div>

					<div>
						<Label className="text-sm font-medium text-gray-700">Status</Label>
						<div className="mt-2 flex items-center gap-3">
							<Switch
								checked={formData.active === 'true'}
								onCheckedChange={(checked) => handleInputChange('active', checked ? 'true' : 'false')}
							/>
							<span className="text-sm font-medium text-lime-600">
								{formData.active === 'true' ? 'Ativo' : 'Inativo'}
							</span>
						</div>
					</div>

					<div>
						<Label
							htmlFor="vehicleType"
							className="text-sm font-medium text-gray-700"
						>
							Tipo de Veículo
						</Label>
						<Select
							value={formData.vehicleType}
							onValueChange={(value) => handleInputChange('vehicleType', value)}
						>
							<SelectTrigger className="mt-1">
								<SelectValue placeholder="Selecione o tipo" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Carro</SelectItem>
								<SelectItem value="2">Moto</SelectItem>
								<SelectItem value="3">Caminhão</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label
							htmlFor="totalVacancies"
							className="text-sm font-medium text-gray-700"
						>
							Total de Vagas
						</Label>
						<Input
							id="totalVacancies"
							type="number"
							min="1"
							value={formData.totalVacancies}
							onChange={(e) => handleInputChange('totalVacancies', parseInt(e.target.value) || 1)}
							className="mt-1"
						/>
					</div>

					<div>
						<Label
							htmlFor="priceInCents"
							className="text-sm font-medium text-gray-700"
						>
							Valor (R$)
						</Label>
						<Input
							id="priceInCents"
							type="number"
							min="0"
							step="0.01"
							placeholder="0"
							value={formData.priceInCents}
							onChange={(e) => handleInputChange('priceInCents', e.target.value)}
							className="mt-1"
						/>
					</div>

					<div>
						<Label
							htmlFor="amountDailyCancellationInCents"
							className="text-sm font-medium text-gray-700"
						>
							Valor do Cancelamento (R$)
						</Label>
						<Input
							id="amountDailyCancellationInCents"
							type="number"
							min="0"
							step="0.01"
							placeholder="0"
							value={formData.amountDailyCancellationInCents}
							onChange={(e) => handleInputChange('amountDailyCancellationInCents', e.target.value)}
							className="mt-1"
						/>
					</div>

					<div>
						<Label
							htmlFor="startValidity"
							className="text-sm font-medium text-gray-700"
						>
							Início da Validade
						</Label>
						<Input
							id="startValidity"
							type="date"
							value={formData.startValidity}
							onChange={(e) => handleInputChange('startValidity', e.target.value)}
							className="mt-1"
						/>
					</div>

					<div>
						<Label
							htmlFor="endValidity"
							className="text-sm font-medium text-gray-700"
						>
							Fim da Validade
						</Label>
						<Input
							id="endValidity"
							type="date"
							placeholder="dd/mm/aaaa"
							value={formData.endValidity}
							onChange={(e) => handleInputChange('endValidity', e.target.value)}
							className="mt-1"
						/>
					</div>

					<div className="md:col-span-2">
						<Label
							htmlFor="descriptionAvailable"
							className="text-sm font-medium text-gray-700"
						>
							Descrição Disponível
						</Label>
						<Input
							id="descriptionAvailable"
							placeholder="Digite a descrição disponível"
							value={formData.descriptionAvailable}
							onChange={(e) => handleInputChange('descriptionAvailable', e.target.value)}
							className="mt-1"
						/>
					</div>
				</div>

				<DialogFooter className="gap-3">
					<Button
						variant="outline"
						onClick={handleCancel}
						disabled={createPlanMutation.isPending}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleSave}
						disabled={createPlanMutation.isPending}
						className="bg-lime-600 text-white hover:bg-lime-700"
					>
						{createPlanMutation.isPending ?
							'Salvando...'
						: isEditing ?
							'Salvar Alterações'
						:	'Criar'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
