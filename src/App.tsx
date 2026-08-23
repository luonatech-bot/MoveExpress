import React, { useState, useEffect } from 'react';
import { MoveProvider, useMove } from './context/MoveContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseUsBanner } from './components/WhyChooseUsBanner';
import { MovingEstimatorModal } from './components/MovingEstimatorModal';
import { VideoSurveyModal } from './components/VideoSurveyModal';
import { QuickCallModal } from './components/QuickCallModal';
import { MovingCalculatorView } from './components/views/MovingCalculatorView';
import { TrackMoveView } from './components/views/TrackMoveView';
import { QuoteRequestView } from './components/views/QuoteRequestView';
import { CustomerDashboardView } from './components/views/CustomerDashboardView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { AboutView } from './components/views/AboutView';
import { ServicesView } from './components/views/ServicesView';
import { ContactView } from './components/views/ContactView';
import { PrivacyPolicyView } from './components/views/PrivacyPolicyView';
import { TermsOfServiceView } from './components/views/TermsOfServiceView';
import { RefundPolicyView } from './components/views/RefundPolicyView';
import { SupportView } from './components/views/SupportView';
import { StatsCounterSection } from './components/StatsCounterSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ViewMode, PropertyType } from './types';

function MainApp() {
  const { currency, setCurrency } = useMove();
  
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('home');

  // Modals
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [isVideoSurveyOpen, setIsVideoSurveyOpen] = useState<boolean>(false);
  const [isQuickCallOpen, setIsQuickCallOpen] = useState<boolean>(false);

  // Estimator Preset parameters passed from quick forms
  const [estimatorParams, setEstimatorParams] = useState<{
    pickup?: string;
    destination?: string;
    propertyType?: PropertyType;
    moveDate?: string;
  }>({});

  const handleNavigate = (view: ViewMode | string, sectionId?: string) => {
    let targetView = view as ViewMode;
    let targetSection = sectionId;

    if (typeof view === 'string' && view.includes('#')) {
      const parts = view.split('#');
      targetView = parts[0] as ViewMode;
      targetSection = parts[1];
    }

    if (targetView === 'how-it-works') {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      setTimeout(() => {
        const el = document.getElementById('how-it-works-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    if (targetView === 'coverage') {
      setCurrentView('contact');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return;
    }

    if (targetView === 'faq') {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      setTimeout(() => {
        const el = document.getElementById('faqs') || document.getElementById('faq-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    if (targetView === 'testimonials') {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      setTimeout(() => {
        const el = document.getElementById('testimonials-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    if (targetSection) {
      const destView = (targetView === 'services' || targetView === 'home') ? targetView : 'services';
      if (currentView !== destView) {
        setCurrentView(destView);
      }
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return;
    }

    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEstimatorWithParams = (params?: {
    pickup?: string;
    destination?: string;
    propertyType?: PropertyType;
    moveDate?: string;
  }) => {
    if (params) setEstimatorParams(params);
    setIsEstimatorOpen(true);
  };

  const handleCurrencyToggle = () => {
    setCurrency(currency === 'NGN' ? 'USD' : 'NGN');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#111827] flex flex-col font-['Inter',sans-serif] antialiased selection:bg-[#74D600] selection:text-[#052314]">
      
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenEstimator={() => handleOpenEstimatorWithParams()}
        onOpenCallModal={() => setIsQuickCallOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            <HeroSection
              onOpenEstimator={handleOpenEstimatorWithParams}
              onNavigateToQuote={() => handleNavigate('quote')}
              onOpenVideoSurvey={() => setIsVideoSurveyOpen(true)}
            />
            <StatsCounterSection 
              onOpenEstimator={() => handleOpenEstimatorWithParams()}
            />
            <WhyChooseUsBanner />
            <ServicesSection
              onOpenEstimator={() => handleOpenEstimatorWithParams()}
              onNavigateToQuote={() => handleNavigate('quote')}
            />
            <HowItWorksSection
              onOpenEstimator={() => handleOpenEstimatorWithParams()}
              onOpenVideoSurvey={() => setIsVideoSurveyOpen(true)}
            />
            <TestimonialsSection />
            <FAQSection />
          </div>
        )}

        {currentView === 'services' && (
          <ServicesView
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
            onNavigateToQuote={() => handleNavigate('quote')}
            onOpenCallModal={() => setIsQuickCallOpen(true)}
          />
        )}

        {currentView === 'how-it-works' && (
          <ServicesView
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
            onNavigateToQuote={() => handleNavigate('quote')}
            onOpenCallModal={() => setIsQuickCallOpen(true)}
          />
        )}

        {currentView === 'coverage' && (
          <ContactView />
        )}

        {currentView === 'faq' && (
          <div>
            <HeroSection
              onOpenEstimator={handleOpenEstimatorWithParams}
              onNavigateToQuote={() => handleNavigate('quote')}
              onOpenVideoSurvey={() => setIsVideoSurveyOpen(true)}
            />
            <FAQSection />
          </div>
        )}

        {currentView === 'testimonials' && (
          <div>
            <HeroSection
              onOpenEstimator={handleOpenEstimatorWithParams}
              onNavigateToQuote={() => handleNavigate('quote')}
              onOpenVideoSurvey={() => setIsVideoSurveyOpen(true)}
            />
            <TestimonialsSection />
          </div>
        )}

        {currentView === 'calculator' && (
          <MovingCalculatorView
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
            onNavigateToQuote={() => handleNavigate('quote')}
          />
        )}

        {currentView === 'quote' && (
          <QuoteRequestView
            onQuoteCreated={(id) => {
              // auto open or keep track
            }}
            onNavigateToTrack={() => handleNavigate('track')}
          />
        )}

        {currentView === 'track' && (
          <TrackMoveView
            onOpenCustomerDashboard={() => handleNavigate('customer-portal')}
            onOpenCallModal={() => setIsQuickCallOpen(true)}
          />
        )}

        {(currentView === 'customer-portal' || (currentView as string) === 'customer-dashboard') && (
          <CustomerDashboardView />
        )}

        {(currentView === 'admin-portal' || (currentView as string) === 'admin-dashboard') && (
          <AdminDashboardView />
        )}

        {currentView === 'about' && (
          <AboutView
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}

        {currentView === 'privacy-policy' && (
          <PrivacyPolicyView
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'terms-of-service' && (
          <TermsOfServiceView
            onNavigateToContact={() => handleNavigate('contact')}
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
          />
        )}

        {currentView === 'refund-policy' && (
          <RefundPolicyView
            onNavigateToContact={() => handleNavigate('contact')}
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
          />
        )}

        {currentView === 'support' && (
          <SupportView
            onOpenEstimator={() => handleOpenEstimatorWithParams()}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyToggle={handleCurrencyToggle}
      />

      {/* Multi-Step Moving Estimator Modal */}
      <MovingEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        initialParams={estimatorParams}
        onMoveCreated={(newId) => {
          // allow staying on the screen to see confirmation
        }}
      />

      {/* Video Survey Modal */}
      <VideoSurveyModal
        isOpen={isVideoSurveyOpen}
        onClose={() => setIsVideoSurveyOpen(false)}
      />

      {/* Quick Call Modal */}
      <QuickCallModal
        isOpen={isQuickCallOpen}
        onClose={() => setIsQuickCallOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <MoveProvider>
      <MainApp />
    </MoveProvider>
  );
}
