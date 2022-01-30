import { Mesh } from '@babylonjs/core'
import { EventEmitter } from 'events'

/**
 * Events and listeners for mesh selection and deselection
 */
export class SelectionEvents extends EventEmitter {
    public onMeshSelected: (mesh: Mesh) => void
    public onMeshDeselected: (mesh: Mesh) => void
    constructor() {
        super()
    }

    /**
     * Event listener for mesh selection
     * @param callback - passes the selected mesh
     */
    public addOnMeshSelected(callback: (mesh: Mesh) => void): void {
        this.on('mesh-selected', callback)
    }

    /**
     * Event listener for mesh deselection
     * @param callback - passes the deselected mesh
     */
    public addOnMeshDeselected(callback: (mesh: Mesh) => void): void {
        this.on('mesh-deselected', callback)
    }

    /**
     * Event for mesh selection
     * @param - selected mesh
     */
    public fireMeshSelected(mesh: Mesh): void {
        this.emit('mesh-selected', mesh)
    }

    /**
     * Event for mesh selection
     * @param - deselected mesh
     */
    public fireMeshDeselected(mesh: Mesh): void {
        this.emit('mesh-deselected', mesh)
    }
}
