import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { PathViewerComponent } from './path-viewer/path-viewer.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@NgModule({
    declarations: [
        AppComponent,
        PathViewerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
