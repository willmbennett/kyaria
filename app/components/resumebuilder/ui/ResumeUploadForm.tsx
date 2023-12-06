import { Button } from "../../Button";
import { FileUploader } from "./FileUploader";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

type FormFields = {
    input: string;
};

type ResumeUploadFormProps = {
    handleSubmit: UseFormHandleSubmit<FormFields, undefined>;
    onSubmit: SubmitHandler<FormFields>;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    errors: FieldErrors<FormFields>;
    handleCancel: () => void;
};

export const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({ handleSubmit, onSubmit, onFileChange, file, errors, handleCancel }) => (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
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
