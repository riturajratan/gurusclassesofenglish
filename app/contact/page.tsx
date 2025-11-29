import { FaWhatsapp, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Gurus Classes of English',
  description: 'Contact S.D. Singh Ratan for English coaching inquiries. Connect via phone, email, WhatsApp, or visit our location.',
};

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="text-primary-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Have questions about our courses? Want to enroll? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Prefer to reach out directly? Here are all the ways you can connect with us.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaPhone className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a
                      href="tel:+91XXXXXXXXXX"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      +91 XXXXX XXXXX
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaEnvelope className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:contact@gurusclassesofenglish.com"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      contact@gurusclassesofenglish.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">
                      Your Complete Address<br />
                      City, State - PIN Code<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaClock className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect on Social Media</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-2xl" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=YOUR_PROFILE_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-2xl" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  For quick responses, message us on WhatsApp!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl text-green-500 mb-6 flex justify-center">
              <FaWhatsapp />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Chat with Us on WhatsApp
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Get instant responses to your questions and course inquiries
            </p>
            <a
              href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hello%2C%20I%27m%20interested%20in%20learning%20more%20about%20English%20coaching%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors font-semibold text-lg"
            >
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - Add Google Maps embed) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us Here</h2>
            <div className="bg-gray-200 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              {/* Replace with actual Google Maps embed */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl mx-auto mb-4" />
                  <p>Add your Google Maps embed code here</p>
                  <p className="text-sm mt-2">Visit: https://www.google.com/maps</p>
                </div>
              </div>
              {/* Example embed code:
              <iframe
                src="YOUR_GOOGLE_MAPS_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              */}
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'EducationalOrganization',
              name: 'Gurus Classes of English',
              telephone: '+91-XXXXX-XXXXX',
              email: 'contact@gurusclassesofenglish.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Your Street Address',
                addressLocality: 'Your City',
                addressRegion: 'Your State',
                postalCode: 'Your PIN',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-XXXXX-XXXXX',
                contactType: 'Admissions',
                availableLanguage: ['English', 'Hindi'],
              },
            },
          }),
        }}
      />
    </>
  );
}
