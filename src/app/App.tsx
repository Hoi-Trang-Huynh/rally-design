import { BrowserRouter, Routes, Route } from "react-router";
import HomeScreen from "../screens/home";
import SessionOverviewScreen from "../screens/session-overview";
import SessionOverviewCapture from "../screens/session-overview/capture";
import TimelineScreen from "../screens/session-overview/timeline";
import DashboardScreen from "../screens/dashboard";
import ExploreMapScreen from "../screens/explore-map";
import SessionLibraryScreen from "../screens/session-library";
import SessionMapScreen from "../screens/session-map";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/session-overview" element={<SessionOverviewScreen />} />
        <Route path="/session-overview/capture" element={<SessionOverviewCapture />} />
        <Route path="/session-overview/timeline" element={<TimelineScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/explore" element={<ExploreMapScreen />} />
        <Route path="/session/:id/library" element={<SessionLibraryScreen />} />
        <Route path="/session/:id/map" element={<SessionMapScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
