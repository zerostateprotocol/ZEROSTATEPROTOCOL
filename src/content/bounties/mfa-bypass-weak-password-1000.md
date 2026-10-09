---
title: "MFA Bypass on Login — Any 6-Digit Code Was Accepted — $1,000"
severity: HIGH
category: "Authentication"
bountyAmount: 1000
date: 2025-01-17
program: "[REDACTED] Bug Bounty Program"
featured: true
draft: false
description: "Accounts flagged for a weak password were forced through an email OTP at login. The code was never sent, and the login endpoint accepted any 6-digit value, so the second factor did not exist."
tags: ["mfa", "authentication", "otp", "account-takeover", "login"]
---

## TL;DR

Logging in with a weak password triggered a multi-factor prompt: a 6-digit code, supposedly emailed to the account. Nothing arrived. Submitting any six digits still opened the session.

> The prompt said the code was emailed. The server never checked one.

**Bounty: $1,000**

---

## The Prompt

The target was the public login flow on an in-scope web app. Accounts whose password failed an internal strength check were not blocked. They were pushed into MFA instead, with copy along these lines:

> To protect your account, we’ve enabled multi-factor authentication (MFA) for added security. While it is recommended to use MFA, you may disable it by logging in and updating your password to a more secure option. Enter the 6-digit code we emailed you.

That is the entire control. The password is already known. MFA is what is supposed to stop the login.

---

## What Actually Happened

I used an account I controlled that had a weak password. Company, email, and password are withheld here.

1. Open the login page.
2. Submit the valid email and the weak password.
3. The MFA interstitial appears and claims a 6-digit code was emailed.
4. The inbox stays empty. No code is generated, or none is delivered.
5. Submit any 6-digit value. `111111` works. So does anything else.
6. The app issues a normal authenticated session.

There is no second request to a mail provider, no retry, and no distinct error for a wrong code. The field is cosmetic.

---

## Why It Matters

The password check still works. This is not an unauthenticated bypass of the whole login. It removes the only control the product added for the accounts it already considered unsafe.

Anyone who already has the password — stuffing, a reused credential, a phished password — walks through the MFA screen with a random number. The user never gets an email, so there is no signal that a login even happened.

Impact, as filed:

- Account access without a valid OTP, once the password is known.
- Limited to accounts the platform had flagged for a weak password, which is exactly the set MFA was meant to protect.
- Session grants the same access as a normal login: profile data and whatever the account can do inside the product.

---

## Root Cause

The client showed an MFA step. The server did not bind that step to a real challenge.

**No code was issued.** The message says a code was emailed. The mailbox never receives one, so there is nothing for the user to type and nothing for the server to compare against.

**The submitted value was not checked.** Any 6-digit string satisfied the gate. A wrong code and a right code are the same request.

**MFA was scoped to the weak-password cohort.** Stronger passwords skipped the prompt entirely. The bypass therefore lands on the accounts the control was written for.

---

## Timeline

| Event | Detail |
|-------|--------|
| Report filed | 17 January 2025 |
| Target | In-scope login flow, company redacted |
| Behavior | MFA prompt shown, email never sent, any 6-digit code accepted |
| Impact | Session issued for a weak-password account without a valid OTP |
| **Bounty** | **$1,000** |

---

## Fix

Issue a real OTP, store only a hash of it, and reject the login until that value matches and has not expired. Rate-limit attempts. Do not render the MFA screen unless a code was actually sent. Weak-password accounts should be forced to rotate the password, not waved through a checkbox the server ignores.

---

The second factor was a text field with no factor behind it.

> *If the code was never sent, it was never a control.*
