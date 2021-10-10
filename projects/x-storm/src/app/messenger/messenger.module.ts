import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengeCenterService } from './messenge-center.service';

export * from './message-model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class MessengerModule {
  constructor(@Optional() @SkipSelf() parentModule?: MessengerModule) {
    if (parentModule) {
      throw new Error(
        'MessengerModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<MessengerModule> {
    return {
      ngModule: MessengerModule,
      providers: [MessengeCenterService]
    };
  }
}
