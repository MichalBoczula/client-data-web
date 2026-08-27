# AGENTS.md — Client Management Panel

## 1. Purpose, scope and interpretation

Build a working Angular Client Management Panel POC for viewing and editing client information **inside the existing repository**, using mocks only. Prepare for replacing mocks with real HTTP/API repositories without changing presentation, application/business logic or NgRx consumers. Do not implement the real integration yet.

This consolidates the requirements, examples, Architecture Rules, plan and individual Task 1–8 prompts from `Master promp.docx`. Repeated rules apply to every relevant task. Only the Word table of contents, pagination and decorative separators are omitted. Inspect the repository before choosing exact filenames/providers from the examples.

### Resolve source naming differences consistently

- The master uses `address/`, `environment.api.client.address` and `/api/client/address`; the later plan/rules/tasks use **`addresses/`, `environment.api.client.addresses` and `/api/client/addresses`**. Use the later plural naming for the new feature; do not create both variants.
- Singular `address`, `AddressResponse`, `AddressMockRepository`, `AddressRepositoryPort`, `address-repository.port.ts` and equivalent facade/action/mapper names remain valid. One address value suffices; a plural folder does not require a collection.
- Use **`emails/`**, also called “Email” in the source. One email suffices; singular Email model/repository/facade names are valid.
- Preserve different established repository naming if present; explain the decision and keep folders, imports, providers and environment keys consistent. Do not rename existing concepts unnecessarily.
- Execute the broad application request through the eight approved tasks. “Task N” means **Task N only**; it does not authorize all eight tasks in one run.
- The referenced Material documentation screenshot is not embedded in the Word. Follow the explicit layout requirements; do not invent missing visual details or clone documentation pixel-for-pixel.

## 2. Inspect first; preserve the repository

Before writing implementation code, inspect:

- `package.json`, installed Angular, NgRx, Angular Material and Angular CDK versions, dependencies and available scripts.
- Existing folder structure and feature architecture, particularly `features/cart/`.
- At least one existing facade, repository port, concrete repository, mapper, actions file, Effects implementation and feature state/reducer/selectors (`createFeature` where used).
- `app.config.ts`, `app.routes.ts`, environment files, repository DI bindings, global/route-level providers and NgRx registration.
- Existing `core/layout/`, component naming, separate template/style conventions, routing and standalone API usage.

Then provide a **short implementation plan and proposed Client directory tree before implementing**. For each later task, inspect the relevant existing code again before making changes.

Use installed Angular, TypeScript, RxJS, NgRx Store/Actions/Effects/state/reducers/selectors, Material, CDK, Router, Reactive Forms and SCSS; standalone APIs where already used. Add missing dependencies, but avoid unnecessary upgrades/configuration changes. Use version-compatible APIs, not deprecated NgRx APIs.

Existing feature-oriented layered conventions beat generic Angular recommendations unless clearly broken or version-incompatible. Do not redesign the project or copy another project's Clean Architecture template. Explain necessary deviations; never silently bypass architecture.

### Existing cart feature reference

Inspect these examples in their actual repository context; they are reference patterns, not new Client files to create:

| Layer under `features/cart/` | Example paths |
| --- | --- |
| Application | `application/orders.facade.ts` |
| Domain port | `domain/interfaces/orders-repository.port.ts` |
| Domain responses | `domain/model/shopping-cart-line-response.model.ts`, `domain/model/shopping-cart-response.model.ts` |
| Domain update models | `domain/model/update-shopping-cart/shopping-cart-line-request.model.ts`, `domain/model/update-shopping-cart/update-shopping-cart-command.model.ts`, `domain/model/update-shopping-cart/update-shopping-cart-request.model.ts` |
| Infrastructure | `infrastructure/api/orders-kiota-repository.ts`, `infrastructure/api-clients/`, `infrastructure/mappers/orders.mapper.ts` |
| Presentation | `presentation/shopping-cart/shopping-cart.ts`, `shopping-cart.html`, `shopping-cart.scss`, `shopping-cart.spec.ts` in the same directory |
| State | `state/orders.actions.ts`, `state/orders.effects.ts`, `state/orders.feature.ts` |

