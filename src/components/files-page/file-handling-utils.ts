
export class FileStatus {
    static readonly NULL = new FileStatus("", "");
    static readonly LOCAL = new FileStatus("Local", "var(--warning-color)");
    static readonly COMMITTING = new FileStatus("Committing...", "var(--primary-color)");
    static readonly ON_CHAIN = new FileStatus("On Chain", "var(--success-color)");
  
    private constructor(public readonly label: string, public readonly color: string) {
    }
  
    toString() {
      return this.label;
    }
  }

export class FileProxy{
    key: string;
    name: string;
    last_modified: Date;
    version: number;
    status: FileStatus;
    hash?:string
    file?: File;
    url?: string;
    author?: string;
    children?: FileProxy[];

    public constructor(name:string, last_modified:Date, version:number, status:FileStatus){
        this.key = name;
        this.name = name;
        this.last_modified = last_modified;
        this.version = version;
        this.status = status;
    }

    static fromFile(file:File): FileProxy{
        const f = new FileProxy(file.name, new Date(file.lastModified), 1, FileStatus.LOCAL);
        f.file = file;
        return f
    }

    static fromUrl(name:string, hash:string, version:number, url:string, author:string): FileProxy{
        // TODO implement last_modified date inside the contract (or better, upload date)
        const f =  new FileProxy(name, new Date(), version, FileStatus.ON_CHAIN);
        f.hash = hash;
        f.url = url;
        f.author = author;
        return f;
    }

    getFile(): File{
        if(this.file){
            return this.file;
        } else {
            // TODO implement (fetch from IPFS url and store in this.file as cache, then return it)
            return new File([], "file");
        }
    }
}
