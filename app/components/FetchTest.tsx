'use client'
import { ApiRequest } from '@/app/types/types'
import { useState, useEffect } from 'react'

function FetchTest() {
	const [data, setData] = useState(null)
	useEffect(() => {
		const payload: ApiRequest = {
			name: 'John',
		}
		const fetchData = async () => {
			const res = await fetch('http://localhost:3000/api/posts', {
				method: 'POST',
				body: JSON.stringify(payload),
			})
			const json = await res.json()
			setData(json)
		}
		fetchData()
	}, [])

	console.log('fetchData', data)

	return <div>FetchTest</div>
}

export default FetchTest
