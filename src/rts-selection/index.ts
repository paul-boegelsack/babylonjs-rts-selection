import { Camera, Scene } from '@babylonjs/core'
import { Rectangle } from '@babylonjs/gui'
import { CanvasHelper } from './lib/CanvasHelper'
import { MathHelper } from './lib/MathHelper'
import { SelectionEvents } from './lib/SelectionEvents'
import { SelectionBox } from './SelectionBox'

/**
 * @property color - color of the UI selection box
 * @property alpha - can be used to determine transparency
 * @property htmlCanvasId - the canvas on which the box will be drawn
 */
export type SelectionBoxOptions = {
    color?: string
    alpha?: number
    htmlCanvasId?: string
}

/**
 * Creates a selection box for mesh selection
 * @param name - Name of the selection box UI rectangle
 * @param options - Configuration options
 * @param scene: - Defines the scene the camera belongs to,
 * @param camera: - Defines the camera the camera belongs to,
 * @returns - UI SelectionBox for mesh selection in world space
 */
export function CreateSelectionBox(
    name: string,
    options: SelectionBoxOptions,
    scene: Scene,
    camera: Camera
): SelectionBox {
    const color = options.color ? options.color : 'green'
    const alpha = options.alpha ? options.alpha : 0.2
    const canvasId = options.htmlCanvasId ? options.htmlCanvasId : 'gameCanvas'
    const wrapper = new Rectangle('SelectionBoxWrapper')
    wrapper.width = 1
    wrapper.height = 1
    wrapper.verticalAlignment = 0
    wrapper.horizontalAlignment = 0
    return new SelectionBox(
        name,
        color,
        alpha,
        wrapper,
        new SelectionEvents(),
        new CanvasHelper(canvasId, scene, camera),
        new MathHelper()
    )
}
