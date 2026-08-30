import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AddressRepositoryPort } from './features/client/addresses/domain/interfaces/address-repository.port';
import { AddressMockRepository } from './features/client/addresses/infrastructure/api/address-mock.repository';
import { AddressEffects } from './features/client/addresses/state/address.effects';
import { addressFeature } from './features/client/addresses/state/address.feature';
import { EmailRepositoryPort } from './features/client/emails/domain/interfaces/email-repository.port';
import { EmailMockRepository } from './features/client/emails/infrastructure/api/email-mock.repository';
import { EmailEffects } from './features/client/emails/state/email.effects';
import { emailFeature } from './features/client/emails/state/email.feature';
import { PersonalDataRepositoryPort } from './features/client/personal-data/domain/interfaces/personal-data-repository.port';
import { PersonalDataMockRepository } from './features/client/personal-data/infrastructure/api/personal-data-mock.repository';
import { PersonalDataEffects } from './features/client/personal-data/state/personal-data.effects';
import { personalDataFeature } from './features/client/personal-data/state/personal-data.feature';
import { PhoneRepositoryPort } from './features/client/phone/domain/interfaces/phone-repository.port';
import { PhoneMockRepository } from './features/client/phone/infrastructure/api/phone-mock.repository';
import { PhoneEffects } from './features/client/phone/state/phone.effects';
import { phoneFeature } from './features/client/phone/state/phone.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState(personalDataFeature),
    provideState(emailFeature),
    provideState(addressFeature),
    provideState(phoneFeature),
    provideEffects(PersonalDataEffects, EmailEffects, AddressEffects, PhoneEffects),
    {
      provide: PersonalDataRepositoryPort,
      useClass: PersonalDataMockRepository,
    },
    {
      provide: EmailRepositoryPort,
      useClass: EmailMockRepository,
    },
    {
      provide: AddressRepositoryPort,
      useClass: AddressMockRepository,
    },
    {
      provide: PhoneRepositoryPort,
      useClass: PhoneMockRepository,
    },
  ],
};
