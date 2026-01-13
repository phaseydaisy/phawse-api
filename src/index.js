export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routes
    if (url.pathname === '/gifs/search') {
      return handleSearch(url, env, corsHeaders);
    }
    
    if (url.pathname === '/gifs/random') {
      return handleRandom(url, env, corsHeaders);
    }

    // Default response
    return jsonResponse({
      name: 'Phawse GIF API',
      version: '1.0.0',
      endpoints: {
        '/gifs/search': 'Search for gifs (params: q, limit, source, nsfw)',
        '/gifs/random': 'Get random gif (params: category, source, nsfw)',
      },
      sources: ['reddit', 'redgifs', 'gfycat', 'gifscom', 'catbox', 'tenor', 'giphy', 'imgur', 'tumblr', 'rule34', 'gelbooru', 'imageban', 'imgchest', 'postimages']
    }, corsHeaders);
  }
};

async function handleSearch(url, env, corsHeaders) {
  const query = url.searchParams.get('q');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const source = url.searchParams.get('source');
  const nsfw = url.searchParams.get('nsfw') === 'true';

  if (!query) {
    return jsonResponse({ error: 'Missing query parameter "q"' }, corsHeaders, 400);
  }

  const results = [];
  const searches = [];

  try {
    // No API key needed sources (prioritized)
    if (!source || source === 'reddit') {
      searches.push(searchReddit(query, limit, nsfw, env).catch(() => []));
    }

    if (nsfw && (!source || source === 'redgifs')) {
      searches.push(searchRedgifs(query, limit, env).catch(() => []));
    }

    if (!source || source === 'gfycat') {
      searches.push(searchGfycat(query, limit, env).catch(() => []));
    }

    if (!source || source === 'gifscom') {
      searches.push(searchGifsCom(query, limit, env).catch(() => []));
    }

    if (!source || source === 'catbox') {
      searches.push(searchCatbox(query, limit, env).catch(() => []));
    }

    if (!source || source === 'tumblr') {
      searches.push(searchTumblr(query, limit, env).catch(() => []));
    }

    if (!source || source === 'imageban') {
      searches.push(searchImageban(query, limit, env).catch(() => []));
    }

    if (!source || source === 'imgchest') {
      searches.push(searchImgchest(query, limit, env).catch(() => []));
    }

    if (!source || source === 'postimages') {
      searches.push(searchPostImages(query, limit, env).catch(() => []));
    }

    if (nsfw && (!source || source === 'rule34')) {
      searches.push(searchRule34(query, limit, env).catch(() => []));
    }

    if (!source || source === 'gelbooru') {
      searches.push(searchGelbooru(query, limit, nsfw, env).catch(() => []));
    }

    // API key optional sources
    if (!source || source === 'tenor') {
      searches.push(searchTenor(query, limit, env).catch(() => []));
    }

    if (!source || source === 'giphy') {
      searches.push(searchGiphy(query, limit, env).catch(() => []));
    }

    if (!source || source === 'imgur') {
      searches.push(searchImgur(query, limit, env).catch(() => []));
    }

    // Wait for all searches to complete
    const allResults = await Promise.all(searches);
    allResults.forEach(sourceResults => results.push(...sourceResults));

    // Shuffle and limit results
    const shuffled = results.sort(() => Math.rando, 'tumblr'];
    if (nsfw) sources.push('redgifs', 'rule340, limit);

    return jsonResponse({
      query,
      nsfw,
      count: limited.length,
      results: limited
    }, corsHeaders);
  } catch (error) {
    return jsonResponse({
      error: 'Search failed',
      message: error.message
    }, corsHeaders, 500);
  }
}

async function handleRandom(url, env, corsHeaders) {
  const category = url.searchParams.get('category') || 'random';
  const source = url.searchParams.get('source');
  const nsfw = url.searchParams.get('nsfw') === 'true';

  try {
    let gif;
    cocase 'tumblr':
        gif = await getRandomTumblr(category, env);
        break;
      case 'rule34':
        gif = await getRandomRule34(category, env);
        break;
      case 'gelbooru':
        gif = await getRandomGelbooru(category, nsfw, env);
        break;
      nst sources = ['reddit', 'gifscom', 'gfycat'];
    if (nsfw) sources.push('redgifs');

    const selectedSource = source || sources[Math.floor(Math.random() * sources.length)];

    switch (selectedSource) {
      case 'reddit':
        gif = await getRandomReddit(category, nsfw, env);
        break;
      case 'redgifs':
        gif = await getRandomRedgifs(category, env);
        break;
      case 'gifscom':
        gif = await getRandomGifsCom(category, env);
        break;
      case 'gfycat':
        gif = await getRandomGfycat(category, env);
        break;
      case 'tenor':
        gif = await getRandomTenor(category, env);
        break;
      case 'giphy':
        gif = await getRandomGiphy(category, env);
        break;
      default:
        gif = await getRandomReddit(category, nsfw, env);
    }

    return jsonResponse({ result: gif }, corsHeaders);
  } catch (error) {
    return jsonResponse({
      error: 'Random gif fetch failed',
      message: error.message
    }, corsHeaders, 500);
  }
}

// === NO API KEY SOURCES ===

// Reddit API integration (no key needed)
async function searchReddit(query, limit, nsfw, env) {
  const subreddits = nsfw 
    ? ['NSFW_GIF', 'nsfw_gifs', 'porn_gifs', 'gifsgonewild']
    : ['gifs', 'reactiongifs', 'HighQualityGifs', 'perfectloops'];
  
  const subreddit = subreddits.join('+');
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&restrict_sr=on&sort=relevance`;
  
  const response = await fetch(url, {
    headers: { 'User-Agent': 'PhawseAPI/1.0' }
  });
  const data = await response.json();

  return (data.data?.children || [])
    .filter(post => post.data.url && (post.data.url.endsWith('.gif') || post.data.url.includes('imgur') || post.data.url.includes('redgifs') || post.data.url.includes('gfycat')))
    .map(post => ({
      url: post.data.url,
      preview: post.data.thumbnail !== 'default' ? post.data.thumbnail : null,
      tags: [post.data.subreddit],
      source: 'reddit',
      id: post.data.id,
      nsfw: post.data.over_18
    }));
}

async function getRandomReddit(category, nsfw, env) {
  const subreddits = nsfw 
    ? ['NSFW_GIF', 'nsfw_gifs', 'porn_gifs']
    : ['gifs', 'reactiongifs', 'HighQualityGifs'];
  
  const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
  const url = `https://www.reddit.com/r/${subreddit}/random.json`;
  
  const response = await fetch(url, {
    headers: { 'User-Agent': 'PhawseAPI/1.0' }
  });
  const data = await response.json();

  if (!data[0]?.data?.children?.[0]) return null;

  const post = data[0].data.children[0].data;
  return {
    url: post.url,
    preview: post.thumbnail !== 'default' ? post.thumbnail : null,
    tags: [post.subreddit],
    source: 'reddit',
    id: post.id,
    nsfw: post.over_18
  };
}

// Redgifs API (no key needed, NSFW)
async function searchRedgifs(query, limit, env) {
  try {
    const url = `https://api.redgifs.com/v2/gifs/search?search_text=${encodeURIComponent(query)}&order=trending&count=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (data.gifs || []).map(gif => ({
      url: gif.urls?.hd || gif.urls?.sd,
      preview: gif.urls?.thumbnail,
      tags: gif.tags || [],
      source: 'redgifs',
      id: gif.id,
      nsfw: true
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomRedgifs(category, env) {
  try {
    const url = `https://api.redgifs.com/v2/gifs/search?search_text=${encodeURIComponent(category)}&order=trending&count=50`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.gifs || data.gifs.length === 0) return null;

    const random = data.gifs[Math.floor(Math.random() * data.gifs.length)];
    return {
      url: random.urls?.hd || random.urls?.sd,
      preview: random.urls?.thumbnail,
      tags: random.tags || [],
      source: 'redgifs',
      id: random.id,
      nsfw: true
    };
  } catch (error) {
    return null;
  }
}

// Gfycat public API (no key needed)
async function searchGfycat(query, limit, env) {
  try {
    const url = `https://api.gfycat.com/v1/gfycats/search?search_text=${encodeURIComponent(query)}&count=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (data.gfycats || []).map(gif => ({
      url: gif.max5mbGif || gif.gifUrl,
      preview: gif.thumb100PosterUrl,
      tags: gif.tags || [],
      source: 'gfycat',
      id: gif.gfyId,
      nsfw: gif.nsfw === '1'
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomGfycat(category, env) {
  try {
    const url = `https://api.gfycat.com/v1/gfycats/search?search_text=${encodeURIComponent(category)}&count=50`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.gfycats || data.gfycats.length === 0) return null;

    const random = data.gfycats[Math.floor(Math.random() * data.gfycats.length)];
    return {
      url: random.max5mbGif || random.gifUrl,
      preview: random.thumb100PosterUrl,
      tags: random.tags || [],
      source: 'gfycat',
      id: random.gfyId,
      nsfw: random.nsfw === '1'
    };
  } catch (error) {
    return null;
  }
}

// Gifs.com scraper (no API key)
async function searchGifsCom(query, limit, env) {
  try {
    const url = `https://gifs.com/search/${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract gif URLs from HTML
    const gifMatches = html.matchAll(/https:\/\/j\.gifs\.com\/[a-zA-Z0-9]+\.gif/g);
    const urls = [...new Set([...gifMatches].map(m => m[0]))];
    
    return urls.slice(0, limit).map((url, i) => ({
      url: url,
      preview: url,
      tags: [query],
      source: 'gifs.com',
      id: url.split('/').pop().replace('.gif', ''),
      nsfw: false
    }));
  } catch (error) {
    return [];
  }Tumblr public API (no key needed)
async function searchTumblr(query, limit, env) {
  try {
    const url = `https://www.tumblr.com/search/${encodeURIComponent(query)}/recent?type=gif`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhawseAPI/1.0' }
    });
    const html = await response.text();
    
    // Extract gif URLs from Tumblr HTML
    const gifMatches = html.matchAll(/https:\/\/[^"]*\.gif/g);
    const urls = [...new Set([...gifMatches].map(m => m[0]).filter(u => u.includes('media.tumblr.com')))];
    
    return urls.slice(0, limit).map(url => ({
      url: url,
      preview: url,
      tags: [query],
      source: 'tumblr',
      id: url.split('/').slice(-2, -1)[0],
      nsfw: false
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomTumblr(category, env) {
  const results = await searchTumblr(category, 30, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

// Rule34 API (no key needed, NSFW)
async function searchRule34(query, limit, env) {
  try {
    const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(query + ' animated')}&limit=${limit}&json=1`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (Array.isArray(data) ? data : []).map(post => ({
      url: post.file_url,
      preview: post.preview_url || post.sample_url,
      tags: post.tags ? post.tags.split(' ') : [],
      source: 'rule34',
      id: post.id?.toString(),
      nsfw: true
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomRule34(category, env) {
  const results = await searchRule34(category, 50, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

// Gelbooru API (no key needed, anime gifs)
async function searchGelbooru(query, limit, nsfw, env) {
  try {
    const tags = `${query} animated`;
    const url = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(tags)}&limit=${limit}&json=1`;
    
    const response = await fetch(url);
    const data = await response.json();

    const posts = data?.post || [];
    return (Array.isArray(posts) ? posts : []).map(post => ({
      url: post.file_url,
      preview: post.preview_url || post.sample_url,
      tags: post.tags ? post.tags.split(' ') : [],
      source: 'gelbooru',
      id: post.id?.toString(),
      nsfw: post.rating !== 's' // 's' = safe, 'q' = questionable, 'e' = explicit
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomGelbooru(category, nsfw, env) {
  const results = await searchGelbooru(category, 50, nsfw, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

// Imageban scraper (free image hosting)
async function searchImageban(query, limit, env) {
  try {
    const url = `https://www.reddit.com/search.json?q=site:imageban.ru+${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhawseAPI/1.0' }
    });
    const data = await response.json();

    return (data.data?.children || [])
      .filter(post => post.data.url && post.data.url.includes('imageban.ru'))
      .map(post => ({
        url: post.data.url,
        preview: post.data.thumbnail !== 'default' ? post.data.thumbnail : null,
        tags: [query],
        source: 'imageban',
        id: post.data.url.split('/').pop(),
        nsfw: post.data.over_18
      }));
  } catch (error) {
    return [];
  }
}

// Imgchest scraper (free image hosting)
async function searchImgchest(query, limit, env) {
  try {
    const url = `https://www.reddit.com/search.json?q=site:imgchest.com+${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhawseAPI/1.0' }
    });
    const data = await response.json();

    return (data.data?.children || [])
      .filter(post => post.data.url && post.data.url.includes('imgchest.com'))
      .map(post => ({
        url: post.data.url,
        preview: post.data.thumbnail !== 'default' ? post.data.thumbnail : null,
        tags: [query],
        source: 'imgchest',
        id: post.data.url.split('/').pop(),
        nsfw: post.data.over_18
      }));
  } catch (error) {
    return [];
  }
}

// PostImages scraper (free image hosting)
async function searchPostImages(query, limit, env) {
  try {
    const url = `https://www.reddit.com/search.json?q=site:postimages.org+${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhawseAPI/1.0' }
    });
    const data = await response.json();

    return (data.data?.children || [])
      .filter(post => post.data.url && post.data.url.includes('postimages.org'))
      .map(post => ({
        url: post.data.url,
        preview: post.data.thumbnail !== 'default' ? post.data.thumbnail : null,
        tags: [query],
        source: 'postimages',
        id: post.data.url.split('/').pop(),
        nsfw: post.data.over_18
      }));
  } catch (error) {
    return [];
  }
}

// 
}

async function getRandomGifsCom(category, env) {
  const results = await searchGifsCom(category, 20, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

// Catbox file scraper (no API key)
async function searchCatbox(query, limit, env) {
  try {
    const url = `https://www.reddit.com/search.json?q=site:catbox.moe+${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhawseAPI/1.0' }
    });
    const data = await response.json();

    return (data.data?.children || [])
      .filter(post => post.data.url && post.data.url.includes('catbox.moe') && post.data.url.endsWith('.gif'))
      .map(post => ({
        url: post.data.url,
        preview: post.data.thumbnail !== 'default' ? post.data.thumbnail : null,
        tags: [query],
        source: 'catbox',
        id: post.data.url.split('/').pop(),
        nsfw: post.data.over_18
      }));
  } catch (error) {
    return [];
  }
}

// === OPTIONAL API KEY SOURCES ===

// Tenor API integration
async function searchTenor(query, limit, env) {
  const apiKey = env.TENOR_API_KEY;
  if (!apiKey) return [];

  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${apiKey}&limit=${limit}&media_filter=gif`;
  
  const response = await fetch(url);
  const data = await response.json();

  return (data.results || []).map(gif => ({
    url: gif.media_formats?.gif?.url || gif.url,
    preview: gif.media_formats?.tinygif?.url,
    tags: gif.tags || [],
    source: 'tenor',
    id: gif.id
  }));
}

async function getRandomTenor(category, env) {
  const apiKey = env.TENOR_API_KEY;
  if (!apiKey) return null;

  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(category)}&key=${apiKey}&limit=50&media_filter=gif&random=true`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) return null;

  const random = data.results[Math.floor(Math.random() * data.results.length)];
  return {
    url: random.media_formats?.gif?.url || random.url,
    preview: random.media_formats?.tinygif?.url,
    tags: random.tags || [],
    source: 'tenor',
    id: random.id
  };
}

// Giphy API integration
async function searchGiphy(query, limit, env) {
  const apiKey = env.GIPHY_API_KEY;
  if (!apiKey) return [];

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${limit}`;
  
  const response = await fetch(url);
  const data = await response.json();

  return (data.data || []).map(gif => ({
    url: gif.images?.original?.url,
    preview: gif.images?.preview_gif?.url,
    tags: gif.tags || [],
    source: 'giphy',
    id: gif.id
  }));
}

async function getRandomGiphy(category, env) {
  const apiKey = env.GIPHY_API_KEY;
  if (!apiKey) return null;

  const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(category)}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (!data.data) return null;

  return {
    url: data.data.images?.original?.url,
    preview: data.data.images?.preview_gif?.url,
    tags: data.data.tags || [],
    source: 'giphy',
    id: data.data.id
  };
}

// Imgur API integration
async function searchImgur(query, limit, env) {
  const clientId = env.IMGUR_CLIENT_ID;
  if (!clientId) return [];

  const url = `https://api.imgur.com/3/gallery/search/time?q=${encodeURIComponent(query + ' gif')}`;
  
  const response = await fetch(url, {
    headers: { 'Authorization': `Client-ID ${clientId}` }
  });
  const data = await response.json();

  return (data.data || [])
    .filter(item => item.type === 'image/gif' || item.animated)
    .slice(0, limit)
    .map(item => ({
      url: item.link,
      preview: item.link,
      tags: item.tags || [],
      source: 'imgur',
      id: item.id,
      nsfw: item.nsfw
    }));
}

function jsonResponse(data, corsHeaders, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
