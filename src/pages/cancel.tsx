import Image from 'next/image';
import Link from 'next/link';
import { MdReportGmailerrorred } from 'react-icons/md';

const Cancel = () => {
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
				<MdReportGmailerrorred className='w-20 h-20 text-red-600' />
				<h1 className='text-2xl md:text-5xl mt-4'>Oops! Something went wrong.</h1>
				<Link href={'/'}>
					<button className='mt-4 bg-[#D04848] px-5 py-4 rounded-lg'>Choose Plan</button>
				</Link>
			</div>
		</>
	);
};

export default Cancel;
