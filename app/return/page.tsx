import { redirect } from 'next/navigation';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import ReturnPage from '../components/return/ReturnPage';

export default async function Page() {
    const { userId } = await checkSubscription()
    if (!userId) {
        redirect('/auth/signin')
    }
    return <ReturnPage userId={userId} />
}