## 3. Feature ownership and target structure

Create a parent area at `src/app/features/client/` with **four independent business features**:

| Feature folder | Owns | Displayed in |
| --- | --- | --- |
| `personal-data/` | `firstName`, `lastName` | Personal Data section/page |
| `addresses/` | `address` | Personal Data section/page, through composition |
| `emails/` | `email` | Contact Data section/page, through composition |
| `phone/` | `phone` | Contact Data section/page, through composition |

Every feature owns `application/`, `domain/`, `infrastructure/`, `presentation/`, `state/`: facade, models, port, repository, mapper, UI and NgRx state. Never merge them into one Client feature/repository/reducer/state.

Personal Data composes Address presentation without storing/duplicating its value or business logic. Contact Data composes Email + Phone UI; create no Contact Data domain/state/repository without a real independent domain requirement. Use e.g. `presentation/contact-data/` or appropriate Client composition folders, not artificial abstractions for folder symmetry.

### Personal Data path pattern

Use equivalent structures for Addresses, Emails and Phone. Adapt exact filenames to the conventions discovered in the repository.

| Responsibility | Path under `src/app/features/client/personal-data/` |
| --- | --- |
| Facade | `application/personal-data.facade.ts` |
| Repository port | `domain/interfaces/personal-data-repository.port.ts` |
| Response model | `domain/model/personal-data-response.model.ts` |
| Update command | `domain/model/update-personal-data/update-personal-data-command.model.ts` |
| Update request, where appropriate | `domain/model/update-personal-data/update-personal-data-request.model.ts` |
| Mock implementation | `infrastructure/api/personal-data-mock.repository.ts` |
| Future clients | `infrastructure/api-clients/` |
| Mapper | `infrastructure/mappers/personal-data.mapper.ts` |
| Component | `presentation/personal-data/personal-data.ts` |
| Template | `presentation/personal-data/personal-data.html` |
| Styles | `presentation/personal-data/personal-data.scss` |
| Component test, consistent with repository | `presentation/personal-data/personal-data.spec.ts` |
| Actions | `state/personal-data.actions.ts` |
| Effects | `state/personal-data.effects.ts` |
| Feature/reducer/selectors | `state/personal-data.feature.ts` |

Use analogous feature names, e.g. `address-repository.port.ts`. Do not introduce `personal-data.component.ts` when the project uses `personal-data.ts`; follow the cart naming examples in section 2.

## 4. Layer contracts and dependency direction

### 4.1 Application: facade

The facade is presentation's public API: expose selector data/loading/error, dispatch NgRx actions and hide Store details. Presentation uses the facade rather than Store directly. Do not skip it or put API logic in it.

Conceptual facade API (adapt names to existing patterns):

```typescript
load(): void;
update(command: UpdatePersonalDataCommand): void;
data$: Observable<PersonalDataResponse | null>;
loading$: Observable<boolean>;
error$: Observable<string | null>;
```

### 4.2 Domain: contracts, models and ports

Keep contracts in `domain/interfaces/`, models in `domain/model/`. Domain must not depend on Material, UI, NgRx, HTTP/API clients or infrastructure implementations. Each feature defines its own port; business/application/state code depend on it, not concrete repositories.

Example abstract-class DI port; an equivalent established injection-token pattern is acceptable:

```typescript
export abstract class PersonalDataRepositoryPort {
  abstract get(): Observable<PersonalDataResponse>;
  abstract update(
    command: UpdatePersonalDataCommand
  ): Observable<PersonalDataResponse>;
}
```

Separate models by responsibility:

- **Response**: data received by the feature.
- **Command**: business intent initiated by the application.
- **Request**: data sent to API/repository infrastructure.

Do not assume command/request/response are identical. Preserve useful boundaries and repository-required request models. These examples happen to share Personal Data fields:

