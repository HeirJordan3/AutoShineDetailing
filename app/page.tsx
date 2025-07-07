"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Car, Droplets, Shield, Sparkles, Phone, Mail, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { submitBooking } from "./actions/booking"
import { useActionState } from "react"

export default function CarDetailingLanding() {
  const [date, setDate] = useState<Date>()
  const [state, formAction, isPending] = useActionState(submitBooking, null)

  const services = [
    {
      name: "Basic Wash",
      price: "$25",
      description: "Exterior wash, tire cleaning, and basic interior vacuum",
      features: ["Exterior hand wash", "Tire & rim cleaning", "Interior vacuum", "Window cleaning"],
    },
    {
      name: "Premium Detail",
      price: "$75",
      description: "Complete interior and exterior detailing service",
      features: [
        "Everything in Basic",
        "Interior deep clean",
        "Leather conditioning",
        "Wax application",
        "Dashboard treatment",
      ],
      popular: true,
    },
    {
      name: "Full Service",
      price: "$150",
      description: "Our most comprehensive detailing package",
      features: [
        "Everything in Premium",
        "Paint correction",
        "Ceramic coating",
        "Engine bay cleaning",
        "Headlight restoration",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">AutoShine Detailing</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-sm font-medium hover:text-blue-600">
              Services
            </a>
            <a href="#booking" className="text-sm font-medium hover:text-blue-600">
              Book Now
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600">
              Contact
            </a>
          </nav>
          <Button className="md:hidden">Menu</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Car Detailing</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Transform your vehicle with our premium detailing services. Quality you can see, service you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="#booking">Book Appointment</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <a href="#services">View Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-muted-foreground">We use only the highest quality cleaning products and equipment</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Paint Protection</h3>
              <p className="text-muted-foreground">
                Advanced ceramic coatings and wax treatments to protect your investment
              </p>
            </div>
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Attention to Detail</h3>
              <p className="text-muted-foreground">Every inch of your vehicle receives meticulous care and attention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section id="services" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services & Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of professional detailing services designed to keep your car looking its best
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={cn("relative", service.popular && "border-blue-600 shadow-lg")}>
                {service.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-blue-600">{service.price}</CardDescription>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Sparkles className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Appointment</h2>
              <p className="text-xl text-muted-foreground">
                Ready to give your car the treatment it deserves? Schedule your appointment today!
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form action={formAction} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input placeholder="Your name" name="name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="your@email.com" name="email" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input type="tel" placeholder="(555) 123-4567" name="phone" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Service</label>
                      <Select name="service">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Wash - $25</SelectItem>
                          <SelectItem value="premium">Premium Detail - $75</SelectItem>
                          <SelectItem value="full">Full Service - $150</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                    {date && <input type="hidden" name="date" value={date.toISOString()} />}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Additional Notes</label>
                    <Textarea
                      placeholder="Tell us about your vehicle or any special requests..."
                      name="message"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                    {isPending ? "Submitting..." : "Book Appointment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            {state && (
              <div
                className={`mt-4 p-4 rounded-md ${state.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
              >
                {state.message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">Have questions? We're here to help!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">(555) 123-4567</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@autoshinedetailing.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">
                  123 Main Street
                  <br />
                  Your City, ST 12345
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold">AutoShine Detailing</span>
          </div>
          <p className="text-gray-400 mb-4">Professional car detailing services you can trust</p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AutoShine Detailing. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
