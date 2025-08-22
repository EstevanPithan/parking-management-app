import api from '@/config/api'
import { z } from 'zod'

export const createPlanSchema = z.object({
	id: z.string(),
	garageId: z.string(),
	description: z.string(),
	startValidity: z.string(),
	endValidity: z.string(),
	priceInCents: z.string(),
	active: z.string(),
	descriptionAvailable: z.string(),
	amountDailyCancellationInCents: z.string(),
	vehicleType: z.string(),
	totalVacancies: z.number().int(),
})

export type CreatePlanVariables = z.infer<typeof createPlanSchema>

const createPlanResponseSchema = z.object({
	id: z.string(),
	garageId: z.string(),
	description: z.string(),
	startValidity: z.string(),
	endValidity: z.string(),
	priceInCents: z.string(),
	active: z.string(),
	descriptionAvailable: z.string(),
	amountDailyCancellationInCents: z.string(),
	vehicleType: z.string(),
	totalVacancies: z.number().int(),
})

export type CreatePlanResponse = z.infer<typeof createPlanResponseSchema>

export async function createPlan(data: CreatePlanVariables) {
	const response = await api.post('plan', data)

	const parseResult = createPlanResponseSchema.safeParse(response.data)

	if (!parseResult.success) {
		console.error('Schema parsing error (create-plan):', parseResult.error)
		console.error('Received data:', response.data)
		throw parseResult.error
	}

	return parseResult.data
}
