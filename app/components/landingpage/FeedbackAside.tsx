import Link from "next/link";
import { Button } from "../Button";

export default function FeedbackAside() {

    return (
        <div className="p-4 flex flex-col justify-center text-center">
            <p>We'd love to hear from you!</p>
            <Link href="https://forms.gle/T442pe2PkSKcC6KJA" target="_blank" >
                <Button size="md" className="mt-3">
                    Give Feedback
                </Button>
            </Link>
        </div>
    );
}
