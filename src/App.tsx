import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import WelcomePage from './components/pages/WelcomePage';
import ProfilePage from './components/pages/ProfilePage';
import PlanPage from './components/pages/PlanPage';
import TipsPage from './components/pages/TipsPage';
import PDFPage from './components/pages/PDFPage';
import PricingPage from './components/pages/PricingPage';
import DashboardPage from './components/pages/DashboardPage';
import ProgressPage from './components/pages/ProgressPage';
import WorkoutsPage from './components/pages/WorkoutsPage';
import NutritionPage from './components/pages/NutritionPage';
import CommunityPage from './components/pages/CommunityPage';
import AchievementsPage from './components/pages/AchievementsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'plan':
        return <PlanPage />;
      case 'tips':
        return <TipsPage />;
      case 'pdf':
        return <PDFPage />;
      case 'pricing':
        return <PricingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'progress':
        return <ProgressPage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'nutrition':
        return <NutritionPage />;
      case 'community':
        return <CommunityPage />;
      case 'achievements':
        return <AchievementsPage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="font-['Inter',sans-serif] text-[#1B1B1B]">
      {renderCurrentPage()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;