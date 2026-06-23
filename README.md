# @capgo/capacitor-stripe-identity

<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-stripe-identity" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2>
    <a href="https://capgo.app/?ref=plugin_stripe_identity"> ➡️ Get Instant updates for your App with Capgo</a>
  </h2>
  <h2>
    <a href="https://capgo.app/consulting/?ref=plugin_stripe_identity"> Missing a feature? We'll build the plugin for you 💪</a>
  </h2>
</div>

Capacitor plugin for Stripe Identity — verify users with document and selfie checks using Stripe's native verification sheet on iOS and Android.

## Documentation

The most complete documentation is available here: https://capgo.app/docs/plugins/stripe-identity/

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.*.*         | v8.*.*                  | ✅         |
| v7.*.*         | v7.*.*                  | On demand  |

> **Note:** The major version of this plugin follows the major version of Capacitor. Use the version that matches your Capacitor installation (e.g., plugin v8 for Capacitor 8). Only the latest major version is actively maintained.

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/cap-go/capacitor-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `cap-go/capacitor-skills` to install the `@capgo/capacitor-stripe-identity` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
# Install (choose one)
npm install @capgo/capacitor-stripe-identity
pnpm add @capgo/capacitor-stripe-identity
yarn add @capgo/capacitor-stripe-identity
bun add @capgo/capacitor-stripe-identity

# Then sync Capacitor (choose one)
npx cap sync
pnpm exec cap sync
yarn cap sync
bunx cap sync
```

## Platform setup

### iOS

Add `NSCameraUsageDescription` to `Info.plist` with a string that explains why your app needs camera access for identity verification. See Stripe's [iOS camera authorization guide](https://stripe.com/docs/identity/verify-identity-documents?platform=ios&type=new-integration#set-up-camera-authorization) for details.

### Android

Set your app theme to a Material Components theme in `android/app/src/main/res/values/styles.xml`:

```diff xml: res/values/styles.xml
- <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
+ <style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
```

Any Material Components parent theme works. See [Material theming options](https://m2.material.io/develop/android/theming/dark/) and Stripe's [Android Material theme guide](https://stripe.com/docs/identity/verify-identity-documents?platform=android&type=new-integration#set-up-material-theme).

## Usage

For implementation details, see the [Stripe Identity documentation](https://stripe.com/docs/identity).

```ts
import { StripeIdentity, IdentityVerificationSheetEventsEnum } from '@capgo/capacitor-stripe-identity';

const listener = await StripeIdentity.addListener(IdentityVerificationSheetEventsEnum.VerificationResult, (result) => {
  console.log(result);
  listener.remove();
});

// initialize is needed only for Web Platform
await StripeIdentity.initialize({
  publishableKey,
});
await StripeIdentity.create({
  ephemeralKeySecret,
  verificationId,
  // clientSecret is needed only for Web Platform
  clientSecret
});
await StripeIdentity.present();
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`create(...)`](#create)
* [`present()`](#present)
* [`addListener(IdentityVerificationSheetEventsEnum.Loaded, ...)`](#addlisteneridentityverificationsheeteventsenumloaded-)
* [`addListener(IdentityVerificationSheetEventsEnum.FailedToLoad, ...)`](#addlisteneridentityverificationsheeteventsenumfailedtoload-)
* [`addListener(IdentityVerificationSheetEventsEnum.VerificationResult, ...)`](#addlisteneridentityverificationsheeteventsenumverificationresult-)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options: InitializeIdentityVerificationSheetOption) => Promise<void>
```

| Param         | Type                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#initializeidentityverificationsheetoption">InitializeIdentityVerificationSheetOption</a></code> |

--------------------


### create(...)

```typescript
create(options: CreateIdentityVerificationSheetOption) => Promise<void>
```

| Param         | Type                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#createidentityverificationsheetoption">CreateIdentityVerificationSheetOption</a></code> |

--------------------


### present()

```typescript
present() => Promise<void>
```

--------------------


### addListener(IdentityVerificationSheetEventsEnum.Loaded, ...)

```typescript
addListener(eventName: IdentityVerificationSheetEventsEnum.Loaded, listenerFunc: () => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code><a href="#identityverificationsheeteventsenum">IdentityVerificationSheetEventsEnum.Loaded</a></code> |
| **`listenerFunc`** | <code>() =&gt; void</code>                                                                                 |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener(IdentityVerificationSheetEventsEnum.FailedToLoad, ...)

```typescript
addListener(eventName: IdentityVerificationSheetEventsEnum.FailedToLoad, listenerFunc: (info: StripeIdentityError) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code><a href="#identityverificationsheeteventsenum">IdentityVerificationSheetEventsEnum.FailedToLoad</a></code> |
| **`listenerFunc`** | <code>(info: <a href="#stripeidentityerror">StripeIdentityError</a>) =&gt; void</code>                           |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener(IdentityVerificationSheetEventsEnum.VerificationResult, ...)

```typescript
addListener(eventName: IdentityVerificationSheetEventsEnum.VerificationResult, listenerFunc: (result: IdentityVerificationResult) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code><a href="#identityverificationsheeteventsenum">IdentityVerificationSheetEventsEnum.VerificationResult</a></code> |
| **`listenerFunc`** | <code>(result: <a href="#identityverificationresult">IdentityVerificationResult</a>) =&gt; void</code>                 |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### InitializeIdentityVerificationSheetOption

| Prop                 | Type                |
| -------------------- | ------------------- |
| **`publishableKey`** | <code>string</code> |


#### CreateIdentityVerificationSheetOption

| Prop                     | Type                | Description                                           |
| ------------------------ | ------------------- | ----------------------------------------------------- |
| **`verificationId`**     | <code>string</code> |                                                       |
| **`ephemeralKeySecret`** | <code>string</code> |                                                       |
| **`clientSecret`**       | <code>string</code> | This client secret is used only for the web platform. |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### StripeIdentityError

| Prop          | Type                |
| ------------- | ------------------- |
| **`code`**    | <code>string</code> |
| **`message`** | <code>string</code> |


#### IdentityVerificationResult

| Prop         | Type                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| **`result`** | <code><a href="#identityverificationsheetresultinterface">IdentityVerificationSheetResultInterface</a></code> |
| **`error`**  | <code><a href="#stripeidentityerror">StripeIdentityError</a></code>                                           |


### Type Aliases


#### IdentityVerificationSheetResultInterface

<code><a href="#identityverificationsheeteventsenum">IdentityVerificationSheetEventsEnum.Completed</a> | <a href="#identityverificationsheeteventsenum">IdentityVerificationSheetEventsEnum.Canceled</a> | <a href="#identityverificationsheeteventsenum">IdentityVerificationSheetEventsEnum.Failed</a></code>


### Enums


#### IdentityVerificationSheetEventsEnum

| Members                  | Value                                                |
| ------------------------ | ---------------------------------------------------- |
| **`Loaded`**             | <code>'identityVerificationSheetLoaded'</code>       |
| **`FailedToLoad`**       | <code>'identityVerificationSheetFailedToLoad'</code> |
| **`Completed`**          | <code>'identityVerificationSheetCompleted'</code>    |
| **`Canceled`**           | <code>'identityVerificationSheetCanceled'</code>     |
| **`Failed`**             | <code>'identityVerificationSheetFailed'</code>       |
| **`VerificationResult`** | <code>'identityVerificationResult'</code>            |

</docgen-api>
