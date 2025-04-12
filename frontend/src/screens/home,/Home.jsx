import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Shield, Eye, Database, AlertTriangle, Lock, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { darkTheme } = useSelector((state) => state.theme);

  const [stats, setStats] = useState({
    protected: 0,
    fakesGenerated: 0,
    breachesPrevented: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        protected: prev.protected < 156 ? prev.protected + 3 : 156,
        fakesGenerated: prev.fakesGenerated < 1248 ? prev.fakesGenerated + 24 : 1248,
        breachesPrevented: prev.breachesPrevented < 37 ? prev.breachesPrevented + 1 : 37,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const featureVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.4,
      },
    }),
  };

  const pulseAnimation = {
    pulse: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <div className={`min-h-screen py-1 ${darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"}`}>


      {/* Animated Stats & Features Section */}
      <motion.div className="flex flex-col items-center text-center px-4 py-16 md:py-24">
        <motion.div
          className={`p-6 rounded-full mb-6 ${darkTheme ? "bg-dark-secondary" : "bg-light-secondary"}`}
          animate="pulse"
          variants={pulseAnimation}
        >
          <Shield size={64} className={`${darkTheme ? "text-dark-action" : "text-light-action"}`} />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Data Shield <span className={`${darkTheme ? "text-dark-action" : "text-light-action"}`}>Visualizer</span>
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mb-8 ${darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"}`}>
          Take control of your digital privacy. Monitor your data, generate safe alternatives, and stay protected from breaches.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
          <div className={`p-6 rounded-xl ${darkTheme ? "bg-dark-secondary" : "bg-light-secondary"}`}>
            <h3 className="text-xl font-medium mb-2">Apps Protected</h3>
            <p className={`text-3xl font-bold ${darkTheme ? "text-dark-action" : "text-light-action"}`}>{stats.protected}</p>
          </div>
          <div className={`p-6 rounded-xl ${darkTheme ? "bg-dark-secondary" : "bg-light-secondary"}`}>
            <h3 className="text-xl font-medium mb-2">Fakes Generated</h3>
            <p className={`text-3xl font-bold ${darkTheme ? "text-dark-action" : "text-light-action"}`}>{stats.fakesGenerated}</p>
          </div>
          <div className={`p-6 rounded-xl ${darkTheme ? "bg-dark-secondary" : "bg-light-secondary"}`}>
            <h3 className="text-xl font-medium mb-2">Breaches Prevented</h3>
            <p className={`text-3xl font-bold ${darkTheme ? "text-dark-action" : "text-light-action"}`}>{stats.breachesPrevented}</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {[
            { icon: <Eye size={32} />, title: "Data Visibility", description: "See exactly what personal data is being shared with your apps and services." },
            { icon: <Database size={32} />, title: "Fake Data Generator", description: "Create fake identities and data for services you don't trust with your real information." },
            { icon: <AlertTriangle size={32} />, title: "Breach Monitoring", description: "Get instant alerts when your data appears in known breaches or leaks." },
            { icon: <Lock size={32} />, title: "Privacy Recommendations", description: "Receive personalized advice to enhance your digital privacy footprint." },
            { icon: <FileCheck size={32} />, title: "Compliance Checking", description: "Verify if services comply with privacy regulations like GDPR and CCPA." },
            { icon: <Shield size={32} />, title: "Risk Assessment", description: "Analyze and score the privacy risks of apps before you install them." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`p-6 rounded-xl ${darkTheme ? "bg-dark-background" : "bg-light-background"} hover:shadow-lg transition-all duration-300`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureVariants}
            >
              <div className={`p-3 rounded-full inline-block mb-4 ${darkTheme ? "bg-dark-secondary" : "bg-light-secondary"}`}>
                <div className={`${darkTheme ? "text-dark-action" : "text-light-action"}`}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={`${darkTheme ? "text-dark-secondaryText" : "text-light-secondaryText"}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
