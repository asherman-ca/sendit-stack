import { apiRequestValidator } from '@/app/types/types'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const body = await req.json()
	const { name } = apiRequestValidator.parse(body)
	return NextResponse.json({ message: name })
}

export async function GET(req: Request) {
	return NextResponse.json({ message: 'get' })
}
