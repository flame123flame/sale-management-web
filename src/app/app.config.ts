import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideNzI18n, en_US } from "ng-zorro-antd/i18n";
import { provideNzIcons } from "ng-zorro-antd/icon";
import { routes } from "./app.routes";
import { provideAnimations } from '@angular/platform-browser/animations';
import { icons } from "./icons-provider";
import { authInterceptorFn } from "./core/intercetor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
     provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),

   provideHttpClient(
      withInterceptors([authInterceptorFn])   // ✅ ผ่านแน่นอน
    )
  ]
};
