window.SpatialChatConfig = {
  /**
   * The base URL of your SpatialChat instance (without trailing slash).
   * Used to load the SDK and construct space URLs.
   */
  baseUrl: 'https://dev.spatialchat.dev',

  /**
   * Your space ID (extracted from your space URL).
   * Full space URL will be: {baseUrl}/s/{spaceId}
   */
  spaceId: 'nr3egHDRSL9spI0z0lLM',

  /**
   * Map each clickable element to the SpatialChat room ID it should open.
   * Use any CSS selector that matches your element (ID selectors keep things simple).
   */
  links: {
    '#hall-a-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-a-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-a-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-b-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-b-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-b-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-c-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-c-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-c-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-d-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-d-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-d-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-e-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-e-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-e-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-f-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-f-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-f-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-g-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-g-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-g-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-h-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-h-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-h-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-i-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-i-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-i-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-j-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-j-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-j-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-k-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-k-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-k-workplace': 'tQl0rmYFha0DxC3LvEsU',

    '#hall-l-breakout': 'uQD35YMhZ1BoBgaS68yb',
    '#hall-l-stage': 'sZXFkhfSGc4hAkCfuJwW',
    '#hall-l-workplace': 'tQl0rmYFha0DxC3LvEsU',
  },
};

// Computed properties for convenience
window.SpatialChatConfig.sdkUrl = window.SpatialChatConfig.baseUrl + '/spatialchat-iframe-sdk.js';
window.SpatialChatConfig.baseSpaceUrl = window.SpatialChatConfig.baseUrl + '/s/' + window.SpatialChatConfig.spaceId;
