---
title: "Dynamic App URL in Shopify Checkout UI Extensions"
description: "How to Dynamically Update the App URL in Shopify Checkout UI Extensions"
date: "2024-11-18"
---

![Shopify Checkout UI Extension](/images/blog/dynamic-app-url-extension.webp)

When I began working on our custom Shopify app with a checkout UI extension, I encountered a recurring issue during development. Every time the development server restarted, the dynamically assigned Cloudflare tunnel URL provided by Shopify changed.

This behaviour is expected and the default. Shopify conveniently exposes this dynamic URL through an environment variable for the app. However, this convenience doesn’t extend to extensions, as Shopify handles them differently. Extensions require the URL to be loaded from a statically defined location.

In short, every time you run `npm run dev`, the newly generated Cloudflare tunnel URL must be manually copied to a specific location. This location needs to be programmatically accessible to the extension during build time.

After exploring potential solutions, I found no official recommendations from Shopify, and community-proposed solutions had their drawbacks.

## Challenges and Attempted Solutions

### 1. Using the App Proxy

Setting up an app proxy seemed like a potential solution. However, Shopify does not recommend using proxies for checkout UI extensions, making this approach less desirable.

### 2. Adding the URL to Shop Metafields

Following the approach [described in this post](https://liquidonate.com/blog/shopify-development-hacks-environment-variable-in-checkout-ui-extension), I attempted to save the dynamic URL in shop metafields. Initially, this seemed promising, but it introduced additional complexity:

- Every time the development server restarts, the app must be opened in the Shopify admin to update the URL in the shop metafields.
- This extra step is cumbersome during development and unreliable for production, as it assumes merchants will open the app to trigger updates.

## My Solution

After examining Shopify’s handling of the `process.env.SHOPIFY_APP_URL` environment variable, I devised a workaround by customising `vite.config.js`. My approach involves a small script that reads the dynamic URL from the environment variable and writes it to a constant in a specific file. This file's sole purpose is to export the URL for the extension.

Here’s the script, located in the `utils` directory:

```js
/** utils/extension-app-url.js */

import path from "node:path";
import fs from "node:fs/promises";

const TARGET_FILE_PATH = "../extensions/your-ext/src/utils/base-url.js";

const writeExtensionAppUrl = async (appUrl = "http://localhost") => {
  const filePath = path.join(__dirname, TARGET_FILE_PATH);

  try {
    await fs.writeFile(filePath, `export const APP_BASE_URL = '${appUrl}';\n`);
  } catch (err) {
    console.log("Error adding baseUrl to extensions:", err);
  }
};

export default writeExtensionAppUrl;
```

### Key Steps:

**1. Define the Target File Path**

The `TARGET_FILE_PATH` points to the file where the dynamic app URL will be stored. This file will export the `APP_BASE_URL` constant for the extension.

**2. Integrate with vite**

Modify `vite.config.js` to dynamically import and execute the script after initialising the host variable. At this point, the `process.env.SHOPIFY_APP_URL` value is available.

```js
[...]
const host = new URL(process.env.SHOPIFY_APP_URL || 'http://localhost')
  .hostname;

// Add SHOPIFY_APP_URL to extension
if (process.env.NODE_ENV === 'development') {
  const writeExtensionAppUrl = require('./utils/extension-app-url').default;
  writeExtensionAppUrl(process.env.SHOPIFY_APP_URL);
}
[...]
```

This script only runs in development mode, ensuring the production environment remains unaffected.

## Handling Unwanted File Changes

One drawback of this approach is the modification of the target file during development. By default, this file contains the production URL, so changes made during development must not be committed. To prevent accidental commits, add the file to `.gitignore`:

```sh
/extensions/your-ext/src/utils/base-url.js
```

## Conclusion

This solution eliminates the need for manual URL updates during development while maintaining flexibility. By programmatically managing the dynamic app URL, you can streamline the development process for your Shopify checkout UI extensions.

I hope this helps anyone facing similar challenges. If you have questions or improvement ideas, feel free to reach out via [Twitter / X](https://x.com/cvgellhorn)!

## Alternatives

In case you try to avoid dynamic tunnel URL's and prefer a static URL for development. Please follow [this guide](https://shopify.dev/docs/apps/build/cli-for-apps/use-ngrok-tunneling#set-up-ngrok) from Shopify.
