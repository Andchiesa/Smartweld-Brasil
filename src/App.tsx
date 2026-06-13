/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import ConsultingAndServices from './components/ConsultingAndServices';
import Courses from './components/Courses';
import EligibilityQuiz from './components/EligibilityQuiz';
import ConsultantChat from './components/ConsultantChat';
import Footer from './components/Footer';
import FlameDivider from './components/FlameDivider';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative min-h-screen bg-white antialiased text-slate-800 selection:bg-brand-orange selection:text-white">
      {/* Absolute Header Menu */}
      <Header />

      {/* Main Container Layout */}
      <main id="main-content">
        
        {/* Hero Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
        </motion.div>

        <FlameDivider />

        {/* Consulting and engineering services */}
        <ConsultingAndServices />

        <FlameDivider />

        {/* Dynamic Courses list and parameters */}
        <Courses />

        <FlameDivider />

        {/* Interactive eligibility calculator / quiz */}
        <EligibilityQuiz />

        <FlameDivider />

        {/* Technical advisor Gemini chat */}
        <ConsultantChat />

      </main>

      {/* Corporate footer footer coordinates */}
      <Footer />

      {/* Global Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
