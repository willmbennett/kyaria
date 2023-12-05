import { Button } from "../../Button";
import { FileUploader } from "./FileUploader";
import { FieldErrors } from 'react-hook-form';

type FormFields = {
    input: string;
};

type ResumeUploadFormProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    errors: FieldErrors<FormFields>;
    handleCancel: () => void;
};

export const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({ onSubmit, onFileChange, file, errors, handleCancel }) => (
    <>
        <p className='py-2'>Upload your resume</p>
        <form onSubmit={onSubmit}>
            <p className='py-2'>
                <FileUploader onFileChange={onFileChange} />
                {errors.input && <p>{errors.input.message}</p>}

            </p>
            {file && (
                <div className="space-x-2">
                    <Button
                        variant="solid"
                        size="md"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="secondary"
                        size="md"
                        type="button"
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </form>
    </>
);
