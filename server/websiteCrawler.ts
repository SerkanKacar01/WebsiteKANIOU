/**
 * KANIOU Website Content Crawler & Indexing System
 * STEP 1: Full site crawl and knowledge extraction for chatbot intelligence
 */

import * as cheerio from 'cheerio';
import { storage } from './storage';
import type { InsertWebsiteContentIndex } from '@shared/schema';

export interface CrawlConfiguration {
  baseUrl: string;
  maxPages: number;
  includeExternalLinks: boolean;
  respectRobotsTxt: boolean;
  crawlDelay: number; // milliseconds between requests
  supportedLanguages: string[];
}

export interface ExtractedContent {
  pageUrl: string;
  pageTitle: string;
  category: string;
  subCategory?: string;
  language: string;
  contentType: string;
  headingText: string;
  bodyContent: string;
  metaDescription?: string;
  keywords: string[];
  images: Array<{ url: string; alt: string }>;
  links: Array<{ url: string; text: string; type: 'internal' | 'external' }>;
  structuredData?: any;
}

export interface CrawlResults {
  totalPages: number;
  successfullyIndexed: number;
  errors: string[];
  categories: Record<string, number>;
  languages: Record<string, number>;
}

const DEFAULT_CRAWL_CONFIG: CrawlConfiguration = {
  baseUrl: 'https://kaniou.be',
  maxPages: 200,
  includeExternalLinks: false,
  respectRobotsTxt: true,
  crawlDelay: 1000,
  supportedLanguages: ['nl', 'fr', 'en', 'tr']
};

/**
 * Main website crawling function - STEP 1 implementation
 */
