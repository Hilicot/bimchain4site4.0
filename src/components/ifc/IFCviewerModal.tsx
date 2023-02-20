import { Modal, InfoModal, SuccessModal, WarningModal, ErrorModal } from '@app/components/common/Modal/Modal';
import { FileProxy } from '../files-page/file-handling-utils';
import { IFCviewer } from './IFCviewer';

interface IFCviewerModalProps {
  viewedIFCfile: FileProxy | null,
  setViewedIFCfile: (viewedIFCfile: FileProxy | null) => void,
}

export const IFCviewerModal: React.FC<IFCviewerModalProps> = ({ viewedIFCfile, setViewedIFCfile }) => {

  return (
      <Modal
        title={viewedIFCfile?.name}
        centered={true}
        keyboard={false /* disable esc key to close modal*/}
        open={viewedIFCfile !== null}
        onOk={() => setViewedIFCfile(null)}
        onCancel={() => setViewedIFCfile(null)}
        width={'100%'}
        size="large"
        destroyOnClose={true}
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      }}
      >
        <IFCviewer file={viewedIFCfile} />
      </Modal>
  );
}
