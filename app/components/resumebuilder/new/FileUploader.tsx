type FileUploaderProps = {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange }) => (
    <input
        type="file"
        accept=".pdf"
        onChange={onFileChange}
    />
);
