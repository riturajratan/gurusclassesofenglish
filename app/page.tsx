import Link from 'next/link';
import { FaBookReader, FaComments, FaBriefcase, FaUserGraduate, FaStar, FaArrowRight } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Gurus Classes of English. Learn English speaking, grammar, and communication skills with S.D. Singh Ratan.',
};

export default function Home() {
  const features = [
    {
      icon: <FaBookReader className="text-4xl text-primary-600" />,
      title: 'English Grammar',
      description: 'Master the fundamentals of English grammar with easy-to-understand lessons and practical exercises.',
    },
    {
      icon: <FaComments className="text-4xl text-primary-600" />,
      title: 'Spoken English',
      description: 'Build confidence in speaking English fluently with personalized coaching and practice sessions.',
    },
    {
      icon: <FaBriefcase className="text-4xl text-primary-600" />,
      title: 'Interview Preparation',
      description: 'Ace your interviews with professional English communication skills and confidence-building techniques.',
    },
    {
      icon: <FaUserGraduate className="text-4xl text-primary-600" />,
      title: 'Personality Development',
      description: 'Develop your personality and communication skills to stand out in personal and professional life.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      content: 'Mr. Ratan\'s teaching methods are exceptional. His classes helped me improve my English communication skills significantly. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Rahul Kumar',
      role: 'MBA Student',
      content: 'The interview preparation course was a game-changer for me. I cleared multiple interviews thanks to the confidence I gained here.',
      rating: 5,
    },
    {
      name: 'Anjali Singh',
      role: 'Teacher',
      content: 'Excellent teaching quality and personalized attention. The grammar lessons are very clear and practical. Thank you, Sir!',
      rating: 5,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Master English with <span className="text-primary-600">Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
              Expert English coaching by <strong>S.D. Singh Ratan</strong> - Transform your communication skills and achieve your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors font-semibold text-lg inline-flex items-center justify-center"
              >
                Explore Courses
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-full hover:bg-primary-50 transition-colors font-semibold text-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive English learning programs designed to help you excel in every aspect of communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-primary-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Mr. S.D. Singh Ratan
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              An experienced and passionate English lecturer dedicated to helping students master English speaking, writing, and comprehension through practical learning methods. With years of teaching experience, Mr. Ratan has successfully guided countless students to achieve their language learning goals.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              His teaching philosophy focuses on building confidence, encouraging practice, and making learning enjoyable and effective for students of all levels.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-primary-600 font-semibold text-lg hover:text-primary-700 transition-colors"
            >
              Learn More About Me
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Success stories from students who transformed their English communication skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your English Skills?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of successful students and start your journey to English mastery today
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Enroll Now
          </Link>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Gurus Classes of English',
            description: 'Expert English coaching and communication skills training',
            founder: {
              '@type': 'Person',
              name: 'S.D. Singh Ratan',
              jobTitle: 'English Lecturer',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Your City',
              addressCountry: 'IN',
            },
            url: 'https://gurusclassesofenglish.com',
            sameAs: [
              'https://www.facebook.com/profile.php?id=YOUR_PROFILE_ID',
            ],
          }),
        }}
      />
    </>
  );
}
