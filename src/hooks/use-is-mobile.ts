import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint: number = 768): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false
		return window.innerWidth < breakpoint
	})

	useEffect(() => {
		if (typeof window === 'undefined') return

		const checkMobile = () => {
			setIsMobile(window.innerWidth < breakpoint)
		}

		let timeoutId: NodeJS.Timeout
		const debouncedCheck = () => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(checkMobile, 100)
		}

		window.addEventListener('resize', debouncedCheck)

		return () => {
			window.removeEventListener('resize', debouncedCheck)
			clearTimeout(timeoutId)
		}
	}, [breakpoint])

	return isMobile
}
