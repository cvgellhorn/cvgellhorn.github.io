---
title: "Spacecamps"
description: "Booking software for Australian and New Zealand caravan parks, with a flat monthly fee and no commission on stays"
pubDate: "2026-11-05"
category: "Projects"
heroImage: "../../assets/spacecamps.webp"
demoURL: "https://spacecamps.com.au"
---

[Spacecamps](https://spacecamps.com.au) is live. It's booking software for independent caravan and holiday parks in Australia and New Zealand. Guests pick a site, pay by card through Stripe and check in online, and the park pays a flat monthly fee from A$59. Spacecamps takes no commission on stays. A 15% OTA cut on a $300 weekend is $45, and small parks pay that on every booking.

A park owner can add their sites, photos and rates and be taking bookings in under an hour. Each park gets its own portal at `yourpark.spacecamps.com.au`, or on its own domain with a paid plan. Late arrivals check in online and get the gate code on their phone, so nobody has to walk to the office at 10pm.

## The portal

I spent most of my design time on the guest portal, because that's the page guests actually see. The park's name and colours sit at the top, with no Spacecamps branding competing for attention. Dates, availability, category and power filters stay in one row above the results. Each site card shows the total for the stay in large type and the nightly rate underneath, so guests don't have to do the maths. Tags for guest count, minimum nights and powered sites fit in a single line on the card.

## Built for one bar of signal

Plenty of parks sit at the edge of mobile coverage. Guests book from the highway on weak 4G, and some park offices run on satellite. A typical booking widget loads analytics tags, a chat bubble and a payment script before it shows a single site, and on a bad connection the page stays blank.

I kept the portal as small as I could:

- The server renders every portal page, so sites and prices show up as soon as the HTML arrives, before any JavaScript runs.
- The portal ships its own small bundle, separate from the owner dashboard.
- It loads no analytics or chat scripts.
- Stripe's script loads only once a guest starts a booking.
- Images are served as WebP in several sizes, and the browser picks the one that fits the screen.

Guests still need some signal to pay, since checkout talks to Stripe. Everything before that step is cheap to load.

Parks can start a 30-day free trial at [spacecamps.com.au](https://spacecamps.com.au). If you run a park or know someone who does, I'd like to hear what you think. Reach me on [Twitter / X](https://x.com/cvgellhorn).
