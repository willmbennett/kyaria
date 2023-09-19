import emptyProfile from '../../../examples/profile_format.json';
import ProfileForm from '../../components/profile/ProfileForm';
import UserProfile from '../../components/profile/UserProfile';
import { fetchUserProfile, expectedJson, defaultTextInput, demoJSON } from '../profile-helper';
import TextToJSON from '../../components/TextToJSON';
import { getProfile } from "../../../lib/profile-db";
import ProfileActions from '../../components/profile/ProfileActions';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { profile } = await getProfile(params.id);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
        <ProfileForm
          userId={params.id}
          userProfile={profile}
        />
      </div>
    </div>
  );
}

/*
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
*/