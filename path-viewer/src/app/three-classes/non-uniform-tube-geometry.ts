import { BufferGeometry, Float32BufferAttribute, Path, Vector2, Vector3 } from "three"

export class NonUniformTubeGeometry extends BufferGeometry {

    parameters: any
    tangents: any
    normals: any
    binormals: any
    P: any

    constructor(path: Path, tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {

        super()

        this.type = 'TubeGeometry'

        this.parameters = {
            path: path,
            tubularSegments: tubularSegments,
            radius: radius,
            radialSegments: radialSegments,
            closed: closed
        }

        const frames = path.computeFrenetFrames(tubularSegments, closed)

        // expose internals

        this.tangents = frames.tangents
        this.normals = frames.normals
        this.binormals = frames.binormals

        // helper variables

        const vertex = new Vector3()
        const normal = new Vector3()
        const uv = new Vector2()
        this.P = new Vector3()

        // buffer

        const vertices: any[] = []
        const normals: any[] = []
        const uvs: any[] = []
        const indices: any[] = []

        // functions

        const generateSegment = (i: any) => {

            this.P = path.getPoint(i / tubularSegments, this.P)

            // retrieve corresponding normal and binormal

            const N = frames.normals[i]
            const B = frames.binormals[i]

            // generate normals and vertices for the current segment

            for (let j = 0; j <= radialSegments; j++) {

                const v = j / radialSegments * Math.PI * 2

                const sin = Math.sin(v)
                const cos = -Math.cos(v)

                // normal

                normal.x = (cos * N.x + sin * B.x)
                normal.y = (cos * N.y + sin * B.y)
                normal.z = (cos * N.z + sin * B.z)
                normal.normalize()

                normals.push(normal.x, normal.y, normal.z)

                // vertex

                vertex.x = this.P.x + radius * normal.x
                vertex.y = this.P.y + radius * normal.y
                vertex.z = this.P.z + radius * normal.z

                vertices.push(vertex.x, vertex.y, vertex.z)

            }

        }

        const generateIndices = () => {

            for (let j = 1; j <= tubularSegments; j++) {

                for (let i = 1; i <= radialSegments; i++) {

                    const a = (radialSegments + 1) * (j - 1) + (i - 1)
                    const b = (radialSegments + 1) * j + (i - 1)
                    const c = (radialSegments + 1) * j + i
                    const d = (radialSegments + 1) * (j - 1) + i

                    // faces

                    indices.push(a, b, d)
                    indices.push(b, c, d)

                }

            }

        }

        const generateUVs = () => {

            for (let i = 0; i <= tubularSegments; i++) {

                for (let j = 0; j <= radialSegments; j++) {

                    uv.x = i / tubularSegments
                    uv.y = j / radialSegments

                    uvs.push(uv.x, uv.y)

                }

            }

        }

        const generateBufferData = () => {

            for (let i = 0; i < tubularSegments; i++) {

                generateSegment(i)

            }

            // if the geometry is not closed, generate the last row of vertices and normals
            // at the regular position on the given path
            //
            // if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)

            generateSegment((closed === false) ? tubularSegments : 0)

            // uvs are generated in a separate function.
            // this makes it easy compute correct values for closed geometries

            generateUVs()

            // finally create faces

            generateIndices()

        }

        // create buffer data

        generateBufferData()

        // build geometry

        this.setIndex(indices)
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3))
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3))
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2))


    }

    override toJSON() {

        const data = super.toJSON()

        data.path = this.parameters.path.toJSON()

        return data

    }
}
