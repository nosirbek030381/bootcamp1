import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { BiBellMinus } from 'react-icons/bi';

const Header = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handlerScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handlerScroll);

		return () => window.removeEventListener('scroll', handlerScroll);
	}, []);

	return (
		<header className={`${scrolled && 'bg-[#e10856] shadow-lg'}`}>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<Image
					src={'/logo.svg'}
					alt={'logo'}
					width={56}
					height={56}
					className='cursor-pointer object-contain'
				/>

				<ul className='md:flex hidden space-x-4 '>
					<li className='navLink'>Home</li>
					<li className='navLink'>Movies</li>
					<li className='navLink'>TV Shows</li>
					<li className='navLink'>New</li>
					<li className='navLink'>Popular</li>
				</ul>
			</div>

			<div className='flex item-center space-x-4 text-[16px] font-light'>
				<AiOutlineSearch className='h-6 w-6 cursor-pointer' />
				<p className='hidden lg:inline'>Kids</p>
				<BiBellMinus className='h-6 w-6 cursor-pointer' />
				<Link href={'/account'}>
					<AiOutlineUser className='h-6 w-6 cursor-pointer' />
				</Link>
			</div>
		</header>
	);
};

export default Header;
