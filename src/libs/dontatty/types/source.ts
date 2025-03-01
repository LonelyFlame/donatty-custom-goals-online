export interface TDDonattyAccountSource {
  donate: {
    from: number;
    isEnabled: boolean;
  };
}

export interface TDTwitchAccountSource {
  "twitch-bits": {
    from: number;
    isEnabled: boolean;
  },
  "twitch-host": {
    isEnabled: boolean;
  },
  "twitch-raids": {
    isEnabled: boolean;
  },
  "twitch-followers": {
    isEnabled: boolean;
  },
  "twitch-hype-train": {
    from: number;
    isEnabled: boolean;
  },
  "twitch-subscribers": {
    from: number;
    isEnabled: boolean;
  },
  "twitch-channel-points": {
    isEnabled: boolean;
    selectedItems: []
  },
  "twitch-subscribers-upgrade": {
    isEnabled: boolean;
  },
  "twitch-gift-subscribers-viewer": {
    isEnabled: boolean;
  },
  "twitch-gift-subscribers-channel": {
    isEnabled: boolean;
  },
  "twitch-gift-subscribers-upgrade": {
    isEnabled: boolean;
  }
}
