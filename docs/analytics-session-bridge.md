# DNS Analytics session bridge — preliminary server contract

DNS Partner Hub currently does **not** have a live protected user session: its prior partner-code/demo access is disabled. Do not claim SSO is operational, do not display a restricted Analytics iframe, and do not re-enable local role elevation.

This PR adds a **server-only** `authorizeHubAnalyticsAccess` preflight and tests. It is **not mounted** to Express and cannot grant access or deliver any Analytics data. No authentication configuration, Firebase rules, deployments or existing application behavior change.

## Production implementation prerequisites

1. Integrate a trusted Firebase Admin verifier on the Partner Hub backend; cryptographically validate Firebase ID tokens, project, issuer, expiry and signature.
2. Associate `uid` with **active partner establishment IDs** through trusted membership records in DNS Core. Browser-provided partner codes/roles are never authoritative.
3. After preflight, exchange the validated identity server-to-server against an Admin-managed Analytics share grant for the exact establishment and allowed metrics. Use short-lived, audience-scoped credentials, expiry and immediate revocation.
4. Return an **allowlisted server-side projection** of metrics, never raw `ticketSales`, `historicalSeasonRecords` or per-partner data not granted. Enforce the entitlement on every data request; do not rely on iframe URL, origin, Referer or `postMessage` alone.
5. Build a single Analytics UI reusing original seven modules. Render inaccessible sections as unavailable **without** secretly fetching their contents.
6. Test two different accommodations, inactive memberships, expired tokens, revocation, direct URL, full browser embed/logout, Workspace Admin/area/AT scopes and zero-loss/parity.
7. Only then enable the iframe in Partner Hub behind a trusted session; coordinate release PRs in both repositories and preserve rollback.

## Security caveat

This preflight accepts a verifier function as a dependency to keep it testable. Only the future trusted server integration may provide that function; it MUST NOT accept claims decoded without signature verification. `allowed:true` is **not** a token and not permission to read Firestore directly. A private repository or UI login alone cannot secure JavaScript data embedded in GitHub Pages.


## Staged Partner Hub Google login (PR #78, not deployed)
- Browser uses the existing DNS Core Firebase application configured through `VITE_DNS_FIREBASE_*` variables.
- `VITE_DNS_PARTNER_LOGIN_ENABLED` defaults to **false**. The login modal has no active Google button unless explicitly enabled.
- Server mounts `POST /api/partner/session` only as an OFF-by-default endpoint: `DNS_PARTNER_LOGIN_ENABLED` defaults to **false** and returns 404 when disabled.
- The authenticated user presents a Firebase ID token to the Hub backend via an Authorization header. Server calls Firebase Admin `verifyIdToken(token, true)` and checks active, verified `partnerHubMemberships` for that UID. Missing records deny.
- UI grants only a provisional `partner` presentation role after a positive server reply. Protected data services MUST still verify the token, membership and explicit Analytics grants on each request. No Analytics iframe is enabled.
- The membership schema (future trusted provisioning) is one document per membership with `uid`, `establishmentId`, `active: true`, `status: "verified"`; browser writes are never allowed. The collection currently has no public client rules.
- Before enablement: create a trusted Admin-only provisioning workflow, test multiple establishments and revocation, validate production identity project/hosting/Authorized Domains and separate partner accounts, then conduct real browser sign-in/refresh/logout tests.
- **Do not enable either flag merely because tests compile.** Those flags need explicit release approval together with the membership registry and backend authorization gates.
