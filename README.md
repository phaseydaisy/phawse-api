# Phawse GIF API

GIF search API that aggregates results from Tenor and Giphy.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add API keys as secrets:
```bash
wrangler secret put TENOR_API_KEY
wrangler secret put GIPHY_API_KEY
wrangler secret put IMGUR_CLIENT_ID  # optional
```

Get API keys:
- Tenor: https://developers.google.com/tenor/guides/quickstart
- Giphy: https://developers.giphy.com/
- Imgur: https://api.imgur.com/oauth2/addclient (optional, for better Imgur results)

## API Endpoints

### Search GIFs50&source=reddit&nsfw=false
```

Parameters:
- `q` (required) - Search query
- `limit` (optional) - Max results (default: 50)
- `source` (optional) - 'tenor', 'giphy', 'reddit', 'imgur', 'redgifs' (default: all)
- `nsfw` (optional) - Include NSFW results (default: false
- `limit` (optional) - Max results (default: 20)
- `source` (optional) - 'tenor' or 'giphy' (default: both)

Response:
```json
{
  "query": "happy",
  "count": 20,
  "results": [
    {
      "url": "https://...",
      "preview": "https://...",
      "tags": ["happy", "dance"],
      "source": "tenor",
      "id": "12345"
    }
  ]
}
```
reddit&nsfw=false
```

Parameters:
- `category` (optional) - Category/tag (default: 'random')
- `source` (optional) - 'tenor', 'giphy', 'reddit', 'redgifs' (default: random)
- `nsfw` (optional) - Include NSFW results (default: false
Parameters:
- `category` (optional) - Category/tag (default: 'random')
- `source` (optional) - 'tenor' or 'giphy' (default: random)

Response:
```json
{
  "result": {
    "url": "https://...",
    "preview": "https://...",
    "tags": ["excited"],
    "source": "giphy",
    "id": "abc123"
  }
}
```

## Development

```bash
npm run dev
```

## Deploy

```bash
npm run deploy
```
