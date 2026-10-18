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
import BackgroundManager from './components/Background/BackgroundManager';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: 'var(--bg-main)' }}>
      {/* Living Multi-Cloud Background System */}
      <BackgroundManager />

      {/* Main Navigation */}
      <div style={{ position: 'relative', zIndex: 10 }}>
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
    </div>
  );
}
