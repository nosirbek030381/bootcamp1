import moment from 'moment';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { MdSubscriptions } from 'react-icons/md';
import { Membership } from 'src/components';
import { IPlan } from 'src/interfaces/app.interface';
import { API_REQUEST } from 'src/services/api.service';

const Account = ({ subscription }: AccountProps) => {
	console.log(subscription);

	return (
		<>
			<Head>
				<title>Account settings</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/logo.svg' />
			</Head>

			<header>
				<div className='flex items-center space-x-2 md:space-x-10'>
					<Link href='/'>
						<Image
							src={'/logo.svg'}
							alt='Image logo'
							width={56}
							height={56}
							priority
							className='cursor-pointer object-contain'
						/>
					</Link>
				</div>

				<div className='flex item-center space-x-4 text-[16px] font-light'>
					<Link href={'/account'}>
						<AiOutlineUser className='h-6 w-6 cursor-pointer' />
					</Link>
				</div>
			</header>

			<main className='mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10'>
				<div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
					<h1 className='text-3xl md:text-4xl'>Account</h1>
					<div className='-ml-1 flex items-center gap-x-1.5'>
						<MdSubscriptions className='w-5 h-5 text-red-500' />
						<p className='text-md font-semibold text-[#555]'>
							Member since {moment(subscription.current_period_start * 1000).format('DD MMM, yyyy')}
						</p>
					</div>
				</div>

				{/* Plan */}
				<Membership subscription={subscription} />

				<div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0'>
					<h4 className='text-lg text-[gray]'>Plan Details</h4>
					<div className='col-span-2 font-medium'>{subscription.plan.nickname}</div>
					<p className='cursor-pointer text-blue-600 hover:underline md:text-right'>Change plan</p>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0'>
					<h4 className='text-lg text-[gray]'>Settings</h4>
					<p className='cursor-pointer col-span-3 text-blue-600 hover:underline md:text-right'>
						Sign out of all devices
					</p>
				</div>
			</main>
		</>
	);
};

export default Account;

export const getServerSideProps: GetServerSideProps<AccountProps> = async ({ req }) => {
	const user_id = req.cookies.user_id;

	if (!user_id) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	const subscription = await fetch(`${API_REQUEST.subscription}/${user_id}`).then(res =>
		res.json()
	);

	if (!subscription.subscription.data.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			subscription: subscription.subscription.data[0],
		},
	};
};

interface AccountProps {
	subscription: IPlan;
}
