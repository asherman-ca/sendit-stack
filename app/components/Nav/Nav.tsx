import { currentUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

import React from 'react'

const Nav = async () => {
	const user = await currentUser()
	console.log('user', user?.id)
	return (
		<div className='flex justify-between p-6'>
			<h1 className='text-xl font-medium'>Sendit Stack</h1>
			{user ? <UserButton afterSignOutUrl='/' /> : <div>Sign In</div>}
		</div>
	)
}

export default Nav
