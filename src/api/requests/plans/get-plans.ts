import api from '@/config/api'
import { z } from 'zod'

export const getPlansSchema = z.object({
	garageId: z.string().optional(),
})

export type GetPlansVariables = z.infer<typeof getPlansSchema>

const planItemSchema = z.object({
	idPlan: z.number(),
	idGarage: z.number(),
	description: z.string(),
	startValidity: z.string(),
	endValidity: z.string().nullable(),
	priceInCents: z.number(),
	active: z.boolean(),
	descriptionAvailable: z.string(),
	amountDailyCancellationInCents: z.number(),
	VeichleType: z.number().optional(), // Inconsistência na API - às vezes maiúscula
	veichleType: z.number().optional(), // Inconsistência na API - às vezes minúscula
	totalVacancies: z.number().int(),
})

const getPlansResponseSchema = z.array(planItemSchema)

export type GetPlansResponse = z.infer<typeof getPlansResponseSchema>

export async function getPlans(params: GetPlansVariables = {}) {
	const response = await api.get('plans', { params })

	const parseResult = getPlansResponseSchema.safeParse(response.data)

	if (!parseResult.success) {
		console.error('Schema parsing error (get-plans):', parseResult.error)
		console.error('Received data:', response.data)
		throw parseResult.error
	}

	return parseResult.data
}
