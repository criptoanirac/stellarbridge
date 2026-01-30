import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationCenter } from "./components/NotificationCenter";
import Onboarding from "./pages/Onboarding";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import TalentBank from "./pages/TalentBank";
import Matchmaking from "@/pages/Matchmaking";
import SocialImpact from "@/pages/SocialImpact";
import TalentProfile from "./pages/TalentProfile";
import TalentSignup from "./pages/TalentSignup";
import TalentDashboard from "./pages/TalentDashboard";
import TrainingHub from "./pages/TrainingHub";
import ProfessionalDevelopment from "./pages/ProfessionalDevelopment";
import Bridge from "./pages/Bridge";
import Landing from "./pages/Landing";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Onboarding} />
      <Route path={"/landing"} component={Landing} />
      <Route path={"/talent-signup"} component={TalentSignup} />
      <Route path={"/talent-dashboard"} component={TalentDashboard} />
      <Route path={"/training-hub"} component={TrainingHub} />
      <Route path={"/professional-development"} component={ProfessionalDevelopment} />
      <Route path={"/bridge"} component={Bridge} />
      <Route path={"/employer-dashboard"} component={EmployerDashboard} />
      <Route path={"/post-job"} component={PostJob} />
      <Route path={"/manage-jobs"} component={ManageJobs} />
      <Route path={"/talent-bank"} component={TalentBank} />
        <Route path="/matchmaking" component={Matchmaking} />
        <Route path="/impacto-social" component={SocialImpact} />
      <Route path={"/talent-profile/:talentId"} component={TalentProfile} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <NotificationCenter />
            <Router />
          </TooltipProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;