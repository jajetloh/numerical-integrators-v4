import { Component } from '@angular/core'
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

    nBodyCasesList = [
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
            name: '4-Body 3D - Case 15',
            img: 'assets/4-Body 3D - Case 15.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%2015.csv',
        },
        {
            name: '4-Body 3D - Case 16',
            img: 'assets/4-Body 3D - Case 16.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%2016.csv',
        },
        {
            name: '4-Body 3D - Case 61',
            img: 'assets/4-Body 3D - Case 61.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/4-Body%203D%20-%20Case%2061.csv',
        },
    ]

    pendulumsCaseList = [
        {
            name: 'Drop: -75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 175.png',
            url: '',
        },
        {
            name: 'Drop: -60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 174.png',
            url: '',
        },
        {
            name: 'Drop: -30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 173.png',
            url: '',
        },
        {
            name: 'Drop: 0 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 169.png',
            url: '',
        },
        {
            name: 'Drop: +30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 170.png',
            url: '',
        },
        {
            name: 'Drop: +60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 171.png',
            url: '',
        },
        {
            name: 'Drop: +75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 172.png',
            url: '',
        },
        {
            name: 'Backflip: -75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 178.png',
            url: '',
        },
        {
            name: 'Backflip: -60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 177.png',
            url: '',
        },
        {
            name: 'Backflip: -30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 176.png',
            url: '',
        },
        {
            name: 'Backflip: 0 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 165.png',
            url: '',
        },
        {
            name: 'Backflip: +30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 166.png',
            url: '',
        },
        {
            name: 'Backflip: +60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 167.png',
            url: '',
        },
        {
            name: 'Backflip: +75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 168.png',
            url: '',
        },
    ]

    columnsToShow = ['name', 'img', 'select']

    closeWithUrl(url: string) {
        this.dialogRef.close(url)
    }
}
