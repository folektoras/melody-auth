import {
  localeConfig, typeConfig,
} from 'configs'
import Layout, { Branding } from 'templates/components/Layout'

const Invitation = ({
  branding, invitationUrl, locale, expiresIn,
}: {
  branding: Branding;
  invitationUrl: string;
  locale: typeConfig.Locale;
  expiresIn: number;
}) => {
  return (
    <Layout
      branding={branding}
      locale={locale}>
      <h1 style='margin:0 0 12px 0; color:#051a52; font-size:22px; font-weight:700; text-align:center;'>
        {localeConfig.invitationEmail.title[locale]}
      </h1>
      <p style='margin:0 0 28px 0; color:#3a5a87; font-size:16px; line-height:1.6; text-align:center;'>
        {localeConfig.invitationEmail.desc[locale].replace(
          '{{expiresIn}}',
          String(expiresIn),
        )}
      </p>
      <table
        role='presentation'
        width='100%'
        cellpadding='0'
        cellspacing='0'
        border={0}>
        <tr>
          <td align='center'>
            <a
              href={invitationUrl}
              style='display:inline-block; padding:13px 32px; background-color:#0077b6; color:#ffffff; font-size:16px; font-weight:600; text-decoration:none; border-radius:8px;'
            >
              {localeConfig.invitationEmail.accept[locale]}
            </a>
          </td>
        </tr>
      </table>
      <p style='margin:20px 0 0 0; color:#6f8eaf; font-size:13px; line-height:1.6; text-align:center;'>
        If the button doesn&rsquo;t work, copy and paste this link into your browser:
        <br />
        <a
          href={invitationUrl}
          style='color:#0077b6; word-break:break-all;'
        >
          {invitationUrl}
        </a>
      </p>
    </Layout>
  )
}

export default Invitation
