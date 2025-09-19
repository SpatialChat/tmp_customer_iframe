const roomIcons = {
  breakout: `
    <svg class="room-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="breakout-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#5bc0f8;stop-opacity:1">
            <animate attributeName="stop-color" values="#5bc0f8;#40e0d0;#5bc0f8" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style="stop-color:#40e0d0;stop-opacity:1">
            <animate attributeName="stop-color" values="#40e0d0;#5bc0f8;#40e0d0" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <g class="icon-group">
        <circle cx="25" cy="35" r="12" fill="url(#breakout-gradient)" opacity="0.8">
          <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="75" cy="35" r="12" fill="url(#breakout-gradient)" opacity="0.8">
          <animate attributeName="r" values="12;14;12" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="70" r="12" fill="url(#breakout-gradient)" opacity="0.8">
          <animate attributeName="r" values="12;14;12" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <path d="M25 35 L50 50 L75 35" stroke="url(#breakout-gradient)" stroke-width="2" fill="none" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M50 50 L50 70" stroke="url(#breakout-gradient)" stroke-width="2" fill="none" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `,
  stage: `
    <svg class="room-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stage-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff8b6b;stop-opacity:1">
            <animate attributeName="stop-color" values="#ff8b6b;#ffa14a;#ff8b6b" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style="stop-color:#ffa14a;stop-opacity:1">
            <animate attributeName="stop-color" values="#ffa14a;#ff8b6b;#ffa14a" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id="stage-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g class="icon-group">
        <rect x="20" y="25" width="60" height="40" rx="5" fill="none" stroke="url(#stage-gradient)" stroke-width="3" opacity="0.8" />
        <circle cx="50" cy="45" r="8" fill="url(#stage-gradient)" filter="url(#stage-glow)">
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M30 65 L30 75 L25 75" stroke="url(#stage-gradient)" stroke-width="2" fill="none" />
        <path d="M70 65 L70 75 L75 75" stroke="url(#stage-gradient)" stroke-width="2" fill="none" />
        <circle cx="35" cy="55" r="3" fill="url(#stage-gradient)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="55" r="3" fill="url(#stage-gradient)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="65" cy="55" r="3" fill="url(#stage-gradient)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" begin="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  `,
  workplace: `
    <svg class="room-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="workplace-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#825cff;stop-opacity:1">
            <animate attributeName="stop-color" values="#825cff;#5b48ff;#825cff" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style="stop-color:#5b48ff;stop-opacity:1">
            <animate attributeName="stop-color" values="#5b48ff;#825cff;#5b48ff" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <g class="icon-group">
        <rect x="25" y="40" width="50" height="30" rx="3" fill="none" stroke="url(#workplace-gradient)" stroke-width="2" opacity="0.8" />
        <rect x="30" y="45" width="40" height="20" rx="2" fill="url(#workplace-gradient)" opacity="0.3" />
        <rect x="25" y="70" width="50" height="3" fill="url(#workplace-gradient)" opacity="0.6" />
        <circle cx="35" cy="30" r="5" fill="url(#workplace-gradient)" opacity="0.7">
          <animate attributeName="cy" values="30;28;30" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="28" r="5" fill="url(#workplace-gradient)" opacity="0.7">
          <animate attributeName="cy" values="28;26;28" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="65" cy="30" r="5" fill="url(#workplace-gradient)" opacity="0.7">
          <animate attributeName="cy" values="30;28;30" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <path d="M40 55 L45 50 L50 55 L55 48 L60 52" stroke="url(#workplace-gradient)" stroke-width="1.5" fill="none" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  `
};

function injectRoomIcons() {
  const roomCards = document.querySelectorAll('.room-card');
  
  roomCards.forEach(card => {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'room-icon-container';
    
    if (card.classList.contains('breakout')) {
      iconContainer.innerHTML = roomIcons.breakout;
    } else if (card.classList.contains('stage')) {
      iconContainer.innerHTML = roomIcons.stage;
    } else if (card.classList.contains('workplace')) {
      iconContainer.innerHTML = roomIcons.workplace;
    }
    
    card.insertBefore(iconContainer, card.firstChild);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(injectRoomIcons, 50);
});