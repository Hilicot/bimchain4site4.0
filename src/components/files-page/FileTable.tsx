/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
//import { Table } from 'components/common/Table/Table';
import { Table, Tooltip, Row, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button } from '@app/components/common/buttons/Button/Button';
import { DownloadOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Transaction, TransactionResult } from '@app/blockchain/Transaction';
import Blockchain from '@app/blockchain/Blockchain';
import { FileProxy, FileStatus } from './file-handling-utils';
import { User } from '@app/domain/User';
import { getUser } from '@app/api/user.api'

const users_cache = new Map<string, User | null>();

interface FilesProps {
  type: string;
  data: FileProxy[];
  setData: (data: FileProxy[]) => void;
  chain: Blockchain;
  setViewedIFCfile: (viewedIFCfile: FileProxy | null) => void;
  setReload: (reload: boolean) => void;
}

const initialPagination: Pagination = {
  current: 1,
  pageSize: 20,
};

export const FileTable: React.FC<FilesProps> = ({ type, data, setData, chain, setViewedIFCfile, setReload }: any) => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const refreshData = () => setData([...data])

  // TODO: remove ignore option (only used to disable one single table)
  let displayed_data: FileProxy[];
  if (type === "ignore")
    displayed_data = data;
  else
    displayed_data = data.filter((item: FileProxy) => {
      if (type === "on_chain")
        return item.status === FileStatus.ON_CHAIN;
      else if (type === "local")
        return item.status !== FileStatus.ON_CHAIN;
    })

  // to handle file uploads
  const uploadFile = async (item: FileProxy) => {
    if (!chain) {
      console.error("Blockchain not initialized");
      return;
    }

    const transaction = new Transaction(item);
    const originalStatus = item.status;
    item.status = FileStatus.COMMITTING;
    // Refresh table
    refreshData();
    chain.commitTransaction(transaction)
      .then((res: TransactionResult) => {
        if (res.success)
          item.status = FileStatus.ON_CHAIN;
        else {
          console.error("Failed to upload file to blockchain", res)
          item.status = originalStatus;
        }
        // Reload table (refetch from blockchain)
        refreshData();
        setReload();
      }).catch((error: any) => console.log(error))

  };

  const downloadFile = async (item: FileProxy) => {
    if (chain)
      chain.downloadFile(item)
  }

  const columns = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: FileProxy, b: FileProxy) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Last Modified",
      dataIndex: 'last_modified',
      key: 'last_modified',
      width: '10%',
      render: (last_modified: Date) => last_modified.toLocaleDateString(),
      sorter: (a: FileProxy, b: FileProxy) => a.last_modified.getTime() - b.last_modified.getTime(),
      showSorterTooltip: false,
    },
    {
      title: "Version",
      dataIndex: 'version',
      key: 'version',
      width: '5%',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: '20%',
      render: (author: string) => {
        // see if we have this address in cache, else try to fetch it from server. In case of error, just show the address
        if (!author) return " - "
        if (users_cache.has(author)) {
          if (users_cache.get(author))
            return users_cache.get(author)?.name + " " + users_cache.get(author)?.surname;
          else
            return author;
        }
        else {
          // first time I see this address, try to fetch the user info from server
          getUser(author).then((user: User) => {
            console.log(user)
            users_cache.set(author, user);
            refreshData();

          }).catch((error: any) => {
            // If no user is found, record that user is null and just show the address
            users_cache.set(author, null);
            console.log("Could not fetch user " + author + ": " + error)
          })
          return author;
        }
      }
    },
    {
      title: "Status",
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: FileStatus) => {
        if (status === FileStatus.NULL) {
          return "";
        }
        return (
          <Tag color={status.color}>{status.label}</Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: 'actions',
      //key: 'actions',
      width: '15%',
      render: (_action: any, item: any) => {
        if (item.status === FileStatus.NULL) {
          return "";
        }
        return (
          <div>
            <Row>
              <Tooltip title="Download">
                <Button type="text" icon={<DownloadOutlined />} size="small" onClick={() => downloadFile(item)} />
              </Tooltip>
              {/* TODO replace with double click?*/}
              {/* TODO restrict viewer to IFC only, or build new viewers*/}
              {item.name.split('.').pop() === "ifc" &&
                <Tooltip title="View File">
                  <Button type="text" icon={<EyeOutlined />} size="small" onClick={() => { setViewedIFCfile(item) }} />
                </Tooltip>
              }
              {(item.status != FileStatus.ON_CHAIN && item.status != FileStatus.COMMITTING) ? (<Tooltip title="Save to Blockchain">
                <Button type="text" icon={<LinkOutlined />} size="small" onClick={() => uploadFile(item)} disabled={chain ? false : true} />
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
        dataSource={displayed_data}
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