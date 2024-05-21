import '@styles/components/attachment-dragdrop.css'
import {useEffect} from "react";
import {DropzoneProps, useDropzone} from "react-dropzone";
import {absoluteServerPath} from "@/utils/utils.ts";
import {IconButton} from "@components/IconButton.tsx";
import {IAnnouncementUpload} from "@/interfaces/App.ts";

interface Props extends DropzoneProps, IDropzoneActions {
}

export interface IDropzoneActions {
    files: (IUploadedFile | IAnnouncementUpload)[]
    handleNewFile: (files: IUploadedFile[]) => void
    handleFileDelete: (file: IUploadedFile | IAnnouncementUpload) => void
}

export type IUploadedFile = File & { preview: string }

export const AttachmentFormDropzoneWithPreview = (props: Props) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: (acceptedFiles) => props.handleNewFile(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))),
    })

    const thumbs = props.files.map(file => (
        <div className='attachment-preview' key={file instanceof File ? file.name : file.mediaObject.contentUrl}>
            <img
                src={file instanceof File ? file.preview : absoluteServerPath(file.mediaObject.contentUrl)}
                onLoad={() => {
                    file instanceof File ? URL.revokeObjectURL(file.preview) : null
                }}
            />
            <IconButton iconName={'delete_forever'} onClick={() => props.handleFileDelete(file)} className={'action'}/>
            {
                (file instanceof File) ?
                    null :
                    <IconButton iconName={'cloud_done'} className={'action uploaded'} iconClassName={'color-success'}/>
            }
        </div>
    ));

    useEffect(() => {
        return () => props.files.forEach(file => {
            file instanceof File ? URL.revokeObjectURL(file.preview) : null
        });
    }, [props.files]);

    return (
        <section className='attachment-dropdown-container'>
            <div {...getRootProps({className: 'attachment-dropdown'})}>
                <input {...getInputProps()} />
                <label>
                    <div>
                        <i className="material-icons">attach_file</i>
                        <span>Przeciągnij lub dodaj maksymalnie 5 zdjęć</span>
                    </div>
                </label>
            </div>
            <div className='attachment-preview-container'>
                {thumbs}
            </div>
        </section>
    );
}