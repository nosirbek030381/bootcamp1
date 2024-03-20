import moment from 'moment';
import { IMembership } from './membership.props';

const Membership = ({ subscription }: IMembership) => {
	return (
		<div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0'>
			<div className='space-y-2 py-4'>
				<h4 className='text-lg text-[gray]'>Membership & Billing</h4>

				<button className='h-10 w-3/5 transition-all whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200'>
					Cancel membership
				</button>
			</div>
			<div className='col-span-3'>
				<div className='flex flex-col justify-between border-b border-white/10 py-4 md:flex-row'>
					<div>
						<p className='font-medium'>{subscription.customer.email}</p>
						<p className='text-[gray]'>Password: ******</p>
					</div>

					<div>
						<p className={'membership'}>Change email</p>
						<p className={'membership'}>Change password</p>
					</div>
				</div>

				<div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'>
					<div>
						<p>
							Your membership plan will end{' '}
							{moment(subscription.current_period_end * 1000).format('DD MMM, yyyy')}
						</p>
					</div>
					<div className='md:text-right'>
						<p className='membership'>Manage payment info</p>
						<p className='membership'>Add backup payment method</p>
						<p className='membership'>Billing detail</p>
						<p className='membership'>Change billing day</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Membership;
