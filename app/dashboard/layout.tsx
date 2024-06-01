import type { Metadata } from 'next'
import { SearchBar } from '@/components/search-bar'
import { NavBar } from '@/components/navbar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	!user && redirect('/auth/login')
	return (
		<section>
			<div className='grid min-h-screen select-none lg:grid-cols-[280px_1fr]'>
				<NavBar />
				<div className='flex flex-col'>
					<SearchBar />
					<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>{children}</main>
				</div>
			</div>
		</section>
	)
}
