import styles from "./DropZone.module.css";
import { InboxOutlined } from '@ant-design/icons';
import {Transaction} from "@app/blockchain/Transaction";
import BlockchainManager from "@app/blockchain/BlockchainManager";
import {  useState } from 'react';
import { FileTreeTableRow } from "./file-handling-utils";

const DropZone = ({ data, setData }:any) => {
    const chain = new BlockchainManager("NFT.Storage").getBlockchain();
    const [inDropZone, setInDropZone] = useState(false);

    // onDragEnter sets inDropZone to true
    const handleDragEnter = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setInDropZone(true);
    };

    // onDragLeave sets inDropZone to false
    const handleDragLeave = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setInDropZone(false);
    };

    // onDragOver sets inDropZone to true
    const handleDragOver = (e:any) => {
        e.preventDefault();
        e.stopPropagation();

        // set dropEffect to copy i.e copy of the source item
        e.dataTransfer.dropEffect = "copy";
        setInDropZone(true);
    };

    // onDrop sets inDropZone to false and adds files to fileList
    const handleDrop = (e:any) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];

        if (files && files.length > 0) {
            // check if file already exists, if so, don't add to fileList
            // this is to prevent duplicates
            /*
            const existingFiles = data.map((f:any) => f.file.name);
            files = files.filter((f) => !existingFiles.includes(f.name));
            */
            const rowData = files.map((f:File) => new FileTreeTableRow(f));
            setData([...data, ...rowData])
            setInDropZone(false);
        }
    };

    const handleFileSelect = (e:any) => {
        let files = [...e.target.files];

        if (files && files.length > 0) {
            const rowData = files.map((f:File) => new FileTreeTableRow(f));
            setData([...data, ...rowData])
        }
    };

    return (
        <>
            <div
                className={styles.dropzone}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
            >
                <InboxOutlined style={{ fontSize: '350%'}}/>

                <input
                    id="fileSelect"
                    type="file"
                    multiple
                    className={styles.files}
                    onChange={(e) => handleFileSelect(e)}
                />
                <label htmlFor="fileSelect">You can select multiple Files</label>

                <h3 className={styles.uploadMessage}>
                    or drag &amp; drop your files here
                </h3>
            </div>
        </>
    );
};

export default DropZone;