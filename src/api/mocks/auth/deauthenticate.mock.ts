import { LogoutResponse } from '@/api/requests/auth/deauthenticate'

export const deauthenticateMock: LogoutResponse = {
	data: null,
	message: 'Logout successful',
}

export const deauthenticateErrorMock: LogoutResponse = {
	data: null,
	message: 'Failed to logout',
}
