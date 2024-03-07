import Stripe from 'stripe';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';
import { updateSubscriptionAction } from '../../pricing/_action';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;


export async function POST(req: Request) {
  //console.log('made it to webookhander')
    const rawBody = await req.text()
    const body = JSON.parse(rawBody.toString());
    //console.log("Yay, we got the body back", { body })
    const headersList = headers()
    const signature = headersList.get('stripe-signature') as string
    //console.log('signature: ', signature)
    //console.log('webhookSecret: ', webhookSecret)

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            rawBody.toString(),
            signature,
            webhookSecret
        );
        //console.log('event: ', event)

        if (event) {
            await processEvent(event);
            // Successfully constructed event.
            //console.log('✅ Success:', event.id);

            // Return a response to acknowledge receipt of the event.
            return NextResponse.json({ received: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Event Not Defined' }, { status: 500 });
        }

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
};

async function processEvent(event: Stripe.Event) {
    // Your existing switch statement to handle different event types
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
          //console.log(`PaymentIntent status: ${paymentIntent.status}`);
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
          //console.log(
                `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
            );
            break;
        }
        case 'charge.succeeded': {
            const charge = event.data.object;
          //console.log(`Charge id: ${charge.id}`);
            break;
        }

        // Handle subscription creation
        case 'customer.subscription.created': {
            const subscription = event.data.object as Stripe.Subscription;
            // Update user subscription status in your database
            //console.log(`Subscription created: ${subscription.id}`);
            break;
        }

        // Handle subscription deletion
        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            const customer = subscription.customer.toString()
            // Update user subscription status in your database
            //console.log(`Subscription deleted: ${subscription.id}`);
            //console.log(`customer: ${customer}`);
            await updateSubscriptionAction(customer, { status: subscription.status }, '/')
            break;
        }

        // Handle subscription pause
        case 'customer.subscription.paused': {
            const subscription = event.data.object as Stripe.Subscription;
            const customer = subscription.customer.toString()
            // Update user subscription status in your database
            //console.log(`Subscription paused: ${subscription.id}`);
            //console.log(`customer: ${customer}`);
            await updateSubscriptionAction(customer, { status: subscription.status }, '/')
            break;
        }

        // Handle subscription update
        case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription;
            const customer = subscription.customer.toString()
            // Update user subscription status in your database
            //console.log(`Subscription updated: ${subscription.id}`);
            //console.log(`customer: ${customer}`);
            await updateSubscriptionAction(customer, { status: subscription.status }, '/')
            break;
        }

        // Handle subscription resumption
        case 'customer.subscription.resumed': {
            const subscription = event.data.object as Stripe.Subscription;
            const customer = subscription.customer.toString()
            // Update user subscription status in your database
            //console.log(`Subscription resumed: ${subscription.id}`);
            //console.log(`customer: ${customer}`);
            await updateSubscriptionAction(customer, { status: 'active' }, '/')
            break;
        }

        default: {
            console.warn(`Unhandled event type: ${event.type}`);
            break;
        }
    }
}