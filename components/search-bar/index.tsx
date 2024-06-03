import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
	ArrowLeftRightIcon,
	HomeIcon,
	LandmarkIcon,
	Package2Icon,
	SearchIcon,
	SettingsIcon,
	UsersIcon,
} from 'lucide-react'
import Link from 'next/link'

export function SearchBar() {
	const links = [
		{
			href: '/dashboard',
			icon: HomeIcon,
			label: 'Home',
		},
		{
			href: '/dashboard/transactions',
			icon: ArrowLeftRightIcon,
			label: 'Transactions',
		},
		{
			href: '/dashboard/banks_accounts',
			icon: LandmarkIcon,
			label: 'Bank',
		},
		{
			href: '/dashboard/customers',
			icon: UsersIcon,
			label: 'Customers',
		},
		{
			href: '/dashboard/settings',
			icon: SettingsIcon,
			label: 'Settings',
		},
	]

	return (
		<header className='flex h-14 w-full items-center gap-4 overflow-x-hidden border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]'>
			<Sheet>
				<SheetTrigger className='lg:hidden'>
					<Package2Icon className='h-6 w-6' />
					<span className='sr-only'>Home</span>
				</SheetTrigger>
				<SheetContent side='left'>
					<div className='flex-1 overflow-auto py-2'>
						<nav className='grid items-start text-sm font-medium'>
							{links.map((link, index) => (
								<Link
									className='flex items-center gap-3 rounded-lg  px-3 py-3 text-gray-500 transition-all hover:bg-[#f2f2f2] hover:text-gray-900'
									href={link.href}
									key={index}
								>
									<link.icon className='h-4 w-4' />
									{link.label}
								</Link>
							))}
						</nav>
					</div>
				</SheetContent>
			</Sheet>

			<div className='w-auto flex-1 lg:w-auto'>
				<form>
					<div className='relative'>
						<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
						<Input
							className='w-full max-w-sm appearance-none bg-white pl-8 shadow-none lg:w-1/3'
							placeholder='Smart search'
							type='search'
						/>
					</div>
				</form>
			</div>
		</header>
	)
}
