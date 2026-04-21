---
title: "Zero State Protocol: Why I Hunt the Way I Hunt"
description: "The thinking behind the methodology. Zero assumptions, no noise, maximum impact — what these words actually mean when you're staring at a target."
date: 2026-04-20
tags: ["philosophy", "methodology", "mindset", "bug-bounty"]
draft: false
---

I get asked the same thing a lot: what does "Zero State Protocol" actually mean?

It's not a tool. It's not a checklist. It's the answer to a question I kept running into early on — why do some hunters consistently find bugs on targets that dozens of other people have already tested?

The answer isn't skill gap. It's assumption gap.

---

## The Problem With Experience

Experience is a trap.

The more time you spend hacking, the more pattern-matching your brain does automatically. You walk up to a login form and your hands are already moving — SQLi, credential stuffing, password reset flow. You hit an API endpoint and you're already thinking IDOR, mass assignment, broken auth. You've seen it before. You know how these things break.

That's also exactly why you miss the bug that's actually there.

The target doesn't care about your mental model. It was built by a different team, with different assumptions, on a different stack, under different deadlines. The vulnerability they shipped is the one that fits *their* context — not the one that fits your pattern library.

Zero State means wiping that library before you open Burp. Approaching the target like you've never seen software before. It's uncomfortable. It's slower at the start. It's also why the interesting bugs are still there after everyone else has been through.

---

## What Zero Assumptions Looks Like in Practice

I start every target the same way: I don't touch it.

Before a single request fires, I spend time understanding the business. What does this product actually do? Who are its users? Where does money move? Where does trust get established between systems? What would a developer be worried about at 2am the week before launch?

The answers to those questions tell you more about where the bugs are than any scanner output.

A fintech app handles transactions. That means there's an audit trail somewhere, and someone made decisions about when to write to it and when not to. Those edge cases are yours.

A marketplace has two user types — buyers and sellers — and somewhere in the codebase there's logic that decides which one you are. That logic has edges.

A SaaS platform has admin users and regular users, and at some point a developer wrote `if (user.role === 'admin')` and assumed that was the only check needed. It wasn't.

You find these things by thinking about the product, not by running tools against it.

---

## Noise Is the Enemy

The modern bug bounty ecosystem has a noise problem.

Every target gets hammered by the same automated scans within hours of going public. Nuclei templates, SQLmap, directory brute-forcing — all the same tools, all the same wordlists, all the same output. Programs see thousands of duplicate reports. Hunters see thousands of duplicate not-applicables.

The response from most hunters is to run more tools, faster. Add more templates. Automate the automation.

My response is to go where the tools aren't looking.

Tools don't read page source and notice that a spec page is fetching from an S3 URL. Tools don't walk through a subscription flow and catch a background request that reveals an exposed bucket. Tools don't decompile an APK they found in that bucket and grep for credential patterns in the assets folder.

Humans do that. And because most hunters are busy running tools, the human layer is where the uncontested surface lives.

---

## Low Severity Is a Starting Point, Not a Dead End

P5 findings are information. Not about what you found — about what you haven't found yet.

An information disclosure tells you something about how the backend is structured. An IDOR on a low-value object tells you the access control pattern the whole application uses. A CSRF on a non-critical action tells you the developer's assumptions about what needs protection.

Every low-severity finding is a map fragment. The question isn't "is this worth reporting" — it's "what does this tell me about where the P1 is."

The $2,000 OAuth credential exposure started as a background request I noticed during a signup flow. Noise. Easy to miss. But it pointed at an S3 bucket, which pointed at an APK, which pointed at hardcoded credentials, which pointed at a live identity server. Each step looked like nothing until it became something.

That's what chaining means. Not combining two known vulnerabilities — building a path from a throwaway observation to a critical impact.

---

## Impact Is a Skill

Finding the bug is half the work. Explaining why it matters is the other half.

Triage teams are not adversaries. They're overwhelmed. They see hundreds of reports. They need to make fast decisions about severity and priority, and if your report makes them think hard, it gets deprioritized.

The best reports I've written don't just prove the bug exists. They walk the reader through the worst realistic scenario. Not theoretical doomsday — specific, plausible, damaging. "An attacker with these credentials could call this endpoint with these parameters and receive this data belonging to these users." That sentence is worth more than three pages of technical detail.

Triage teams think in blast radius. Write for them.

---

## The Protocol

Zero State isn't a set of steps. It's a mindset you have to actively maintain, because your brain will keep trying to drift back into pattern-matching mode.

Before each target: clear the assumptions. What do I actually know about this specific system? Not about systems like it — this one.

During testing: when you find something low-severity, don't move on. Ask what it tells you. Ask what's adjacent to it. Ask what a developer who built this feature was probably worried about, and then look at the things they weren't worried about.

Before reporting: ask if you've actually demonstrated impact, or just found a configuration issue. Ask if the triage team will understand what an attacker does next. Write the next step down, even if it's theoretical.

After: whether it pays or not, ask what you assumed that turned out to be wrong. Those are the expensive lessons that cost nothing if you write them down.

---

The name comes from a simple idea: the most dangerous thing you can bring to a target is a full head.

Come empty. Look at what's actually there. The bugs will show you where they are.
