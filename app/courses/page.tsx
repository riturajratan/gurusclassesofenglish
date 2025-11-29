import { FaComments, FaBookOpen, FaBriefcase, FaUserTie, FaStar, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'English Coaching Courses - Spoken English, Grammar & More',
  description: 'Explore our comprehensive English coaching programs: Spoken English, English Grammar, Interview Preparation, Communication Skills, and Personality Development courses.',
};

export default function Courses() {
  const courses = [
    {
      icon: <FaComments className="text-5xl text-primary-600" />,
      title: 'Spoken English',
      description: 'Build confidence in speaking English fluently and naturally in any situation.',
      features: [
        'Pronunciation and accent training',
        'Conversation practice sessions',
        'Vocabulary building',
        'Overcoming fear of speaking',
        'Real-life situational dialogues',
        'Group discussions and debates',
      ],
      duration: '3-6 months',
      level: 'Beginner to Advanced',
      students: '100+ enrolled',
    },
    {
      icon: <FaBookOpen className="text-5xl text-primary-600" />,
      title: 'English Grammar',
      description: 'Master the fundamentals and advanced concepts of English grammar with practical exercises.',
      features: [
        'Comprehensive grammar rules',
        'Tenses and their usage',
        'Sentence structure and formation',
        'Common grammatical errors',
        'Writing improvement',
        'Practice worksheets and exercises',
      ],
      duration: '2-4 months',
      level: 'All Levels',
      students: '150+ enrolled',
    },
    {
      icon: <FaBriefcase className="text-5xl text-primary-600" />,
      title: 'Interview Preparation',
      description: 'Ace your interviews with professional English communication skills and confidence.',
      features: [
        'Mock interview sessions',
        'Common interview questions',
        'Professional communication',
        'Body language and presentation',
        'Resume and email writing',
        'Personalized feedback',
      ],
      duration: '1-2 months',
      level: 'Intermediate to Advanced',
      students: '80+ enrolled',
    },
    {
      icon: <FaUserTie className="text-5xl text-primary-600" />,
      title: 'Communication Skills',
      description: 'Develop effective communication skills for personal and professional success.',
      features: [
        'Verbal and non-verbal communication',
        'Public speaking techniques',
        'Active listening skills',
        'Email and business writing',
        'Presentation skills',
        'Negotiation and persuasion',
      ],
      duration: '3-4 months',
      level: 'All Levels',
      students: '120+ enrolled',
    },
    {
      icon: <FaStar className="text-5xl text-primary-600" />,
      title: 'Personality Development',
      description: 'Transform your personality and build confidence to excel in all areas of life.',
      features: [
        'Self-confidence building',
        'Positive thinking and attitude',
        'Leadership qualities',
        'Time management',
        'Emotional intelligence',
        'Professional etiquette',
      ],
      duration: '2-3 months',
      level: 'All Levels',
      students: '90+ enrolled',
    },
  ];

  const whyChoose = [
    {
      title: 'Experienced Faculty',
      description: '10+ years of teaching experience with proven results',
    },
    {
      title: 'Small Batch Sizes',
      description: 'Limited students per batch for personalized attention',
    },
    {
      title: 'Flexible Timings',
      description: 'Multiple batch timings to suit your schedule',
    },
    {
      title: 'Practical Approach',
      description: 'Focus on real-world application and practice',
    },
    {
      title: 'Affordable Fees',
      description: 'Quality education at reasonable prices',
    },
    {
      title: 'Online & Offline',
      description: 'Choose your preferred mode of learning',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Comprehensive English learning programs designed to help you achieve your language and career goals
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex-shrink-0">
                  <div className="bg-white p-8 rounded-full shadow-md">
                    {course.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h2>
                  <p className="text-lg text-gray-700 mb-6">{course.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-primary-600" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaStar className="text-primary-600" />
                      <span><strong>Level:</strong> {course.level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-primary-600" />
                      <span><strong>{course.students}</strong></span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-block bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors font-semibold"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Gurus Classes?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What makes our English coaching programs stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyChoose.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
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
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose the course that fits your goals and let's begin transforming your English skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Enroll Now
            </Link>
            <a
              href="https://wa.me/YOUR_WHATSAPP_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors font-semibold text-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: courses.map((course, index) => ({
              '@type': 'Course',
              position: index + 1,
              name: course.title,
              description: course.description,
              provider: {
                '@type': 'EducationalOrganization',
                name: 'Gurus Classes of English',
              },
            })),
          }),
        }}
      />
    </>
  );
}
