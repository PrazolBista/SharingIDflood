// Define the list of Microsoft domains to track
const microsoftDomains = [
  'learn.microsoft.com',
  'code.visualstudio.com',
  'azure.microsoft.com',
  'techcommunity.microsoft.com',
  'social.technet.microsoft.com',
  'social.msdn.microsoft.com',
  'devblogs.microsoft.com',
  'developer.microsoft.com',
  'cloudblogs.microsoft.com',
];

// Define your unique URL sharing ID
const sharingID = 'studentamb_####';

// Listen for page loads
browser.webNavigation.onCompleted.addListener(details => {
  // Check if the URL is a Microsoft domain
  if (microsoftDomains.some(domain => details.url.includes(domain))) {
    // Remove any language locale from the URL
    const url = details.url.replace(/\/[a-z]{2}-[a-z]{2}\//i, '/');
    
    // Check if the URL already has a query string
    const separator = url.includes('?') ? '&' : '?';
    
    // Add the sharing ID to the end of the URL
    const newURL = `${url}${separator}wt.mc_id=${sharingID}`;
    
    // Update the browser tab with the new URL
    browser.tabs.update(details.tabId, { url: newURL });
  }
}, { url: microsoftDomains.map(domain => ({ hostEquals: domain })) });
