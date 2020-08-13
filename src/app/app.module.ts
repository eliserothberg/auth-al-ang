import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CoreModule, TRANSLATION_PROVIDER, TranslateLoaderService, MaterialModule} from '@alfresco/adf-core';
import { ContentModule } from '@alfresco/adf-content-services';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


import { appRoutes } from './app.routes';
import { PreviewService } from './_services/preview.service';
import { FileViewComponent } from './file-view/file-view.component';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './_helpers';
import {AdminComponent} from './admin/admin.component';
import { DatatableComponent } from './datatable/datatable.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// Localization
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localeEs from '@angular/common/locales/es';
import localeJa from '@angular/common/locales/ja';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import localeNb from '@angular/common/locales/nb';
import localeRu from '@angular/common/locales/ru';
import localeCh from '@angular/common/locales/zh';
import localeAr from '@angular/common/locales/ar';
import localeCs from '@angular/common/locales/cs';
import localePl from '@angular/common/locales/pl';
import localeFi from '@angular/common/locales/fi';
import localeDa from '@angular/common/locales/da';
import localeSv from '@angular/common/locales/sv';
import { TooltipDirective } from './_directives/tooltip.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatBadgeModule} from '@angular/material/badge';

registerLocaleData(localeFr);
registerLocaleData(localeDe);
registerLocaleData(localeIt);
registerLocaleData(localeEs);
registerLocaleData(localeJa);
registerLocaleData(localeNl);
registerLocaleData(localePt);
registerLocaleData(localeNb);
registerLocaleData(localeRu);
registerLocaleData(localeCh);
registerLocaleData(localeAr);
registerLocaleData(localeCs);
registerLocaleData(localePl);
registerLocaleData(localeFi);
registerLocaleData(localeDa);
registerLocaleData(localeSv);

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatBadgeModule,
        RouterModule.forRoot(
            appRoutes // ,
            // { enableTracing: true } // <-- debugging purposes only
        ),

        // ADF modules
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
    ],
    declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      DocumentlistComponent,
      AppLayoutComponent,
      FileViewComponent,
      AdminComponent,
      DatatableComponent,
      TooltipDirective,
    ],
    providers: [
        PreviewService,
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'app',
                source: 'resources'
            }
        },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
