import ProfileTextEdit from "./ProfileTextEdit";

export const EducationDetailItem = (
    { 
        detail, 
        profileId, 
        educationIndex, 
        detailIndex 
    }: {
        detail: any
        profileId: string
        educationIndex: number
        detailIndex: number
    }
    ) => {
    return (
        <li className="flex flex-col items-center">
            {detail.content && (
                <ProfileTextEdit
                    profileId={profileId}
                    setKey={`education.${educationIndex}.details.${detailIndex}.content`}
                    currentState={detail.content || ''}
                />
            )}
            {detail.detail && (
                <ProfileTextEdit
                    profileId={profileId}
                    setKey={`education.${educationIndex}.details.${detailIndex}.detail`}
                    currentState={detail.detail || ''}
                />
            )}
        </li>
    );
}
