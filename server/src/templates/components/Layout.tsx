import { html } from 'hono/html'
import { typeConfig } from 'configs'

export interface Branding {
  emailLogoUrl: string;
}

// Shared Door Deal email chrome: a pale-cyan page wash, a white rounded card with
// a two-tone "Door Deal" text wordmark, then the email body. Table-based with
// inline styles (hex, not CSS vars) for broad email-client support — no external
// images, stylesheets, or webfonts. `branding`/`locale` stay in the signature so
// the existing call sites keep working, even though the wordmark is text-only now.
const Layout = ({
  children,
}: {
  branding: Branding;
  children: any;
  locale: typeConfig.Locale;
}) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="color-scheme" content="light">
  </head>
  <body style="margin:0; padding:0; background-color:#eaf6fb; font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color:#051a52;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eaf6fb;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background-color:#ffffff; border:1px solid #cfe6f0; border-radius:16px;">
            <tr>
              <td align="center" style="padding:32px 32px 8px 32px;">
                <div style="font-size:22px; font-weight:700; letter-spacing:0.2px;">
                  <span style="color:#051a52;">Door</span> <span style="color:#0077b6;">Deal</span>
                </div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:12px auto 0 auto;">
                  <tr>
                    <td width="48" height="3" style="width:48px; height:3px; background-color:#0077b6; border-radius:2px; font-size:0; line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 8px 32px;">
                ${children}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 32px 32px 32px; border-top:1px solid #eaf6fb;">
                <p style="margin:0; font-size:13px; line-height:1.6; color:#6f8eaf;">
                  Door Deal &mdash; event finance &amp; ticket planning for promoters.<br>
                  This is an automated message, please don&rsquo;t reply.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`

export default Layout
