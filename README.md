# RULINGMIND Technologies — testing website

An original Next.js App Router, TypeScript and Tailwind CSS implementation. Navy/gold branding, locally generated CSS/SVG artwork and original sample copy. No LTM source, trademarks, photos, client claims or editorial content are included. Broad information architecture was informed by https://www.ltm.com/ (reviewed 11 November 2026).

## Quick start

Install Node.js 22 LTS. Node 24 is also allowed for local testing. Use pnpm 11.25.0 (pinned in package.json).

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. If Corepack is absent, install pnpm with `npm install -g pnpm@11.25.0` instead.

## Production and automated checks

```sh
pnpm typecheck
pnpm build
pnpm start
```

In a second terminal, with the production server still running:

```sh
pnpm test:smoke
```

The smoke test traverses every local page link, checks page responses, titles and main landmarks, checks unknown routes, sitemap and robots, and exercises valid/invalid demo forms, consent, request size and cross-origin rejection. Keep CONTACT_WEBHOOK_URL unset during tests; the test intentionally expects demo mode. For another port, set TEST_BASE_URL to its origin.

## Manual browser checks

- Desktop: open Services, Industries, Solutions and Insights menus; follow a detail link. Escape closes a menu and returns focus to its button. Clicking outside or tabbing out also closes menus.
- Mobile: at 390px width, open Menu, expand Services and follow a link. Check every page for overflow and readable spacing.
- Follow homepage CTAs, industry links, insight cards, footer links and the brand home link.
- Contact: submit valid sample details and consent; verify the explicit demo confirmation. Try an invalid email or missing consent and verify native validation. Careers includes a sample expression-of-interest form, not invented vacancies.
- Keyboard: use Tab, Shift+Tab, Enter, Space and Escape. Check the skip link and visible focus styles.
- Turn on reduced motion and check that decorative animations stop.

## Pages and editing

`app/page.tsx`: homepage. `lib/content.ts`: services, industries, solutions and insights catalogue. `app/[section]/page.tsx`: index, about, careers, contact and policy pages. `app/[section]/[slug]/page.tsx`: detail pages and sample articles. `components/`: accessible header, footer and forms. `app/globals.css`: responsive navy/gold design and motion. `app/api/contact/route.ts`: validation and optional webhook forwarding.

Detail pages use a shared editable template. All content is illustrative; replace sample descriptions, company facts and policy text before a public launch. No third-party fonts, images or analytics are fetched.

## Form delivery

Copy `.env.example` to `.env.local` for local settings (optional). Default mode validates transiently, returns a demo message, and does not store or send submissions. A success message in this mode does not mean an email was sent.

Optionally set server-only CONTACT_WEBHOOK_URL to an HTTPS JSON endpoint you control. It receives name, email, company, topic, message and consent. It must return 2xx after accepting the enquiry; the website has a ten-second timeout. The endpoint is never exposed in browser code. Do not put credentials in NEXT_PUBLIC variables. Add rate limiting/abuse prevention at your endpoint or hosting layer before enabling public delivery. This demo has no persistence, file uploads or email provider integration. Infrastructure logs are controlled by the hosting operator.

## AWS Amplify Hosting

The included `amplify.yml` targets Amplify Hosting compute with Next.js 15, Node 22 and `.next` artifacts. This is a server-backed Next.js application, not a static export.

1. Put the contents of this project at the root of your own Git repository and commit the lockfile.
2. In AWS Amplify, connect the repository/branch. Select the Amazon Linux 2023 build image and Node 22. Amplify should detect Next.js; use the included build specification.
3. Optionally set NEXT_PUBLIC_SITE_URL to your testing domain. Leave CONTACT_WEBHOOK_URL unset for demo mode. The build writes only these allowlisted variables into `.env.production` for the runtime; do not commit generated environment files.
4. Deploy, check build logs and test every route and form on the assigned Amplify URL.
5. When ready, add rulingmindtech.com in Amplify domain management and follow its DNS verification instructions. No AWS resources or DNS have been changed by this project.

AWS currently documents native support through Next.js 15: https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html . Recheck compatibility before upgrading Next.js major versions.

## SEO and launch checklist

Includes page titles/descriptions, canonical URLs, Open Graph metadata, favicon, sitemap.xml, semantic landmarks and robots.txt. Testing mode deliberately sets noindex/nofollow and disallows crawling. Before public launch, replace those rules in `app/layout.tsx` and `app/robots.ts`, set the verified canonical origin, supply a production social image, and replace the draft privacy notice. The SVG social placeholder may not be accepted by all social networks.

## Scope

No deployment, domain connection, real vacancy listing, real testimonials or verified business claims are included. The archive excludes dependencies, caches and environment secrets. Install dependencies after extraction.
