export const APP_STORE_URL = 'https://apps.apple.com/app/outspire/id0000000000';
export const APP_SCHEME = 'outspire://';

export type DeepLinkPath = 
  | 'today'
  | 'classtable'
  | `club/${string}`
  | `addactivity/${string}`;

export function isAppInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    // Set a timeout for the redirect attempt
    const timeout = setTimeout(() => {
      // If we hit the timeout, the app is likely not installed
      resolve(false);
    }, 500);
    
    // Try to detect if browser switched to the app
    window.addEventListener('blur', () => {
      clearTimeout(timeout);
      resolve(true);
    }, { once: true });
    
    // Try to open the app with a simple deep link
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = APP_SCHEME;
    document.body.appendChild(iframe);
    
    // Clean up after attempt
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  });
}

export function createDeepLink(path: DeepLinkPath): string {
  return `${APP_SCHEME}${path}`;
}

export function createUniversalLink(path: DeepLinkPath): string {
  return `https://outspire.wrye.dev/app/${path}`;
}

export function handleUniversalLink(path: string): void {
  // First check if the app is installed
  isAppInstalled().then((installed) => {
    if (installed) {
      // If installed, try to open with URL scheme
      window.location.href = createDeepLink(path as DeepLinkPath);
      
      // If still on page after timeout, fall back to App Store
      setTimeout(() => {
        window.location.href = APP_STORE_URL;
      }, 1000);
    } else {
      // If not installed, go to App Store
      window.location.href = APP_STORE_URL;
    }
  });
}

// Function to extract human-readable description from path
export function getPathDescription(path: string): string {
  if (path === 'today') {
    return 'Today View';
  } else if (path === 'classtable') {
    return 'Class Table';
  } else if (path.startsWith('club/')) {
    const clubId = path.split('/')[1];
    return `Club Information (ID: ${clubId})`;
  } else if (path.startsWith('addactivity/')) {
    const clubId = path.split('/')[1];
    return `Add Activity (Club ID: ${clubId})`;
  }
  return 'Outspire App';
}
