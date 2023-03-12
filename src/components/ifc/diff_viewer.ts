import * as THREE from 'three';
import { IFCFURNISHINGELEMENT } from 'web-ifc'
// Since we are using conditional in IFCviewer, import from it to access the right library
import { viewer_module } from './IFCviewer';
type IfcManager = typeof viewer_module.IfcManager;

const green = new THREE.Color(0x11ff11);


export async function create_highlight_groups(ifc:IfcManager): Promise<void> {
    await ifc.selector.createGroupHighlight("green", green)
}

export async function highlight_addition(ifc: IfcManager): Promise<any> {

    const result = await ifc.selector.colorIfcItem(green)

    if (!result)
        return null
    return { modelID: 0, id: 22626 }
}

export async function highlight_model_features(ifc: IfcManager, model: any): Promise<void> {
    const spatial_structure = await ifc.getSpatialStructure(model.modelID, true);
    console.log("spatial_structure: ", spatial_structure)

    const objs = await ifc.getAllItemsOfType(model.modelID, IFCFURNISHINGELEMENT)
    console.log("objs: ", objs)

    //const group = await ifc.selector.createGroupHighlight("green", 0x11ff11 )
    const group = await ifc.selector.getGroupHighlight("green")
    ifc.selector.addToHighlightGroup([22620], group)
}

export async function highlight_type(ifc: IfcManager, model: any, type: number): Promise<void> {

    const group = await ifc.selector.getGroupHighlight("green")
    group.clearSelection()

    if (type >= 0) {
        const objs = await ifc.getAllItemsOfType(model.modelID, type)
        ifc.selector.addToHighlightGroup(objs, group)
    }
}