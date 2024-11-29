import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{MatCardModule} from '@angular/material/card'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule,MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
export function scrollStrategyFactory(overlay: Overlay) {
  return overlay.scrollStrategies.block();
}
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    OverlayModule,
    MatDatepickerModule,

  ],
  providers: [{ provide: MAT_DATEPICKER_SCROLL_STRATEGY, useFactory: scrollStrategyFactory, deps: [Overlay] },],
  bootstrap: [AppComponent]
})
export class AppModule { }
