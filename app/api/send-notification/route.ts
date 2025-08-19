import { NextResponse } from 'next/server'
import { sendBookingNotification, sendContactFormNotification } from '@/lib/email-service'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    let result
    
    if (type === 'booking') {
      result = await sendBookingNotification(data)
    } else if (type === 'contact') {
      result = await sendContactFormNotification(data)
    } else {
      return NextResponse.json(
        { error: 'Invalid notification type' },
        { status: 400 }
      )
    }

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Notification sent' })
    } else {
      return NextResponse.json(
        { error: 'Failed to send notification', details: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}