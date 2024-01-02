'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

async function getData(setClientSecret: Dispatch<SetStateAction<string | undefined>>) {
    const res = await fetch("/api/checkout_sessions", {
        method: "POST",
    })
    
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        const { error } = await res.json()
        throw new Error(error || 'Failed to fetch data')
    }

    const resJSON = await res.json()
    //console.log(resJSON)
    setClientSecret(resJSON.clientSecret);
}

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState<string | undefined>();

    useEffect(() => {
        getData(setClientSecret)
    }, []);

    if (!clientSecret) {
        return LoadingShell(); // Or any other placeholder content
    }

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}

const LoadingShell = () => {
    return (
        <div className="App-Container">
            <div className="App-Overview">
                {/* Placeholder for Order Summary */}
                <div className="OrderSummaryColumn">
                    <div className="ProductSummary">
                        <div className="ProductSummary-info">
                            <span className="ProductSummary-name loading-placeholder" style={{ width: '200px', height: '20px' }}></span>
                            <div className="ProductSummary-amountsContainer">
                                <span className="ProductSummary-totalAmount loading-placeholder" style={{ width: '100px', height: '20px' }}></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder for Order Details */}
                <section className="OrderDetails">
                    <ul className="OrderDetails-items">
                        <li className="OrderDetails-item">
                            <div className="LineItem">
                                <div className="LineItem-productName">
                                    <span className="loading-placeholder" style={{ width: '150px', height: '15px' }}></span>
                                </div>
                                <div className="LineItem-amountDetail">
                                    <span className="loading-placeholder" style={{ width: '100px', height: '15px' }}></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Placeholder for Payment Section */}
                <div className="App-Payment">
                    <div className="CheckoutPaymentForm">
                        <div className="LinkPaymentForm">
                            <div className="LinkEmailAccordionItem">
                                <span className="loading-placeholder" style={{ width: '200px', height: '15px' }}></span>
                            </div>
                            <div className="LinkPaymentMethodAccordionItem">
                                <span className="loading-placeholder" style={{ width: '200px', height: '15px' }}></span>
                            </div>
                        </div>
                        <button className="SubmitButton" style={{ height: '50px' }}>
                            <div className="loading-placeholder" style={{ width: '100px', height: '20px' }}></div>
                        </button>
                    </div>
                </div>
            </div>
            {/* Footer Placeholder */}
            <footer className="App-Footer">
                <div className="Footer-PoweredBy">
                    <span className="loading-placeholder" style={{ width: '100px', height: '15px' }}></span>
                </div>
            </footer>
        </div>
    );
}
