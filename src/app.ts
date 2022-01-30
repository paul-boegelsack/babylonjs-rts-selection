import {
    Color3,
    Engine,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    UniversalCamera,
    Vector2,
    Vector3,
} from '@babylonjs/core'
import { AdvancedDynamicTexture } from '@babylonjs/gui'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'

import { CreateSelectionBox } from './rts-selection'

function Main() {
    const canvas = document.createElement('canvas')
    canvas.id = 'gameCanvas'
    document.getElementById('canvasZone').appendChild(canvas)

    // initialize babylon scene and engine
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)

    const camera = new UniversalCamera('Camera', new Vector3(0, 10, -8), scene)
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    const ground = MeshBuilder.CreateGround(
        'ground',
        { width: 20, height: 20 },
        scene
    )
    ground.metadata = 'ground'

    const unselectedMat = new StandardMaterial('UnselectedMat', scene)
    unselectedMat.diffuseColor = new Color3(0.35, 0.73, 0.73)

    const selectedMat = new StandardMaterial('SelectedMat', scene)
    selectedMat.diffuseColor = new Color3(0.73, 0.53, 0.35)

    const unitOne = MeshBuilder.CreateBox(
        'UnitOne',
        { height: 0.5, width: 0.3, depth: 0.3 },
        scene
    )
    unitOne.position = new Vector3(-5, 0, 5)
    unitOne.material = unselectedMat

    const unitTwo = MeshBuilder.CreateBox(
        'UnitTwo',
        { height: 0.5, width: 0.3, depth: 0.3 },
        scene
    )
    unitTwo.position = new Vector3(5, 0, 0)
    unitTwo.material = unselectedMat

    const unitThree = MeshBuilder.CreateBox(
        'UnitThree',
        { height: 0.5, width: 0.3, depth: 0.3 },
        scene
    )
    unitThree.position = new Vector3(0, 0, -5)
    unitThree.material = unselectedMat

    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    const selectionBox = CreateSelectionBox('SelectionBox', {}, scene, camera)
    advancedTexture.addControl(selectionBox)

    selectionBox.SetSelectable(unitOne)
    selectionBox.SetSelectable(unitThree)
    selectionBox.SetSelectable(unitTwo)

    selectionBox.AddOnMeshSelected((mesh: Mesh) => {
        mesh.material = selectedMat
    })

    selectionBox.AddOnMeshDeselected((mesh: Mesh) => {
        mesh.material = unselectedMat
    })

    scene.onPointerDown = (evt) => {
        if (evt.button == 0) {
            selectionBox.StartSelection(
                new Vector2(scene.pointerX, scene.pointerY)
            )
        }
    }

    scene.onPointerMove = (evt) => {
        if (evt.buttons == 1) {
            selectionBox.ResizeSelection(
                new Vector2(scene.pointerX, scene.pointerY)
            )
        }
    }

    scene.onPointerUp = (evt) => {
        if (evt.button == 0) {
            selectionBox.StopSelection()
        }
    }

    scene.beforeRender = () => {
        camera.rotation.x = Math.PI * 0.3
        camera.rotation.y = 0
        selectionBox.Update()
    }

    scene.debugLayer
        .show({
            embedMode: true,
        })
        .catch((error) => {
            console.error(error)
        })

    // run the main render loop
    engine.runRenderLoop(() => {
        scene.render()
    })
}

Main()
