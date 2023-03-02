import * as THREE from 'three';
import { Raycaster, Scene, Vector2 } from 'three';
import { IfcContext, IfcManager, ViewerOptions } from 'web-ifc-viewer-bimchain/dist/components';
/*
const addition_material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
});

const scene = new Scene();
const raycaster = new Raycaster();
raycaster.firstHitOnly = true;
const mouse = new Vector2();

export function highlight_addition(ifc: IfcManager, modelID : number, event:any, container:any): void {
    const found = cast(event, container)[0];
    if (found) {

        // Gets Express ID
        const index = found.faceIndex || 0;
        const geometry = found.object.geometry;
        const id = ifc.loader.ifcManager.getExpressId(geometry, index);

        // Creates subset
        ifc.loader.ifcManager.createSubset({
            modelID: modelID,
            ids: [id],
            material: addition_material,
            scene: scene,
            removePrevious: true
        })
    } else {
        // Remove previous highlight
        ifc.loader.ifcManager.removeSubset(modelID, addition_material);
    }
}

function cast(event:any, container:any) {

    // Computes the position of the mouse on the screen
    const bounds = container.getBoundingClientRect();

    const x1 = event.clientX - bounds.left;
    const x2 = bounds.right - bounds.left;
    mouse.x = (x1 / x2) * 2 - 1;

    const y1 = event.clientY - bounds.top;
    const y2 = bounds.bottom - bounds.top;
    mouse.y = -(y1 / y2) * 2 + 1;

    // Places it on the camera pointing to the mouse
    raycaster.setFromCamera(mouse, camera);

    // Casts a ray
    return raycaster.intersectObjects(ifcModels);
}*/



const addition_material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.6,
    color: 0x11aa11,
    depthTest: false
});

const scene = new Scene();

export async function highlight_addition(ifc: IfcManager): Promise<any> {

    
    const result = await ifc.selector.colorIfcItem(0x11ff11)
    //const group = await ifc.selector.createGroupHighlight("test", 0x0088ff )
    //const result = await ifc.selector.addToHighlightGroup(group)

    //await ifc.selector.unpickIfcItems()
    if(!result) 
        return null
    const {modelID, id} = result
    console.log(result)

    const materials = await ifc.loader.ifcManager.getMaterialsProperties(modelID, id)
    console.log(materials)

    /*const mesh = ifc.loader.ifcManager.createSubset({
        modelID: modelID,
        ids: [id],
        material: addition_material,
        scene: scene,
        removePrevious: true
    })
    mesh.visible = true*/
    return {modelID:0,id:22626}
}