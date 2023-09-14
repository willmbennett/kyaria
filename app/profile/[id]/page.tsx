'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import emptyProfile from '../../../examples/profile_format.json';
import NewProfileForm from '../../components/profile/NewProfileForm';
import { ObjectId } from 'mongodb';

export default function ProfilePage({ params }: { params: { id: number } }) {

  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<profileFormat>();
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/db/profile/${session?.user?.id}`, {
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
        setUserProfile(fetchedUserProfile[0]);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile();
    }
  }, [session?.user?.id]); // Empty dependency array ensures this useEffect runs only once when component mounts.

  /*
    const [uploadFile, setUploadFile] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
  
        setUploadFile(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
  
    const message = [
      {
        "role": "system",
        "content":"You will be provided with unstructured data, and your task is to extract data from it."
      }
      
      ,
      {
        role: "user",
        content: `Extract the resume details from ${resume} and return it in json format following this format: ${dataFormat}`
      }
    ];
  
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: message }),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const answer = await response.json();
      fetchUserProfile()
      setLoading(false);
    };
  */

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-gray-100">
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center lg:px-4 lg:mt-6">
        {!userProfile?._id && (
          <>
            <NewProfileForm
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              userId={session?.user?.id || ''}
            />
          </>
        )}
        {userProfile?._id && (<>
          <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
            {userProfile.name}
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <p className="text-left font-medium text-lg mb-4">
              <strong>Title:</strong> {userProfile.title}
            </p>
            <p className="text-left font-medium text-lg mb-4">
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p className="text-left font-medium text-lg mb-4">
              <strong>Phone:</strong> {userProfile.phone}
            </p>
            <p className="text-left font-medium text-lg mb-4">
              <strong>Location:</strong> {userProfile.location}
            </p>

            <h2 className="text-left font-bold text-2xl mb-4">Social Links</h2>
            <ul className="list-disc list-inside text-left mb-8">
              {Object.keys(userProfile.social_links).map((key, index) => (
                <li key={index}><a href={userProfile.social_links[key]} target="_blank" rel="noopener noreferrer">{key}</a></li>
              ))}
            </ul>

            <h2 className="text-left font-bold text-2xl mb-4">Summary</h2>
            <p className="text-left mb-8">{userProfile.summary}</p>

            <h2 className="text-left font-bold text-2xl mb-4">Areas of Expertise</h2>
            <ul className="list-disc list-inside text-left mb-8">
              {userProfile.areas_of_expertise.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>

            <h2 className="text-left font-bold text-2xl mb-4">Skills</h2>
            <ul className="list-disc list-inside text-left mb-8">
              {userProfile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h2 className="text-left font-bold text-2xl mb-4">Professional Experience</h2>
            {userProfile.professional_experience.map((exp, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-left font-bold text-lg mb-2">{exp.title} at {exp.company}</h3>
                <p className="text-left text-lg mb-2">{exp.location}</p>
                <p className="text-left text-lg mb-2">{exp.start_date} - {exp.end_date}</p>
                <ul className="list-disc list-inside text-left mb-8">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 className="text-left font-bold text-2xl mb-4">Education</h2>
            {userProfile.education.map((edu, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-left font-bold text-lg mb-2">{edu.degree}</h3>
                <p className="text-left text-lg mb-2">{edu.institution}, {edu.location}</p>
                <ul className="list-disc list-inside text-left mb-8">
                  {edu.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>)}
      </div>
    </div>
  );
}
