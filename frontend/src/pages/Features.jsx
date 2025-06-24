import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Users2, BarChart3, Zap, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-500" />,
      title: "Task Management",
      description: "Create, organize, and track your tasks with ease. Set priorities and deadlines to stay on top of your work."
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-500" />,
      title: "Kanban Board",
      description: "Visualize your workflow with our intuitive Kanban board. Drag and drop tasks between different stages."
    },
    {
      icon: <Users2 className="w-8 h-8 text-green-500" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team. Share tasks, updates, and progress in real-time."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      title: "Progress Tracking",
      description: "Monitor your productivity with detailed progress tracking and performance analytics."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Quick Actions",
      description: "Perform common actions quickly with keyboard shortcuts and an intuitive interface."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Secure & Reliable",
      description: "Your data is protected with industry-standard security measures and regular backups."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover all the powerful features that make Task Magic the perfect solution for managing your tasks and boosting productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;