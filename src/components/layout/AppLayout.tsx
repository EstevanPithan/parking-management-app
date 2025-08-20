import Header from './Header'
import Sidebar from './Sidebar'
import { ReactNode, useState, useEffect } from 'react'

interface AppLayoutProps {
	children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
		const saved = localStorage.getItem('sidebarOpen')
		return saved ? JSON.parse(saved) : true
	})

	useEffect(() => {
		localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen))
	}, [isSidebarOpen])

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev)
	}

	return (
		<div className="flex min-h-screen bg-white">
			<Sidebar
				isOpen={isSidebarOpen}
				onToggle={toggleSidebar}
			/>

			<div className={`flex-1 transition-all duration-300 ease-out ${isSidebarOpen ? 'ml-[264px]' : 'ml-[64px]'}`}>
				<Header />

				<main>{children}</main>
			</div>
		</div>
	)
}
