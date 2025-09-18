(function () {
  const isFramed = window.self !== window.top;
  const pendingFallbacks = new Map();

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

  function openInNewTab(url) {
    if (!url) {
      return;
    }

    const popup = window.open(url, '_blank', 'noopener');
    if (!popup) {
      window.location.href = url;
    }
  }

  function scheduleFallbackNavigation(requestId, url) {
    if (!requestId || !url) {
      return;
    }

    let fallbackTimer = 0;

    const cleanup = () => {
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = 0;
      }

      document.removeEventListener('visibilitychange', cancelOnHidden);
      window.removeEventListener('pagehide', cancelOnPageHide);
      pendingFallbacks.delete(requestId);
    };

    const fallback = () => {
      cleanup();
      openInNewTab(url);
    };

    const cancelOnHidden = () => {
      if (document.hidden) {
        cleanup();
      }
    };

    const cancelOnPageHide = () => {
      cleanup();
    };

    fallbackTimer = window.setTimeout(fallback, 1500);

    document.addEventListener('visibilitychange', cancelOnHidden);
    window.addEventListener('pagehide', cancelOnPageHide, { once: true });

    pendingFallbacks.set(requestId, { cleanup, fallback });
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

  function buildFallbackUrl(roomId, originalUrl) {
    if (roomId && config.baseSpaceUrl) {
      try {
        const base = new URL(config.baseSpaceUrl, window.location.href);
        base.searchParams.set('room', roomId);

        return base.toString();
      } catch (_error) {
        // If the base URL is invalid we will fall back to whatever was provided.
      }
    }

    return originalUrl;
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

    const entry = pendingFallbacks.get(payload.requestId);

    if (!entry) {
      return;
    }

    const success = Boolean(payload.data && payload.data.success);

    if (success) {
      entry.cleanup();
    } else {
      entry.fallback();
    }
  }

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
        // Invalid selectors are ignored.
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
    const fallbackUrl = buildFallbackUrl(roomId, originalHref);

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

      if (!isFramed) {
        return;
      }

      event.preventDefault();

      const resolvedRoomId = resolveRoomId(element);
      const resolvedFallback = buildFallbackUrl(resolvedRoomId, element.getAttribute('href'));

      if (resolvedRoomId) {
        if (tryTopNavigation(resolvedFallback)) {
          return;
        }

        const requestId = requestParentRoomNavigation(resolvedRoomId);

        if (requestId) {
          scheduleFallbackNavigation(requestId, resolvedFallback);

          return;
        }

        openInNewTab(resolvedFallback);

        return;
      }

      if (tryTopNavigation(originalHref)) {
        return;
      }

      const requestId = requestParentNavigation(originalHref);

      if (requestId) {
        scheduleFallbackNavigation(requestId, originalHref);

        return;
      }

      openInNewTab(originalHref);
    });
  }

  window.addEventListener('message', handleNavigationResult);

  document.addEventListener('DOMContentLoaded', () => {
    registerConfiguredTargets();

    const elements = collectClickableElements();

    elements.forEach(wireElement);
  });
})();
