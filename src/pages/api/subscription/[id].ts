import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
	apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === 'GET') {
		const { id } = req.query;

		const customers = await stripe.customers.list({ limit: 100 });
		const customer = customers.data.find(c => c.metadata.user_id === id);

		const subscription = await stripe.subscriptions.list({
			customer: customer?.id,
			limit: 1,
			expand: [
				'data.default_payment_method',
				'data.customer',
				'data.customer.invoice_settings.default_payment_method',
			],
		});

		return res.status(200).json({ subscription });
	}
}

interface Data {
	message?: string;
	subscription?: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
}
