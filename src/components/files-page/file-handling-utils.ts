
export class FileStatus {
    static readonly NULL = new FileStatus("", "");
    static readonly LOCAL = new FileStatus("Local", "var(--warning-color)");
    static readonly COMMITTING = new FileStatus("Committing...", "var(--primary-color)");
    static readonly ON_CHAIN = new FileStatus("On Chain", "var(--success-color)");

    private constructor(public readonly label: string, public readonly color: string) {
    }

    toString(): string {
        return this.label;
    }

    static fromObject(obj: Record<string, unknown>): FileStatus {
        for (const key in FileStatus) {
            // @ts-ignore
            if (FileStatus[key] instanceof FileStatus && obj.label === FileStatus[key].label) {
                // @ts-ignore
                return FileStatus[key]; 
            }
        }
        return FileStatus.NULL;
    }
}

export class FileProxy {
    key: string;
    name: string;
    last_modified: Date;
    version: number;
    status: FileStatus;
    hash?: string
    file?: File;
    url?: string;
    author?: string;
    children?: FileProxy[];

    public constructor(name: string, last_modified: Date, version: number, status: FileStatus) {
        this.key = name;
        this.name = name;
        this.last_modified = last_modified;
        this.version = version;
        this.status = status;
    }

    static fromFile(file: File): FileProxy {
        const f = new FileProxy(file.name, new Date(file.lastModified), 1, FileStatus.LOCAL);
        f.file = file;
        return f
    }

    static fromUrl(name: string, hash: string, version: number, url: string, author: string): FileProxy {
        // TODO implement last_modified date inside the contract (or better, upload date)
        const f = new FileProxy(name, new Date(), version, FileStatus.ON_CHAIN);
        f.hash = hash;
        f.url = url;
        f.author = author;
        return f;
    }

    static fromObject(obj: any): FileProxy {
        const f = new FileProxy(obj.name, new Date(obj.last_modified), obj.version, FileStatus.fromObject(obj.status));
        f.hash = obj.hash;
        f.url = obj.url;
        f.author = obj.author;
        return f;
    }

    async getFile(): Promise<File> {
        if (this.file) {
            return this.file;
        } else {
            // fetch file from IPFS
            if(this.url?.split(":")[0] == "ipfs"){
                const res = await fetch(this.getHTTPUrl());
                const blob = await res.blob();
                this.file = new File([blob], this.name);
                return this.file;
            }
            return new File([], "file");
        }
    }

    getHTTPUrl(): string {
        if (!this.url) {
            return "";
        } else {
            const cid = this.url.split("/")[2]
            return "https://" + cid + ".ipfs.nftstorage.link/" + this.name
        }
    }
}
