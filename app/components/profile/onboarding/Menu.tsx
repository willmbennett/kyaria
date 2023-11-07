'use client'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const MENU_ITEM_BASE_STYLE = "inline-flex w-full px-3 py-1 my-1 rounded text-xl lg:text-lg font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const ACTIVE_ROUTE_STYLE = `${MENU_ITEM_BASE_STYLE} text-gray-600 bg-gray-200`;
const INACTIVE_ROUTE_STYLE = `${MENU_ITEM_BASE_STYLE} text-gray-600`;

export default function Menu({ setOnboardingStage,
  onboardingStage,
  profile
}: {
  setOnboardingStage: any,
  onboardingStage: string,
  profile: any
}) {
  const router = useRouter();
  const path = usePathname();

  const pageList = [
    { label: "Resume Upload", section: 'resumeUpload' },
    { label: "Questionnaire", section: 'questionnaire' },
    { label: "Elevator Pitch", section: 'story' },
    { label: "LinkedIn Bio", section: 'bio' },
    { label: "Interview Stories", section: 'behaivoral' }
  ];

  const currentStageIndex = pageList.findIndex(item => item.section === onboardingStage);


  const handleMenuItemClick = (section: string) => {
    setOnboardingStage(section);
    router.push(path, { scroll: true });
  };

  return (
    <div className="bg-white border w-full md:sticky md:top-60 bg-gray-200 p-4 lg:rounded-lg h-auto my-2">
      <div className="w-full inline">
        <div className="w-full items-start flex flex-col lg:h-auto py-2">
          {pageList.map((item, index) => (
            <div key={item.section} className={item.section === onboardingStage ? ACTIVE_ROUTE_STYLE : INACTIVE_ROUTE_STYLE}>
              <button
                onClick={() => handleMenuItemClick(item.section)}
                className="inline text-left w-full"
                disabled={!profile || item.section === 'resumeUpload' || index == currentStageIndex}
              >
                {/* Display checkmark for completed steps */}
                {index + 1}. {item.label}
                {index < currentStageIndex && <span> &#10003;</span>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
