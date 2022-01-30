import { Vector2 } from '@babylonjs/core'
import { MathHelper } from '../rts-selection/lib/MathHelper'

describe('MathHelper', () => {
    describe('Build2dRectWithDiagonal', () => {
        test('should not scale and stay in origin if start end end of the diagonal pointing to the origin', () => {
            const mathHelper = new MathHelper()
            const result = mathHelper.Build2dRectWithDiagonal(
                Vector2.Zero(),
                Vector2.Zero()
            )
            expect(result.width).toBe(0)
            expect(result.height).toBe(0)
        })
        test('should return a sqaure with side length of 1 if start.x and end.x as well as start.y and end.y have a difference of 1', () => {
            const mathHelper = new MathHelper()
            const result = mathHelper.Build2dRectWithDiagonal(
                Vector2.Zero(),
                new Vector2(1, 1)
            )
            expect(result.width).toBe(1)
            expect(result.height).toBe(1)
        })
    })
})
