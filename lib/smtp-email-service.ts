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
    
    // Format date for display - data.date comes as YYYY-MM-DD string
    const [year, month, day] = data.date.split('-').map(Number)
    
    // German month and weekday names
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    const weekdayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    
    // Create date object with local values (no timezone conversion)
    const dateObj = new Date(year, month - 1, day)
    const weekday = weekdayNames[dateObj.getDay()]
    const monthName = monthNames[month - 1]
    
    const formattedDate = `${weekday}, ${day}. ${monthName} ${year}`
    
    const mailOptions = {
      from: `"Business Psychologie Experten" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `Neue Terminbuchung - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #111111;
              background-color: #ffffff;
            }
            .wrapper {
              background-color: #ffffff;
              padding: 40px 20px;
            }
            .container { 
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
            }
            .header { 
              border-bottom: 2px solid #111111;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #111111;
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 5px;
              letter-spacing: -0.5px;
            }
            .header p {
              color: #666666;
              font-size: 14px;
            }
            .content {
              padding: 0;
            }
            .appointment-box {
              background-color: #f8f8f8;
              border: 1px solid #e0e0e0;
              padding: 20px;
              margin-bottom: 30px;
            }
            .appointment-box h2 {
              color: #111111;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 15px;
            }
            .appointment-details {
              display: grid;
              gap: 10px;
            }
            .appointment-row {
              display: flex;
              align-items: baseline;
            }
            .appointment-label {
              font-weight: 500;
              color: #666666;
              font-size: 14px;
              min-width: 80px;
            }
            .appointment-value {
              color: #111111;
              font-size: 14px;
              font-weight: 600;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              color: #111111;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e0e0e0;
            }
            .info-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 500;
              color: #666666;
              font-size: 14px;
              min-width: 100px;
            }
            .value {
              color: #111111;
              font-size: 14px;
              word-break: break-word;
            }
            .value a {
              color: #111111;
              text-decoration: underline;
            }
            .message-box {
              background-color: #f8f8f8;
              padding: 15px;
              margin-top: 10px;
              border: 1px solid #e0e0e0;
            }
            .message-box p {
              color: #111111;
              font-size: 14px;
              line-height: 1.6;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              text-align: center;
            }
            .footer p {
              color: #999999;
              font-size: 12px;
              margin-bottom: 5px;
            }
            .action-button {
              display: inline-block;
              background-color: #111111;
              color: white;
              padding: 10px 25px;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              margin-top: 20px;
            }
            .action-button:hover {
              background-color: #333333;
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
                <div class="appointment-box">
                  <h2>Termindetails</h2>
                  <div class="appointment-details">
                    <div class="appointment-row">
                      <span class="appointment-label">Datum:</span>
                      <span class="appointment-value">${formattedDate}</span>
                    </div>
                    <div class="appointment-row">
                      <span class="appointment-label">Uhrzeit:</span>
                      <span class="appointment-value">${data.time} Uhr</span>
                    </div>
                  </div>
                </div>
                
                <div class="section">
                  <h3 class="section-title">Kundendaten</h3>
                  <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">${data.name}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">E-Mail:</span>
                    <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                  </div>
                  ${data.phone ? `
                  <div class="info-row">
                    <span class="label">Telefon:</span>
                    <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
                  </div>
                  ` : ''}
                </div>
                
                ${data.message ? `
                <div class="section">
                  <h3 class="section-title">Nachricht</h3>
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
                <p>Business Psychologie Experten</p>
                <p>Diese E-Mail wurde automatisch generiert.</p>
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
      subject: `Neue Kontaktanfrage - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #111111;
              background-color: #ffffff;
            }
            .wrapper {
              background-color: #ffffff;
              padding: 40px 20px;
            }
            .container { 
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
            }
            .header { 
              border-bottom: 2px solid #111111;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #111111;
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 5px;
              letter-spacing: -0.5px;
            }
            .header p {
              color: #666666;
              font-size: 14px;
            }
            .content {
              padding: 0;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              color: #111111;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e0e0e0;
            }
            .info-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 500;
              color: #666666;
              font-size: 14px;
              min-width: 100px;
            }
            .value {
              color: #111111;
              font-size: 14px;
              word-break: break-word;
            }
            .value a {
              color: #111111;
              text-decoration: underline;
            }
            .message-box {
              background-color: #f8f8f8;
              padding: 20px;
              margin-top: 10px;
              border: 1px solid #e0e0e0;
            }
            .message-box p {
              color: #111111;
              font-size: 14px;
              line-height: 1.8;
              white-space: pre-wrap;
            }
            .timestamp {
              color: #666666;
              font-size: 13px;
              margin-top: 15px;
              padding-top: 15px;
              border-top: 1px solid #e0e0e0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              text-align: center;
            }
            .footer p {
              color: #999999;
              font-size: 12px;
              margin-bottom: 5px;
            }
            .action-buttons {
              display: flex;
              gap: 15px;
              justify-content: center;
              margin-top: 30px;
            }
            .action-button {
              display: inline-block;
              padding: 10px 25px;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
            }
            .action-button.primary {
              background-color: #111111;
              color: white;
            }
            .action-button.primary:hover {
              background-color: #333333;
            }
            .action-button.secondary {
              background-color: #ffffff;
              color: #111111;
              border: 1px solid #111111;
            }
            .action-button.secondary:hover {
              background-color: #f8f8f8;
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
                <div class="section">
                  <h3 class="section-title">Absender</h3>
                  <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">${data.name}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">E-Mail:</span>
                    <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                  </div>
                </div>
                
                <div class="section">
                  <h3 class="section-title">Nachricht</h3>
                  <div class="message-box">
                    <p>${data.message}</p>
                  </div>
                  <div class="timestamp">
                    Eingegangen am ${formattedDateTime}
                  </div>
                </div>
                
                <div class="action-buttons">
                  <a href="mailto:${data.email}?subject=Re: Ihre Anfrage bei Business Psychologie Experten" class="action-button primary">
                    Direkt antworten
                  </a>
                  <a href="https://businesspsychologie.de/admin/messages" class="action-button secondary">
                    Im Admin-Panel ansehen
                  </a>
                </div>
              </div>
              
              <div class="footer">
                <p>Business Psychologie Experten</p>
                <p>Diese E-Mail wurde automatisch generiert.</p>
                <p>Bitte antworten Sie dem Kunden zeitnah auf seine Anfrage.</p>
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