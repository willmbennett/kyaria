const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(`/api/db/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const fetchedUserProfile = await response.json();

      if (fetchedUserProfile.length > 0) {
        return fetchedUserProfile[0];
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

export default fetchUserProfile;