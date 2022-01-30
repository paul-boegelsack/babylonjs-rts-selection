import {
    Engine,
    HemisphericLight,
    MeshBuilder,
    Scene,
    UniversalCamera,
    Vector3,
} from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'

function Main() {
    const canvas = document.createElement('canvas')
    canvas.id = 'gameCanvas'
    document.getElementById('canvasZone').appendChild(canvas)

    // initialize babylon scene and engine
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)

    const camera = new UniversalCamera('Camera', new Vector3(0, 10, -8), scene)
    camera.rotation = new Vector3(Math.PI * 0.3, 0, 0)
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    const ground = MeshBuilder.CreateGround(
        'ground',
        { width: 20, height: 20 },
        scene
    )
    ground.metadata = 'ground'

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
