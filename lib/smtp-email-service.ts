import nodemailer from 'nodemailer'

// Email configuration
const ADMIN_EMAIL = 'apps@mpagency.ae'

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export interface BookingNotificationData {
  date: string
  time: string
  name: string
  email: string
  phone?: string
  message?: string
}

export interface ContactNotificationData {
  name: string
  email: string
  message: string
  submittedAt: string
}

export async function sendBookingNotification(data: BookingNotificationData) {
  try {
    const transporter = createTransporter()
    
    // Format date for display
    const dateObj = new Date(data.date)
    const formattedDate = dateObj.toLocaleDateString('de-DE', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
    
    const mailOptions = {
      from: `"Business Psychologie Experten" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🗓️ Neue Terminbuchung - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              background-color: #f5f5f5;
            }
            .wrapper {
              background-color: #f5f5f5;
              padding: 40px 20px;
            }
            .container { 
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: white;
              font-size: 28px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .header p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
            }
            .content {
              padding: 40px 30px;
            }
            .alert-box {
              background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
              border-left: 4px solid #667eea;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .alert-box h2 {
              color: #667eea;
              font-size: 18px;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .info-section {
              margin-bottom: 30px;
            }
            .info-section h3 {
              color: #667eea;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 15px;
              font-weight: 600;
            }
            .info-grid {
              display: grid;
              gap: 15px;
            }
            .info-row {
              display: grid;
              grid-template-columns: 140px 1fr;
              padding: 12px;
              background-color: #f8f9fa;
              border-radius: 8px;
              transition: background-color 0.2s;
            }
            .info-row:hover {
              background-color: #f0f1f3;
            }
            .label {
              font-weight: 600;
              color: #6b7280;
              font-size: 14px;
            }
            .value {
              color: #1a1a1a;
              font-size: 14px;
              word-break: break-word;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .highlight-box {
              background: linear-gradient(135deg, #f59e0b15 0%, #ef444415 100%);
              border: 2px solid #f59e0b;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              text-align: center;
            }
            .highlight-box .date {
              font-size: 20px;
              font-weight: 600;
              color: #1a1a1a;
              margin-bottom: 5px;
            }
            .highlight-box .time {
              font-size: 24px;
              font-weight: 700;
              color: #dc2626;
            }
            .message-box {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border-left: 3px solid #667eea;
              margin-top: 15px;
            }
            .message-box p {
              color: #4b5563;
              font-style: italic;
              line-height: 1.6;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 25px 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer p {
              color: #6b7280;
              font-size: 13px;
              margin-bottom: 10px;
            }
            .action-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              margin-top: 20px;
            }
            .icon {
              display: inline-block;
              width: 20px;
              height: 20px;
              vertical-align: middle;
              margin-right: 8px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1>Business Psychologie Experten</h1>
                <p>Neue Terminbuchung eingegangen</p>
              </div>
              
              <div class="content">
                <div class="alert-box">
                  <h2>
                    <span>🎯</span> Neue Terminanfrage erhalten
                  </h2>
                  <p>Ein Kunde hat einen Beratungstermin gebucht.</p>
                </div>
                
                <div class="highlight-box">
                  <div class="date">📅 ${formattedDate}</div>
                  <div class="time">🕐 ${data.time} Uhr</div>
                </div>
                
                <div class="info-section">
                  <h3>Kundendaten</h3>
                  <div class="info-grid">
                    <div class="info-row">
                      <span class="label">👤 Name:</span>
                      <span class="value"><strong>${data.name}</strong></span>
                    </div>
                    <div class="info-row">
                      <span class="label">📧 E-Mail:</span>
                      <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                    </div>
                    ${data.phone ? `
                    <div class="info-row">
                      <span class="label">📱 Telefon:</span>
                      <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
                    </div>
                    ` : ''}
                  </div>
                </div>
                
                ${data.message ? `
                <div class="info-section">
                  <h3>Nachricht vom Kunden</h3>
                  <div class="message-box">
                    <p>${data.message}</p>
                  </div>
                </div>
                ` : ''}
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://businesspsychologie.de/admin" class="action-button">
                    Admin-Panel öffnen
                  </a>
                </div>
              </div>
              
              <div class="footer">
                <p><strong>Business Psychologie Experten</strong></p>
                <p>Diese E-Mail wurde automatisch generiert.</p>
                <p style="margin-top: 15px; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} Business Psychologie Experten. Alle Rechte vorbehalten.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
    
    await transporter.sendMail(mailOptions)
    console.log('Booking notification sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Failed to send booking notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendContactFormNotification(data: ContactNotificationData) {
  try {
    const transporter = createTransporter()
    
    // Format submission time
    const submittedDate = new Date(data.submittedAt)
    const formattedDateTime = submittedDate.toLocaleString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    const mailOptions = {
      from: `"Business Psychologie Experten" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `💬 Neue Kontaktanfrage - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              background-color: #f5f5f5;
            }
            .wrapper {
              background-color: #f5f5f5;
              padding: 40px 20px;
            }
            .container { 
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: white;
              font-size: 28px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .header p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
            }
            .content {
              padding: 40px 30px;
            }
            .alert-box {
              background: linear-gradient(135deg, #10b98115 0%, #059669015 100%);
              border-left: 4px solid #10b981;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .alert-box h2 {
              color: #059669;
              font-size: 18px;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .alert-box p {
              color: #6b7280;
              font-size: 14px;
            }
            .info-section {
              margin-bottom: 30px;
            }
            .info-section h3 {
              color: #667eea;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 15px;
              font-weight: 600;
            }
            .info-grid {
              display: grid;
              gap: 15px;
            }
            .info-row {
              display: grid;
              grid-template-columns: 140px 1fr;
              padding: 12px;
              background-color: #f8f9fa;
              border-radius: 8px;
              transition: background-color 0.2s;
            }
            .info-row:hover {
              background-color: #f0f1f3;
            }
            .label {
              font-weight: 600;
              color: #6b7280;
              font-size: 14px;
            }
            .value {
              color: #1a1a1a;
              font-size: 14px;
              word-break: break-word;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .message-section {
              background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
              padding: 25px;
              border-radius: 12px;
              margin: 25px 0;
            }
            .message-section h3 {
              color: #374151;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .message-content {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              border-left: 3px solid #667eea;
            }
            .message-content p {
              color: #1a1a1a;
              line-height: 1.8;
              white-space: pre-wrap;
            }
            .timestamp {
              display: flex;
              align-items: center;
              gap: 8px;
              color: #6b7280;
              font-size: 13px;
              margin-top: 20px;
              padding-top: 15px;
              border-top: 1px solid #e5e7eb;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 25px 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer p {
              color: #6b7280;
              font-size: 13px;
              margin-bottom: 10px;
            }
            .action-buttons {
              display: flex;
              gap: 15px;
              justify-content: center;
              margin-top: 30px;
            }
            .action-button {
              display: inline-block;
              padding: 12px 25px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
              transition: transform 0.2s;
            }
            .action-button:hover {
              transform: translateY(-2px);
            }
            .action-button.primary {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .action-button.secondary {
              background-color: #f3f4f6;
              color: #374151;
              border: 2px solid #e5e7eb;
            }
            .badge {
              display: inline-block;
              background-color: #fef3c7;
              color: #92400e;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1>Business Psychologie Experten</h1>
                <p>Neue Kontaktanfrage über das Website-Formular</p>
              </div>
              
              <div class="content">
                <div class="alert-box">
                  <h2>
                    <span>✉️</span> Neue Nachricht erhalten
                    <span class="badge">WICHTIG</span>
                  </h2>
                  <p>Ein potenzieller Kunde hat über das Kontaktformular eine Anfrage gesendet.</p>
                </div>
                
                <div class="info-section">
                  <h3>Absender-Informationen</h3>
                  <div class="info-grid">
                    <div class="info-row">
                      <span class="label">👤 Name:</span>
                      <span class="value"><strong>${data.name}</strong></span>
                    </div>
                    <div class="info-row">
                      <span class="label">📧 E-Mail:</span>
                      <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                    </div>
                  </div>
                </div>
                
                <div class="message-section">
                  <h3>
                    <span>💬</span> Nachricht des Kunden
                  </h3>
                  <div class="message-content">
                    <p>${data.message}</p>
                  </div>
                  <div class="timestamp">
                    <span>🕐</span>
                    <span>Eingegangen am ${formattedDateTime}</span>
                  </div>
                </div>
                
                <div class="action-buttons">
                  <a href="mailto:${data.email}?subject=Re: Ihre Anfrage bei Business Psychologie Experten" class="action-button primary">
                    📧 Direkt antworten
                  </a>
                  <a href="https://businesspsychologie.de/admin/messages" class="action-button secondary">
                    📋 Im Admin-Panel ansehen
                  </a>
                </div>
              </div>
              
              <div class="footer">
                <p><strong>Business Psychologie Experten</strong></p>
                <p>Diese E-Mail wurde automatisch generiert.</p>
                <p>Bitte antworten Sie dem Kunden zeitnah auf seine Anfrage.</p>
                <p style="margin-top: 15px; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} Business Psychologie Experten. Alle Rechte vorbehalten.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
    
    await transporter.sendMail(mailOptions)
    console.log('Contact form notification sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Failed to send contact notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}