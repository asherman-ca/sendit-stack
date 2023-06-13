'use client'

import { useEffect, useState } from 'react'

const Hydrate = ({ children }) => {
	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return <>{isHydrated ? children : <div />}</>
}

export default Hydrate
