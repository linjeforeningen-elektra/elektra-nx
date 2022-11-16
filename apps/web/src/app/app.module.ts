import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebShellModule } from '@elektra-nx/web/shell/feature';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { AppRoutingModule } from './app-routing.module';
// import { LayoutModule } from '@elektra-nx/web-shell-ui-layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    WebShellModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    // LayoutModule,
    // AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
