
'use client'
import { Button } from '../Button'
import { signIn } from "next-auth/react";

const AuthButton = () => (
    <Button
        onClick={() => signIn()}
        className="mt-3.5 w-full sm:mt-0 sm:w-auto"
    >
        Sign in
    </Button>
)

export default AuthButton;