```typescript
export interface PersonalDataResponse {
  firstName: string;
  lastName: string;
}

export interface UpdatePersonalDataCommand {
  firstName: string;
  lastName: string;
}

export interface UpdatePersonalDataRequest {
  firstName: string;
  lastName: string;
}

export interface AddressResponse {
  address: string;
}

export interface EmailResponse {
  email: string;
}

export interface PhoneResponse {
  phone: string;
}
```

### 4.3 Infrastructure: repository, future clients and mappers

- `infrastructure/api/` holds port implementations: `PersonalDataMockRepository`, `AddressMockRepository`, `EmailMockRepository`, `PhoneMockRepository` (or repository-consistent equivalents).
- Make them injectable and bind through DI. Conceptually: `@Injectable()` on `PersonalDataMockRepository implements PersonalDataRepositoryPort`; implement its methods.
- Return **RxJS Observables**, load/update and simulate async API latency, not plain synchronous objects. Example: `return of(data).pipe(delay(300));` (or `of(mockData).pipe(delay(300))`). In-memory values may persist for the application session.
- Reserve `infrastructure/api-clients/` for future generated/manual clients, e.g. `personal-data-api.client.ts` / `PersonalDataApiClient` used by `PersonalDataApiRepository`. No real client/backend now.
- `infrastructure/mappers/`, e.g. `personal-data.mapper.ts`, maps **API DTO → Domain Response Model** and **Domain Command → API Request Model** where appropriate. Examples: `PersonalDataMapper.fromApi(...)`, `PersonalDataMapper.toUpdateRequest(...)`.
- No backend mapping/infrastructure/repository logic in components. Effects orchestrate repository calls, not API implementation or mapping.

Example mock values from the specification (distribute them across independent feature repositories, not one combined Client state):

```typescript
{
  firstName: 'John',
  lastName: 'Doe',
  address: '221B Baker Street, London',
  email: 'john.doe@example.com',
  phone: '+44 123 456 789'
}
```

### 4.4 Presentation: UI and form state

Presentation displays data, manages reactive form state, handles user interaction, calls the application facade and subscribes to/uses its observable state. Render simple loading and error states.

Every presentation component must use separate TypeScript, HTML and SCSS files (`feature.ts`, `feature.html`, `feature.scss`). Do not use inline templates (`template`) or inline `styles: [...]`. Add the component test file when consistent with the repository.

Presentation must not call repositories or API clients, inject concrete repositories, map backend DTOs, contain Effects or infrastructure logic, or put business logic in templates.

### 4.5 State: actions, reducers, selectors and Effects

Each feature owns `feature.actions.ts`, `feature.effects.ts`, `feature.feature.ts`, following existing naming and `createFeature`/`createReducer` conventions. Expose generated selectors where supported; do not add unnecessary selector files.

Use explicit typed actions and payloads; do not use `any`. For every feature support:

- Load, load success and load failure.
- Update, update success and update failure.

Example action names: `loadPersonalData`, `loadPersonalDataSuccess`, `loadPersonalDataFailure`, `updatePersonalData`, `updatePersonalDataSuccess`, `updatePersonalDataFailure`. The generic `load`/`loadSuccess`/`loadFailure` and `update`/`updateSuccess`/`updateFailure` names in the source describe these same operations.

Minimum state shape, with analogous types for each feature:

```typescript
export interface PersonalDataState {
  data: PersonalDataResponse | null;
  loading: boolean;
  error: string | null;
}
```

Conceptual definition: `createFeature({ name: 'personalData', reducer: createReducer(...) })`; implement the actual reducer and full load/update success/failure lifecycle. Keep loading/errors simple, without overengineering global handling.

Effects call repositories asynchronously and emit success/failure actions. Inject the **port**, e.g. `private readonly repository = inject(PersonalDataRepositoryPort)`, or established token; DI resolves the implementation. Do not inject `PersonalDataMockRepository` directly when using ports.

### 4.6 Required flow and dependency boundaries

Load/write request flow:

`UI Component → Application Facade → NgRx Action → NgRx Effect → Domain Repository Port → Angular DI → Infrastructure Repository → Mapper → Mock/API client`

