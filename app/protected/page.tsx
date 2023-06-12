import React from 'react'
import { currentUser } from '@clerk/nextjs'

const page = async () => {
	const user = await currentUser()
	return <div>{user?.id}</div>
}

export default page
