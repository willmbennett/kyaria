// ResumeLoadingComponent.jsx
import React from 'react';

const ResumeLoadingComponent = () => {
  return (
    <div className="viewer rounded shadow-lg h-screen w-full p-10">
      {/* Header with Name and Title Placeholder */}
      <div className="text-center mb-5">
        <div className="text-5xl bg-gray-300 h-8 w-48 mx-auto mb-2"></div> {/* Name Placeholder */}
        <div className="text-lg bg-gray-300 h-4 w-32 mx-auto"></div> {/* Title Placeholder */}
      </div>

      {/* Contact Info Placeholders */}
      <div className="flex justify-center space-x-3 mb-5">
        <div className="bg-gray-300 h-4 w-20"></div> {/* Email Placeholder */}
        <div className="bg-gray-300 h-4 w-20"></div> {/* Phone Placeholder */}
      </div>

      {/* Sections */}
      <div>
        {/* Example of one Section */}
        <div className="font-bold text-lg mb-2">Experience</div>
        <div className="space-y-3">
          <div className="bg-gray-300 h-4 w-full"></div> {/* Experience Item Placeholder */}
          <div className="bg-gray-300 h-4 w-full"></div> {/* Experience Item Placeholder */}
          {/* More placeholders as needed */}
        </div>

        {/* Repeat for other sections like Education, Skills, etc. */}
      </div>
    </div>
  );
};

export default ResumeLoadingComponent;
