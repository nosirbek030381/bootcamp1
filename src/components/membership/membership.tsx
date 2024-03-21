import moment from 'moment';
import { useState } from 'react';
import { IMembership } from './membership.props';

const Membership = ({ subscription }: IMembership) => {
	const [isLoading, setIsLoading] = useState(false);

	const openPortal = async () => {
		setIsLoading(true);
		const payload = { user_id: subscription.customer.metadata.user_id };

		const response = await fetch('/api/subscription/manage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		const data = await response.json();
		window.open(data.portal);
		setIsLoading(false);
	};

	return (
		<div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0'>
			<div className='space-y-2 py-4'>
				<h4 className='text-lg text-[gray]'>Membership & Billing</h4>

				<button
					onClick={openPortal}
					className='h-10 w-3/5 transition-all whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200'
				>
					{isLoading ? 'Loading...' : 'Manage membership'}
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
						<div className='flex space-x-2 items-center gap-2'>
							<span className='px-3 py-2 uppercase rounded bg-white/20'>
								{subscription.customer.invoice_settings.default_payment_method?.card.brand ??
									subscription.default_payment_method.card.brand}
							</span>
							**** **** ****{' '}
							{subscription.customer.invoice_settings.default_payment_method?.card.last4 ??
								subscription.default_payment_method.card.last4}
						</div>
						<p className='mt-4'>
							Your next billing date is{' '}
							{moment(subscription.current_period_end * 1000).format('DD MMM, yyyy')}
						</p>
					</div>
					<div className='md:text-right'>
						{isLoading ? (
							'Loading...'
						) : (
							<>
								<p onClick={openPortal} className='membership'>
									Manage payment info
								</p>
								<p onClick={openPortal} className='membership'>
									Add backup payment method
								</p>
								<p onClick={openPortal} className='membership'>
									Billing detail
								</p>
								<p onClick={openPortal} className='membership'>
									Change billing day
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Membership;
