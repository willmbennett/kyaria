
'use client'
import { Button } from '../Button'
import { signIn } from "next-auth/react";

// Add a TypeScript interface if you're using TypeScript
interface AuthButtonProps {
    className?: string;
    // Add any other props you might want to accept
    [key: string]: any;
    title?: string;
}

const AuthButton = ({ altText = "Sign in", ...props }: AuthButtonProps) => (
    <Button
        onClick={() => signIn()}
        className={`mt-3.5 w-full sm:mt-0 sm:w-auto ${props.className || ''}`}
        {...props} // Spread the rest of the props here
    >
        {altText}
    </Button>
);

export default AuthButton;