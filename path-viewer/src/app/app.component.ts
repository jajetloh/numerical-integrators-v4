import { Component } from '@angular/core'
import { COLOUR_SCHEME, TrajectorySpec } from "./path-viewer/path-viewer.component"
import { range } from "lodash-es"
import { Papa } from "ngx-papaparse"
import { HttpClient } from "@angular/common/http"
import { firstValueFrom, tap } from "rxjs"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'path-viewer'
    selectedSpecs: TrajectorySpec[] = []
    uploadedFileName = ''

    constructor(private papa: Papa, private http: HttpClient) {
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

    selectCase7() {
        firstValueFrom(this.http.get('https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%207.csv', { responseType: 'text' })).then(data => {
            this.parseFileAndStart(data)
        })
    }

    selectCase9() {
        firstValueFrom(this.http.get('https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%209.csv', { responseType: 'text' })).then(data => {
            this.parseFileAndStart(data)
        })
    }

    selectCase61() {
        firstValueFrom(this.http.get('https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%2061.csv', { responseType: 'text' })).then(data => {
            this.parseFileAndStart(data)
        })
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0]
        if (!file) return

        this.uploadedFileName = file.name

        const fileReader = new FileReader()
        fileReader.onload = () => {
            this.parseFileAndStart(file)
        }
        fileReader.readAsText(file)
    }

    parseFileAndStart(file: File | string) {
        this.papa.parse(file, {
            complete: results => {

                const data = results.data

                const paths: { [pathName: string]: [number, number, number][] } = {}
                const columnNames: string[] = data[0]
                const pathName = columnNames.filter(x => x.includes('_')).map(x => x.split('_')[0]).filter((v, i, a) => a.indexOf(v) === i)
                pathName.forEach(k => {
                    paths[k] = []
                })
                const pathIndices: { [pathName: string]: [number, number, number] } = {}
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

                this.selectedSpecs = Object.values(paths).map((path, i) => ({
                    coordinates: path,
                    colour: COLOUR_SCHEME[i]
                }))
            }
        })
    }
}

