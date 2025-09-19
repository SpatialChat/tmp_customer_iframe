(function () {
  const isFramed = window.self !== window.top;
  const REQUEST_TIMEOUT_MS = 2000;
  const pendingRequests = new Map();

  const defaultConfig = {
    baseSpaceUrl: 'https://app.spatial.chat/s/9jfap09DMzRvev3yLVpK',
    links: {
      '#hall-a-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-a-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-a-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-b-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-b-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-b-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-c-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-c-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-c-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-d-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-d-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-d-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-e-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-e-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-e-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-f-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-f-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-f-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-g-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-g-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-g-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-h-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-h-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-h-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-i-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-i-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-i-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-j-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-j-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-j-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-k-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-k-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-k-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
      '#hall-l-breakout': 'YtyjFQHOjhy2wS0NHEQn',
      '#hall-l-stage': 'BiEEiaLQM1NbyQIbdAn5',
      '#hall-l-workplace': 'l0DdxaJWrpHSxiqPK0Wi',
    },
  };

  function buildConfig() {
    const overrides = window.SpatialChatConfig || {};
    const baseSpaceUrl =
      typeof overrides.baseSpaceUrl === 'string' && overrides.baseSpaceUrl.trim()
        ? overrides.baseSpaceUrl.trim()
        : defaultConfig.baseSpaceUrl;

    const links = { ...defaultConfig.links, ...(overrides.links || {}) };

    return { baseSpaceUrl, links };
  }

  const config = buildConfig();

  function buildFallbackUrl(roomId, fallbackBase = config.baseSpaceUrl) {
    if (!fallbackBase) {
      return '';
    }

    try {
      const url = new URL(fallbackBase, window.location.href);

      if (roomId) {
        url.searchParams.set('room', roomId);
      }

      return url.toString();
    } catch (_error) {
      return fallbackBase;
    }
  }

  function ensureNotificationHost() {
    let host = document.getElementById('expo-notifications');

    if (!host) {
      host = document.createElement('div');
      host.id = 'expo-notifications';
      document.body.appendChild(host);
    }

    return host;
  }

  function showNotification(message, fallbackUrl) {
    const host = ensureNotificationHost();
    host.innerHTML = '';

    const panel = document.createElement('div');
    panel.className = 'expo-notification';

    const text = document.createElement('span');
    text.className = 'expo-notification__message';
    text.textContent = message;
    panel.appendChild(text);

    if (fallbackUrl) {
      const link = document.createElement('a');
      link.className = 'expo-notification__action';
      link.href = fallbackUrl;
      link.rel = 'noopener noreferrer';
      link.target = isFramed ? '_blank' : '_self';
      link.textContent = 'Open in SpatialChat';
      panel.appendChild(link);
    }

    host.appendChild(panel);
  }

  function generateRequestId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function tryTopNavigation(url) {
    if (!isFramed) {
      return false;
    }

    try {
      window.top.location.href = url;
      return true;
    } catch (_error) {
      return false;
    }
  }

  function requestParentRoomNavigation(roomId) {
    if (!isFramed) {
      return null;
    }

    const trimmed = roomId.trim();

    if (!trimmed) {
      return null;
    }

    try {
      const requestId = generateRequestId('room');
      window.parent.postMessage(
        JSON.stringify({ name: 'navigate_room', payload: { roomId: trimmed }, requestId }),
        '*'
      );

      return requestId;
    } catch (_error) {
      return null;
    }
  }

  function requestParentNavigation(url) {
    if (!isFramed) {
      return null;
    }

    try {
      const requestId = generateRequestId('parent');
      window.parent.postMessage(
        JSON.stringify({ name: 'navigate_parent', payload: { url }, requestId }),
        '*'
      );

      return requestId;
    } catch (_error) {
      return null;
    }
  }

  function resolveRoomId(element) {
    const configuredId = configuredTargets.get(element);

    if (configuredId && configuredId.trim()) {
      return configuredId.trim();
    }

    const dataId = element.getAttribute('data-room-id');

    if (dataId && dataId.trim()) {
      return dataId.trim();
    }

    return extractRoomIdFromUrl(element.getAttribute('href'));
  }

  function extractRoomIdFromUrl(url) {
    if (!url) {
      return '';
    }

    try {
      const parsed = new URL(url, window.location.href);
      const roomParam = parsed.searchParams.get('room');

      return roomParam ? roomParam.trim() : '';
    } catch (_error) {
      return '';
    }
  }

  function handleNavigationFailure(fallbackUrl) {
    showNotification(
      'We could not jump into that hall automatically. Use the direct link below to open it in SpatialChat.',
      fallbackUrl
    );
  }

  function handleNavigationResult(event) {
    if (event.source !== window.parent) {
      return;
    }

    let payload = event.data;

    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (_error) {
        return;
      }
    }

    if (!payload || typeof payload !== 'object') {
      return;
    }

    if (payload.name !== 'navigation_result' || typeof payload.requestId !== 'string') {
      return;
    }

    const entry = pendingRequests.get(payload.requestId);

    if (!entry) {
      return;
    }

    pendingRequests.delete(payload.requestId);

    if (entry.timer) {
      window.clearTimeout(entry.timer);
    }

    const success = Boolean(payload.data && payload.data.success);

    if (success) {
      entry.onSuccess && entry.onSuccess();
    } else {
      entry.onFailure && entry.onFailure();
    }
  }

  window.addEventListener('message', handleNavigationResult);

  const configuredTargets = new Map();

  function registerConfiguredTargets() {
    Object.entries(config.links || {}).forEach(([selector, roomId]) => {
      if (!roomId) {
        return;
      }

      try {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
          configuredTargets.set(element, roomId);
        });
      } catch (_error) {
        // ignore invalid selectors
      }
    });
  }

  function collectClickableElements() {
    const elements = new Set();

    configuredTargets.forEach((_roomId, element) => {
      elements.add(element);
    });

    document.querySelectorAll('[data-room-id]').forEach((element) => {
      elements.add(element);
    });

    document.querySelectorAll('a.room-card').forEach((element) => {
      elements.add(element);
    });

    return Array.from(elements);
  }

  function wireElement(element) {
    const originalHref = element.getAttribute('href') || '';
    const roomId = resolveRoomId(element);
    const fallbackUrl = buildFallbackUrl(roomId, originalHref || config.baseSpaceUrl);

    if (roomId && fallbackUrl) {
      element.setAttribute('data-room-id', roomId);
      element.setAttribute('href', fallbackUrl);
    }

    element.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();

      const resolvedRoomId = resolveRoomId(element);
      const resolvedFallback = buildFallbackUrl(resolvedRoomId, element.getAttribute('href'));

      if (!isFramed) {
        window.location.href = resolvedFallback || originalHref || config.baseSpaceUrl;
        return;
      }

      if (resolvedRoomId) {
        if (tryTopNavigation(resolvedFallback)) {
          return;
        }

        const requestId = requestParentRoomNavigation(resolvedRoomId);

        if (requestId) {
          const timer = window.setTimeout(() => {
            pendingRequests.delete(requestId);
            handleNavigationFailure(resolvedFallback);
          }, REQUEST_TIMEOUT_MS);

          pendingRequests.set(requestId, {
            timer,
            onFailure: () => handleNavigationFailure(resolvedFallback),
          });

          return;
        }
      }

      const parentRequestId = requestParentNavigation(resolvedFallback || originalHref);

      if (parentRequestId) {
        const timer = window.setTimeout(() => {
          pendingRequests.delete(parentRequestId);
          handleNavigationFailure(resolvedFallback || originalHref || config.baseSpaceUrl);
        }, REQUEST_TIMEOUT_MS);

        pendingRequests.set(parentRequestId, {
          timer,
          onFailure: () => handleNavigationFailure(resolvedFallback || originalHref || config.baseSpaceUrl),
        });

        return;
      }

      handleNavigationFailure(resolvedFallback || originalHref || config.baseSpaceUrl);
    });
  }

  function initTour() {
    if (typeof window.Driver === 'undefined') {
      return;
    }

    const driver = new window.Driver({
      allowClose: false,
      opacity: 0.75,
      animate: true,
      padding: 8,
    });

    driver.defineSteps([
      {
        element: '.map-board',
        popover: {
          title: 'Explore the expo map',
          description: 'Pick any hall to jump straight into its SpatialChat experience.',
          position: 'bottom',
        },
      },
      {
        element: '#hall-a-breakout',
        popover: {
          title: 'Every hall has three rooms',
          description: 'Breakout, Stage, and Workplace buttons map to live SpatialChat rooms.',
          position: 'left',
        },
      },
      {
        element: '.home-footer',
        popover: {
          title: 'Prefer quick links?',
          description: 'Use the shortcuts here if you already know where you want to go.',
          position: 'top',
        },
      },
    ]);

    const storedState = window.localStorage.getItem('expoTourState');
    const state = storedState ? JSON.parse(storedState) : { hasSeen: false, dismissed: false };

    const overlay = document.getElementById('expo-overlay');
    const startCTA = document.getElementById('start-tour-now');
    const skipCTA = document.getElementById('skip-tour');
    const relaunchButton = document.getElementById('start-tour');

    const startTour = () => {
      overlay?.setAttribute('hidden', '');
      driver.reset();
      driver.start();
      window.localStorage.setItem(
        'expoTourState',
        JSON.stringify({ hasSeen: true, dismissed: true })
      );
    };

    const dismissOverlay = () => {
      overlay?.setAttribute('hidden', '');
      window.localStorage.setItem(
        'expoTourState',
        JSON.stringify({ hasSeen: true, dismissed: true })
      );
    };

    if (!state.dismissed && overlay) {
      overlay.removeAttribute('hidden');
    }

    startCTA?.addEventListener('click', startTour);
    skipCTA?.addEventListener('click', dismissOverlay);

    relaunchButton?.addEventListener('click', () => {
      driver.reset();
      driver.start();
      window.localStorage.setItem(
        'expoTourState',
        JSON.stringify({ hasSeen: true, dismissed: true })
      );
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    registerConfiguredTargets();
    collectClickableElements().forEach(wireElement);
    initTour();
  });
})();
