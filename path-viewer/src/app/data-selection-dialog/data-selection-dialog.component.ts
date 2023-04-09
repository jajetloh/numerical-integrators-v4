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

    specialCasesList = [
        {
            name: '3-Body 2D - Broucke A 6',
            img: 'assets/3-Body 2D - Broucke A 6.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/3-Body%202D%20-%20Broucke%20A%206.csv'
            // http://three-body.ipb.ac.rs/bsol.php?id=5
        }
    ]

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
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20175.csv',
        },
        {
            name: 'Drop: -60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 174.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20174.csv',
        },
        {
            name: 'Drop: -30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 173.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20173.csv',
        },
        {
            name: 'Drop: 0 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 169.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20169.csv',
        },
        {
            name: 'Drop: +30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 170.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20170.csv',
        },
        {
            name: 'Drop: +60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 171.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20171.csv',
        },
        {
            name: 'Drop: +75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 172.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20172.csv',
        },
        {
            name: 'Backflip: -75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 178.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20178.csv',
        },
        {
            name: 'Backflip: -60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 177.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20177.csv',
        },
        {
            name: 'Backflip: -30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 176.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20176.csv',
        },
        {
            name: 'Backflip: 0 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 165.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20165.csv',
        },
        {
            name: 'Backflip: +30 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 166.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20166.csv',
        },
        {
            name: 'Backflip: +60 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 167.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20167.csv',
        },
        {
            name: 'Backflip: +75 degrees',
            img: 'assets/2-Body Spherical Pendulum - Case 168.png',
            url: 'https://raw.githubusercontent.com/jajetloh/numerical-integrators-v4/main/data/2-Spherical%20Pendulum%203D%20-%20Case%20168.csv',
        },
    ]

    columnsToShow = ['name', 'img', 'select']

    closeWithUrl(url: string) {
        this.dialogRef.close(url)
    }
}
