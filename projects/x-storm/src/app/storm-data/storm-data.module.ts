import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StormDataService } from './storm-data.service';

export * from './storm-model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StormDataModule {
  constructor(@Optional() @SkipSelf() parentModule?: StormDataModule) {
    if (parentModule) {
      throw new Error(
        'StormDataModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<StormDataModule> {
    return {
      ngModule: StormDataModule,
      providers: [StormDataService]
    };
  }
}
