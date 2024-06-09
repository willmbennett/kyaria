
'use client'
import { Button } from './Button'

// Add a TypeScript interface if you're using TypeScript
interface AuthButtonProps {
    className?: string;
    [key: string]: any;
    altText?: string;
    callbackUrl?: string
}

const AuthButton = ({ altText = "Sign in", callbackUrl, ...props }: AuthButtonProps) => (
    <Button
        onClick={async () => {
            const { signIn } = (await import("next-auth/react"));
            if (callbackUrl) {
                console.log(callbackUrl)
                signIn("google", { callbackUrl })
            } else {
                signIn()
            }
        }}
        className={`mt-3.5 w-full sm:mt-0 sm:w-auto ${props.className || ''}`}
        {...props} // Spread the rest of the props here
    >
        {altText}
    </Button>
);

export default AuthButton;