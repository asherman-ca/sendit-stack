import Nav from './components/Nav/Nav'
import './globals.css'
import Wrapper from './lib/Wrapper'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<Wrapper>
						<Nav />
						{children}
					</Wrapper>
				</body>
			</html>
		</ClerkProvider>
	)
}
