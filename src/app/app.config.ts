import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { EmailRepositoryPort } from './features/client/emails/domain/interfaces/email-repository.port';
import { EmailMockRepository } from './features/client/emails/infrastructure/api/email-mock.repository';
import { EmailEffects } from './features/client/emails/state/email.effects';
import { emailFeature } from './features/client/emails/state/email.feature';
import { PersonalDataRepositoryPort } from './features/client/personal-data/domain/interfaces/personal-data-repository.port';
import { PersonalDataMockRepository } from './features/client/personal-data/infrastructure/api/personal-data-mock.repository';
import { PersonalDataEffects } from './features/client/personal-data/state/personal-data.effects';
import { personalDataFeature } from './features/client/personal-data/state/personal-data.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState(personalDataFeature),
    provideState(emailFeature),
    provideEffects(PersonalDataEffects, EmailEffects),
    {
      provide: PersonalDataRepositoryPort,
      useClass: PersonalDataMockRepository,
    },
    {
      provide: EmailRepositoryPort,
      useClass: EmailMockRepository,
    },
  ],
};
