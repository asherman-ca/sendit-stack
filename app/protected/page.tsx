import React from 'react'
import { currentUser } from '@clerk/nextjs'
import axios from 'axios'
import { ApiRequest } from '@/app/types/types'
import FetchButton from '../components/FetchButton'

// IMPORTANT A NEXTJS BUG THAT EFFECTS COOKIES PREVENTS API CALLS FROM SERVER COMPONENTS TO ROUTE HANDLERS

const page = async () => {
	const user = await currentUser()

	const payload: ApiRequest = {
		name: 'John',
	}
	// await axios.post('http://localhost:3000/api/posts', payload)
	const post = await fetch('http://localhost:3000/api/posts', {
		method: 'POST',
		body: JSON.stringify(payload),
	})
	const data = await post.json()
	console.log('data', data)

	return <div>{user?.id}</div>
}

export default page
