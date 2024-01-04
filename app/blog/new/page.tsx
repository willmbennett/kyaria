import { checkSubscription } from "../../../lib/hooks/check-subscription";
import NewPostForm from "../../components/blog/NewPostForm";


export default async function NewPost() {
    const { userId, userName } = await checkSubscription()
    return (
        <>
            <NewPostForm userId={userId} userName={userName} />
        </>
    );
}

