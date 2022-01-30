import { SelectionBox } from '../rts-selection/SelectionBox'
import { Container } from '@babylonjs/gui'
import { SelectionEvents } from '../rts-selection/lib/SelectionEvents'
import { CanvasHelper } from '../rts-selection/lib/CanvasHelper'
import { Mesh, Vector2, Vector3 } from '@babylonjs/core'
import { MathHelper } from '../rts-selection/lib/MathHelper'

describe('SelectionBox', () => {
    let fakeWrapper
    let fakeCanvasHelper
    beforeEach(() => {
        fakeWrapper = {
            addControl() {},
        }
        fakeCanvasHelper = {
            GetScreenPoint() {},
        }
    })
    it('should select a mesh if it is inside the selection box', () => {
        jest.spyOn(fakeCanvasHelper, 'GetScreenPoint').mockImplementation(
            () => new Vector3(0, 0, 0)
        )
        const fakeMesh = { name: 'fakeMesh', position: new Vector3(0, 0, 0) }

        const selectionBox = new SelectionBox(
            'testBox',
            'green',
            0.2,
            fakeWrapper as Container,
            new SelectionEvents(),
            fakeCanvasHelper as CanvasHelper,
            new MathHelper()
        )

        selectionBox.SetSelectable(fakeMesh as Mesh)
        selectionBox.StartSelection(new Vector2(-1, 1))
        selectionBox.ResizeSelection(new Vector2(1, -1))
        selectionBox.Update()
        selectionBox.StopSelection()
        expect(selectionBox.CurrentSelection[0].name).toBe('fakeMesh')
    })
    it('should not select a mesh if it is not inside the selection box', () => {
        jest.spyOn(fakeCanvasHelper, 'GetScreenPoint').mockImplementation(
            () => new Vector3(2, 0, 0)
        )
        const fakeMesh = { name: 'fakeMesh', position: new Vector3(2, 0, 0) }

        const selectionBox = new SelectionBox(
            'testBox',
            'green',
            0.2,
            fakeWrapper as Container,
            new SelectionEvents(),
            fakeCanvasHelper as CanvasHelper,
            new MathHelper()
        )

        selectionBox.SetSelectable(fakeMesh as Mesh)
        selectionBox.StartSelection(new Vector2(-1, 1))
        selectionBox.ResizeSelection(new Vector2(1, -1))
        selectionBox.Update()
        selectionBox.StopSelection()
        expect(selectionBox.CurrentSelection).toEqual([])
    })
    it('should deselect a previous selected mesh, if it is no longer inside the selection box', () => {
        jest.spyOn(fakeCanvasHelper, 'GetScreenPoint').mockImplementation(
            () => new Vector3(0, 0, 0)
        )
        const fakeMesh = { name: 'fakeMesh', position: new Vector3(0, 0, 0) }

        const selectionBox = new SelectionBox(
            'testBox',
            'green',
            0.2,
            fakeWrapper as Container,
            new SelectionEvents(),
            fakeCanvasHelper as CanvasHelper,
            new MathHelper()
        )

        selectionBox.SetSelectable(fakeMesh as Mesh)
        selectionBox.StartSelection(new Vector2(-1, 1))
        selectionBox.ResizeSelection(new Vector2(1, -1))
        selectionBox.Update()
        selectionBox.StopSelection()
        expect(selectionBox.CurrentSelection[0].name).toBe('fakeMesh')

        selectionBox.StartSelection(new Vector2(-2, 1))
        selectionBox.ResizeSelection(new Vector2(-1, -1))
        selectionBox.Update()
        selectionBox.StopSelection()
        expect(selectionBox.CurrentSelection).toEqual([])
    })
})
