import { TreeTableRow, FileStatus } from '@app/components/files-page/FileTable';


export class FileTreeTableRow implements TreeTableRow{
    children?: TreeTableRow[] | undefined;
    key: string;
    name: string;
    last_modified: Date;
    version: number;
    status: FileStatus;
    file: File;
    
    public constructor(file:File){
        this.key = file.name;
        this.name = file.name;
        this.last_modified = new Date(file.lastModified);
        this.version = 1;
        this.status = FileStatus.LOCAL;
        this.file = file;
    }
}