import { InboxOutlined } from '@ant-design/icons';
import { UploadDragger } from '@app/components/common/Upload/Upload';
import { DraggerIconWrapper, DraggerTitle, DraggerDescription } from '@app/pages/FilesPage.styles';
import { FileProxy, FileStatus } from './file-handling-utils';
import { useTranslation } from 'react-i18next';

interface UploadFileProps {
    files: FileProxy[];
    setFiles: (files: FileProxy[]) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ files, setFiles }) => {
    const { t } = useTranslation();

    // this object contains the config info for the upload component, including the upload function
    const uploadProps = {
        name: 'file',
        multiple: true,
        // this handles the uploaded files
        customRequest: (options: any) => {
            const file = options.file;
            const file_proxy = FileProxy.fromFile(file);

            // check if the file is already present in the list of files. If so, replace it or save it as new version
            const oldCopy = files.find(f => f.name === file_proxy.name)
            if (oldCopy) {
              if(oldCopy.status === FileStatus.ON_CHAIN){
                // TODO continue
                console.log("dgs")
                } 
            }

            // check if the file is a valid file
            if (checkFileValidity(file_proxy)) 
                setFiles([...files, file_proxy])
        },
        showUploadList: false
    };

    return (
        <UploadDragger {...uploadProps}>
            <DraggerIconWrapper>
                <InboxOutlined />
            </DraggerIconWrapper>
            <DraggerTitle>{t('uploads.dragUpload')}</DraggerTitle>
            <DraggerDescription>{"Multiple files are allowed"}</DraggerDescription>
        </UploadDragger>
    )
}

function checkFileValidity(file: FileProxy): boolean {
    // TODO: check file validity
    console.log(file)
    return true;
}

export default UploadFile