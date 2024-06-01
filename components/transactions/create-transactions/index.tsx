'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function FormTransactions() {
	const supabase = createClient()

	const [user, setUser] = useState<any | undefined | null>(null)
	const [date, setDate] = useState<Date>()
	const [status, setStatus] = useState('pending')
	const [type, setType] = useState('expense')
	const [dataForm, setDataForm] = useState<any>({
		amount: null,
		description: null,
		user_id: null,
	})

	const handleChange = (e: any) => {
		e.preventDefault()
		const { name, value } = e.target
		setDataForm((prevForm: any) => ({
			...prevForm,
			[name]: value,
		}))
	}
	const handleSubmit = async (e: any) => {
		e.preventDefault()

		const formData = {
			status,
			type,
			date,
			...dataForm,
		}
		const { error } = await supabase.from('transactions').insert(formData)
		if (error) console.error(error)
	}

	const setUserIdWithSession = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser()
		setUser(user)
		user && setDataForm({ ...dataForm, user_id: user.id })
	}

	useEffect(() => {
		setUserIdWithSession()
	}, [])

	return (
		<form onSubmit={handleSubmit} className='w-full max-w-md'>
			<CardHeader>
				<CardTitle>Create transaction</CardTitle>
				<CardDescription>Enter the details of your transaction.</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='grid grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='amount' className=' font-semibold'>
							Amount
						</Label>
						<Input
							type='number'
							id='amount'
							name='amount'
							placeholder='Enter amount'
							value={dataForm.amount}
							onChange={handleChange}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='date' className=' font-semibold'>
							Date
						</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn('w-full mt-4 justify-start text-left font-normal', !date && 'text-muted-foreground')}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{date ? format(date, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='description' className=' font-semibold'>
						Description
					</Label>
					<Textarea
						id='description'
						name='description'
						placeholder='Enter description'
						value={dataForm.description}
						onChange={handleChange}
					/>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='type' className=' font-semibold'>
							Type
						</Label>
						<Select value={type} onValueChange={setType}>
							<SelectTrigger>
								<SelectValue placeholder='Select type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='income'>Income</SelectItem>
								<SelectItem value='expense'>Expense</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='status' className=' font-semibold'>
							Status
						</Label>
						<Select value={status} onValueChange={setStatus}>
							<SelectTrigger>
								<SelectValue placeholder='Select status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='confirmed'>Confirmed</SelectItem>
								<SelectItem value='pending'>Pending</SelectItem>
								<SelectItem value='cancelled'>Cancelled</SelectItem>
								<SelectItem value='rejected'>Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='currency' className=' font-semibold'>
						Currency
					</Label>
					<Select defaultValue='american-dollar'>
						<SelectTrigger>
							<SelectValue placeholder='Selecciona una divisa' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Currency</SelectLabel>
								<SelectItem value='argentine-peso'>
									<div className='flex items-center gap-2'>
										<Image src='/assets/flags/argentina.png' alt='argentine-flag' height={17} width={17} />
										Argentine pesos
									</div>
								</SelectItem>
								<SelectItem value='american-dollar'>
									<div className='flex items-center gap-2'>
										<Image src='/assets/flags/united-states.png' alt='argentine-flag' height={17} width={17} />
										American Dollar
									</div>
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
			<CardFooter className='justify-end'>
				<Button type='submit'>Create Transaction</Button>
			</CardFooter>
		</form>
	)
}
