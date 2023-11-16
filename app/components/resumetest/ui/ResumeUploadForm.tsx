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
};

export const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({ onSubmit, onFileChange, file, errors }) => (
    <form onSubmit={onSubmit}>
        <p className='py-2'>
            <FileUploader onFileChange={onFileChange} />
            {errors.input && <p>{errors.input.message}</p>}

        </p>
        {file && (
            <Button
                variant="solid"
                size="md"
                type="submit"
                className="mt-3"
            >
                Submit
            </Button>
        )}
    </form>
);
