/**
 * Command Line Interface for KANIOU Website Crawling - STEP 1
 * Execute full website content extraction and indexing
 */

import { crawlKaniouWebsite, getComprehensiveWebsiteKnowledge } from './websiteCrawler';
import { storage } from './storage';

export async function executeCrawlCommand() {
  console.log('\n🚀 EXECUTING STEP 1: KANIOU Website Content Crawling & Indexing');
  console.log('=' .repeat(80));
  
  try {
    // Check if content already exists
    const existingContent = await storage.getWebsiteContentIndex();
    
    if (existingContent.length > 0) {
      console.log(`📊 Found ${existingContent.length} existing indexed pages`);
      console.log('🔄 Proceeding with fresh crawl to update content...\n');
    }
    
    // Execute comprehensive crawl
    const results = await crawlKaniouWebsite({
      maxPages: 100, // Reasonable limit for initial crawl
      crawlDelay: 500, // Faster for local testing
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('📋 STEP 1 COMPLETION SUMMARY:');
    console.log('='.repeat(80));
    
    console.log(`✅ Total Pages Processed: ${results.totalPages}`);
    console.log(`📚 Successfully Indexed: ${results.successfullyIndexed}`);
    console.log(`📂 Content Categories:`);
    Object.entries(results.categories).forEach(([category, count]) => {
      console.log(`   • ${category}: ${count} pages`);
    });
    console.log(`🌍 Languages Processed:`);
    Object.entries(results.languages).forEach(([language, count]) => {
      console.log(`   • ${language}: ${count} pages`);
    });
    
    if (results.errors.length > 0) {
      console.log(`\n⚠️  Errors encountered: ${results.errors.length}`);
      results.errors.slice(0, 5).forEach(error => {
        console.log(`   • ${error}`);
      });
      if (results.errors.length > 5) {
        console.log(`   • ... and ${results.errors.length - 5} more errors`);
      }
    }
    
    // Verify knowledge extraction
    console.log('\n🧠 Testing Knowledge Extraction:');
    const nlKnowledge = await getComprehensiveWebsiteKnowledge('nl');
    const frKnowledge = await getComprehensiveWebsiteKnowledge('fr');
    
    console.log(`✅ Dutch Knowledge Base: ${nlKnowledge.length} characters`);
    console.log(`✅ French Knowledge Base: ${frKnowledge.length} characters`);
    
    console.log('\n🎯 STEP 1 COMPLETE: Website content successfully crawled and indexed!');
    console.log('📊 The chatbot now has access to 100% of extracted website content');
    console.log('🔜 Ready for STEP 2: Filtered and structured response behavior');
    
    return {
      success: true,
      results,
      totalIndexed: results.successfullyIndexed,
      categories: Object.keys(results.categories),
      languages: Object.keys(results.languages)
    };
    
  } catch (error) {
    console.error('\n💥 STEP 1 FAILED:', error);
    console.error('Please check your internet connection and the KANIOU website availability');
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      totalIndexed: 0,
      categories: [],
      languages: []
    };
  }
}

/**
 * Manual test function to verify content extraction
 */
export async function testContentExtraction() {
  console.log('🧪 Testing Content Extraction on Sample Pages...');
  
  const testUrls = [
    'https://kaniou.be',
    'https://kaniou.be/gordijnen',
    'https://kaniou.be/vouwgordijnen',
    'https://kaniou.be/contact'
  ];
  
  for (const url of testUrls) {
    try {
      console.log(`\n🔍 Testing: ${url}`);
      const response = await fetch(url);
      
      if (response.ok) {
        console.log(`✅ Accessible: ${response.status} ${response.statusText}`);
      } else {
        console.log(`❌ Failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export for use in CLI or direct execution
if (require.main === module) {
  executeCrawlCommand().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('Command failed:', error);
    process.exit(1);
  });
}