import { InboxOutlined } from '@ant-design/icons';
import { UploadDragger } from '@app/components/common/Upload/Upload';
import { DraggerIconWrapper, DraggerTitle, DraggerDescription } from '@app/pages/FilesPage.styles';
import { FileProxy, FileStatus } from './file-handling-utils';
import { useTranslation } from 'react-i18next';

interface UploadFileProps {
    setFiles: (files: FileProxy[] | ((oldFiles: FileProxy[]) => FileProxy[])) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ setFiles }) => {
    const { t } = useTranslation();

    const updateFilesList = (file_proxy: FileProxy) => {
        setFiles(oldFiles => {
            let newFiles = [...oldFiles, file_proxy]
            // check if the file is already present in the list of files. 
            const oldCopies = oldFiles.filter(f => f.name === file_proxy.name)
            const oldCopyOnChain = oldCopies.find(f => f.status === FileStatus.ON_CHAIN)
            const oldCopyOffChain = oldCopies.find(f => f.status !== FileStatus.ON_CHAIN)
            if (oldCopyOffChain){
                // if there is an old copy of the file that is not on chain, remove it from the list and take its version number
                file_proxy.version = oldCopyOffChain.version;
                newFiles = newFiles.filter(f => f !== oldCopyOffChain)
            }
            else if (oldCopyOnChain) {
                // if the file is already present on chain, just set the correct version number
                file_proxy.version = oldCopyOnChain.version + 1;
            }
            return newFiles;
        })
    }

    // this object contains the config info for the upload component, including the upload function
    const uploadProps = {
        name: 'file',
        multiple: true,
        // this handles the uploaded files
        customRequest: (options: any) => {
            const file = options.file;
            const file_proxy = FileProxy.fromFile(file);

            // check if the file is a valid file
            if (checkFileValidity(file_proxy)) {
                updateFilesList(file_proxy)
            }
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