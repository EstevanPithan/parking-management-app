import api from '@/config/api'
import { z } from 'zod'

const logoutResponseSchema = z.object({
	data: z.string().nullable(),
	message: z.string().nullable(),
})

export type LogoutResponse = z.infer<typeof logoutResponseSchema>

export async function deauthenticate() {
	const response = await api.get('/auth/logout')
	return logoutResponseSchema.parse(response.data)
}
