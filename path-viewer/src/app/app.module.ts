import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { PathViewerComponent } from './path-viewer/path-viewer.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from "@angular/material/dialog";
import { DataSelectionDialogComponent } from './data-selection-dialog/data-selection-dialog.component'
import { MatTableModule } from "@angular/material/table"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatButtonModule } from "@angular/material/button"

@NgModule({
    declarations: [
        AppComponent,
        PathViewerComponent,
        DataSelectionDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
