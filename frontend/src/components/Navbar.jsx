import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LogOut, Home, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AddTaskModal from './AddTaskModal';
import api from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isDashboard = location.pathname === '/dashboard';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddTask = async (taskData) => {
    try {
      await api.createTask(taskData);
      setShowAddTaskModal(false);
      // Refresh the page to show the new task
      window.location.reload();
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  const navItems = isDashboard
    ? [] // Empty for dashboard
    : [
        { name: 'Features', path: '/features' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Task Magic
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 relative"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Auth Buttons or User Info */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  {isDashboard ? (
                    <>
                      <motion.button
                        onClick={() => setShowAddTaskModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                        Add Task
                      </motion.button>
                      <motion.button
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-full border border-gray-200 hover:border-blue-600 transition-all duration-300"
                      >
                        <Home className="w-4 h-4" />
                        Home
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => navigate('/dashboard')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                    >
                      Dashboard
                    </motion.button>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">
                      Welcome, {user.username}
                    </span>
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => navigate('/login')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/register')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Register
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-gray-200/50 py-4"
              >
                <div className="flex flex-col gap-4">
                  {!isDashboard && navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                      className="text-gray-600 hover:text-blue-600 font-medium py-2"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  {user ? (
                    <>
                      <div className="text-gray-700 font-medium py-2 border-b border-gray-200/50">
                        Welcome, {user.username}
                      </div>
                      {isDashboard ? (
                        <>
                          <motion.button
                            onClick={() => {
                              setShowAddTaskModal(true);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium py-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Task
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              navigate('/');
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium py-2"
                          >
                            <Home className="w-4 h-4" />
                            Home
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={() => {
                            navigate('/dashboard');
                            setIsOpen(false);
                          }}
                          className="text-gray-600 hover:text-blue-600 font-medium py-2"
                        >
                          Dashboard
                        </motion.button>
                      )}
                      <motion.button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium py-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => {
                          navigate('/login');
                          setIsOpen(false);
                        }}
                        className="text-gray-600 hover:text-blue-600 font-medium py-2"
                      >
                        Login
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          navigate('/register');
                          setIsOpen(false);
                        }}
                        className="text-gray-600 hover:text-blue-600 font-medium py-2"
                      >
                        Register
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTaskModal && (
          <AddTaskModal
            onClose={() => setShowAddTaskModal(false)}
            onAdd={handleAddTask}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
