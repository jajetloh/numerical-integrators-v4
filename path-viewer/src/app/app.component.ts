import { Component } from '@angular/core'
import { COLOUR_SCHEME, TrajectorySpec } from "./path-viewer/path-viewer.component"
import { range } from "lodash-es"
import { Papa } from "ngx-papaparse"
import { HttpClient } from "@angular/common/http"
import { firstValueFrom, tap } from "rxjs"
import { MatDialog } from "@angular/material/dialog"
import { DataSelectionDialogComponent } from "./data-selection-dialog/data-selection-dialog.component"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'path-viewer'
    selectedSpecs: TrajectorySpec[] = []
    uploadedFileName = ''

    showLoading = false

    constructor(
        private papa: Papa,
        private http: HttpClient,
        private dialog: MatDialog,
    ) {
        this.selectThreeCircles()
    }

    openDialog() {
        const dialogRef = this.dialog.open(DataSelectionDialogComponent, {
            width: '80%',
            height: '80%',
            enterAnimationDuration: '200ms',
            exitAnimationDuration: '200ms',
        })
        dialogRef.afterClosed().subscribe(result => {
            if (typeof result === 'string') {
                this.showLoading = true
                firstValueFrom(this.http.get(result, { responseType: 'text' }))
                    .then(data => { this.parseFileAndStart(data) })
                    .finally(() => this.showLoading = false)
            }
        })
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
        const r = 0.5
        this.selectedSpecs = [
            {
                coordinates: range(n + 1).map(x => [r * Math.sin(2 * 2 * Math.PI * x / n), r * Math.cos(2 * 2 * Math.PI * x / n), 0])
            },
            {
                coordinates: range(n + 1).map(x => [0, r * Math.sin(2 * 2 * Math.PI * x / n), r * Math.cos(2 * 2 * Math.PI * x / n)])
            },
            {
                coordinates: range(n + 1).map(x => [r * Math.cos(2 * 2 * Math.PI * x / n), 0, r * Math.sin(2 * 2 * Math.PI * x / n)])
            },
            {
                coordinates: range(n + 1).map(x => [r * Math.sin(2 * 2 * Math.PI * x / n + Math.PI), r * Math.cos(2 * 2 * Math.PI * x / n + Math.PI), 0])
            },
            {
                coordinates: range(n + 1).map(x => [0, r * Math.sin(2 * 2 * Math.PI * x / n + Math.PI), r * Math.cos(2 * 2 * Math.PI * x / n + Math.PI)])
            },
            {
                coordinates: range(n + 1).map(x => [r * Math.cos(2 * 2 * Math.PI * x / n + Math.PI), 0, r * Math.sin(2 * 2 * Math.PI * x / n + Math.PI)])
            },
        ]
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

