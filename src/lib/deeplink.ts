export const APP_STORE_URL = 'https://apps.apple.com/app/outspire/id0000000000';
export const AFDIAN_URL = 'https://afdian.com/item/8ea3c1a8062011f0b76c52540025c377';
export const APP_SCHEME = 'outspire://';

export type DeepLinkPath = 
  | 'today'
  | 'classtable'
  | `club/${string}`
  | `addactivity/${string}`;

// Detect iOS devices
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

// Detect Android devices
export function isAndroid(): boolean {
  return /Android/.test(navigator.userAgent);
}

// Detect WeChat browser
export function isWeChat(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent);
}

// Detect if browser is an in-app browser that might block URL schemes
export function isInAppBrowser(): boolean {
  const ua = navigator.userAgent;
  return isWeChat() || 
    /Line\//i.test(ua) || 
    /FBAN|FBAV/i.test(ua) || // Facebook
    /QQ\//i.test(ua) ||
    /Instagram/i.test(ua) ||
    /Weibo/i.test(ua);
}

// More reliable app installation check - but requires user interaction
export function openApp(urlScheme: string): void {
  // Detecting if the app opens successfully is difficult and unreliable
  // Best approach is to try opening and provide clear fallback instructions
  
  // For iOS devices
  if (isIOS()) {
    // Create and use a link element approach which works better on iOS
    const link = document.createElement('a');
    link.setAttribute('href', urlScheme);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } 
  // For Android and other devices
  else {
    // Direct location change works better for Android
    window.location.href = urlScheme;
  }
}

export function createDeepLink(path: DeepLinkPath): string {
  return `${APP_SCHEME}${path}`;
}

export function createUniversalLink(path: DeepLinkPath): string {
  return `https://outspire.wrye.dev/app/${path}`;
}

export function handleUniversalLink(path: string): void {
  // This function will be called from the page
  // We'll implement a user-initiated approach instead of automatic opening
  // The UI in the page will handle showing the right buttons/options
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
