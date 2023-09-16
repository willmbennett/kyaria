'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import emptyProfile from '../../../examples/profile_format.json';
import NewProfileForm from '../../components/profile/NewProfileForm';
import UserProfile from '../../components/profile/UserProfile';
import { fetchUserProfile, expectedJson, defaultTextInput, demoJSON } from '../profile-helper';
import TextToJSON from '../../components/TextToJSON';

export default function ProfilePage({ params }: { params: { id: number } }) {

  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<profileFormat>(emptyProfile);
  const [defaultValue, setDefaultValue] = useState<profileFormat>(emptyProfile);
  const [hasProfile, setHasProfile] = useState(true);

  const loadProfile = async (userId?: string) => {
    const userProfile = await fetchUserProfile(session?.user?.id || '');
    if (userProfile) {
      setUserProfile(userProfile);
      setHasProfile(true)
    } else {
      setHasProfile(false)
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      loadProfile(session?.user?.id)
    }
  }, [session?.user?.id]); // Empty dependency array ensures this useEffect runs only once when component mounts.

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
        {hasProfile && userProfile.name.length > 0 && (
          <>
            <UserProfile
              userProfile={userProfile} />
          </>
        )}
        {!hasProfile && (
          <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col w-full max-w-3xl">
                <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">Create Your Profile</h1>
                {defaultValue.name.length == 0 && (
                  <TextToJSON
                    setDefaultValue={setDefaultValue}
                    expectedJson={expectedJson}
                    defaultTextInput=''
                    //demoJSON={demoJSON}
                    inputTextType='resume'
                  />
                )}
                {defaultValue.name.length > 0 && (
                  <NewProfileForm
                    defaultValue={defaultValue}
                    setUserProfile={setUserProfile}
                    setHasProfile={setHasProfile}
                    userId={session?.user?.id || ''}
                  />
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
