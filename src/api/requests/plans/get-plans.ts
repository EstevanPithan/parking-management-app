import api from '@/config/api'
import { z } from 'zod'

export const getPlansSchema = z.object({
	garageId: z.string().optional(),
})

export type GetPlansVariables = z.infer<typeof getPlansSchema>

const planItemSchema = z.object({
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

const getPlansResponseSchema = z.array(planItemSchema)

export type GetPlansResponse = z.infer<typeof getPlansResponseSchema>

export async function getPlans(params: GetPlansVariables = {}) {
	const response = await api.get('plans', { params })
	return getPlansResponseSchema.parse(response.data)
}
