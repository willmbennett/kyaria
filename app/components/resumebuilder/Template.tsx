import { ResumeClass } from "../../../models/Resume";
import { resumeTemplates } from "../../resumebuilder/resume-templates";
import { Button } from "../Button";
import ResumeBuilder from "../resume/ResumeBuilder";
import CustomPDFViewer from "./ui/CustomPDFViewer";
import DropDownSelect from "./ui/DropdownSelect";

interface resumeTemplates {
    templateName: string;
    template: ResumeClass;
}

export default function ResumeTemplates(
    {
        userId,
        handleTemplateSelection
    }: {
        userId: string,
        handleTemplateSelection: (resume: ResumeClass) => void;
    }) {

    const renderTemplate = (template: resumeTemplates, currentIndex: number) => {

        return (
            <div key={currentIndex} className="flex flex-col justify-center items-center w-full bg-slate-200 border border-slate-300 shadow">
                <div className="px-4 py-2 flex flex-row w-full items-center justify-start space-x-2">
                    <Button
                        onClick={() => handleTemplateSelection(template.template)}
                        size="sm"
                        type="button"
                    >
                        Select Template
                    </Button>
                </div>
                <CustomPDFViewer data={template.template} />
            </div>
        )
    }


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center sm:text-3xl text-2xl font-bold text-slate-900 mt-3">
                Resume Templates
            </h1>
            <DropDownSelect
                items={resumeTemplates}
                options={resumeTemplates.map(t => t.templateName)}
                renderItem={renderTemplate}
            />
        </div>
    );
}