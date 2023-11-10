import Link from "next/link";
import { Button } from "./Button";

export default function FeedbackAside() {

    return (
        <div className="md:sticky bg-white border md:top-60 bg-gray-200 p-4 lg:rounded-lg h-auto my-2">
            <p>We'd love to hear from you!</p>
            <Link href="https://forms.gle/T442pe2PkSKcC6KJA" target="_blank" >
                <Button size="md" className="mt-3">
                    Give Feedback
                </Button>
            </Link>
        </div>
    );
}
