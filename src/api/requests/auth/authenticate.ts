import api from '@/config/api'
import { z } from 'zod'

export const authenticateSchema = z.object({
	username: z.string(),
	password: z.string(),
})

export type AuthenticateVariables = z.infer<typeof authenticateSchema>

const authenticateResponseSchema = z.object({
	data: z
		.object({
			token: z.string(),
			expiredIn: z.string(),
		})
		.nullable(),
	message: z.string().nullable(),
	originReturn: z.string().nullable(),
	notification: z.array(z.unknown()),
})

export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>

export async function authenticate(data: AuthenticateVariables) {
	const response = await api.post('Authenticate', data)
	return authenticateResponseSchema.parse(response.data)
}