The final mock/API-client step describes the implementation boundary: the POC uses mock data; a real client is future work. A mapper transforms data where appropriate.

Response flow:

`Repository → Effect → Success Action → Feature Reducer/State → Selector → Facade → UI Component`

Dependencies point inward to abstractions: `presentation → application → state/domain → repository port`; infrastructure implements domain abstractions. Preserve these directions. Do not introduce `domain → infrastructure`, `presentation → infrastructure/repository/API client`, or `effect → concrete repository` shortcuts. Respect the project's existing port/DI mechanism; if a convention conflicts with the mandatory boundaries, identify and explain the conflict rather than silently redesigning or bypassing them.

## 5. DI, NgRx, Material and environment registration

Repository Pattern is mandatory. Bind **all four** concrete mock repositories to their domain ports using the existing Angular dependency-injection convention. Example provider:

```typescript
{
  provide: PersonalDataRepositoryPort,
  useClass: PersonalDataMockRepository
}
```

The intended later substitution is:

```typescript
{
  provide: PersonalDataRepositoryPort,
  useClass: PersonalDataApiRepository
}
```

For all four features, the future DI swap must leave presentation, business logic, facade, Effects, actions, reducers, state and selectors unchanged.

Inspect `app.config.ts`; register application/router/repository/state/Effect providers using installed-version conventions: `provideRouter(...)`, `provideStore(...)`, `provideState(...)`, `provideEffects(...)`. Use route-level providers where established, not indiscriminate globals. Complete DI/NgRx registration within each feature task.

Import only used Material dependencies locally in standalone components, not all modules globally in `app.config.ts`. Example:

```typescript
imports: [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
]
```

Adapt imports to the installed Angular Material version and actual component usage.

### Future API configuration

Keep future API URLs in the structured environment object even though the POC uses mocks. Use the later plural Addresses convention described in section 1:

```typescript
export const environment = {
  production: false,
  api: {
    client: {
      personalData: '/api/client/personal-data',
      addresses: '/api/client/addresses',
      emails: '/api/client/emails',
      phone: '/api/client/phone'
    }
  }
};
```

Follow existing environment-file conventions. Do not hardcode API URLs in presentation, facades, Effects or repositories. Future API clients consume environment URLs. The source's earlier `address: '/api/client/address'` is the naming variant reconciled in section 1, not an additional endpoint to implement.

## 6. Core shell, visual behavior and routing

Place the shell in the existing `src/app/core/layout/` structure. Expected filenames, subject to repository naming conventions:

- `main-layout.container.ts`
- `main-layout.container.html`
- `main-layout.container.scss`

MainLayout owns left navigation, toolbar/navigation area, content, responsive presentation and feature-page composition, never Client business logic. A toolbar cannot replace the laptop sidebar.

Use a clean administrative/client panel, structurally inspired by Material documentation. Suitable elements: `mat-sidenav-container`, `mat-sidenav`, `mat-nav-list`, `mat-list-item`, `mat-card`, `mat-form-field`, `matInput` (source: `mat-input`), `mat-icon`, `mat-button`, `mat-icon-button`, `mat-divider`. Use correct installed-version APIs.

The left navigation contains **Personal Data** and **Contact Data** and remains available on desktop and normal laptop screens.

| Viewport mode | Navigation | Content | Composition/routing |
| --- | --- | --- | --- |
| Wide desktop | Visible left sidebar | Personal Data and Contact Data visible simultaneously, side by side | Two-column CSS Grid; compose shared Personal Data and Contact Data sections on one page |
| Laptop / smaller application viewport | Left sidebar remains visible; never move main navigation to the top | Exactly one main content page at a time | Angular Router and router outlet (or equivalent routed composition point) |
| Very narrow mobile, optional | Sidenav may collapse to overlay/drawer | Narrow-screen adaptation | Secondary to correct laptop behavior; use Material responsive sidenav modes where appropriate |

