import { useMounted } from '@app/hooks/useMounted';
import { useCallback, useEffect } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { Color } from "three";
import { IFCSPACE, IFCOPENINGELEMENT } from 'web-ifc';
import { FileProxy } from '../files-page/file-handling-utils';
import React from 'react';
import { Spinner } from '../common/Spinner/Spinner';
import { Col, Row, Tooltip } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BorderLeftOutlined } from '@ant-design/icons';
import { Modal } from '../common/Modal/Modal';
import { highlight_addition } from './diff_viewer';

let viewer: IfcViewerAPI;

interface IFCviewerProps {
  file: FileProxy | null
}

export const IFCviewer: React.FC<IFCviewerProps> = ({ file }) => {
  const { isMounted } = useMounted();
  const [loading, setLoading] = React.useState(false);
  const [isClipperActive, setIsClipperActive] = React.useState(false);
  const [properties, setProperties] = React.useState<any>(null);
  const [showProperties, setShowProperties] = React.useState(false);

  const loadIFCViewer = useCallback(async () => {
    if (!file)
      return
    const f = await file.getFile();

    const container = document.getElementById('IFCviewer_canvas');
    if (!container) {
      return;
    }

    setLoading(true);
    viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xccccd0), });
    viewer.axes.setAxes();
    viewer.grid.setGrid();
    viewer.IFC.loader.ifcManager.applyWebIfcConfig({
      COORDINATE_TO_ORIGIN: true,
      USE_FAST_BOOLS: false
    });
    viewer.IFC.loader.ifcManager.parser.setupOptionalCategories({
      [IFCSPACE]: false,
      [IFCOPENINGELEMENT]: false
    });
    const window = global.window;
    viewer.IFC.loader.ifcManager.useWebWorkers(true, '../../../wasm/IFCWorker.js');
    viewer.IFC.setWasmPath('../../../wasm/');
    const model = await viewer.IFC.loadIfc(f, true);
    console.log(model)

    viewer.context.ifcCamera.cameraControls
    viewer.context.renderer.usePostproduction = true;

    // Setup loader
    // const lineMaterial = new LineBasicMaterial({ color: 0x555555 });
    // const baseMaterial = new MeshBasicMaterial({ color: 0xffffff, side: 2 });

    // await createFill(model.modelID);
    // viewer.edges.create(`${model.modelID}`, model.modelID, lineMaterial, baseMaterial);

    await viewer.shadowDropper.renderShadow(model.modelID);

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'file');
    inputElement.classList.add('hidden');

    const handleKeyDown = async (event: any) => {
      if (event.code === 'Delete') {
        viewer.clipper.deletePlane();
        viewer.dimensions.delete();
      }
      if (event.code === 'Escape') {
        event.stopPropagation();
        viewer.IFC.selector.unHighlightIfcItems();
      }
      if (event.code === 'KeyC') {
        viewer.context.ifcCamera.toggleProjection();
      }
    };

    window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
    window.onkeydown = handleKeyDown;
    window.ondblclick = async () => {

      if (viewer.clipper.active) {
        viewer.clipper.createPlane();
      } else {
        //const result = await viewer.IFC.selector.highlightIfcItem(true);
        const result = await highlight_addition(viewer.IFC)
        if (!result) return;
        const { modelID, id } = result;
        const props = await viewer.IFC.getProperties(modelID, id, true, false);
        setProperties(JSON.stringify(props, null, 3));
        console.log(props);
      }
    }
    console.log()
    setLoading(false);
  }, [file])

  // load file
  useEffect(
    () => {
      loadIFCViewer();
    },
    [isMounted, loadIFCViewer],
  );

  const toggleClippingPlanes = () => {
    if (viewer)
      viewer.clipper.active = !viewer.clipper.active
    setIsClipperActive(viewer.clipper.active)
  }

  return (
    <>
    <Spinner spinning={loading}>
      <Row>
        <Col span={22}>
          <div id="IFCviewer_canvas" style={{
            position: "relative",
            height: "80vh",
            width: "80vw",
          }}></div>
        </Col>
        <Col span={2}>
          <Tooltip title="Clipping planes">
            <Button type={isClipperActive ? "primary" : "default"} icon={<BorderLeftOutlined />} size="small" onClick={() => { toggleClippingPlanes() }} >Clipping planes</Button>
          </Tooltip>
          <Tooltip title="Clipping planes">
            <Button disabled={!properties} icon={<BorderLeftOutlined />} size="small" onClick={() => { setShowProperties(true) }} >Properties</Button>
          </Tooltip>
        </Col>
      </Row>
    </Spinner >
    <Modal 
        title="Properties"
        centered={true}
        open={showProperties}
        onOk={() => setShowProperties(false)}
        onCancel={() => setShowProperties(false)}
        //width={'100%'}
        size="medium"
        destroyOnClose={true}
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      }}>
      <pre>{properties}</pre>
    </Modal>
    </>
  );
}
