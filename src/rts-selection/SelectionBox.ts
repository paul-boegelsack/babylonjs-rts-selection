import { Vector2, Mesh } from '@babylonjs/core'
import { Rectangle, Container } from '@babylonjs/gui'
import { CanvasHelper } from './lib/CanvasHelper'
import { MathHelper } from './lib/MathHelper'
import { SelectionEvents } from './lib/SelectionEvents'

type RectDiagonal = {
    bottomRightCorner: Vector2
    topLeftCorner: Vector2
}

/**
 * Draws a box in 2D screen view and selects meshes in world space
 */
export class SelectionBox extends Rectangle {
    private _startPoint = Vector2.Zero()
    private _endPoint = Vector2.Zero()
    private _selectables: Mesh[] = []
    private _preselected: Mesh[] = []
    private _currentSelection: Mesh[] = []

    constructor(
        name: string,
        backgroundColor: string,
        alpha: number,
        private _wrapper: Container,
        private _events: SelectionEvents,
        private _canvasHelper: CanvasHelper,
        private _mathHelper: MathHelper
    ) {
        super(name)
        this.width = '0px'
        this.height = '0px'
        this.background = backgroundColor
        this.alpha = alpha
        this.verticalAlignment = 0
        this.horizontalAlignment = 0
        this._wrapper.addControl(this)
    }

    get CurrentSelection(): Mesh[] {
        return this._currentSelection
    }

    /**
     * Should be used in render function callback/listener to update the box selection and its size.
     */
    public Update(): void {
        if (this._startPoint.length() === 0 || this._endPoint.length() === 0)
            return

        const { height, width, offsetLeft, offsetTop } =
            this._mathHelper.Build2dRectWithDiagonal(
                this._startPoint,
                this._endPoint
            )

        this._updateSelectionBoxSizeInPx(width, height, offsetLeft, offsetTop)
        this._detectSelectableCandidates(width, height, offsetLeft, offsetTop)
    }

    /**
     * Adds an event listener that returns a mesh if it has been selected.
     * @param callback - Returns the selected mesh
     */
    public AddOnMeshSelected(callback: (mesh: Mesh) => void): void {
        this._events.addOnMeshSelected(callback)
    }

    /**
     * Adds an event listener that returns a mesh if it has been deselected.
     * @param callback - Returns the deselected mesh
     */
    public AddOnMeshDeselected(callback: (mesh: Mesh) => void): void {
        this._events.addOnMeshDeselected(callback)
    }

    /**
     * Sets a Mesh, that can be selected through the selection box.
     * @param mesh - Mesh that will be selectable
     */
    public SetSelectable(mesh: Mesh): void {
        this._selectables.push(mesh)
    }

    /**
     * Should be used inside a pointer down callback/listener, to set the start point
     * of the selection box.
     * @param mousePosition
     */
    public StartSelection(mousePosition: Vector2): void {
        this._startPoint = mousePosition
    }

    /**
     * Should be used inside a pointer move callback/listener to update the end point
     * of the selection box, while moving the mouse.
     * @param mousePosition
     */
    public ResizeSelection(mousePosition: Vector2): void {
        this._endPoint = mousePosition
    }

    /**
     * Should be used inside a pointer up callback/listener to select meshes through
     * the selection box.
     */
    public StopSelection(): void {
        this._determineDeselectedMeshes()
        this._determineSelectedMeshes()

        this._preselected = []
        this._startPoint = Vector2.Zero()
        this._endPoint = Vector2.Zero()
        this._updateSelectionBoxSizeInPx(0, 0, 0, 0)
    }

    private _updateSelectionBoxSizeInPx(
        width: number,
        height: number,
        offsetLeft: number,
        offsetTop: number
    ) {
        this.left = `${offsetLeft}px`
        this.top = `${offsetTop}px`

        this.height = `${height}px`
        this.width = `${width}px`
    }

    private _detectSelectableCandidates(
        selectWidth: number,
        selectHeight: number,
        offsetLeft: number,
        offsetTop: number
    ) {
        const bottomRightCorner = new Vector2(
            offsetLeft + selectWidth,
            offsetTop + selectHeight
        )
        const topLeftCorner = new Vector2(offsetLeft, offsetTop)

        const diagonal = {
            bottomRightCorner,
            topLeftCorner,
        }

        for (const selectable of this._selectables) {
            if (this._isInSelectionBox(selectable, diagonal)) {
                this._addToPreselection(selectable)
                continue
            }
            this._removeFromPreselection(selectable)
        }
    }

    private _addToPreselection(selectable: Mesh) {
        const index = this._preselected.findIndex(
            (preselected) => preselected.name == selectable.name
        )

        if (index > -1) return
        this._preselected.push(selectable)
    }

    private _removeFromPreselection(selectable: Mesh) {
        const index = this._preselected.findIndex(
            (preselected) => preselected.name == selectable.name
        )

        if (index == -1) return
        this._preselected.splice(index, 1)
    }

    private _isInSelectionBox(
        selectable: Mesh,
        diagonal: RectDiagonal
    ): boolean {
        const { bottomRightCorner, topLeftCorner } = diagonal
        const screenPosition = this._canvasHelper.GetScreenPoint(
            selectable.position
        )
        return this._mathHelper.IsPointInRectangle(
            bottomRightCorner,
            topLeftCorner,
            new Vector2(screenPosition.x, screenPosition.y)
        )
    }

    private _determineSelectedMeshes() {
        this._currentSelection = [...this._preselected]

        this._currentSelection.forEach((selected) =>
            this._events.fireMeshSelected(selected)
        )
    }

    private _determineDeselectedMeshes() {
        const difference = this._currentSelection.filter(
            (selected) => this._preselected.includes(selected) == false
        )

        difference.forEach((deselected) =>
            this._events.fireMeshDeselected(deselected)
        )
    }
}
