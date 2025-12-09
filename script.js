// Include config.js before this file
// <script src="config.js"></script>
// <script src="https://your-domain.com/spatialchat-iframe-sdk.js"></script>
// <script src="script.js"></script>

// Enable debug mode (optional)
SpatialChatAPI.enableDebug();

/**
 * Navigate to room using SDK
 */
function navigateToRoom(roomId) {
  const button = event.target;
  
  // Get button text for user feedback
  const hallName = button.textContent;
  
  // Show loading state
  button.classList.add('loading');
  button.disabled = true;
  
  // Use SDK instead of raw postMessage
  SpatialChatAPI.navigateToRoom(roomId)
    .then(() => {
      showNotification('✓ Navigating to ' + hallName, 'success');
      button.classList.remove('loading');
    })
    .catch(err => {
      console.error('Navigation failed:', err);
      showNotification('✗ Failed to navigate to ' + hallName, 'error');
      button.classList.remove('loading');
      button.disabled = false;
      
      // Fallback to direct URL if available
      const config = ROOM_CONFIGS[roomId];
      if (config && config.fallbackUrl) {
        setTimeout(() => {
          if (confirm('Navigation failed. Open in new window instead?')) {
            window.open(config.fallbackUrl, '_blank');
          }
        }, 500);
      }
    });
}

/**
 * Show notification toast
 */
function showNotification(message, type) {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'notification ' + type;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Listen for platform events (future feature)
 */
const unsubscribe = SpatialChatAPI.on('roomChanged', (data) => {
  console.log('Room changed:', data);
  showNotification('Entered: ' + data.roomName, 'info');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  unsubscribe();
});

// Log SDK version on load
console.log('SpatialChat SDK v' + SpatialChatAPI.version + ' ready');