“Smaller screen” includes laptops, not only handsets: change the **content grid**, retaining the sidebar. Use CDK `BreakpointObserver` or an appropriate Angular-native equivalent. Explain a UI-based desktop/laptop breakpoint, not blindly Material handset breakpoints. Avoid `window.innerWidth` unless technically necessary with no reasonable Angular-native alternative.

Required routes:

| Navigation item | Route | Composed content |
| --- | --- | --- |
| Personal Data | `/client/personal-data` | Personal Data feature: First Name, Last Name; independent Addresses feature: Address |
| Contact Data | `/client/contact-data` | Independent Emails feature: Email; independent Phone feature: Phone |

Routing selects the single-content page; show active navigation where appropriate. Desktop composes `PersonalDataComponent + ContactDataComposition`; laptop routes to `PersonalDataPage` or `ContactDataPage`. Reuse business components; containers may differ. No `DesktopPersonalDataComponent`/`LaptopPersonalDataComponent` split or desktop/mobile feature duplication.

## 7. Forms and per-feature requirements

Use Angular Reactive Forms, Angular Material form controls, `mat-form-field` and `matInput`. Display validation errors.

| Feature | POC form/data | Validation |
| --- | --- | --- |
| Personal Data | First Name and Last Name | Both required |
| Addresses | One address value is sufficient; composed into Personal Data page | Optional or required according to existing conventions; explain the choice |
| Emails | One email value is sufficient; folder remains `emails/` | Required and Angular email validation |
| Phone | Phone value | Required |

Every feature implements section 4 and the shared Tasks 3–6 checklist: complete layers, models, facade/port, asynchronous mock load/update, loading/errors and all DI/NgRx/Material/Reactive Forms registrations.

## 8. Constraints: what not to introduce

Do not:

- Combine Personal Data, Addresses, Emails and Phone business layers, state or reducers; duplicate Address data in Personal Data; invent a Contact Data business domain solely for composition.
- Inject concrete repositories/API clients into components or use repositories directly from presentation.
- Skip facades, NgRx actions or Effects; put API implementation logic in facades/Effects; put backend DTO mappings in components; put business logic in templates.
- Create inline templates/styles or use `any`.
- Create a backend, real API integration, authentication or a database for this POC.
- Introduce another state library, replace NgRx with Signals state or Signals-only state, or rewrite the repository architecture.
- Create unnecessary generic base repositories, base facades, CRUD frameworks or form abstractions. Avoid `BaseRepository<T>`, `BaseFacade<T>`, `GenericCrudState<T>` and `AbstractFormComponent<T>` unless equivalent abstractions already exist in the repository. Prefer explicit feature-specific code.
- Duplicate desktop/laptop/mobile business feature implementations, move laptop navigation to the top, or optimize handset behavior at the expense of the laptop layout.
- Introduce inconsistent naming, upgrade packages or replace working configuration without a justified need.

Architecture boundaries remain mandatory even in a POC; avoid overengineering within them.

## 9. Task execution protocol

Read this entire specification first. Work **task by task**, in order. An individual Task N prompt authorizes only that task. Do not implement the whole application at once.

For every task:

1. Inspect relevant existing code and follow repository conventions.
2. Give the short implementation plan/proposed tree before implementation; respect pending approvals and implement only the requested scope.
3. Create/modify files yourself. Do not merely describe code or ask the user to create files you can create.
4. Run relevant checks and fix errors caused by your changes. Do not defer registrations or known build errors to later tasks.
5. Summarize changes, list created/modified files, report verification results and assumptions, plus the task-specific outputs below.
6. **Stop and wait for approval before the next task.** Continue only if explicitly requested. Completion requires compilation and the requested architecture; report blocked checks instead of claiming success.

### Shared mandatory checklist for Tasks 3–6

Every feature task is a complete independent vertical slice; the following checklist is part of **each** task, not deferred work:

