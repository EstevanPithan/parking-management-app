import Header from './Header'
import Sidebar from './Sidebar'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks'
import { ReactNode, useState, useEffect } from 'react'

interface AppLayoutProps {
	children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
		const saved = localStorage.getItem('sidebarOpen')
		return saved ? JSON.parse(saved) : true
	})
	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
	const isMobile = useIsMobile()

	function toggleSidebar() {
		if (isMobile) {
			setIsSheetOpen((prev) => !prev)
		} else {
			setIsSidebarOpen((prev) => !prev)
		}
	}

	function closeMobileSheet() {
		setIsSheetOpen(false)
	}

	useEffect(() => {
		localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen))
	}, [isSidebarOpen])

	return (
		<div className="flex h-screen min-h-screen overflow-hidden bg-white">
			{!isMobile && (
				<Sidebar
					isOpen={isSidebarOpen}
					onToggle={toggleSidebar}
				/>
			)}

			{isMobile && (
				<Sheet
					open={isSheetOpen}
					onOpenChange={setIsSheetOpen}
				>
					<SheetContent
						side="left"
						className="w-[280px] p-0"
					>
						<Sidebar
							isOpen={true}
							onToggle={closeMobileSheet}
							isMobile={true}
						/>
					</SheetContent>
				</Sheet>
			)}

			<div
				className={`flex min-h-full flex-1 flex-col overflow-hidden transition-all duration-300 ease-out ${
					!isMobile && isSidebarOpen ? 'ml-[220px]'
					: !isMobile ? 'ml-[64px]'
					: ''
				}`}
			>
				<Header
					onMenuClick={isMobile ? toggleSidebar : undefined}
					showMenuButton={isMobile}
				/>

				<main className="h-[calc(100%-3rem)] overflow-hidden">{children}</main>
			</div>
		</div>
	)
}
