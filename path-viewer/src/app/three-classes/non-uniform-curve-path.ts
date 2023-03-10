import { CurvePath, Vector } from 'three'

export class NonUniformCurvePath<T extends Vector> extends CurvePath<T> {

    constructor() {
        super()
    }

    override getPoint(t: number, optionalTarget?: T): T {
        // If t not in [0,1]
        if (t < 0 || t > 1) {
            throw new Error(`t (= ${t}) is not between 0 and 1 inclusive.`)
        } else if (t === 1) {
            return this.curves[this.curves.length - 1].getPoint(1, optionalTarget)
        }
        // If t in [0,1)
        const sectionFractionalIndex = t * this.curves.length
        const sectionIndex = Math.floor(sectionFractionalIndex)
        const fractionalComponent = sectionFractionalIndex - sectionIndex
        return this.curves[sectionIndex].getPoint(fractionalComponent, optionalTarget)
    }
}