- All five layers; application facade; domain models including response/update command and request where appropriate; repository port; mapper; asynchronous mock repository; actions; Effects; feature state/reducer/selectors; presentation and Reactive Form.
- Facade exposes data/loading/error and dispatches load/update actions. Presentation uses the facade; Effects use the domain port. The mock implements the port, returns RxJS Observables, simulates latency and supports load/update.
- Register repository DI bindings, NgRx state/Effects, application providers and used Material/Reactive Forms dependencies now. Reserve future API-client folders where required; do not implement real clients.
- Separate TypeScript/HTML/SCSS; tests consistent with repository conventions; Material form controls; visible validation/loading/errors; typed payloads and both load/update success/failure paths.
- **Definition of Done:** facade/port/models/mapper/mock/actions/Effects/state/UI implemented; facade uses NgRx; Effects use the port; mock bound through DI; state/Effects registered; mocked load/update work; required validation and loading/error states work; build succeeds. Verify both request and response flows from section 4.6.
- Report the feature's final directory tree, created/modified files, DI and NgRx registrations, requested flow explanations and build result. Stop for approval.

### Task 1 — Project inspection, folder structure and packages

**Scope:** inspection and preparation only; no business features/logic.

- Perform the full section 2 inspection: versions, architecture, `cart`, facade, port, repository, mapper, actions, Effects, feature state, configuration, environments and Core layout.
- Identify missing Angular, RxJS, NgRx Store/Effects, Material, CDK, Router and Reactive Forms dependencies. Avoid unnecessary upgrades/configuration replacement.
- Prepare `src/app/features/client/{personal-data,addresses,emails,phone}/`, each with `application/`, `domain/`, `infrastructure/`, `presentation/`, `state/`. Prepare required Client presentation/composition folders without logic.
- Report detected architecture/versions, proposed/final tree, missing/added packages and assumptions. Run build if possible/appropriate; report result or blocker.

**Gate:** stop for approval; do not start Task 2.

### Task 2 — MainLayout and responsive shell

**Scope:** shell/composition/navigation only; no Client business features/logic.

- Use existing Core layout/naming and separate files. Implement Material sidenav, left navigation (Personal Data/Contact Data), content area and router outlet/equivalent routed composition point.
- Implement section 6: two desktop content columns, one routed laptop page, visible laptop sidebar; optional very-narrow-mobile overlay. Do not move laptop navigation to the top.
- Use `BreakpointObserver` or appropriate Angular-native mechanism. Explain the breakpoint and justify any technically necessary direct viewport access.
- List created/modified files, verify Material imports and run build.

**Gate:** stop for approval; do not start Task 3.

### Task 3 — Personal Data full vertical slice

Implement the entire shared Tasks 3–6 checklist for `personal-data/`.

- Own **only `firstName` and `lastName`**. Address remains independent and must not enter Personal Data state.
- Use the section 4 domain examples, port `get()`/`update(command)` operations, response/update command and request where appropriate; reserve future client folder where required.
- Both First Name and Last Name are required.
- Additionally report the dependency/request/response flow. Show Personal Data tree, DI/NgRx registrations and build result as required by the shared checklist.

**Gate:** stop for approval; do not start Task 4.

### Task 4 — Emails full vertical slice

Implement the entire shared Tasks 3–6 checklist for independent `emails/`, owning **`email`**; one value suffices.

- Effects depend on the Email port, not the concrete mock.
- Validate required email using Angular email validation.
- Show Email tree, created/modified files, explain DI binding and NgRx registration, and report build result.

**Gate:** stop for approval; do not start Task 5.

### Task 5 — Addresses full vertical slice

Implement the entire shared Tasks 3–6 checklist for independent `addresses/`, owning **`address`**; one value suffices.

- Keep Address state, domain, repository and application logic separate from Personal Data. Compose presentation later; never duplicate the value in Personal Data state.
- Include Address response, update command and request where appropriate; Effects depend on the Address port. Apply existing optional/required address validation convention.
- Show Addresses tree, explain independence from Personal Data, list DI/NgRx registrations and report build result.

**Gate:** stop for approval; do not start Task 6.

### Task 6 — Phone full vertical slice

Implement the entire shared Tasks 3–6 checklist for independent `phone/`, owning **`phone`**.

- Effects use Phone port; DI resolves the concrete repository.
- Phone is required.
- Show Phone tree, created/modified files, explain DI binding and NgRx flow, and report build result.

