import { UseFormRegister } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../../../Button';
import { JobClass } from '../../../../../models/Job';
import { ResumeClass } from '../../../../../models/Resume';
import { useOptimise } from '../../../../../lib/resumebuilder/use-optimize';

type SingleInputProps = {
    sectionName: string
    register: UseFormRegister<any>;
    optimize?: boolean
    job?: Partial<JobClass>
    resume: ResumeClass
};

const SingleInput: React.FC<SingleInputProps> = ({ sectionName, register, optimize, job, resume }) => {

    const { canUndo, undo, canRedo, redo, loading, currentState, handleModifyResponse, handleStop, optimizeClick, history } = useOptimise({ sectionName, job, resume, optimize })



    return (
        <div className="mb-4">
            <TextareaAutosize
                {...register(sectionName)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {
                optimize && !loading &&
                <div className='flex flex-wrap gap-2'>
                    {currentState.length > 0 &&
                        <>
                            <Button size='md' type="button" onClick={() => handleModifyResponse('shorten')} disabled={loading}>
                                Shorten
                            </Button>
                            <Button size='md' type="button" onClick={() => handleModifyResponse('lengthen')} disabled={loading}>
                                Lengthen
                            </Button>
                        </>}
                    <Button size='md' type="button" onClick={optimizeClick} disabled={loading}>{currentState ? 'Optimize' : 'Generate Summary'}</Button>
                    {history.length > 0 &&
                        <>
                            <Button size='md' type="button" variant={canUndo ? 'solid' : 'ghost'} onClick={undo} disabled={!canUndo}>Undo</Button>
                            <Button size='md' type="button" onClick={redo} variant={canRedo ? 'solid' : 'ghost'} disabled={!canRedo}>Redo</Button>
                        </>
                    }
                </div>
            }
            {loading && <Button variant='secondary' size='md' type="button" onClick={handleStop} className="ml-2" >Stop</Button>}
        </div >
    );
};

export default SingleInput;
