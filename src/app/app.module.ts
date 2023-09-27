import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, tap } from 'rxjs';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { initializeAppFactory, jwtOptionsFactory } from './core/services/utilities/utilities.service';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { TokenService } from './core/services/token/token.service';
import { RoleService } from './modules/authorization/services/role.service';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxPermissionsModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [TokenService, RoleService, NgxPermissionsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
