import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id')

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id || '');
    //console.log(session)
    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      customer: session.customer,
      expires_at: session.expires_at,
      subscription: session.subscription
    }, { status: 200 });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'An error occured.';
    return NextResponse.json(
      { message: errorMessage, ok: false },
      { status: 503 },
    );
  }
}

export async function POST(): Promise<NextResponse<any>> {
  //console.log('Made it here')
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell 
          price: process.env.NODE_ENV === 'development' ? 'price_1PO1wSIvuOCAdHq0toGpR8uR' : 'price_1PO1tfIvuOCAdHq0gtAhzAti',
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: 'cancel',
          },
        },
        trial_period_days: 7,
      },
      payment_method_collection: 'if_required',
      allow_promotion_codes: true,
      mode: 'subscription',
      return_url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://kyaria.ai/'}return?session_id={CHECKOUT_SESSION_ID}`,
    });

    //console.log(session)
    return NextResponse.json({ clientSecret: session.client_secret }, { status: 200 });
  } catch (err) {
    console.log(err)
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'An error occured.';
    return NextResponse.json(
      { message: errorMessage, ok: false },
      { status: 503 },
    );
  }
}