export async function crawlKaniouWebsite(config: Partial<CrawlConfiguration> = {}): Promise<CrawlResults> {
  const crawlConfig = { ...DEFAULT_CRAWL_CONFIG, ...config };
  
  console.log('🚀 Starting KANIOU Website Content Crawl (STEP 1)');
  console.log(`📍 Base URL: ${crawlConfig.baseUrl}`);
  console.log(`📄 Max Pages: ${crawlConfig.maxPages}`);
  console.log(`🌍 Languages: ${crawlConfig.supportedLanguages.join(', ')}`);
  
  const results: CrawlResults = {
    totalPages: 0,
    successfullyIndexed: 0,
    errors: [],
    categories: {},
    languages: {}
  };

  try {
    // Define comprehensive page categories for KANIOU
    const pagesToCrawl = await buildComprehensivePageList(crawlConfig.baseUrl);
    
    console.log(`📋 Found ${pagesToCrawl.length} pages to crawl`);
    
    for (const pageInfo of pagesToCrawl) {
      try {
        console.log(`🔍 Crawling: ${pageInfo.url}`);
        
        // Add delay between requests
        if (results.totalPages > 0) {
          await new Promise(resolve => setTimeout(resolve, crawlConfig.crawlDelay));
        }
        
        const extractedContent = await extractPageContent(pageInfo.url, pageInfo.category, pageInfo.language);
        
        if (extractedContent) {
          // Store in database
          await storage.createWebsiteContentIndex({
            pageUrl: extractedContent.pageUrl,
            pageTitle: extractedContent.pageTitle,
            category: extractedContent.category,
            subCategory: extractedContent.subCategory,
            language: extractedContent.language,
            contentType: extractedContent.contentType,
            headingText: extractedContent.headingText,
            bodyContent: extractedContent.bodyContent,
            metaDescription: extractedContent.metaDescription,
            keywords: extractedContent.keywords,
            images: extractedContent.images,
            links: extractedContent.links,
            structuredData: extractedContent.structuredData,
            crawlSource: 'automated'
          });
          
          results.successfullyIndexed++;
          results.categories[extractedContent.category] = (results.categories[extractedContent.category] || 0) + 1;
          results.languages[extractedContent.language] = (results.languages[extractedContent.language] || 0) + 1;
          
          console.log(`✅ Indexed: ${extractedContent.pageTitle} [${extractedContent.category}]`);
        }
        
        results.totalPages++;
        
      } catch (error) {
        const errorMsg = `Failed to process ${pageInfo.url}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        results.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }
    
    console.log('\n🎯 CRAWL COMPLETE - STEP 1 RESULTS:');
    console.log(`📊 Total Pages Processed: ${results.totalPages}`);
    console.log(`✅ Successfully Indexed: ${results.successfullyIndexed}`);
    console.log(`📂 Categories Found:`, results.categories);
    console.log(`🌍 Languages Indexed:`, results.languages);
    
    if (results.errors.length > 0) {
      console.log(`⚠️  Errors: ${results.errors.length}`);
    }
    
  } catch (error) {
    console.error('💥 Crawl failed:', error);
    results.errors.push(`Crawl failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return results;
}

/**
 * Build comprehensive list of pages to crawl based on KANIOU website structure
 */
async function buildComprehensivePageList(baseUrl: string): Promise<Array<{ url: string; category: string; language: string }>> {
  const pages = [
    // Homepage
    { url: `${baseUrl}`, category: 'company', language: 'nl' },
    { url: `${baseUrl}/fr`, category: 'company', language: 'fr' },
    { url: `${baseUrl}/en`, category: 'company', language: 'en' },
    
    // Product Categories - Dutch
    { url: `${baseUrl}/gordijnen`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/vouwgordijnen`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/rolgordijnen`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/shutters`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/zonwering`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/lamellen`, category: 'products', language: 'nl' },
    
    // Product Categories - French
    { url: `${baseUrl}/fr/rideaux`, category: 'products', language: 'fr' },
    { url: `${baseUrl}/fr/stores-plisses`, category: 'products', language: 'fr' },
    { url: `${baseUrl}/fr/stores-enrouleurs`, category: 'products', language: 'fr' },
    { url: `${baseUrl}/fr/volets`, category: 'products', language: 'fr' },
    
    // Services
    { url: `${baseUrl}/diensten`, category: 'services', language: 'nl' },
    { url: `${baseUrl}/opmeten`, category: 'services', language: 'nl' },
    { url: `${baseUrl}/installatie`, category: 'installation', language: 'nl' },
    { url: `${baseUrl}/advies`, category: 'services', language: 'nl' },
    { url: `${baseUrl}/fr/services`, category: 'services', language: 'fr' },
    { url: `${baseUrl}/fr/mesure`, category: 'services', language: 'fr' },
    { url: `${baseUrl}/fr/installation`, category: 'installation', language: 'fr' },
    
    // Pricing & Information
    { url: `${baseUrl}/prijzen`, category: 'pricing', language: 'nl' },
    { url: `${baseUrl}/offerte`, category: 'pricing', language: 'nl' },
    { url: `${baseUrl}/fr/prix`, category: 'pricing', language: 'fr' },
    { url: `${baseUrl}/fr/devis`, category: 'pricing', language: 'fr' },
    
    // Support & FAQ
    { url: `${baseUrl}/faq`, category: 'faq', language: 'nl' },
    { url: `${baseUrl}/veelgestelde-vragen`, category: 'faq', language: 'nl' },
    { url: `${baseUrl}/fr/faq`, category: 'faq', language: 'fr' },
    { url: `${baseUrl}/garantie`, category: 'warranty', language: 'nl' },
    { url: `${baseUrl}/onderhoud`, category: 'maintenance', language: 'nl' },
    { url: `${baseUrl}/fr/garantie`, category: 'warranty', language: 'fr' },
    
    // Company Information
    { url: `${baseUrl}/over-ons`, category: 'company', language: 'nl' },
    { url: `${baseUrl}/showroom`, category: 'company', language: 'nl' },
    { url: `${baseUrl}/contact`, category: 'support', language: 'nl' },
    { url: `${baseUrl}/fr/a-propos`, category: 'company', language: 'fr' },
    { url: `${baseUrl}/fr/showroom`, category: 'company', language: 'fr' },
    { url: `${baseUrl}/fr/contact`, category: 'support', language: 'fr' },
    
    // Customer Support
    { url: `${baseUrl}/klantenservice`, category: 'support', language: 'nl' },
    { url: `${baseUrl}/levering`, category: 'support', language: 'nl' },
    { url: `${baseUrl}/betaling`, category: 'support', language: 'nl' },
    { url: `${baseUrl}/fr/service-client`, category: 'support', language: 'fr' },
    { url: `${baseUrl}/fr/livraison`, category: 'support', language: 'fr' },
    
    // Specific Product Pages (examples - these would be discovered dynamically)
    { url: `${baseUrl}/gordijnen/klassieke-gordijnen`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/gordijnen/moderne-gordijnen`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/vouwgordijnen/blackout`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/rolgordijnen/dag-nacht`, category: 'products', language: 'nl' },
    { url: `${baseUrl}/shutters/houten-shutters`, category: 'products', language: 'nl' },
  ];
  
  return pages;
}

/**
 * Extract comprehensive content from a single page
 */
async function extractPageContent(url: string, category: string, language: string): Promise<ExtractedContent | null> {
  try {
    console.log(`🔍 Fetching: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract title
    const pageTitle = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled Page';
    
    // Extract meta description
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    // Extract all headings for structure
    const headings: string[] = [];
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const heading = $(el).text().trim();
      if (heading) headings.push(heading);
    });
    const headingText = headings.join(' | ');
    
    // Extract body content (remove scripts, styles, nav, footer)
    $('script, style, nav, footer, .navigation, .menu').remove();
    const bodyContent = $('body').text()
      .replace(/\s+/g, ' ')
      .trim();
    
    // Extract keywords from content
    const keywords = extractKeywords(bodyContent, language);
    
    // Extract images
    const images: Array<{ url: string; alt: string }> = [];
    $('img').each((_, el) => {
      const src = $(el).attr('src');
      const alt = $(el).attr('alt') || '';
      if (src) {
        images.push({
          url: src.startsWith('http') ? src : new URL(src, url).href,
          alt
        });
      }
    });
    
    // Extract links
    const links: Array<{ url: string; text: string; type: 'internal' | 'external' }> = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && text) {
        const isInternal = href.startsWith('/') || href.includes('kaniou.be');
        links.push({
          url: href.startsWith('http') ? href : new URL(href, url).href,
          text,
          type: isInternal ? 'internal' : 'external'
        });
      }
    });
    
    // Determine content type
    const contentType = determineContentType(url, pageTitle, bodyContent);
    
    // Extract structured data
    const structuredData = extractStructuredData($);
    
    // Determine subcategory
    const subCategory = determineSubCategory(url, category);
    
    return {
      pageUrl: url,
      pageTitle,
      category,
      subCategory,
      language,
      contentType,
      headingText,
      bodyContent,
      metaDescription,
      keywords,
      images,
      links,
      structuredData
    };
    
  } catch (error) {
    console.error(`Failed to extract content from ${url}:`, error);
    return null;
  }
}

/**
 * Extract keywords based on content and language
 */
function extractKeywords(content: string, language: string): string[] {
  const commonWords = {
    nl: ['de', 'het', 'en', 'van', 'een', 'in', 'op', 'voor', 'met', 'als', 'zijn', 'dat', 'te', 'aan', 'bij'],
    fr: ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'son'],
    en: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with'],
    tr: ['ve', 'bir', 'bu', 'da', 'de', 'ile', 'için', 'var', 'olan', 'olan', 'daha', 'kadar', 'gibi']
  };
  
  const stopWords = commonWords[language as keyof typeof commonWords] || commonWords.nl;
  
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  // Count word frequency
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Return top keywords
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word);
}

/**
 * Determine content type based on URL and content
 */
function determineContentType(url: string, title: string, content: string): string {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  if (urlLower.includes('/faq') || titleLower.includes('faq') || titleLower.includes('veelgestelde')) {
    return 'faq';
  }
  
  if (urlLower.includes('/prij') || urlLower.includes('/prix') || titleLower.includes('prijs') || titleLower.includes('prix')) {
    return 'pricing-table';
  }
  
  if (urlLower.includes('/gordijn') || urlLower.includes('/rideau') || urlLower.includes('/product')) {
    return 'product-description';
  }
  
  if (urlLower.includes('/dienst') || urlLower.includes('/service') || urlLower.includes('/installatie')) {
    return 'service-info';
  }
  
  return 'general-info';
}

/**
 * Determine subcategory based on URL structure
 */
function determineSubCategory(url: string, category: string): string | undefined {
  const urlParts = url.split('/').filter(part => part.length > 0);
  
  if (category === 'products' && urlParts.length > 2) {
    return urlParts[urlParts.length - 1].replace(/[-_]/g, ' ');
  }
  
  if (category === 'services' && urlParts.length > 2) {
    return urlParts[urlParts.length - 1].replace(/[-_]/g, ' ');
  }
  
  return undefined;
}

/**
 * Extract structured data (JSON-LD, microdata)
 */
function extractStructuredData($: cheerio.CheerioAPI): any {
  const structuredData: any = {};
  
  // Extract JSON-LD
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || '');
      if (data['@type']) {
        structuredData.jsonLd = data;
      }
    } catch (e) {
      // Ignore invalid JSON-LD
    }
  });
  
  // Extract microdata
  $('[itemtype]').each((_, el) => {
    const itemType = $(el).attr('itemtype');
    if (itemType) {
      structuredData.microdata = itemType;
    }
  });
  
  return Object.keys(structuredData).length > 0 ? structuredData : undefined;
}

/**
 * Get comprehensive knowledge for chatbot from indexed content
 */
export async function getComprehensiveWebsiteKnowledge(language: string = 'nl'): Promise<string> {
  const indexedContent = await storage.getWebsiteContentIndex(language);
  
  if (indexedContent.length === 0) {
    return 'No website content has been indexed yet. Please run the website crawler first.';
  }
  
  let knowledge = `=== COMPLETE KANIOU WEBSITE KNOWLEDGE (${language.toUpperCase()}) ===\n\n`;
  
  // Group by category
  const contentByCategory: Record<string, typeof indexedContent> = {};
  indexedContent.forEach(content => {
    if (!contentByCategory[content.category]) {
      contentByCategory[content.category] = [];
    }
    contentByCategory[content.category].push(content);
  });
  
  // Build comprehensive knowledge by category
  Object.entries(contentByCategory).forEach(([category, contents]) => {
    knowledge += `\n=== ${category.toUpperCase()} ===\n`;
    
    contents.forEach(content => {
      knowledge += `\n${content.pageTitle}:\n`;
      knowledge += `URL: ${content.pageUrl}\n`;
      if (content.headingText) knowledge += `Headings: ${content.headingText}\n`;
      if (content.metaDescription) knowledge += `Description: ${content.metaDescription}\n`;
      knowledge += `Content: ${content.bodyContent.substring(0, 1000)}...\n`;
      if (content.keywords && Array.isArray(content.keywords) && content.keywords.length > 0) knowledge += `Keywords: ${content.keywords.slice(0, 10).join(', ')}\n`;
      knowledge += '\n---\n';
    });
  });
  
  return knowledge;
}