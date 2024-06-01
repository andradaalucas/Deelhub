import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})



export default function HomeLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
		</html>
	)
}
