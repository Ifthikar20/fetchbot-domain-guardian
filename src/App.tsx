import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Targets from "./pages/Targets";
import NewScan from "./pages/NewScan";
import ScanDetail from "./pages/ScanDetail";
import Findings from "./pages/Findings";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/dashboard/targets" element={<DashboardLayout><Targets /></DashboardLayout>} />
            <Route path="/dashboard/scans" element={<DashboardLayout><NewScan /></DashboardLayout>} />
            <Route path="/dashboard/scans/:id" element={<DashboardLayout><ScanDetail /></DashboardLayout>} />
            <Route path="/dashboard/findings" element={<DashboardLayout><Findings /></DashboardLayout>} />
            <Route path="/dashboard/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
