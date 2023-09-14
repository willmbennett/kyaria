
export type FormFields = {
    name: string;
    title: string;
    email: string;
    phone: string;
    social_links: { [key: string]: string };
    location: string;
    summary: string;
    areas_of_expertise: string[];
    skills: string[];
    professional_experience: {
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date: string;
        responsibilities: string[];
    }[];
    education: {
        degree: string;
        institution: string;
        location: string;
        details: string[];
    }[];
};

export const fetchUserProfile = async (userId: string) => {

    //console.log(`User ID: ${userId}`)
    try {
      const response = await fetch(`/api/db/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      //console.log(`Resp: ${response}`)

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const fetchedUserProfile = await response.json();

      //console.log(`Resp: ${fetchedUserProfile[0]}`)

      if (fetchedUserProfile.length > 0) {
        return fetchedUserProfile[0];
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

export const createUserProfile = async (
    {
        data,
        userId

    }: {
        data: FormFields
        userId: string
    }) => {
    try {
        const response = await fetch('/api/db/profile/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, userId: userId }), // Sending form data
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const createdUserProfile = await response.json();

        //console.log("Created User Profile")
        //console.log(createdUserProfile.insertedId)

        if (createdUserProfile.insertedId) {
            return { ...data, _id: createdUserProfile.insertedId, userId: userId }
        }
    } catch (error) {
        console.error('Failed to create user profile:', error);
    }
};