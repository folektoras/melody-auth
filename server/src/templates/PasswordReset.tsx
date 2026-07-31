import {
  localeConfig, typeConfig,
  variableConfig,
} from 'configs'
import Layout, { Branding } from 'templates/components/Layout'

const PasswordReset = ({
  branding, resetCode, locale,
}: {
  branding: Branding;
  resetCode: string;
  locale: typeConfig.Locale;
}) => {
  const expiresInHours = String(
    variableConfig.systemConfig.passwordResetCodeExpiresIn / 3600,
  )
  return (
    <Layout
      branding={branding}
      locale={locale}>
      <h1 style='margin:0 0 12px 0; color:#051a52; font-size:22px; font-weight:700; text-align:center;'>
        {localeConfig.passwordResetEmail.title[locale]}
      </h1>
      <p style='margin:0 0 24px 0; color:#3a5a87; font-size:16px; line-height:1.6; text-align:center;'>
        {localeConfig.passwordResetEmail.desc[locale].replace(
          '{{expiresIn}}',
          expiresInHours,
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
            <div style='display:inline-block; padding:16px 28px; background-color:#eaf6fb; border:1px solid #cfe6f0; border-radius:12px; color:#051a52; font-family:"SFMono-Regular",Menlo,Consolas,monospace; font-size:30px; font-weight:700; letter-spacing:6px;'>
              {resetCode}
            </div>
          </td>
        </tr>
      </table>
      <p style='margin:24px 0 0 0; color:#6f8eaf; font-size:13px; line-height:1.6; text-align:center;'>
        If you didn&rsquo;t request this, you can safely ignore this email.
      </p>
    </Layout>
  )
}

export default PasswordReset
