import React, { useState, useEffect } from 'react';
import { Table } from 'components/common/Table/Table';
import { Tooltip, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
import { Button } from '@app/components/common/buttons/Button/Button';
import { DownloadOutlined, LinkOutlined, SearchOutlined } from '@ant-design/icons';
import { Transaction, TransactionResult } from '@app/blockchain/Transaction';
import BlockchainManager from '@app/blockchain/BlockchainManager';
import Blockchain from '@app/blockchain/Blockchain';
import { FileProxy, FileStatus } from './file-handling-utils';

interface FilesProps {
  data: FileProxy[];
  setData: (data: FileProxy[]) => void;
  chain: Blockchain;
}

const initialPagination: Pagination = {
  current: 1,
  pageSize: 20,
};

export const FileTable: React.FC<FilesProps> = ({ data, setData, chain}: any) => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState<Pagination>(initialPagination);

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
  const uploadFile = async (item: FileProxy) => {
    if (!chain){
      console.error("Blockchain not initialized");
      return;
    }
  
    const transaction = new Transaction(item.getFile(), item.name);
    const originalStatus = item.status;
    item.status = FileStatus.COMMITTING;
    // Refresh table
    refreshData();
    chain.commitTransaction(transaction)
      .then((res: TransactionResult) => {
        if (res.success)
          item.status = FileStatus.ON_CHAIN;
        else{
          console.error("Failed to upload file to blockchain", res)
          item.status = originalStatus;
        }
        // Refresh table
        refreshData();
      })

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

interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

//TODO remove fake data
export const getFakeTreeTableData = async (): Promise<FileProxy[]> => {
  
    const f1 = new FileProxy("Main Structure", new Date("2023/02/15"), 1, FileStatus.NULL);
    const f11 = new FileProxy("Floor 1", new Date("2023/02/01"), 1, FileStatus.LOCAL);
    const f12 = new FileProxy("Floor 2", new Date("2023/02/03"), 2, FileStatus.LOCAL);
    const f121 = new FileProxy("Room 1", new Date("2023/02/03"), 1, FileStatus.LOCAL);
    const f13 = new FileProxy("Floor 3", new Date("2022/12/21"), 1, FileStatus.ON_CHAIN);
    const f4 = new FileProxy("Outer Beams", new Date("2022/11/15"), 2, FileStatus.ON_CHAIN);
    const f5 = new FileProxy("Outer Beams 2", new Date("2022/12/21"), 2, FileStatus.ON_CHAIN);
    const f6 = new FileProxy("Pavement", new Date("2022/12/21"), 3, FileStatus.LOCAL);

    f12.children = [f121];
    f1.children = [f11, f12, f13];
    return [f1, f4, f5, f6]
};