**Gate:** stop for approval; do not start Task 7.

### Task 7 — Client composition and routing

**Scope:** connect completed features into Client UI; do not merge business layers.

- Personal Data page composes Personal Data + Addresses: First Name, Last Name, Address; no duplicate Address state.
- Contact Data page composes Emails + Phone; no Contact Data state/repository without a real independent domain.
- Add `/client/personal-data` and `/client/contact-data`; wire left navigation in single-content mode and active state where appropriate.
- Wide desktop: both sections side by side in two columns. Laptop: left navigation remains visible, one routed page. Reuse the same feature components; no desktop/laptop duplicates.
- Report final composition structure, created/modified files, routes and desktop versus laptop routed composition. Verify navigation and run build.

**Gate:** stop for approval; do not start Task 8.

### Task 8 — Final integration and verification

**Scope:** integration review/corrections; continue using mocks, no real API.

- Check `app.config.ts`, `app.routes.ts`, router, layout, Client composition, navigation and responsive behavior.
- Check application/repository providers, NgRx Store/features/Effects, Material imports/dependencies and Reactive Forms imports/dependencies.
- Ensure future environment URLs for `personalData`, `addresses`, `emails`, `phone` (section 5).
- Separately verify request/response flows for all four features. Check invalid Presentation → Repository/API client, Effect → Concrete Repository and Domain → Infrastructure dependencies. Follow existing port/token conventions; explain conflicts rather than silently waiving boundaries.
- Run all section 10 checks and fix implementation-caused TypeScript/Angular compiler errors, missing providers, DI errors, missing state/Effect registration, routing/Material import errors and circular dependencies.
- Deliver all section 11 outputs, including remaining assumptions/limitations. Do not continue into backend work or invent another task.

## 10. Verification and completion criteria

After each implementation task run the relevant build/checks and fix errors caused by that task. The master specification's setup/build commands are:

```bash
npm install
npm run build
```

Run the available project checks, including these where configured:

```bash
npm test
npm run lint
```

Use actual `package.json` scripts/conventions. Task 8 requires build; test/lint depend on availability. Report blocked/unavailable commands. Leave no known build errors; never call unrun checks successful or substitute commentary for implementation.

Check explicitly:

- TypeScript and Angular compilation; no missing providers, DI failures or repository bindings.
- All four independent NgRx feature states and their Effects are registered.
- Required Material and Reactive Forms imports are present and correctly scoped.
- Routes, navigation, desktop two-column composition, laptop single-page composition and persistent laptop sidebar work.
- Each feature can load/update mocks, displays loading/errors and enforces its validation requirements.
- For **each** of Personal Data, Addresses, Emails and Phone: presentation → facade → NgRx action → Effect → repository port → DI → mock repository, and the return path through success action/reducer/selectors/facade.
- No invalid outward/cross-layer dependency or circular dependency introduced by the changes; real API replacement remains an infrastructure/DI concern.

The resulting architecture is a Core Layout with left navigation and responsive content shell, plus four separate features, each containing application facade, domain models/port, infrastructure repository/mapper, presentation and NgRx state.

## 11. Required implementation reports

At each task boundary report its requested outputs, summarize changes, list created/modified files, give verification results and assumptions, then wait for approval before the next task.

After Task 8 / completed implementation provide:

1. Summary of implemented functionality.
2. Final Client feature directory tree and composition structure.
3. List of created facades.
4. List of repository ports and concrete mock repositories.
5. DI bindings and how they resolve ports to implementations.
6. NgRx feature/state and Effect registrations.
7. Explanation of NgRx and repository data flow, including the response path.
8. Explanation of wide desktop versus laptop layout and component reuse.
9. Routes and navigation behavior.
10. Environment API configuration.
11. Commands required to install/run the project, based on actual project scripts.
12. Build, test and lint results, distinguishing success, failure, unavailable and not run.
13. Assumptions, remaining limitations and any necessary convention/naming decisions.

The repository must contain the working implementation; a description alone is not completion.
