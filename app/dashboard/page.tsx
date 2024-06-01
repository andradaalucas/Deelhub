import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Home() {
	const supabase = createClient()
	const { data: transactions } = await supabase.from('transactions').select()

	return (
		<>
			<pre className='flex min-h-screen flex-col items-center justify-between p-24'>
				{JSON.stringify(transactions, null, 2)}
			</pre>
		</>
	)
}
