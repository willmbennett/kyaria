import { AppClass, Emails } from "../../models/App"
import { createAppAction } from "../../app/board/_action"

export const useCreateApp = (path: string) => {
    const createApp = async (
        job: string,
        userId: string,
        emails: Emails[],
        userStory = '',
        profile: string,
        userResume: string
    ) => {

        // Initial log to confirm the function was called and with which parameters (sensitive information should be omitted or sanitized)
        //console.log(`[useCreateApp] Attempting to create app for userId: ${userId} at path: ${path}`)

        const userApp: Partial<AppClass> = {
            job,
            userId,
            emails,
            userStory,
            profile,
            userResume
        }

        // Logging the constructed userApp object can be helpful, but consider privacy/security for sensitive data
        //console.log('[useCreateApp] userApp object:', userApp)

        try {
            const appId = await createAppAction(userApp, path);

            // This log confirms the app was created and returns the appId
            //console.log('[useCreateApp] App created Successfully, appId:', appId)
            return { appId }
        } catch (error) {
            // Log any errors that occur during the app creation or navigation process
            console.error('[useCreateApp] Error creating app:', error)
            return { error }
            // Depending on your error handling strategy, you might navigate to an error page or show a notification here
        }
    }

    return { createApp }
}
