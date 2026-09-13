# Talent Lens Dashboard

Build a production-quality, responsive React + Tailwind CSS component for an AI-native candidate review and outreach dashboard called "TalentLens".

Design & Layout:

1. Desktop: Two-column layout. 

   - Left side (65% width): Candidate review view featuring candidate header (name, avatar, current role, location, social/repo links), match score badge (e.g., 94% Match), key requirements checklist, and experience summary with highlightable project chips.

   - Right side (35% width): Sticky "AI Action Cockpit" containing:

     a) Contextual Fit Breakdown (Strengths & Gap detection).

     b) Adaptive Outreach Pitch Generator with tone toggle buttons ('Direct Founder', 'Technical Deep-Dive', 'Casual Chat'), an editable dynamic text field with streaming/typing effect simulation, and an 'Approve & Send' button.

2. Mobile: Responsive single-column flow with a persistent floating bottom bar ("Review AI Pitch") that expands an accessible slide-over drawer containing the AI Action Cockpit.

States to implement:

- Interactive toggle between at least 2 mock candidates (one Senior AI Engineer, one Full-Stack Lead).

- Interactive tone toggling that updates the outreach message.

- A toggleable "AI Processing / Streaming" state with clean skeletons.

- A "Low Confidence Warning" chip on the gap analysis section with an override button.

Style: Clean, minimalist B2B SaaS aesthetic (neutral slates, subtle borders, crisp typography, accessible high-contrast accents). Use Lucide icons.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://talentlens-ai-dashboard.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0252e5e0-505f-4cb0-95eb-87e9bc37e47a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
