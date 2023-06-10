'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const Wrapper = ({ children }) => {
	return (
		<>
			<Toaster />
			{children}
		</>
	)
}

export default Wrapper
