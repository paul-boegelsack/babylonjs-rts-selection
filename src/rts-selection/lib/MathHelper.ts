import { Vector2 } from '@babylonjs/core'

/**
 * Properties of a 2D Rectangle
 */
export type Rect2dProps = {
    width: number
    height: number
    offsetLeft: number
    offsetTop: number
}

export class MathHelper {
    /**
     * Calculates a rectangle with its diagonal and returns the
     * corresponding properties.
     * @param diagonalStart - Start point of the diagonal
     * @param diagonalEnd - End point of the diagonal
     * @returns - Rectangle properties
     */
    public Build2dRectWithDiagonal(
        diagonalStart: Vector2,
        diagonalEnd: Vector2
    ): Rect2dProps {
        const width = Math.abs(diagonalStart.x - diagonalEnd.x)
        const height = Math.abs(diagonalEnd.y - diagonalStart.y)
        const position = diagonalStart.add(diagonalEnd).scale(0.5)
        const offsetLeft = position.x - width / 2
        const offsetTop = position.y - height / 2
        return {
            width,
            height,
            offsetLeft,
            offsetTop,
        }
    }

    /**
     * Checks, if a point is inside of a rectangle
     * @param bottomRightCorner - start point of the rectangle diagonal
     * @param topLeftCorner - end point of the rectangle diagonal
     * @param point - point to check
     * @returns - true if the point is part of the rectangle area
     */
    public IsPointInRectangle(
        bottomRightCorner: Vector2,
        topLeftCorner: Vector2,
        point: Vector2
    ): boolean {
        if (!point || !bottomRightCorner || !topLeftCorner) return false
        if (
            point.x < bottomRightCorner.x &&
            point.x > topLeftCorner.x &&
            point.y < bottomRightCorner.y &&
            point.y > topLeftCorner.y
        )
            return true

        return false
    }
}
