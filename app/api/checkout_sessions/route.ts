import type { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id')
  //console.log(session_id)
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id || '');
    console.log(session)
    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      customer: session.customer,
      expires_at: session.expires_at,
      subscription: session.subscription
    }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function POST() {
  //console.log('Made it here')
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell 
          price: process.env.NODE_ENV === 'development'? 'price_1OOlMMIvuOCAdHq0shmeD8Kq': 'price_1OOrJPIvuOCAdHq0C0cdrfTO',
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      mode: 'subscription',
      return_url: `return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    //console.log(session)
    return NextResponse.json({ clientSecret: session.client_secret }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
