// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRGJGfV5ycEVHYVZRTHxcQE0DNHVRdkdnWH5fcXZWRmhfUk1zV0E=');
