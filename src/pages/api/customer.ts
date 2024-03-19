// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
	apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { method } = req;

	if (method === 'POST') {
		try {
			const { email } = req.body;
			await stripe.customers.create({ email });
			return res.status(200).json({ message: 'Success' });
		} catch (error) {
			const result = error as Error;
			return res.status(400).json({ message: result.message });
		}
	} else {
		return res.status(400).json({ message: 'Method Not Allowed' });
	}
}

interface Data {
	message?: string;
}