"use client"
import { useState } from "react"
import { DropdownMenu } from "../../components/ui/DropdownMenu"
import { Button } from "../../components/Button"
import { useRouter } from "next/navigation"
import { interviewTypeOptions } from "../helper"

export const MockInterviewCreation = ({ appOptions }: { appOptions: { id: string, label: string }[] }) => {
    const router = useRouter()
    const [selectedApp, setSelectedApp] = useState(appOptions[0])
    const [interviewType, setInterviewType] = useState(interviewTypeOptions[0])
    const [step, setStep] = useState(1)

    const handleSelectApp = async (id: string) => {
        const newSelectedApp = appOptions.find(j => j.id == id)
        if (newSelectedApp) {
            setSelectedApp(newSelectedApp)
        }
    }

    const handleSelectInterviewType = async (id: string) => {
        const newInterviewType = interviewTypeOptions.find(j => j.id == id)
        if (newInterviewType) {
            setInterviewType(newInterviewType)
        }
    }

    const handleNextStep = () => {
        if (step < 2) {
            setStep(step + 1)
        }
    }

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSelection = () => {
        if (selectedApp) {
            router.push(`/mockinterviews/${selectedApp.id}?type=${interviewType.id}`)
        }
    }

    return (
        <div className="flex flex-col w-xl gap-2 items-center justify-center pt-4">
            {step === 1 && (
                <div className="flex flex-col gap-2">
                    <p className="text-md text-slate-600">
                        Which job do you want to practice interviewing for?
                    </p>
                    <DropdownMenu
                        selectedItem={selectedApp}
                        items={appOptions}
                        onclickAction={handleSelectApp}
                        altTitle={"Jobs"} />
                    <Button size="md" onClick={handleNextStep}>Next</Button>
                </div>
            )}
            {step === 2 && (
                <div className="flex flex-col gap-2">
                    <p className="text-md text-slate-600">
                        What type of interview do you want to do?
                    </p>
                    <DropdownMenu
                        selectedItem={interviewType}
                        items={interviewTypeOptions}
                        onclickAction={handleSelectInterviewType}
                        altTitle={"Interview Type"}
                    />
                    <div className="flex gap-2 w-full justify-between">
                        <Button size="md" variant="ghost" onClick={handlePreviousStep}>Back</Button>
                        <Button size="md" onClick={handleSelection}>Start Interview</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
