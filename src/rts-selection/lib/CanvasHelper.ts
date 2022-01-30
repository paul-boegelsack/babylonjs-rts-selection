import { Vector3, Matrix, Camera, Scene } from '@babylonjs/core'

export type CanvasSize = {
    width: number
    height: number
}

/**
 * Offers functionality to gather information corresponding to a
 * html canvas
 */
export class CanvasHelper {
    constructor(
        private _canvasId: string,
        private _scene: Scene,
        private _camera: Camera
    ) {}

    /**
     * Converts a position in world space to screen space
     * @param point - point in world space
     * @returns - point in screen space
     */
    public GetScreenPoint(point: Vector3): Vector3 {
        const width = document.getElementById(this._canvasId).clientWidth
        const height = document.getElementById(this._canvasId).clientHeight
        return Vector3.Project(
            point,
            Matrix.Identity(),
            this._scene.getTransformMatrix(),
            this._camera.viewport.toGlobal(width, height)
        )
    }
}
