'use client'

import React, { createContext, useState, useEffect } from 'react';
import emptyProfile from '../../examples/profile_format.json';
import { fetchUserProfile } from '../profile/profile-helper';
import { useSession } from 'next-auth/react';

// All the data for the JobContext
export interface AppContextType {
    userProfile: profileFormat;
};

// Set up all the data for the context
const iAppContextState: AppContextType = {
    userProfile: emptyProfile as profileFormat,  // Assuring TypeScript that this JSON matches our type
};

export const AppContext = createContext<AppContextType>(iAppContextState);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [hasProfile, setHasProfile] = useState(false);
    const [userProfile, setUserProfile] = useState<profileFormat>(emptyProfile);

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
            loadProfile(session?.user?.id);
        }
      }, [session?.user?.id]); // Empty dependency array ensures this useEffect runs only once when component mounts.

    const exportValue: AppContextType = {
        userProfile
    };

    return <AppContext.Provider value={exportValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

