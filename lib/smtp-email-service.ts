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
    
    const mailOptions = {
      from: `"Business Psychologie Experten" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `Neue Terminbuchung von ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .value { color: #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Neue Terminbuchung</h2>
            </div>
            
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${data.name}</span>
            </div>
            
            <div class="info-row">
              <span class="label">E-Mail:</span>
              <span class="value">${data.email}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Datum:</span>
              <span class="value">${data.date}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Uhrzeit:</span>
              <span class="value">${data.time}</span>
            </div>
            
            ${data.phone ? `
            <div class="info-row">
              <span class="label">Telefon:</span>
              <span class="value">${data.phone}</span>
            </div>
            ` : ''}
            
            ${data.message ? `
            <div class="info-row">
              <span class="label">Nachricht:</span>
              <div class="value">${data.message}</div>
            </div>
            ` : ''}
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
    
    const mailOptions = {
      from: `"Business Psychologie Experten" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `Neue Kontaktanfrage von ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .value { color: #000; }
            .message-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Neue Kontaktanfrage</h2>
            </div>
            
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${data.name}</span>
            </div>
            
            <div class="info-row">
              <span class="label">E-Mail:</span>
              <span class="value">${data.email}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Eingegangen am:</span>
              <span class="value">${new Date(data.submittedAt).toLocaleString('de-DE')}</span>
            </div>
            
            <div class="message-box">
              <div class="label">Nachricht:</div>
              <div class="value">${data.message}</div>
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