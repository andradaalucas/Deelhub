import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	user && redirect('/dashboard')
	return (
		<div className='flex justify-center h-screen items-center'>
			<form className='max-w-[200px] flex flex-col gap-y-2'>
				<Label htmlFor='email'>Email</Label>
				<Input id='email' name='email' type='email' required />
				<Label htmlFor='password'>Password</Label>
				<Input id='password' name='password' type='password' required />
				<Button formAction={signup}>Sign up</Button>
			</form>
			<Link href='/auth/signup'>Or signup</Link>
		</div>
	)
}
