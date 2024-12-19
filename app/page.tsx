'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Layout from './components/Layout';

export default function Home() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      title: 'Real-time Analytics',
      description: 'Track customer satisfaction and feedback in real-time with intuitive dashboards.',
      icon: '📊',
      color: 'bg-blue-50'
    },
    {
      title: 'Custom Signatures',
      description: 'Generate personalized email signatures with embedded feedback collection.',
      icon: '✍️',
      color: 'bg-green-50'
    },
    {
      title: 'Team Management',
      description: 'Manage your team and their permissions with our robust RBAC system.',
      icon: '👥',
      color: 'bg-purple-50'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight mb-6">
                  Customer Feedback
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}Simplified
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Collect, analyze, and act on customer feedback with our comprehensive platform.
                  Transform customer insights into actionable improvements.
                </p>
              </motion.div>
              
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/signup')}
                  className="px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-shadow"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/demo')}
                  className="px-8 py-4 rounded-lg font-medium bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`${feature.color} p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            &copy; 2024 Customer Therm. All rights reserved.
          </div>
        </footer>
      </div>
    </Layout>
  );
}
