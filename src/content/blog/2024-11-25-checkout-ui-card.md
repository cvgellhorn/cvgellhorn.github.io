---
title: "Checkout UI Extension Card"
description: "How to add a component with a white background to the Shopify Checkout UI"
date: "2024-11-25"
---

It seems like a simple task, but it took me a while to figure out how to add a component with a white background in the Shopify Checkout UI.

After some research, I found that the solution is actually quite simple. The right component is `Card`, but it doesn't come from the `@shopify/ui-extensions-react/checkout` package.

Instead, it comes from the `@shopify/ui-extensions-react/customer-account` package, as the order status page is part of the customer account pages and resides in that context.

Copy the code below:

```js
import { Card } from "@shopify/ui-extensions-react/customer-account";
```
