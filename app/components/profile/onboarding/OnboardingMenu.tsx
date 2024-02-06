'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../Button";

const MENU_ITEM_BASE_STYLE = "inline-flex w-full px-3 py-1 my-1 rounded text-xl lg:text-lg font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const ACTIVE_ROUTE_STYLE = `${MENU_ITEM_BASE_STYLE} text-gray-600 bg-gray-200`;
const INACTIVE_ROUTE_STYLE = `${MENU_ITEM_BASE_STYLE} text-gray-600`;

export default function OnboardingMenu() {
  const router = useRouter();
  const [onboardingStage, setOnboardingStage] = useState('"Resume Upload"')
  const pageList = [
    {
      label: "Resume Upload",
      path: '/resumebuilder',
      instructions: 'test'
    },
    {
      label: "Questionnaire",
      path: 'questionnaire'
    },
    {
      label: "Elevator Pitch",
      path: 'story'
    },
    {
      label: "LinkedIn Bio",
      path: 'bio'
    },
    {
      label: "Interview Stories",
      path: 'behaivoral'
    }
  ];

  const handleMenuItemClick = (section: string) => {
    setOnboardingStage(section);
    router.push(section);
  };

  return (
    <div className="bg-white border w-full md:sticky md:top-60 bg-gray-200 p-4 lg:rounded-lg h-auto my-2">
      <div className="w-full inline">
        <div className="w-full items-start flex flex-col lg:h-auto py-2">
          {pageList.map((item, index) => (
            <div key={item.path}>
              <p>{item.instructions}</p>
              <Button
                className="inline text-left w-full"
                type='button'
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
