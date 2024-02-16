'use client';

import { useEffect } from 'react';
import { Container } from '../../components/landingpage/Container';
import { Button } from '../../components/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Container className="flex h-screen flex-col items-center justify-center space-y-3">
            <h2 className="text-center">We're sorry, something went wrong!</h2>
            <p>If this problem happens again please send an email to contact@kyaria.ai</p>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </Button>
        </Container>
    );
}