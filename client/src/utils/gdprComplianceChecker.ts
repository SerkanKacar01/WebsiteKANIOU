/**
 * GDPR Compliance Checker Utility
 * Verifies that all third-party scripts and cookies respect user consent
 */

export interface ComplianceCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  details?: string;
}

export interface ComplianceReport {
  overall: 'compliant' | 'non-compliant' | 'partial';
  checks: ComplianceCheck[];
  recommendations: string[];
}

export function runComplianceCheck(): ComplianceReport {
  const checks: ComplianceCheck[] = [];
  const recommendations: string[] = [];

  // Check 1: Cookiebot script presence and position
  const cookiebotScript = document.querySelector('#Cookiebot') as HTMLScriptElement;
  if (cookiebotScript) {
    const isFirst = document.head.children[0] === cookiebotScript || 
                   Array.from(document.head.children).findIndex(el => el.tagName === 'SCRIPT') === 0;
    
    checks.push({
      name: 'Cookiebot Script Position',
      status: isFirst ? 'pass' : 'warning',
      description: isFirst ? 'Cookiebot loads first' : 'Cookiebot should be the first script',
      details: isFirst ? undefined : 'Move Cookiebot script to be the very first script in head'
    });

    // Check domain ID configuration
    const domainId = cookiebotScript.getAttribute('data-cbid');
    const isConfigured = domainId && domainId !== 'YOUR_COOKIEBOT_DOMAIN_GROUP_ID' && domainId.length > 10;
    
    checks.push({
      name: 'Cookiebot Domain ID',
      status: isConfigured ? 'pass' : 'fail',
      description: isConfigured ? 'Domain ID configured' : 'Placeholder domain ID detected',
      details: isConfigured ? undefined : 'Replace YOUR_COOKIEBOT_DOMAIN_GROUP_ID with actual domain ID'
    });

    if (!isConfigured) {
      recommendations.push('Get your Domain Group ID from https://manage.cookiebot.com/');
      recommendations.push('Enable Auto-blocking mode in Cookiebot dashboard');
    }
  } else {
    checks.push({
      name: 'Cookiebot Script',
      status: 'fail',
      description: 'Cookiebot script not found',
      details: 'Add Cookiebot script to head section'
    });
  }

  // Check 2: Third-party scripts have proper data attributes
  const scripts = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[];
  const thirdPartyScripts = scripts.filter(script => {
    const src = script.src;
    return src && (
      src.includes('googletagmanager.com') ||
      src.includes('google-analytics.com') ||
      src.includes('facebook.net') ||
      src.includes('connect.facebook.net') ||
      src.includes('doubleclick.net') ||
      src.includes('googlesyndication.com')
    );
  });

  let properlyMarkedScripts = 0;
  thirdPartyScripts.forEach(script => {
    const hasDataAttribute = script.hasAttribute('data-cookieconsent');
    const hasTextPlain = script.type === 'text/plain';
    
    if (hasDataAttribute && hasTextPlain) {
      properlyMarkedScripts++;
    }
  });

  if (thirdPartyScripts.length > 0) {
    checks.push({
      name: 'Third-party Script Blocking',
      status: properlyMarkedScripts === thirdPartyScripts.length ? 'pass' : 'fail',
      description: `${properlyMarkedScripts}/${thirdPartyScripts.length} scripts properly marked`,
      details: properlyMarkedScripts < thirdPartyScripts.length ? 
        'Some scripts missing data-cookieconsent attributes or type="text/plain"' : undefined
    });

    if (properlyMarkedScripts < thirdPartyScripts.length) {
      recommendations.push('Add data-cookieconsent and type="text/plain" to all third-party scripts');
    }
  }

  // Check 3: Cookie presence before consent
  const cookies = document.cookie.split(';').map(c => c.trim());
  const suspiciousCookies = cookies.filter(cookie => {
    const name = cookie.split('=')[0].toLowerCase();
    return name.includes('_ga') || 
           name.includes('_fbp') || 
           name.includes('_gcl') ||
           name.includes('__utm') ||
           name.includes('_hjid');
  });

  checks.push({
    name: 'Pre-consent Cookie Check',
    status: suspiciousCookies.length === 0 ? 'pass' : 'fail',
    description: suspiciousCookies.length === 0 ? 
      'No tracking cookies before consent' : 
      `${suspiciousCookies.length} tracking cookies found`,
    details: suspiciousCookies.length > 0 ? 
      `Found: ${suspiciousCookies.map(c => c.split('=')[0]).join(', ')}` : undefined
  });

  if (suspiciousCookies.length > 0) {
    recommendations.push('Enable auto-blocking in Cookiebot dashboard');
    recommendations.push('Check server-side cookie setting code');
  }

  // Check 4: Cookiebot functionality
  const cookiebotLoaded = !!window.Cookiebot;
  checks.push({
    name: 'Cookiebot API',
    status: cookiebotLoaded ? 'pass' : 'warning',
    description: cookiebotLoaded ? 'Cookiebot API available' : 'Cookiebot API not loaded',
    details: cookiebotLoaded ? undefined : 'Check network connection and domain ID'
  });

  // Determine overall compliance
  const failCount = checks.filter(c => c.status === 'fail').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;
  
  let overall: 'compliant' | 'non-compliant' | 'partial';
  if (failCount === 0 && warningCount === 0) {
    overall = 'compliant';
  } else if (failCount > 0) {
    overall = 'non-compliant';
  } else {
    overall = 'partial';
  }

  // Add general recommendations
  if (overall !== 'compliant') {
    recommendations.push('Test in incognito mode to verify no cookies are set before consent');
    recommendations.push('Check DevTools Application > Cookies during testing');
  }

  return {
    overall,
    checks,
    recommendations: Array.from(new Set(recommendations)) // Remove duplicates
  };
}

export function logComplianceReport(): void {
  const report = runComplianceCheck();
  
  console.group('🔒 GDPR Compliance Report');
  console.log(`Overall Status: ${report.overall.toUpperCase()}`);
  
  console.group('Checks:');
  report.checks.forEach(check => {
    const icon = check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${check.name}: ${check.description}`);
    if (check.details) {
      console.log(`   ${check.details}`);
    }
  });
  console.groupEnd();

  if (report.recommendations.length > 0) {
    console.group('Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
    console.groupEnd();
  }

  console.groupEnd();
}