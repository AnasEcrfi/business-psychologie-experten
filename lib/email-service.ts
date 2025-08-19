import { Resend } from 'resend'

// Initialize Resend with API key (you'll need to add this to your .env.local)
const resend = new Resend(process.env.RESEND_API_KEY)

// Admin email to receive notifications
const ADMIN_EMAIL = 'apps@mpagency.ae'

interface BookingNotificationData {
  name: string
  email: string
  phone?: string
  date: string
  time: string
  message?: string
}

interface ContactNotificationData {
  name: string
  email: string
  message: string
  submittedAt: string
}

export async function sendBookingNotification(data: BookingNotificationData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Business Psychologie Experten <noreply@businesspsychologie.de>',
      to: [ADMIN_EMAIL],
      subject: `Neue Terminbuchung von ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-label {
                font-weight: bold;
                width: 120px;
                color: #666;
              }
              .info-value {
                flex: 1;
                color: #333;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-radius: 5px;
                margin-top: 15px;
                border-left: 4px solid #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #999;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎯 Neue Terminbuchung</h1>
            </div>
            <div class="content">
              <h2>Buchungsdetails:</h2>
              
              <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">${data.name}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">E-Mail:</div>
                <div class="info-value">
                  <a href="mailto:${data.email}">${data.email}</a>
                </div>
              </div>
              
              ${data.phone ? `
                <div class="info-row">
                  <div class="info-label">Telefon:</div>
                  <div class="info-value">${data.phone}</div>
                </div>
              ` : ''}
              
              <div class="info-row">
                <div class="info-label">Datum:</div>
                <div class="info-value">${new Date(data.date).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Uhrzeit:</div>
                <div class="info-value">${data.time}</div>
              </div>
              
              ${data.message ? `
                <div class="message-box">
                  <strong>Nachricht:</strong><br>
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              ` : ''}
            </div>
            
            <div class="footer">
              <p>Diese Nachricht wurde automatisch generiert von Business Psychologie Experten</p>
              <p><a href="https://businesspsychologie.de/admin">Zum Admin-Panel →</a></p>
            </div>
          </body>
        </html>
      `,
      text: `
        Neue Terminbuchung von ${data.name}
        
        Name: ${data.name}
        E-Mail: ${data.email}
        ${data.phone ? `Telefon: ${data.phone}` : ''}
        Datum: ${data.date}
        Uhrzeit: ${data.time}
        ${data.message ? `Nachricht: ${data.message}` : ''}
        
        ---
        Business Psychologie Experten
        Admin-Panel: https://businesspsychologie.de/admin
      `
    })

    if (error) {
      console.error('Failed to send booking notification:', error)
      return { success: false, error }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error sending booking notification:', error)
    return { success: false, error }
  }
}

export async function sendContactFormNotification(data: ContactNotificationData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Business Psychologie Experten <noreply@businesspsychologie.de>',
      to: [ADMIN_EMAIL],
      subject: `Neue Kontaktanfrage von ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-label {
                font-weight: bold;
                width: 120px;
                color: #666;
              }
              .info-value {
                flex: 1;
                color: #333;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 5px;
                margin-top: 15px;
                border-left: 4px solid #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #999;
                font-size: 12px;
              }
              .action-button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 15px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📬 Neue Kontaktanfrage</h1>
            </div>
            <div class="content">
              <h2>Kontaktdetails:</h2>
              
              <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">${data.name}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">E-Mail:</div>
                <div class="info-value">
                  <a href="mailto:${data.email}">${data.email}</a>
                </div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Eingegangen:</div>
                <div class="info-value">${new Date(data.submittedAt).toLocaleString('de-DE')}</div>
              </div>
              
              <div class="message-box">
                <strong>Nachricht:</strong><br><br>
                ${data.message.replace(/\n/g, '<br>')}
              </div>
              
              <center>
                <a href="https://businesspsychologie.de/admin/messages" class="action-button">
                  Nachricht im Admin-Panel anzeigen →
                </a>
              </center>
            </div>
            
            <div class="footer">
              <p>Diese Nachricht wurde automatisch generiert von Business Psychologie Experten</p>
              <p><a href="https://businesspsychologie.de/admin">Zum Admin-Panel →</a></p>
            </div>
          </body>
        </html>
      `,
      text: `
        Neue Kontaktanfrage von ${data.name}
        
        Name: ${data.name}
        E-Mail: ${data.email}
        Eingegangen: ${data.submittedAt}
        
        Nachricht:
        ${data.message}
        
        ---
        Business Psychologie Experten
        Admin-Panel: https://businesspsychologie.de/admin/messages
      `
    })

    if (error) {
      console.error('Failed to send contact notification:', error)
      return { success: false, error }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error sending contact notification:', error)
    return { success: false, error }
  }
}

// Helper function to send a test email (for testing the configuration)
export async function sendTestEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Business Psychologie Experten <noreply@businesspsychologie.de>',
      to: [ADMIN_EMAIL],
      subject: 'Test-E-Mail - Business Psychologie Experten',
      html: `
        <h1>Test-E-Mail erfolgreich!</h1>
        <p>Wenn Sie diese E-Mail erhalten, funktioniert das E-Mail-System korrekt.</p>
        <p>Gesendet am: ${new Date().toLocaleString('de-DE')}</p>
      `,
      text: `Test-E-Mail erfolgreich! Gesendet am: ${new Date().toLocaleString('de-DE')}`
    })

    if (error) {
      console.error('Test email failed:', error)
      return { success: false, error }
    }

    console.log('Test email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error sending test email:', error)
    return { success: false, error }
  }
}