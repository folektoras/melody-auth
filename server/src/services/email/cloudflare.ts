import { env } from 'hono/adapter'
import {
  IMailer, SendEmailOptions,
} from './interface'

/**
* @docs https://developers.cloudflare.com/email-service/
* Cloudflare Email Service (REST API). Requires a sending domain onboarded in
* your Cloudflare account (SPF/DKIM) and an API token with the "Email Sending"
* permission. Works from the Workers runtime — it is a plain fetch, like the
* other HTTP providers.
*/
export class CloudflareMailer extends IMailer {
  async sendEmail ({
    email, subject, content, senderName,
  }: SendEmailOptions) {
    const {
      CLOUDFLARE_ACCOUNT_ID: accountId,
      CLOUDFLARE_EMAIL_API_TOKEN: apiToken,
      CLOUDFLARE_SENDER_ADDRESS: senderEmail,
    } = env(this.context)

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: {
            address: senderEmail, name: senderName,
          },
          to: [email],
          subject,
          html: content,
          text: content.replace(
            /<[^>]+>/g,
            ' ',
          ).replace(
            /\s+/g,
            ' ',
          )
            .trim(),
        }),
      },
    )

    return res
  }
}
