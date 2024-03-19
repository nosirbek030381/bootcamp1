import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
	return (
		<>
			<div className='flex justify-start py-2 px-4'>
				<Image
					src={'/logo.svg'}
					alt='Image logo'
					width={56}
					height={56}
					priority
					className='cursor-pointer object-contain'
				/>
			</div>

			<div className='h-[80vh] flex flex-col justify-center items-center'>
				<FaCheckCircle className='w-20 h-20 text-green-600' />
				<h1 className='text-2xl md:text-5xl mt-4'>Thank you for your subscription.</h1>
				<Link href={'/'}>
					<button className='mt-4 bg-green-700 px-5 py-4 rounded-lg'>Dashboard</button>
				</Link>
			</div>
		</>
	);
};

export default Success;
