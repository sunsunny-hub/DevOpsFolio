import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import PipelineShowcase from './components/PipelineShowcase';
import SkillsMatrix from './components/SkillsMatrix';
import ProjectsCaseStudies from './components/ProjectsCaseStudies';
import ExperienceTimeline from './components/ExperienceTimeline';
import Publications from './components/Publications';
import GitHubActivity from './components/GitHubActivity';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="bg-grid-pattern" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Dynamic ambient cloud glows */}
      <div className="cloud-glow-1" />
      <div className="cloud-glow-2" />

      {/* Main Navigation */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* Main Content Flow */}
      <main>
        <Hero onOpenResume={() => setResumeModalOpen(true)} />
        <Certifications />
        <PipelineShowcase />
        <SkillsMatrix />
        <ProjectsCaseStudies />
        <ExperienceTimeline />
        <Publications />
        <GitHubActivity />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
