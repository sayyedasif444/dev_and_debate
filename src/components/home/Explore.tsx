'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const exploreCards = [
  {
    icon: "🛠️",
    title: "Bring Your Ideas to Life",
    subtitle: "From Idea to Impact — We Build Together",
    description: "We turn your ideas into digital experiences. From executing ideas to launching products, we're here to help you design, develop, and grow with creativity and clarity.",
    features: [
      "Web & Mobile App Development",
      "Creative UI/UX & Brand Design",
      "Content Strategy & Digital Marketing",
    ],
    cta: "Start Your Project",
    link: "/services"
  },
  {
    icon: "🧠",
    title: "Learn, Code & Grow — Together",
    subtitle: "Mentorship, Code Reviews, and Live Discussions",
    description: "We believe learning works best when it's shared. Join us in workshops, live mentoring, or simply co-exploring code challenges — one step at a time.",
    features: [
      "1-on-1 Mentoring",
      "Live Sessions & Pair Programming",
      "Tech Deep-dives & Discussions"
    ],
    cta: "Book a Session",
    link: "/mentoring"
  },
  {
    icon: "🎬",
    title: "Explore Stories, Games & Ideas",
    subtitle: "Movies. Games. Thoughtful Conversations.",
    description: "Every great mind needs space to breathe. We review cinema, explore game trends, and spark ideas through fun debate. (And yes, a quiet move on the chessboard too.)",
    features: [
      "Film Reviews & Industry Talk",
      "Gaming Trends & Strategy",
      "Creative Takes on Culture"
    ],
    cta: "See What's New",
    link: "/blog"
  }
];

export default function Explore() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20  relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore What We{`'`}re <span className="text-primary relative inline-block">
              Building Together
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg" opacity="0.6">
                <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            From ideas to execution, from learning to laughter — Dev & Debate is where creativity meets action.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exploreCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 ${
                index % 2 === 0 ? 'bg-white/5' : 'bg-white/5'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-6">
                  {card.description}
                </p>
                <Link
                  href={card.link}
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 group/link"
                >
                  <span className="text-sm font-medium relative">
                    {card.cta}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover/link:w-full transition-all duration-300" />
                  </span>
                  <motion.svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 