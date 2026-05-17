# Support Chat Concierge

## Purpose

The storefront includes a floating "Custom Wedding Co." concierge widget in the `(store)` route group. It gives shoppers quick answers, lets them submit order tracking requests, and forwards live-chat style questions to the support inbox.

## Frontend Rules

- Keep the widget inside `src/app/(store)/layout.tsx` so Sanity Studio remains isolated from storefront UI.
- Use the brand palette from `tailwind.config.js`: `espresso`, `cream`, `gold`, `blush`, `orange`, and custom grays.
- Do not use generic Tailwind colors for the widget.
- Keep the widget quiet by default: a floating button, no automatic interruption.

## Email Forwarding

The API route `POST /api/support-chat` forwards requests to `info@customweddingco.com`.

Required production environment variables:

- `RESEND_API_KEY`: API key used to send email.
- `SUPPORT_FROM_EMAIL`: Verified sender, for example `Custom Wedding Co. <support@customweddingco.com>`.
- `SUPPORT_TO_EMAIL`: Optional override. Defaults to `info@customweddingco.com`.

If `RESEND_API_KEY` is missing, the API records the chat thread in memory for local development but does not send email.

## Reply Sync

The widget polls `GET /api/support-chat?conversationId=...` while open. Replies can be attached to the visitor's chat by posting to `POST /api/support-chat/reply`.

Required reply webhook environment variable:

- `SUPPORT_CHAT_WEBHOOK_SECRET`: Shared secret expected in the `x-support-chat-secret` header.

Recommended production setup:

1. Use an email provider or helpdesk with inbound reply webhooks.
2. Keep the conversation ID in the email subject, for example `[cwc-lx123-abcd]`.
3. Configure the provider webhook to extract the conversation ID and POST the support reply to `/api/support-chat/reply`.
4. Add durable storage before relying on reply sync in production. The current implementation uses an in-memory thread store, which is useful locally but not durable across server restarts or serverless instances.
