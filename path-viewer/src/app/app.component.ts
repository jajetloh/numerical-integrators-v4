import { Component } from '@angular/core'
import { COLOUR_SCHEME, TrajectorySpec } from "./path-viewer/path-viewer.component"
import { range } from "lodash-es"
import { Papa } from "ngx-papaparse"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'path-viewer'
    selectedSpecs: TrajectorySpec[] = []
    uploadedFileName = ''

    constructor(private papa: Papa) {
        this.selectTwoSineThings()
    }

    selectTwoSineThings() {
        const n = 1000
        this.selectedSpecs = [
            {
                coordinates: range(n + 1)
                    .map(x => [Math.sin(2 * 2 * Math.PI * x / n), Math.cos(2 * Math.PI * x / n), Math.sin(2 * Math.PI * x / n)] as [number, number, number])
            },
            {
                coordinates: range(n + 1)
                    .map(x => [Math.cos(2 * Math.PI * x / n), Math.sin(2 * 2 * Math.PI * x / n), -Math.sin(2 * Math.PI * x / n)] as [number, number, number])
            }
        ]
    }

    selectThreeCircles() {
        const n = 300
        this.selectedSpecs = [
            {
                coordinates: range(n + 1).map(x => [Math.sin(2 * Math.PI * x / n), Math.cos(2 * Math.PI * x / n), 0])
            },
            {
                coordinates: range(n + 1).map(x => [0, Math.sin(2 * Math.PI * x / n), Math.cos(2 * Math.PI * x / n)])
            },
            {
                coordinates: range(n + 1).map(x => [Math.cos(2 * Math.PI * x / n), 0, Math.sin(2 * Math.PI * x / n)])
            },
        ]
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0]
        if (!file) return

        this.uploadedFileName = file.name

        const fileReader = new FileReader()
        fileReader.onload = () => {
            this.papa.parse(file, {
                complete: results => {

                    const data = results.data

                    const paths: { [pathName: string]: [number, number, number][] } = {}
                    const columnNames: string[] = data[0]
                    const pathName = columnNames.filter(x => x.includes('_')).map(x => x.split('_')[0]).filter((v, i, a) => a.indexOf(v) === i)
                    pathName.forEach(k => {
                        paths[k] = []
                    })
                    const pathIndices: {[pathName: string]: [number, number, number]} = {}
                    Object.keys(paths).forEach(pathName => {
                        pathIndices[pathName] = [
                            columnNames.indexOf(pathName + '_x1') ?? -1,
                            columnNames.indexOf(pathName + '_x2') ?? -1,
                            columnNames.indexOf(pathName + '_x3') ?? -1,
                        ]
                    })

                    data.slice(1).forEach((record: any) => {
                        // Empty rows are record = ['']. Next line filters them out
                        if (!(record.length === 1 && record[0] === '')) {
                            Object.entries(pathIndices).forEach(([pathName, indices]) => {
                                paths[pathName].push(indices.map(i => i === -1 ? 0 : Number.parseFloat(record[i])) as [number, number, number])
                            })
                        }
                    })

                    this.selectedSpecs = Object.values(paths).map((path, i) => ({ coordinates: path, colour: COLOUR_SCHEME[i] }))
                }
            })
        }
        fileReader.readAsText(file)
    }
}

