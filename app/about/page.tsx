import { FaGraduationCap, FaChalkboardTeacher, FaAward, FaHeart, FaLightbulb, FaUsers } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Mr. S.D. Singh Ratan - English Lecturer',
  description: 'Learn about S.D. Singh Ratan, an experienced English lecturer passionate about helping students master English communication, grammar, and personality development.',
};

export default function About() {
  const qualifications = [
    {
      icon: <FaGraduationCap className="text-3xl text-primary-600" />,
      title: 'Advanced Degrees',
      description: 'Master\'s in English Literature with specialization in linguistics and communication',
    },
    {
      icon: <FaChalkboardTeacher className="text-3xl text-primary-600" />,
      title: 'Teaching Experience',
      description: '10+ years of experience teaching English to students of all levels and backgrounds',
    },
    {
      icon: <FaAward className="text-3xl text-primary-600" />,
      title: 'Proven Track Record',
      description: 'Helped 500+ students achieve their English learning goals and career aspirations',
    },
  ];

  const teachingValues = [
    {
      icon: <FaHeart />,
      title: 'Passion for Teaching',
      description: 'A genuine love for teaching and helping students discover their potential',
    },
    {
      icon: <FaLightbulb />,
      title: 'Practical Learning',
      description: 'Focus on real-world application and practical communication skills',
    },
    {
      icon: <FaUsers />,
      title: 'Student-Centered',
      description: 'Personalized attention and customized learning plans for every student',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">S.D. Singh Ratan</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              English Lecturer | Communication Coach | Personality Development Expert
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Hello! I am <strong>S.D. Singh Ratan</strong>, an English lecturer with a deep passion for helping students master the English language and develop strong communication skills. My journey in English education began over a decade ago, driven by the belief that language is not just a means of communication, but a powerful tool for personal and professional transformation.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Throughout my career, I have had the privilege of working with students from diverse backgrounds - from school students building their foundation to working professionals preparing for career advancement. Each student brings unique challenges and goals, and I take pride in crafting personalized learning experiences that address their specific needs.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                My teaching methodology is rooted in practical application. I believe that language learning should be engaging, relevant, and immediately applicable to real-life situations. Whether it's mastering grammar fundamentals, building fluency in spoken English, or preparing for important interviews, my focus is always on helping students gain confidence and competence.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">My Teaching Philosophy</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                I believe that every student has the potential to excel in English communication. The key is to create a supportive, encouraging environment where students feel comfortable making mistakes and learning from them. My classes are interactive, engaging, and designed to build both skills and confidence.
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6">
                <li><strong>Practical Over Theoretical:</strong> Focus on real-world communication rather than just textbook knowledge</li>
                <li><strong>Confidence Building:</strong> Creating a safe space where students can practice without fear of judgment</li>
                <li><strong>Personalized Attention:</strong> Understanding each student's unique needs and learning style</li>
                <li><strong>Continuous Improvement:</strong> Encouraging regular practice and providing constructive feedback</li>
                <li><strong>Holistic Development:</strong> Going beyond language to develop personality and communication skills</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Qualifications & Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A blend of academic excellence and practical teaching experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {qualifications.map((qual, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">{qual.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{qual.title}</h3>
                <p className="text-gray-600">{qual.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Drives Me
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The core values that shape my teaching approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teachingValues.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl border-2 border-primary-100 text-center"
              >
                <div className="text-4xl text-primary-600 flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Start Your English Learning Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a beginner or looking to refine your skills, I'm here to guide you every step of the way
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'S.D. Singh Ratan',
            jobTitle: 'English Lecturer',
            description: 'Experienced English lecturer specializing in communication skills, grammar, and personality development',
            knowsAbout: [
              'English Language Teaching',
              'Communication Skills',
              'Grammar',
              'Interview Preparation',
              'Personality Development',
            ],
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'Your University',
            },
            url: 'https://gurusclassesofenglish.com/about',
          }),
        }}
      />
    </>
  );
}
