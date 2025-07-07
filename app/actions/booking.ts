"use server"

interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  message: string
}

export async function submitBooking(formData: FormData) {
  try {
    const bookingData: BookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      message: formData.get("message") as string,
    }

    // Get service details for pricing
    const serviceDetails = {
      basic: { name: "Basic Wash", price: "$25" },
      premium: { name: "Premium Detail", price: "$75" },
      full: { name: "Full Service", price: "$150" },
    }

    const selectedService = serviceDetails[bookingData.service as keyof typeof serviceDetails] || {
      name: bookingData.service,
      price: "TBD",
    }

    // Check if Resend API key is available
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      // Log booking details to console for development/testing
      console.log("=== NEW BOOKING REQUEST ===")
      console.log("Customer:", bookingData.name)
      console.log("Email:", bookingData.email)
      console.log("Phone:", bookingData.phone)
      console.log("Service:", selectedService.name, selectedService.price)
      console.log("Date:", new Date(bookingData.date).toLocaleDateString())
      console.log("Message:", bookingData.message)
      console.log("=== END BOOKING ===")

      return {
        success: true,
        message: "Booking request received! We'll contact you soon to confirm your appointment.",
      }
    }

    // Only import and use Resend if API key is available
    const { Resend } = await import("resend")
    const resend = new Resend(resendApiKey)

    // Create calendar event (ICS format)
    const eventDate = new Date(bookingData.date)
    const eventStart = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const eventEnd =
      new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AutoShine Detailing//Booking//EN
BEGIN:VEVENT
UID:${Date.now()}@autoshinedetailing.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${eventStart}
DTEND:${eventEnd}
SUMMARY:Car Detailing - ${selectedService.name} - ${bookingData.name}
DESCRIPTION:Service: ${selectedService.name} (${selectedService.price})\\nCustomer: ${bookingData.name}\\nPhone: ${bookingData.phone}\\nEmail: ${bookingData.email}\\nNotes: ${bookingData.message}
LOCATION:AutoShine Detailing, 123 Main Street, Your City, ST 12345
END:VEVENT
END:VCALENDAR`

    // Send email to business owner
    await resend.emails.send({
      from: "AutoShine Detailing <bookings@yourdomain.com>",
      to: ["owner@autoshinedetailing.com"], // Replace with actual business email
      subject: `New Booking Request - ${selectedService.name} - ${bookingData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Car Detailing Booking Request</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Customer Information</h3>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Service Details</h3>
            <p><strong>Service:</strong> ${selectedService.name}</p>
            <p><strong>Price:</strong> ${selectedService.price}</p>
            <p><strong>Requested Date:</strong> ${new Date(bookingData.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
          </div>

          ${
            bookingData.message
              ? `
          <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #a16207;">Additional Notes</h3>
            <p>${bookingData.message}</p>
          </div>
          `
              : ""
          }

          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #475569;">Next Steps</h3>
            <p>1. Review the booking details above</p>
            <p>2. Contact the customer to confirm the appointment</p>
            <p>3. Add the appointment to your calendar (calendar invite attached)</p>
            <p>4. Send confirmation to the customer</p>
          </div>

          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This booking was submitted through your AutoShine Detailing website.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: "appointment.ics",
          content: Buffer.from(icsContent).toString("base64"),
        },
      ],
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: "AutoShine Detailing <bookings@yourdomain.com>",
      to: [bookingData.email],
      subject: "Booking Request Received - AutoShine Detailing",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Your Booking Request!</h2>
          
          <p>Hi ${bookingData.name},</p>
          
          <p>We've received your booking request for our car detailing services. Here are the details:</p>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Your Booking Details</h3>
            <p><strong>Service:</strong> ${selectedService.name}</p>
            <p><strong>Price:</strong> ${selectedService.price}</p>
            <p><strong>Requested Date:</strong> ${new Date(bookingData.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #a16207;">What's Next?</h3>
            <p>• We'll review your request and contact you within 24 hours</p>
            <p>• We'll confirm the appointment time and provide any additional details</p>
            <p>• You'll receive a final confirmation with exact timing</p>
          </div>

          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #475569;">Contact Information</h3>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> info@autoshinedetailing.com</p>
            <p><strong>Address:</strong> 123 Main Street, Your City, ST 12345</p>
          </div>

          <p>If you have any questions or need to make changes to your booking, please don't hesitate to contact us.</p>
          
          <p>Thank you for choosing AutoShine Detailing!</p>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            AutoShine Detailing Team<br>
            Professional Car Detailing Services
          </p>
        </div>
      `,
    })

    return { success: true, message: "Booking request submitted successfully! Check your email for confirmation." }
  } catch (error) {
    console.error("Error submitting booking:", error)
    return { success: false, message: "Failed to submit booking. Please try again." }
  }
}
