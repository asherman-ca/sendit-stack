'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const Wrapper = ({ children }) => {
	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => {
		setIsHydrated(true)
	}, [])
	return (
		<>
			<Toaster />
			{isHydrated ? <>{children}</> : <div />}
		</>
	)
}

export default Wrapper
