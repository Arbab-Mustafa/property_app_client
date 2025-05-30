import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Invest from "@/pages/Invest";
import Updates from "@/pages/Updates";
import Contact from "@/pages/Contact";
import InflationCalculator from "@/pages/InflationCalculator";
import BookCall from "@/pages/BookCall";
import Terms from "@/pages/Terms";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudy1 from "@/pages/CaseStudy1";
import CaseStudy2 from "@/pages/CaseStudy2";
import FindYouADeal from "@/pages/FindYouADeal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/invest" component={Invest} />
      <Route path="/updates" component={Updates} />
      <Route path="/contact" component={Contact} />
      <Route path="/inflation-calculator" component={InflationCalculator} />
      <Route path="/book-call" component={BookCall} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/property-1" component={CaseStudy1} />
      <Route path="/case-studies/property-2" component={CaseStudy2} />
      <Route path="/find-you-a-deal" component={FindYouADeal} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

// WordPress integration support
const wordPressData = {
  site: {
    name: "KR Property Investments",
    description: "Expert property investment opportunities"
  },
  plugins: {},
  integratePlugin: (pluginName: string, config: any) => {
    // This function would handle WordPress plugin integration
    (wordPressData.plugins as any)[pluginName] = config;
    return true;
  }
};

// Make WordPress data available globally for plugin integration
(window as any).wpData = wordPressData;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Toaster />
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
