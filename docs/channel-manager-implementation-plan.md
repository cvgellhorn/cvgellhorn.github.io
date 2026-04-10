# Channel manager & OTA implementation plan

This document describes how to implement **channel manager** connectivity to major **OTAs** (e.g. **Booking.com**, **Expedia**) from a property’s system of record (PMS, CRS, or dedicated inventory service). It complements the portfolio summary in [`src/content/projects/channel-manager-ota.md`](../src/content/projects/channel-manager-ota.md).

---

## 1. Preconditions and scope lock

- **System of record:** Decide whether **PMS**, **CRS**, or a dedicated **channel manager database** owns availability, rates, restrictions, and booking state after apply.
- **Commercial path:** Connectivity or partner agreements, NDAs, data processing terms (subprocessors), and any **certification or pilot** requirements before production credentials.
- **Scope per phase:** Example: Phase 1 = **ARI + new booking + cancel** only; Phase 2 = **modifications**, **content** (photos, amenities), **promotions**. Each OTA differs; lock v1 explicitly.
- **Non-goals (typical for v1):** Full revenue management, every metasearch partner, or **Expedia Partner Solutions (EPS) / Rapid**-style _reselling_ of Expedia inventory—that is a different product than _hotel supply_ connectivity.

**Deliverables:** a short **architecture decision record (ADR)** and a signed-off **channel matrix** (which flows each OTA supports in v1).

---

## 2. Phase A — Discovery and data model

| Workstream          | Activities                                                                                                                              | Exit criteria                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Partner programs    | Booking.com **Connectivity** program and APIs; Expedia **Developer Hub** / **Connectivity Hub** (lodging supply). Map flows to the ADR. | Written **interface list** (ARI, reservations, optional content). |
| Canonical model     | Internal **room type**, **rate plan**, **restriction** set, **tax/fee** rules, **property timezone** (day boundary), **currency**.      | Versioned schema; gaps vs each OTA documented.                    |
| Mapping design      | Per-property, per-channel IDs (property, room, rate, meal plan, occupancy). Auditable history.                                          | **Mapping store** + validation rules for invalid combinations.    |
| Auth & environments | API keys or OAuth, sandbox vs production, rotation procedures.                                                                          | Per-tenant credentials; no secrets in application logs.           |

---

## 3. Phase B — Vertical slice in sandbox

Build the smallest end-to-end loop that proves **no silent drift** and **no double-booking**.

1. **Outbound ARI:** Push availability, rates, and restrictions from the canonical model to a sandbox property on the OTA.
2. **Inbound reservation:** Receive a booking via **webhook** and/or **polling**, per partner specification.
3. **Idempotent apply:** Key handlers by OTA reservation (or message) ID; safely retry.
4. **Apply to system of record:** Create reservation and/or adjust inventory so other channels see correct state.
5. **Acknowledgement:** Return whatever the partner requires so retries and failure states are well defined.
6. **Cancel path:** Same idempotency and explicit state transitions.

**Exit criteria:** Scripted scenarios for **happy path**, **sold-out**, and **restriction change** complete in sandbox without manual database repair.

---

## 4. Phase C — Production hardening

- **Sync strategy:** Combine **push** (where supported) with **scheduled reconciliation pulls**; use **backoff and jitter**, concurrency limits, and a **dead-letter queue** for poison messages.
- **Ordering:** Reduce races between ARI updates and reservation messages (sequencing, short-lived locks, or explicit job ordering).
- **Reconciliation jobs:** Periodic **diff** between OTA state and system of record: stale ARI, orphan bookings, mapping mismatches; alert with property and channel identifiers.
- **Observability:** Metrics such as time since last successful ARI push, reservation pipeline lag, and error categories; dashboards and on-call runbooks.
- **Incident runbooks:** Steps to disable auto-push, freeze risky mappings, apply manual overrides, and escalate to the partner.

---

## 5. Phase D — Certification and pilot

- Complete partner **UAT or certification** checklists, including edge cases (minimum stay, stop-sell, modifications if in scope).
- Run a **pilot cohort** of properties; use **feature flags** or per-property enablement before broad rollout.

**Exit criteria:** Formal or informal **go-live approval** from each OTA program targeted in v1.

---

## 6. Phase E — Rollout and hypercare

- Enable channels in phases; tighten monitoring and response during the first production weeks.
- Prioritize backlog items from **reconciliation alerts** and operational support.

---

## 7. Parallel workstreams

| Track                 | Responsibility                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Integrations          | Per-OTA adapters behind a shared contract (`pushARI`, `receiveReservation`, `acknowledge`, etc.).                 |
| Core domain           | Canonical inventory, rates, reservations; booking lifecycle state machine.                                        |
| Mapping & admin       | UI or tooling to configure and validate mappings before go-live.                                                  |
| Platform              | Queues, idempotency storage, secrets management, multi-tenant isolation.                                          |
| Security & compliance | PII minimization, retention, log redaction, **PCI scope** (avoid card data in your services/logs where possible). |

---

## 8. Booking.com vs Expedia

Implement **shared internal contracts** first, then channel-specific adapters.

- **Booking.com:** **Connectivity Partner** program and **Connectivity APIs**; interface families often include **OTA (OpenTravel) XML**, **B.XML**, and **JSON**—standardize per workflow for your stack.
- **Expedia Group (supply):** **Expedia Group Developer Hub** and **Connectivity Hub** for **lodging supply** (ARI, product setup, booking notifications). This is distinct from **EPS Rapid**, which targets partners _selling_ lodging rather than hotels _distributing_ inventory.

**Milestone:** Both channels pass the Phase B vertical slice using the same canonical model.

---

## 9. Risks and mitigations

| Risk                         | Mitigation                                                                |
| ---------------------------- | ------------------------------------------------------------------------- |
| Sandbox differs from prod    | Document production-only behaviors; test limits and webhook delivery.     |
| Mapping misconfiguration     | Pre-flight validation; read-back checks where APIs support them.          |
| Duplicate reservation apply  | Mandatory **idempotency** keys and deduplication store.                   |
| Timezone / day-boundary bugs | Property-local midnight rules; explicit tests around calendar boundaries. |

---

## 10. Compliance and security checkpoints

- **PII:** Data minimization, purpose limitation, retention schedules, and subprocessors documented in the DPA.
- **Secrets:** Scoped credentials per tenant; rotation and access audit.
- **Transport:** TLS as required; partner IP allowlisting if mandated.
- **PCI:** Keep cardholder data in the OTA or acquirer path where possible; if payloads may include payment artifacts, involve PCI scoping early.
- **Logging:** Structured errors; avoid raw PII and payment data in logs.
- **Audit:** Tamper-evident history for reservation state changes where compliance requires it.

---

## References (external)

- Booking.com connectivity documentation (partner / developer portal).
- Expedia Group Developer Hub and Connectivity Hub (lodging supply).

Exact URLs and API versions change; use the current partner portals when implementing.
