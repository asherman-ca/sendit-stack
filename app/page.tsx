import Combo from '@/app/components/Combo'
import FetchTest from './components/FetchTest'

export default async function Home() {
	return (
		<main className='flex-1 flex p-6'>
			<Combo />
			<FetchTest />
		</main>
	)
}
