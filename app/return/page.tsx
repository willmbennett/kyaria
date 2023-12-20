'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Container } from '../components/landingpage/Container';
import { createSubscriptionAction } from '../pricing/_action';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Return } from '../components/return/Return';

async function getData(userId: string, sessionId: string, setStatus: Dispatch<SetStateAction<string | undefined>>, setCustomerEmail: Dispatch<SetStateAction<string>>) {
    const res = await fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
        method: "GET",
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const resJSON = await res.json()

    if (resJSON.status === 'complete') {
        const data = {
            userId,
            customerId: resJSON.customer,
            status: 'active',
            planType: 'subscription',
            expirationDate: resJSON.expires_at
        }
        const subscription = await createSubscriptionAction(data, '/');
        //console.log(subscription)
    }

    //console.log(resJSON)
    setStatus(resJSON.status);
    setCustomerEmail(resJSON.customer_email)
}

export default function ReturnPage() {
    const session = useSession();
    const userId = session.data?.user?.id
    if (!session) {
        redirect('/auth/signin')
    }
    const [status, setStatus] = useState<string | undefined>();
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        if (sessionId && userId) getData(userId, sessionId, setStatus, setCustomerEmail);

    }, []);

    if (status === 'open') {
        return (
            redirect('/')
        )
    }

    if (status === 'complete') {
        return (
            <Return customerEmail={customerEmail}/>
        )
    }

    return null;
}