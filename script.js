(function () {
  const isFramed = window.self !== window.top;

  function tryTopNavigation(url) {
    if (!isFramed) {
      return false;
    }
    try {
      window.top.location.href = url;
      return true;
    } catch (error) {
      return false;
    }
  }

  function notifyParent(url) {
    try {
      window.parent.postMessage(
        { type: 'spatial-expo:navigate', url: url },
        '*'
      );
    } catch (error) {
      /* parent may not accept messages */
    }
  }

  function openInNewTab(url) {
    const popup = window.open(url, '_blank', 'noopener');
    if (!popup) {
      window.location.href = url;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('a.room-card');
    if (!cards.length) {
      return;
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function (event) {
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
        const url = card.href;

        const navigated = tryTopNavigation(url);
        if (!navigated) {
          notifyParent(url);
          openInNewTab(url);
        }
      });
    });
  });
})();
