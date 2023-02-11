import React, { useState, useEffect } from 'react';
import { Table } from 'components/common/Table/Table';
import { Tooltip, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
import { Button } from '@app/components/common/buttons/Button/Button';
import { DownloadOutlined, LinkOutlined, SearchOutlined } from '@ant-design/icons';
import { Transaction } from '@app/blockchain/Transaction';
import BlockchainManager from '@app/blockchain/BlockchainManager';
import Blockchain from '@app/blockchain/Blockchain';

interface FilesProps {
  data: TreeTableRow[];
  setData: (data: TreeTableRow[]) => void;
}

const initialPagination: Pagination = {
  current: 1,
  pageSize: 20,
};

export const FileTable: React.FC<FilesProps> = ({ data, setData }: any) => {
  const { t } = useTranslation();
  const [chain, setChain] = useState<Blockchain>();
  const BM = new BlockchainManager("NFT.Storage");
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  useEffect(() => {
    BM.init().then((res) => {
      setChain(res.getBlockchain());
    })
  }, []);

  const refreshData = () => setData([...data])

  /*const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows: DefaultRecordType[]) => {
      console.log(selectedRowKeys, selectedRows);
    },
    onSelect: (record: DefaultRecordType, selected: boolean, selectedRows: DefaultRecordType[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DefaultRecordType[]) => {
      console.log(selected, selectedRows);
    },
  };*/

  // to handle file uploads
  const uploadFile = async (item: TreeTableRow) => {
    if (!chain){
      console.error("Blockchain not initialized");
      return;
    }
    const transaction = new Transaction(item.file, item.file.name, "");
    const originalStatus = item.status;
    item.status = FileStatus.COMMITTING;
    // Refresh table
    refreshData();
    chain.commitTransaction(transaction)
      .then(res => {
        if (res.success)
          item.status = FileStatus.ON_CHAIN;
        else
          console.error("Failed to upload file to blockchain", res)
        // Refresh table
        refreshData();
      })
      .catch(err => {
        item.status = originalStatus;
        refreshData();
      });

  };

  const columns = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Last Modified",
      dataIndex: 'last_modified',
      key: 'last_modified',
      width: '20%',
      render: (last_modified: Date) => last_modified.toLocaleDateString()
    },
    {
      title: "Version",
      dataIndex: 'version',
      key: 'version',
      width: '12%',
    },
    {
      title: "Status",
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (status: FileStatus, version: any) => {
        if (status === FileStatus.NULL) {
          return "";
        }
        return (
          <Status color={status.color} text={status.label} />
        );
      },
    },
    {
      title: "Actions",
      dataIndex: 'actions',
      //key: 'actions',
      width: '20%',
      render: (actions: any, item: any) => {
        if (item.status === FileStatus.NULL) {
          return "";
        }
        return (
          <div>
            <Row>
              <Tooltip title="Download">
                <Button type="text" icon={<DownloadOutlined />} size="small" />
              </Tooltip>
              {(item.status != FileStatus.ON_CHAIN && item.status != FileStatus.COMMITTING) ? (<Tooltip title="Save to Blockchain">
                <Button type="text" icon={<LinkOutlined />} size="small" onClick={e => uploadFile(item)} disabled={chain ? false : true}/>
              </Tooltip>)
                : (<></>)}
            </Row>
          </div>
        );
      }
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        //rowSelection={{ ...rowSelection }}
        // @ts-ignore
        pagination={pagination}
        //loading={loading}
        onChange={setPagination}
        scroll={{ x: 800 }}
      />
    </>
  );
};

// TODO move these interfaces to source of data
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

interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

interface BasicTableRow {
  key: string;
  name: string;
  last_modified: Date;
  version: number;
  status: FileStatus;
  file: File;
}

export interface TreeTableRow extends BasicTableRow {
  children?: TreeTableRow[];
}


//TODO remove fake data
export const getFakeTreeTableData = (): Promise<TreeTableRow[]> => {
  return new Promise((res) =>
    res([
      {
        key: "1",
        name: 'Main Structure',
        last_modified: new Date("2023/02/15"),
        version: 1,
        status: FileStatus.NULL,
        file: new File([""], "test1"),
        children: [
          {
            key: "11",
            name: 'Floor 1',
            last_modified: new Date("2023/02/01"),
            version: 1,
            status: FileStatus.LOCAL,
            file: new File([""], "test1"),
          },
          {
            key: "12",
            name: 'Floor 2',
            last_modified: new Date("2023/02/03"),
            version: 2,
            status: FileStatus.LOCAL,
            file: new File([""], "test1"),
            children: [
              {
                key: "121",
                name: 'Room 1',
                last_modified: new Date("2023/01/12"),
                version: 1,
                status: FileStatus.LOCAL,
                file: new File([""], "test1"),
              },
            ],
          },
          {
            key: "13",
            name: 'Floor 3',
            last_modified: new Date("2022/12/21"),
            version: 4,
            status: FileStatus.ON_CHAIN,
            file: new File([""], "test1"),
          },
        ],
      },
      {
        key: "200",
        name: 'Outer Beams',
        last_modified: new Date("2022/11/15"),
        version: 3,
        status: FileStatus.COMMITTING,
        file: new File([""], "test1"),
      },
      {
        key: "300",
        name: 'Outer Beams 2',
        last_modified: new Date("2022/12/21"),
        version: 2,
        status: FileStatus.ON_CHAIN,
        file: new File([""], "test1"),
      },
      {
        key: "400",
        name: 'Pavement',
        last_modified: new Date("2022/12/21"),
        version: 2,
        status: FileStatus.ON_CHAIN,
        file: new File([""], "test1"),
      },
      {
        key: "500",
        name: 'Pavement 2',
        last_modified: new Date("2022/12/22"),
        version: 2,
        status: FileStatus.LOCAL,
        file: new File([""], "test1"),
      }
    ],)
  );
};