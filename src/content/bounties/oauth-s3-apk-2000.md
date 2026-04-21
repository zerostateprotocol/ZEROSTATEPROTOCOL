---
title: "Out-of-Scope APK in a Public S3 Bucket Led to OAuth Client Takeover — $2,000"
severity: HIGH
category: "Hardcoded Secrets"
bountyAmount: 2000
date: 2026-04-21
program: "[REDACTED] Bug Bounty Program"
featured: true
draft: false
description: "Passive recon on the main domain revealed a hidden S3 asset download link during a subscription flow. The bucket contained an out-of-scope debug APK. Decompiling it exposed hardcoded OAuth credentials that worked live against production — full client impersonation confirmed."
tags: ["android", "apk", "s3", "hardcoded-secrets", "oauth", "recon", "out-of-scope-chain"]
---

## TL;DR

Burp was running while I walked through a subscription flow on an in-scope domain. A background request fetched a spec page that had an S3 URL in its markup. The bucket was public and listable. Inside it was a debug APK, out of scope, but it had hardcoded OAuth credentials pointing at an in-scope identity server. I used them to mint a valid Bearer token against production.

> The APK was out of scope. The live credentials inside it were not.

**Bounty: $2,000**

---

## Finding the Thread

I was walking a signup flow with Burp intercepting everything. Most traffic was noise. One background request stood out: the page was silently fetching a product specifications page, and that page had a raw S3 URL embedded in its markup as a download link.

```
https://[REDACTED].s3-eu-west-1.amazonaws.com/
```

Not linked anywhere visible. Only shows up if you're watching traffic during that specific flow. Scanners miss it completely.

---

## The Bucket

Hit the bucket root directly. Publicly listable, no auth required. Browsing the contents I found docs, images, and one file that immediately stood out:

```
/App/[REDACTED]-live-debug (1).apk
```

A debug build of a mobile app sitting in a public bucket. The `live-debug` filename is the tell: built against the live environment, not sanitised for distribution. The app itself wasn't in scope. I wasn't going to touch it. But I wanted to know what credentials it carried and whether they pointed at something that was.

---

## Decompiling

```bash
apktool d [REDACTED]-live-debug.apk -o decompiled/
grep -rn "client_secret\|client_id\|api_key\|secret" decompiled/
```

`assets/[REDACTED]_account.conf`:

```plaintext
client_id     = [REDACTED]
client_secret = [REDACTED]
```

Hardcoded config, bundled with the APK, sitting in a public bucket.

---

## The Scope Argument

Before filing I mapped the full chain on paper:

```
In-scope domain
  └── subscription flow (Burp intercept)
        └── spec page with S3 link in markup
              └── public S3 bucket
                    └── out-of-scope debug APK
                          └── hardcoded OAuth credentials
                                └── IN-SCOPE identity server  <-- here
```

Entry point: in-scope domain. Impact: in-scope identity server. The APK was just where the credentials happened to live. I documented this chain before filing so the triage team didn't have to make the argument themselves.

---

## Proving It

```http
POST /oauth/token HTTP/2
Host: identity.[REDACTED].com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=[REDACTED]&client_secret=[REDACTED]
```

Server came back `200 OK` with a signed Bearer token. No friction.

![PoC — token request with hardcoded credentials, server returns 200 and access token](/bounties/oauth-s3-apk/poc2.png)

Decoded the JWT to confirm it was signed by production and inspect the audience:

![PoC — JWT decoded showing valid token issued by production identity server](/bounties/oauth-s3-apk/poc1.png)

With these credentials an attacker could impersonate the application in any OAuth flow that trusts this client, make authenticated requests to downstream services, and maintain access until the secret was rotated since `client_credentials` needs no user to refresh.

---

## Root Cause

Three things went wrong independently:

**Credentials hardcoded in source.** The `client_secret` was baked into a config file bundled with the app instead of injected at runtime. Anything that ships inside a binary is fair game.

**Debug build stored externally.** It was uploaded to S3 as a documentation asset with no access controls. Debug builds should never leave internal infrastructure.

**Bucket publicly listable.** No Block Public Access policy. Anyone with the URL could enumerate and download everything in it.

Pull any one of these and the chain breaks.

---

## Timeline

| Event | Detail |
|-------|--------|
| Discovery | S3 link found in intercepted traffic during signup |
| APK | Debug build found in publicly listable bucket |
| Decompile | Credentials extracted from `assets/` config |
| PoC | Live Bearer token minted, JWT decoded |
| Report | Chain documented and filed |
| Triage | Confirmed HIGH severity |
| **Bounty** | **$2,000** |
| Fix | Credentials rotated, APK removed |

---

## Fix

Rotate the exposed credentials immediately. For the long term: don't hardcode secrets in app source, enforce Block Public Access on all S3 buckets by default, and never distribute debug builds outside internal infrastructure. A secrets scanner in CI catches this class of issue before it ships.

---

The bug wasn't in anything they were actively defending. It was in the asset they forgot existed.

> *Go where the noise stops.*
