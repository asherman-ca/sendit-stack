import { currentUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

import React from 'react'

const Nav = async () => {
	const user = await currentUser()
	console.log('user', user)
	return (
		<div className='flex justify-between p-6'>
			<div>LOGO</div>
			{user ? <UserButton /> : <div>Sign In</div>}
		</div>
	)
}

export default Nav
