/**
 * Dynamically load the SpatialChat SDK from the configured baseUrl.
 * This script must load AFTER config.js.
 */
(function() {
  'use strict';

  // Wait for config to be available
  if (!window.SpatialChatConfig || !window.SpatialChatConfig.sdkUrl) {
    console.error('[load-sdk] SpatialChatConfig not found. Make sure config.js loads first.');
    return;
  }

  // Create script element to load SDK
  const script = document.createElement('script');
  script.src = window.SpatialChatConfig.sdkUrl;
  script.async = false; // Load in order
  script.defer = true;

  script.onload = function() {
    console.log('[load-sdk] SpatialChat SDK loaded successfully from:', window.SpatialChatConfig.sdkUrl);
    
    // Enable debug mode if in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
      if (window.SpatialChatAPI) {
        window.SpatialChatAPI.enableDebug();
      }
    }
  };

  script.onerror = function() {
    console.error('[load-sdk] Failed to load SpatialChat SDK from:', window.SpatialChatConfig.sdkUrl);
    console.error('[load-sdk] Make sure the SDK is deployed and accessible.');
  };

  // Inject into document head
  document.head.appendChild(script);
})();
