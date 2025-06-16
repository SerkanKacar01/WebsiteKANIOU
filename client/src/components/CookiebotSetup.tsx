import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, ExternalLink, Copy, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { runComplianceCheck, logComplianceReport, type ComplianceReport } from "@/utils/gdprComplianceChecker";

export function CookiebotSetup() {
  const [complianceReport, setComplianceReport] = useState<ComplianceReport | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    // Run compliance check after page load
    const checkCompliance = () => {
      try {
        const report = runComplianceCheck();
        setComplianceReport(report);
        
        // Show setup panel if not compliant
        if (report.overall !== 'compliant') {
          setShowSetup(true);
        }
      } catch (error) {
        console.warn('Compliance check failed:', error);
      }
    };

    // Initial check after delay
    setTimeout(checkCompliance, 2000);
    
    // Periodic checks during development
    const interval = setInterval(checkCompliance, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Only show when not compliant
  if (!showSetup || !complianceReport) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600';
      case 'partial': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 max-w-md z-50 bg-white border border-red-200 rounded-lg shadow-lg p-4">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            GDPR Compliance Status
            <Badge variant="destructive" className={getStatusColor(complianceReport.overall)}>
              {complianceReport.overall}
            </Badge>
          </h3>
          
          <div className="space-y-3 text-sm">
            {complianceReport.checks.map((check, index) => (
              <div key={index} className="flex items-center gap-2">
                {getStatusIcon(check.status)}
                <span className="flex-1">{check.name}</span>
                <Badge variant={check.status === 'pass' ? 'default' : 'destructive'} className="text-xs">
                  {check.status}
                </Badge>
              </div>
            ))}

            {complianceReport.recommendations.length > 0 && (
              <Alert>
                <AlertDescription className="text-xs">
                  <strong>Required Actions:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    {complianceReport.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ol>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open('https://manage.cookiebot.com/', '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Dashboard
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => logComplianceReport()}
              >
                <Shield className="w-3 h-3 mr-1" />
                Console Log
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowSetup(false)}
              >
                Hide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}