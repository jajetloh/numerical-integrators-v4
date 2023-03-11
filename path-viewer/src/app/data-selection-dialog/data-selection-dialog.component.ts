import { Component } from '@angular/core'
import { DialogRef } from "@angular/cdk/dialog"
import { MatDialogRef } from "@angular/material/dialog"

@Component({
    selector: 'app-data-selection-dialog',
    templateUrl: './data-selection-dialog.component.html',
    styleUrls: ['./data-selection-dialog.component.scss']
})
export class DataSelectionDialogComponent {

    constructor(
        private dialogRef: MatDialogRef<DataSelectionDialogComponent>
    ) {
    }
    dataList = [
        {
            name: '4-Body 3D - Case 7',
            img: 'assets/4-Body 3D - Case 7.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%207.csv',
        },
        {
            name: '4-Body 3D - Case 9',
            img: 'assets/4-Body 3D - Case 9.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%209.csv',
        },
        {
            name: '4-Body 3D - Case 61',
            img: 'assets/4-Body 3D - Case 61.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%2061.csv',
        },
    ]

    columnsToShow = ['name', 'img', 'select']

    closeWithUrl(url: string) {
        this.dialogRef.close(url)
    }
}
