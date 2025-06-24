import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Heart, Coffee } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      description: "Full-stack developer with a passion for creating intuitive user experiences."
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      description: "Creative designer focused on making beautiful and functional interfaces."
    },
    {
      name: "Mike Brown",
      role: "Product Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      description: "Experienced in leading product development and user research."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Task Magic
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're on a mission to make task management magical, helping teams and individuals achieve more with less stress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-6"
          >
            <Code2 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Built with Care</h3>
            <p className="text-gray-600">Using the latest technologies to ensure a smooth and reliable experience.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-6"
          >
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
            <p className="text-gray-600">Every feature is crafted with attention to detail and user needs in mind.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center p-6"
          >
            <Coffee className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Powered by Coffee</h3>
            <p className="text-gray-600">And lots of dedication from our passionate team of developers.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-purple-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 