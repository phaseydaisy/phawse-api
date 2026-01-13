export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const pathParts = url.pathname.split('/').filter(p => p);

    if (pathParts[0] === 'proxy' && pathParts[1]) {
      return handleProxy(pathParts.slice(1).join('/'), corsHeaders);
    }

    const experimental = url.searchParams.get('experimental') === 'true';

    if (pathParts[0] === 'gif' && pathParts[1]) {
      return handleCategoryGif(pathParts[1], false, experimental, env, corsHeaders);
    }

    if (pathParts[0] === 'nsfw' && pathParts[1]) {
      return handleCategoryGif(pathParts[1], true, experimental, env, corsHeaders);
    }

    if (pathParts[0] === 'search') {
      return handleSearch(url, env, corsHeaders, experimental);
    }

    if (pathParts[0] === 'random') {
      const nsfw = url.searchParams.get('nsfw') === 'true';
      return handleRandomGif(nsfw, experimental, env, corsHeaders);
    }

    return jsonResponse({
      name: 'Phawse GIF API',
      version: '2.0.0',
      endpoints: {
        '/gif/{category}': 'Get random anime gif by category',
        '/nsfw/{category}': 'Get random anime NSFW gif by category',
        '/search?q=query': 'Search for anime gifs',
        '/random': 'Get completely random anime gif',
        'query param experimental=true': 'Enable best-effort experimental anime sources (skips on failure)',
      },
      categories: {
        emotions: ['happy', 'sad', 'angry', 'mad', 'cry', 'crying', 'smile', 'smiling', 'laugh', 'laughing', 'giggle', 'chuckle', 'blush', 'blushing', 'shy', 'shyness', 'embarrassed', 'embarrass', 'confused', 'confuse', 'surprised', 'surprise', 'shock', 'shocked', 'excited', 'excitement', 'nervous', 'anxious', 'scared', 'afraid', 'fear', 'terrified', 'tired', 'exhausted', 'sleepy', 'drowsy', 'bored', 'boring', 'annoyed', 'irritated', 'frustrated', 'pout', 'pouting', 'sulk', 'smug', 'confident', 'proud', 'serious', 'stern', 'determined', 'relaxed', 'calm', 'peaceful', 'chill', 'thinking', 'pondering', 'wondering', 'curious', 'interest', 'interested', 'worried', 'concern', 'concerned', 'jealous', 'envy', 'lonely', 'loneliness', 'depressed', 'depression', 'anxious', 'anxiety', 'panic', 'hopeful', 'hope', 'desperate', 'devastated', 'heartbroken', 'melancholy', 'nostalgic', 'regret', 'guilty', 'ashamed', 'disgusted', 'disappointed'],
        actions: ['hug', 'hugging', 'embrace', 'kiss', 'kissing', 'smooch', 'peck', 'pat', 'patting', 'headpat', 'poke', 'poking', 'prod', 'slap', 'slapping', 'hit', 'punch', 'kick', 'kicking', 'cuddle', 'cuddling', 'snuggle', 'snuggling', 'tickle', 'tickling', 'wave', 'waving', 'highfive', 'handhold', 'holding', 'hold', 'boop', 'booping', 'lick', 'licking', 'bite', 'biting', 'nom', 'nibble', 'pinch', 'pinching', 'stare', 'staring', 'gaze', 'glare', 'glaring', 'nod', 'nodding', 'shake', 'shaking', 'shrug', 'shrugging', 'salute', 'handshake', 'peace', 'fingerguns', 'wink', 'smirk', 'dance', 'dancing', 'run', 'running', 'sprint', 'jump', 'jumping', 'leap', 'hop', 'spin', 'spinning', 'twirl', 'roll', 'rolling', 'crawl', 'walk', 'walking', 'trip', 'fall', 'falling', 'sit', 'sitting', 'stand', 'lay', 'laying', 'kneel', 'bow', 'bowing', 'peek', 'peeking', 'hide', 'hiding', 'chase', 'grab', 'catch', 'throw', 'toss'],
        social: ['greet', 'greeting', 'hello', 'hi', 'hey', 'bye', 'goodbye', 'farewell', 'leave', 'leaving', 'welcome', 'welcoming', 'thankyou', 'thanks', 'grateful', 'appreciate', 'sorry', 'apologize', 'apology', 'forgive', 'forgiveness', 'pardon', 'excuse', 'cheer', 'cheering', 'encourage', 'motivate', 'comfort', 'comforting', 'console', 'support', 'supporting', 'help', 'helping', 'assist', 'celebrate', 'celebrating', 'party', 'congrats', 'congratulate', 'clap', 'clapping', 'applaud', 'praise', 'compliment', 'facepalm', 'sigh', 'shriek', 'scream', 'screaming', 'yell', 'shout', 'whisper', 'talk', 'talking', 'chat', 'gossip', 'argue', 'arguing', 'fight', 'fighting', 'bully', 'bullying', 'tease', 'teasing', 'mock', 'laugh', 'ignore', 'ignoring'],
        characters: ['neko', 'nekomimi', 'catgirl', 'catboy', 'cat', 'foxgirl', 'foxboy', 'kitsune', 'fox', 'wolfgirl', 'wolfboy', 'wolf', 'bunnygirl', 'bunnyboy', 'rabbit', 'doggirl', 'dogboy', 'inu', 'maid', 'butler', 'servant', 'loli', 'shota', 'oppai', 'flat', 'petite', 'tall', 'short', 'tsundere', 'yandere', 'kuudere', 'dandere', 'deredere', 'himedere', 'idol', 'singer', 'musician', 'schoolgirl', 'schoolboy', 'student', 'teacher', 'sensei', 'senpai', 'kouhai', 'cosplay', 'costume', 'uniform', 'chibi', 'kawaii', 'cute', 'adorable', 'beautiful', 'pretty', 'handsome', 'cool', 'goth', 'emo', 'punk', 'gyaru', 'tomboy', 'femboy', 'trap', 'magicalgirl', 'mahou', 'witch', 'mage', 'wizard', 'samurai', 'ninja', 'knight', 'warrior', 'fighter', 'hero', 'villain', 'demon', 'angel', 'vampire', 'succubus', 'elf', 'fairy', 'mermaid', 'monster', 'slime', 'dragon', 'waifu', 'husbando', 'best', 'favorite'],
        reactions: ['thumbsup', 'thumbsdown', 'ok', 'okay', 'yes', 'yeah', 'yep', 'no', 'nope', 'nah', 'maybe', 'perhaps', 'idk', 'what', 'huh', 'eh', 'why', 'how', 'when', 'where', 'wtf', 'wth', 'lol', 'lmao', 'rofl', 'lmfao', 'omg', 'omfg', 'wow', 'whoa', 'woah', 'damn', 'dang', 'oops', 'oof', 'yikes', 'yeet', 'rip', 'f', 'bruh', 'bro', 'dude', 'eyeroll', 'sarcastic', 'deadpan', 'unimpressed', 'meh', 'whatever', 'hmm', 'hmph', 'tch', 'ugh', 'eww', 'gross', 'cringe', 'gasp', 'sneeze', 'sniff', 'blessyou', 'pout', 'smug', 'cheer', 'cheering', 'celebrate', 'celebrating', 'clap', 'clapping', 'applause', 'applaud', 'yay', 'woo', 'hype', 'pump', 'fistbump', 'highfive'],
        idle: ['sleep', 'sleeping', 'asleep', 'nap', 'napping', 'doze', 'rest', 'resting', 'yawn', 'yawning', 'tired', 'stretch', 'stretching', 'wake', 'waking', 'wakeup', 'breathing', 'breathe', 'sigh', 'idle', 'wait', 'waiting', 'stand', 'standing', 'sit', 'sitting', 'lay', 'lying', 'relax', 'relaxing', 'blink', 'blinking', 'stare', 'gaze', 'look', 'watch', 'observe', 'tailwag', 'tail', 'earflick', 'ears', 'twitch', 'hairflip', 'hair', 'adjust', 'fidget', 'scratch', 'rub', 'touch', 'feel'],
        nsfw: ['nsfw', 'lewd', 'lewds', 'ecchi', 'ero', 'erotic', 'hentai', 'h', 'xxx', 'porn', 'pornographic', 'oppai', 'boobs', 'breasts', 'tits', 'chest', 'nipples', 'cleavage', 'ass', 'butt', 'booty', 'rear', 'thighs', 'thicc', 'thick', 'legs', 'feet', 'foot', 'toes', 'panties', 'pantsu', 'lingerie', 'underwear', 'bra', 'bikini', 'swimsuit', 'microbikini', 'string', 'nude', 'naked', 'strip', 'striptease', 'undress', 'reveal', 'bare', 'exposed', 'ahegao', 'orgasm', 'climax', 'cum', 'cumshot', 'creampie', 'facial', 'bukkake', 'futa', 'futanari', 'dickgirl', 'shemale', 'trap', 'femboy', 'milf', 'mature', 'cougar', 'mommy', 'paizuri', 'titfuck', 'boobjob', 'bondage', 'bdsm', 'tied', 'rope', 'chain', 'cuff', 'handcuffs', 'gag', 'gagged', 'collar', 'leash', 'blindfold', 'blindfolded', 'choke', 'choking', 'breathplay', 'spank', 'spanking', 'discipline', 'punish', 'punishment', 'tentacles', 'tentacle', 'yuri', 'lesbian', 'girlxgirl', 'gl', 'yaoi', 'gay', 'boyxboy', 'bl', 'sex', 'fuck', 'fucking', 'intercourse', 'penetration', 'dp', 'doublepenetration', 'double', 'triple', 'blowjob', 'bj', 'fellatio', 'suck', 'sucking', 'oral', 'cunnilingus', 'lick', 'licking', 'handjob', 'stroke', 'jerk', 'footjob', 'threesome', 'gangbang', 'orgy', 'group', 'sharing', 'ntr', 'cuck', 'cuckold', 'cheating', 'affair', 'masturbate', 'masturbation', 'goon', 'gooning', 'edge', 'edging', 'ruin', 'ruined', 'denial', 'denied', 'teaseanddenial', 'touch', 'rub', 'finger', 'fingering', 'toy', 'toys', 'dildo', 'plug', 'buttplug', 'vibrator', 'wand', 'analbeads', 'ride', 'riding', 'cowgirl', 'reversecowgirl', 'doggy', 'doggystyle', 'missionary', 'mating', 'prone', 'anal', 'butthole', 'assfuck', 'deepthroat', 'throat', 'face', 'facefuck', 'pov', 'facesit', 'facesitting', 'thighsitting', 'bodyworship', 'footfetish', 'feetlick', 'footlick', 'heels', 'stockings', 'thighhighs', 'garter', 'garterbelt', 'fishnet', 'latex', 'leather', 'bodysuit', 'corset', 'pasties', 'oil', 'oiled', 'lotion', 'massage', 'shower', 'bath', 'sauna', 'pool', 'beach', 'lockerroom', 'gym', 'office', 'classroom', 'library', 'hospital', 'nurse', 'doctor', 'teacher', 'boss', 'secretary', 'maidcafe', 'bunny', 'bunnysuit', 'cheerleader', 'idol', 'idolcostume', 'exhibitionist', 'exhibitionism', 'public', 'voyeur', 'voyeurism', 'peek', 'peeping', 'upskirt', 'cameltoe', 'spread', 'open', 'wet', 'drip', 'pussy', 'vagina', 'clit', 'labia', 'dick', 'cock', 'penis', 'balls', 'testicles', 'shaft', 'glans', 'foreskin', 'hardon', 'erection', 'bulge', 'precum', 'squirt', 'gush', 'femdom', 'maledom', 'dominant', 'submissive', 'rough', 'gentle', 'sensual', 'passionate', 'kinky', 'perverted', 'pervert', 'horny', 'aroused', 'pleasure', 'tease', 'seduce', 'roleplay', 'cosplay', 'aphrodisiac', 'pregnant', 'pregnancy', 'lactation', 'milking', 'nippleplay', 'buttplugtail']
      },
      examples: [
        '/gif/hug',
        '/gif/pat',
        '/gif/kiss',
        '/nsfw/hentai',
        '/nsfw/oppai',
        '/search?q=blush',
        '/random?nsfw=false'
      ]
    }, corsHeaders);
  }
};

async function handleCategoryGif(category, nsfw, experimental, env, corsHeaders) {
  try {
    const animeQuery = `anime ${category}`;
    
    const sources = ['gelbooru', 'gfycat', 'waifupics', 'nekosbest', 'nekoslife', 'purrbot', 'waifuim', 'shinkaiio', 'uwunetwork'];
    if (nsfw) sources.push('rule34', 'redgifs', 'hmtai', 'danbooru', 'yandere', 'purbotnsfw', 'waifuimnsfw')
    if (experimental) sources.push('experimental');

    const selectedSource = sources[Math.floor(Math.random() * sources.length)];
    let gif;

    switch (selectedSource) {
      case 'gelbooru':
        gif = await getRandomGelbooru(category, nsfw, env);
        break;
      case 'waifupics':
        gif = await getRandomWaifuPics(category, nsfw, env);
        break;
      case 'nekosbest':
        gif = await getRandomNekosBest(category, nsfw, env);
        break;
      case 'nekoslife':
        gif = await getRandomNekosLife(category, nsfw, env);
        break;
      case 'purrbot':
        gif = await getRandomPurrbot(category, nsfw, env);
        break;
      case 'purbotnsfw':
        gif = await getRandomPurrbotNsfw(category, env);
        break;
      case 'waifuim':
        gif = await getRandomWaifuIm(category, nsfw, env);
        break;
      case 'waifuimnsfw':
        gif = await getRandomWaifuImNsfw(category, env);
        break;
      case 'shinkaiio':
        gif = await getRandomShinkai(category, nsfw, env);
        break;
      case 'uwunetwork':
        gif = await getRandomUwuNetwork(category, nsfw, env);
        break;
      case 'hmtai':
        gif = await getRandomHmtai(category, env);
        break;
      case 'danbooru':
        gif = await getRandomDanbooru(category, env);
        break;
      case 'yandere':
        gif = await getRandomYandere(category, env);
        break;
      case 'redgifs':
        gif = await getRandomRedgifs(animeQuery, env);
        break;
      case 'gfycat':
        gif = await getRandomGfycat(animeQuery, env);
        break;
      case 'rule34':
        gif = await getRandomRule34(category, env);
        break;
      case 'experimental':
        gif = await getRandomExperimental(category, nsfw, env);
        break;
      case 'gifscom':
        gif = await getRandomGifsCom(animeQuery, env);
        break;
      default:
        gif = await getRandomGelbooru(category, nsfw, env);
    }

    if (!gif) {
      const results = await searchAllSources(animeQuery, 20, nsfw, experimental, env);
      if (results.length > 0) {
        gif = results[Math.floor(Math.random() * results.length)];
      }
    }

    if (!gif) {
      return jsonResponse({ 
        error: 'No anime gifs found for this category',
        category: category,
        suggestion: 'Try a different tag or use /search?q=your_tag'
      }, corsHeaders, 404);
    }

    const proxiedUrl = `https://api.phawse.lol/proxy/${encodeURIComponent(gif.url)}`;

    return jsonResponse({
      category: category,
      nsfw: gif.nsfw || nsfw,
      url: proxiedUrl,
      original_url: gif.url,
      source: gif.source
    }, corsHeaders);
  } catch (error) {
    return jsonResponse({
      error: 'Failed to fetch anime gif',
      message: error.message
    }, corsHeaders, 500);
  }
}

async function handleRandomGif(nsfw, experimental, env, corsHeaders) {
  const categories = nsfw 
    ? ['hentai', 'oppai', 'ecchi', 'lewd', 'boobs', 'ass', 'yuri']
    : ['happy', 'hug', 'kiss', 'pat', 'wave', 'smile', 'blush', 'dance', 'laugh'];
  
  const category = categories[Math.floor(Math.random() * categories.length)];
  return handleCategoryGif(category, nsfw, experimental, env, corsHeaders);
}

async function handleProxy(encodedUrl, corsHeaders) {
  try {
    const targetUrl = decodeURIComponent(encodedUrl);
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'PhawseAPI/2.0',
        'Referer': new URL(targetUrl).origin
      }
    });

    if (!response.ok) {
      return new Response('Failed to fetch image', { status: 502, headers: corsHeaders });
    }

    const contentType = response.headers.get('content-type') || 'image/gif';
    const imageData = await response.arrayBuffer();

    return new Response(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response('Proxy error: ' + error.message, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}

async function handleSearch(url, env, corsHeaders, experimental) {
  const query = url.searchParams.get('q');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const nsfw = url.searchParams.get('nsfw') === 'true';

  if (!query) {
    return jsonResponse({ error: 'Missing query parameter "q"' }, corsHeaders, 400);
  }

  try {
    const animeQuery = `anime ${query}`;
    const results = await searchAllSources(animeQuery, limit, nsfw, experimental, env);

    return jsonResponse({
      query,
      nsfw,
      count: results.length,
      results: results.map(r => ({
        url: `https://api.phawse.lol/proxy/${encodeURIComponent(r.url)}`,
        original_url: r.url,
        source: r.source,
        tags: r.tags,
        nsfw: r.nsfw
      }))
    }, corsHeaders);
  } catch (error) {
    return jsonResponse({
      error: 'Search failed',
      message: error.message
    }, corsHeaders, 500);
  }
}

async function getRandomExperimental(category, nsfw, env) {
  const experimentalSfwApis = [
    'https://api.otakugifs.xyz/gif',
    'https://otakugifs.xyz/gif',
    'https://api.animeactions.xyz',
    'https://api.anime-reactions.xyz',
    'https://anime-actions-api.vercel.app',
    'https://api.reactanime.dev',
    'https://api.animegifhub.xyz',
    'https://api.moeactions.xyz'
  ];

  const experimentalNsfwApis = [
    'https://api.hentaimages.xyz',
    'https://api.hentaigifs.cc',
    'https://nsfw-anime-api.vercel.app',
    'https://api.adultanime.xyz',
    'https://api.animelewd.dev',
    'https://api.nsfwgifs.anime',
    'https://anime-nsfw-api.onrender.com',
    'https://api.ecchianime.xyz',
    'https://nsfw-react-api.pages.dev',
    'https://api.anime18.cc',
    'https://api.hentai.xxx',
    'https://api.doujin.moe',
    'https://api.lewdnime.xyz',
    'https://api.pornhub-anime.xyz',
    'https://api.xtreme-anime.dev',
    'https://api.xvideos-anime.xyz',
    'https://api.yande.re',
    'https://api.konachan.com',
    'https://api.danbooru.donmai.us',
    'https://api.rule34.xxx',
    'https://api.safebooru.org'
  ];

  const candidates = nsfw ? experimentalNsfwApis : experimentalSfwApis;

  for (const base of candidates) {
    const urlOptions = [
      `${base}/random?category=${encodeURIComponent(category)}`,
      `${base}/random?tag=${encodeURIComponent(category)}`,
      `${base}/random`,
      `${base}/${encodeURIComponent(category)}`,
      `${base}?category=${encodeURIComponent(category)}`
    ];

    for (const attempt of urlOptions) {
      try {
        const res = await fetch(attempt);
        if (!res.ok) continue;
        const data = await res.json();
        const gifUrl = extractGifUrl(data);
        if (gifUrl && gifUrl.endsWith('.gif')) {
          return {
            url: gifUrl,
            preview: gifUrl,
            tags: [category],
            source: 'experimental'
          };
        }
      } catch (err) {
        continue;
      }
    }
  }
  return null;
}

async function searchExperimental(query, limit, nsfw, env) {
  const results = [];
  const experimentalSfwApis = [
    'https://api.otakugifs.xyz/gif',
    'https://otakugifs.xyz/gif',
    'https://api.animeactions.xyz',
    'https://api.anime-reactions.xyz',
    'https://anime-actions-api.vercel.app',
    'https://api.reactanime.dev',
    'https://api.animegifhub.xyz',
    'https://api.moeactions.xyz'
  ];

  const experimentalNsfwApis = [
    'https://api.hentaimages.xyz',
    'https://api.hentaigifs.cc',
    'https://nsfw-anime-api.vercel.app',
    'https://api.adultanime.xyz',
    'https://api.animelewd.dev',
    'https://api.nsfwgifs.anime',
    'https://anime-nsfw-api.onrender.com',
    'https://api.ecchianime.xyz',
    'https://nsfw-react-api.pages.dev',
    'https://api.anime18.cc',
    'https://api.hentai.xxx',
    'https://api.doujin.moe',
    'https://api.lewdnime.xyz',
    'https://api.pornhub-anime.xyz',
    'https://api.xtreme-anime.dev',
    'https://api.xvideos-anime.xyz',
    'https://api.yande.re',
    'https://api.konachan.com',
    'https://api.danbooru.donmai.us',
    'https://api.rule34.xxx',
    'https://api.safebooru.org'
  ];

  const candidates = nsfw ? experimentalNsfwApis : experimentalSfwApis;

  for (const base of candidates) {
    const urlOptions = [
      `${base}/search?query=${encodeURIComponent(query)}&limit=${limit}`,
      `${base}/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      `${base}/search?tag=${encodeURIComponent(query)}&limit=${limit}`,
      `${base}?q=${encodeURIComponent(query)}&limit=${limit}`
    ];

    for (const attempt of urlOptions) {
      try {
        const res = await fetch(attempt);
        if (!res.ok) continue;
        const data = await res.json();
        const entries = Array.isArray(data) ? data : (data.results || data.data || []);
        for (const item of entries) {
          const gifUrl = extractGifUrl(item);
          if (gifUrl && gifUrl.endsWith('.gif')) {
            results.push({
              url: gifUrl,
              preview: gifUrl,
              tags: item.tags || [query],
              source: 'experimental',
              nsfw
            });
            if (results.length >= limit) return results;
          }
        }
      } catch (err) {
        continue;
      }
    }
  }
  return results;
}

function extractGifUrl(obj) {
  if (!obj || typeof obj !== 'object') return null;
  const candidates = [
    obj.url,
    obj.gif,
    obj.image,
    obj.link,
    obj.file,
    obj.src,
    obj.result,
    obj.media
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.startsWith('http')) return c;
    if (c && typeof c === 'object' && typeof c.url === 'string') return c.url;
  }
  return null;
}

async function searchAllSources(query, limit, nsfw, experimental, env) {
  const results = [];
  const searches = [];
  
  searches.push(searchWaifuPics(query, nsfw, env).catch(() => []));
  searches.push(searchNekosBest(query, nsfw, env).catch(() => []));
  searches.push(searchNekosLife(query, nsfw, env).catch(() => []));
  
  if (nsfw) {
    searches.push(searchHmtai(query, env).catch(() => []));
  }
  
  searches.push(searchGelbooru(query, limit, nsfw, env).catch(() => []));
  searches.push(searchRule34(query, limit, env).catch(() => []));
  searches.push(searchDanbooru(query, limit, env).catch(() => []));
  searches.push(searchYandere(query, limit, env).catch(() => []));
  searches.push(searchKonachan(query, limit, nsfw, env).catch(() => []));
  searches.push(searchSafebooru(query, limit, env).catch(() => []));
  
  searches.push(searchGfycat(query, limit, env).catch(() => []));
  searches.push(searchTenor(query, limit, env).catch(() => []));
  searches.push(searchPurrbot(query, limit, nsfw, env).catch(() => []));
  searches.push(searchWaifuIm(query, limit, nsfw, env).catch(() => []));
  searches.push(searchShinkai(query, limit, nsfw, env).catch(() => []));
  searches.push(searchUwuNetwork(query, limit, nsfw, env).catch(() => []));

  if (experimental) {
    searches.push(searchExperimental(query, limit, nsfw, env).catch(() => []));
  }

  const allResults = await Promise.all(searches);
  allResults.forEach(sourceResults => results.push(...sourceResults));

  const shuffled = results.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

async function searchRedgifs(query, limit, env) {
  try {
    const animeQuery = query.includes('anime') || query.includes('hentai') ? query : `hentai ${query}`;
    const url = `https://api.redgifs.com/v2/gifs/search?search_text=${encodeURIComponent(animeQuery)}&order=trending&count=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (data.gifs || [])
      .filter(gif => (gif.urls?.hd || gif.urls?.sd)?.endsWith('.gif'))
      .map(gif => ({
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
    const animeQuery = category.includes('anime') || category.includes('hentai') ? category : `hentai ${category}`;
    const url = `https://api.redgifs.com/v2/gifs/search?search_text=${encodeURIComponent(animeQuery)}&order=trending&count=50`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.gifs || data.gifs.length === 0) return null;

    const gifOnly = data.gifs.filter(gif => (gif.urls?.hd || gif.urls?.sd)?.endsWith('.gif'));
    if (gifOnly.length === 0) return null;

    const random = gifOnly[Math.floor(Math.random() * gifOnly.length)];
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

async function searchGfycat(query, limit, env) {
  try {
    const animeQuery = query.includes('anime') ? query : `anime ${query}`;
    const url = `https://api.gfycat.com/v1/gfycats/search?search_text=${encodeURIComponent(animeQuery)}&count=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (data.gfycats || [])
      .filter(gif => (gif.max5mbGif || gif.gifUrl)?.endsWith('.gif'))
      .map(gif => ({
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
    const animeQuery = category.includes('anime') ? category : `anime ${category}`;
    const url = `https://api.gfycat.com/v1/gfycats/search?search_text=${encodeURIComponent(animeQuery)}&count=50`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data.gfycats || data.gfycats.length === 0) return null;

    const gifOnly = data.gfycats.filter(gif => (gif.max5mbGif || gif.gifUrl)?.endsWith('.gif'));
    if (gifOnly.length === 0) return null;

    const random = gifOnly[Math.floor(Math.random() * gifOnly.length)];
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

async function searchGifsCom(query, limit, env) {
  try {
    const url = `https://gifs.com/search/${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    const html = await response.text();
    
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
  }
}

async function getRandomGifsCom(category, env) {
  const results = await searchGifsCom(category, 20, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

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
      nsfw: post.rating !== 's'
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomGelbooru(category, nsfw, env) {
  const results = await searchGelbooru(category, 50, nsfw, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

async function searchTenor(query, limit, env) {
  const apiKey = env.TENOR_API_KEY;
  if (!apiKey) return [];

  const animeQuery = query.includes('anime') ? query : `anime ${query}`;
  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(animeQuery)}&key=${apiKey}&limit=${limit}&media_filter=gif`;
  
  const response = await fetch(url);
  const data = await response.json();

  return (data.results || [])
    .filter(gif => (gif.media_formats?.gif?.url || gif.url)?.endsWith('.gif'))
    .map(gif => ({
      url: gif.media_formats?.gif?.url || gif.url,
      preview: gif.media_formats?.tinygif?.url,
      tags: gif.tags || [],
      source: 'tenor',
      id: gif.id
    }));
}






async function searchWaifuPics(query, nsfw, env) {
  try {
    const type = nsfw ? 'nsfw' : 'sfw';
    const categories = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];
    
    const results = [];
    const endpoint = categories.find(c => query.toLowerCase().includes(c)) || 'waifu';
    
    const url = `https://api.waifu.pics/${type}/${endpoint}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      results.push({
        url: data.url,
        preview: data.url,
        tags: [endpoint, type],
        source: 'waifu.pics',
        id: data.url.split('/').pop(),
        nsfw: nsfw
      });
    }
    
    return results;
  } catch (error) {
    return [];
  }
}

async function getRandomWaifuPics(category, nsfw, env) {
  try {
    const type = nsfw ? 'nsfw' : 'sfw';
    const url = `https://api.waifu.pics/${type}/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return {
        url: data.url,
        preview: data.url,
        tags: [category],
        source: 'waifu.pics',
        id: data.url.split('/').pop(),
        nsfw: nsfw
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchNekosBest(query, nsfw, env) {
  try {
    const endpoints = ['hug', 'kiss', 'slap', 'pat', 'poke', 'wave', 'smile', 'highfive', 'handshake', 'bite', 'blush', 'bored', 'cry', 'dance', 'facepalm', 'feed', 'happy', 'laugh', 'nod', 'nom', 'nope', 'pout', 'shrug', 'sleep', 'smug', 'stare', 'think', 'thumbsup', 'tickle', 'wink', 'yawn', 'yeet'];
    
    const endpoint = endpoints.find(e => query.toLowerCase().includes(e)) || 'neko';
    const url = `https://nekos.best/api/v2/${endpoint}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results[0] && data.results[0].url?.endsWith('.gif')) {
      return [{
        url: data.results[0].url,
        preview: data.results[0].url,
        tags: [endpoint],
        source: 'nekos.best',
        id: data.results[0].url.split('/').pop(),
        nsfw: false
      }];
    }
    return [];
  } catch (error) {
    return [];
  }
}

async function getRandomNekosBest(category, nsfw, env) {
  try {
    const url = `https://nekos.best/api/v2/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results[0] && data.results[0].url?.endsWith('.gif')) {
      return {
        url: data.results[0].url,
        preview: data.results[0].url,
        tags: [category],
        source: 'nekos.best',
        id: data.results[0].url.split('/').pop(),
        nsfw: false
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchNekosLife(query, nsfw, env) {
  try {
    const type = nsfw ? 'nsfw' : 'sfw';
    const endpoints = nsfw 
      ? ['neko', 'boobs', 'pussy', 'hentai', 'feet', 'yuri', 'trap', 'futanari', 'femdom', 'lewd']
      : ['neko', 'hug', 'pat', 'kiss', 'slap', 'poke', 'tickle', 'feed', 'cuddle', 'fox_girl', 'waifu', 'smug'];
    
    const endpoint = endpoints.find(e => query.toLowerCase().includes(e)) || (nsfw ? 'neko' : 'neko');
    const url = `https://nekos.life/api/v2/img/${endpoint}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return [{
        url: data.url,
        preview: data.url,
        tags: [endpoint],
        source: 'nekos.life',
        id: data.url.split('/').pop(),
        nsfw: nsfw
      }];
    }
    return [];
  } catch (error) {
    return [];
  }
}

async function getRandomNekosLife(category, nsfw, env) {
  try {
    const url = `https://nekos.life/api/v2/img/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return {
        url: data.url,
        preview: data.url,
        tags: [category],
        source: 'nekos.life',
        id: data.url.split('/').pop(),
        nsfw: nsfw
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchHmtai(query, env) {
  try {
    const endpoints = ['ass', 'blowjob', 'boobs', 'cum', 'ero', 'foot', 'gangbang', 'glasses', 'hentai', 'masturbation', 'neko', 'orgy', 'panties', 'pussy', 'tentacles', 'thighs', 'uniform', 'yuri'];
    
    const endpoint = endpoints.find(e => query.toLowerCase().includes(e)) || 'hentai';
    const url = `https://hmtai.hatsunia.cfd/v2/${endpoint}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return [{
        url: data.url,
        preview: data.url,
        tags: [endpoint],
        source: 'hmtai',
        id: data.url.split('/').pop(),
        nsfw: true
      }];
    }
    return [];
  } catch (error) {
    return [];
  }
}

async function getRandomHmtai(category, env) {
  try {
    const url = `https://hmtai.hatsunia.cfd/v2/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return {
        url: data.url,
        preview: data.url,
        tags: [category],
        source: 'hmtai',
        id: data.url.split('/').pop(),
        nsfw: true
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchDanbooru(query, limit, env) {
  try {
    const tags = `${query} animated`;
    const url = `https://danbooru.donmai.us/posts.json?tags=${encodeURIComponent(tags)}&limit=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (Array.isArray(data) ? data : [])
      .filter(post => post.file_url && post.file_url.endsWith('.gif'))
      .map(post => ({
        url: post.file_url,
        preview: post.preview_file_url,
        tags: post.tag_string ? post.tag_string.split(' ') : [],
        source: 'danbooru',
        id: post.id?.toString(),
        nsfw: post.rating !== 'g'
      }));
  } catch (error) {
    return [];
  }
}

async function getRandomDanbooru(category, env) {
  const results = await searchDanbooru(category, 50, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

async function searchYandere(query, limit, env) {
  try {
    const tags = `${query} animated`;
    const url = `https://yande.re/post.json?tags=${encodeURIComponent(tags)}&limit=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (Array.isArray(data) ? data : []).map(post => ({
      url: post.file_url,
      preview: post.preview_url,
      tags: post.tags ? post.tags.split(' ') : [],
      source: 'yande.re',
      id: post.id?.toString(),
      nsfw: post.rating !== 's'
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomYandere(category, env) {
  const results = await searchYandere(category, 50, env);
  return results.length > 0 ? results[Math.floor(Math.random() * results.length)] : null;
}

async function searchKonachan(query, limit, nsfw, env) {
  try {
    const tags = `${query} animated`;
    const url = `https://konachan.com/post.json?tags=${encodeURIComponent(tags)}&limit=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (Array.isArray(data) ? data : []).map(post => ({
      url: post.file_url,
      preview: post.preview_url,
      tags: post.tags ? post.tags.split(' ') : [],
      source: 'konachan',
      id: post.id?.toString(),
      nsfw: post.rating !== 's'
    }));
  } catch (error) {
    return [];
  }
}

async function searchSafebooru(query, limit, env) {
  try {
    const tags = `${query} animated`;
    const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(tags)}&limit=${limit}&json=1`;
    
    const response = await fetch(url);
    const data = await response.json();

    return (Array.isArray(data) ? data : []).map(post => ({
      url: `https://safebooru.org/images/${post.directory}/${post.image}`,
      preview: `https://safebooru.org/thumbnails/${post.directory}/thumbnail_${post.image}`,
      tags: post.tags ? post.tags.split(' ') : [],
      source: 'safebooru',
      id: post.id?.toString(),
      nsfw: false
    }));
  } catch (error) {
    return [];
  }
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

async function getRandomWaifuIm(category, nsfw, env) {
  try {
    const type = nsfw ? 'nsfw' : 'sfw';
    const url = `https://api.waifu.im/random?tag=${encodeURIComponent(category)}&is_nsfw=${nsfw}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.images && data.images[0]) {
      const img = data.images[0];
      if (img.url && img.url.endsWith('.gif')) {
        return {
          url: img.url,
          preview: img.url,
          tags: img.tags || [category],
          source: 'waifu.im',
          nsfw: nsfw
        };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function getRandomWaifuImNsfw(category, env) {
  try {
    const url = `https://api.waifu.im/random?tag=${encodeURIComponent(category)}&is_nsfw=true`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.images && data.images[0]) {
      const img = data.images[0];
      if (img.url && img.url.endsWith('.gif')) {
        return {
          url: img.url,
          preview: img.url,
          tags: img.tags || [category],
          source: 'waifu.im',
          nsfw: true
        };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchWaifuIm(query, limit, nsfw, env) {
  try {
    const url = `https://api.waifu.im/search?tag=${encodeURIComponent(query)}&is_nsfw=${nsfw}&limit=${limit}`;
    const response = await fetch(url);
    
    if (!response.ok) return [];
    const data = await response.json();
    
    return (data.images || []).filter(img => img.url && img.url.endsWith('.gif')).map(img => ({
      url: img.url,
      preview: img.url,
      tags: img.tags || [query],
      source: 'waifu.im',
      nsfw: nsfw
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomShinkai(category, nsfw, env) {
  try {
    const url = `https://shinkai.io/api/random?tag=${encodeURIComponent(category)}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return {
        url: data.url,
        preview: data.url,
        tags: [category],
        source: 'shinkai.io',
        nsfw: nsfw
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchShinkai(query, limit, nsfw, env) {
  try {
    const url = `https://shinkai.io/api/search?tag=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url);
    
    if (!response.ok) return [];
    const data = await response.json();
    
    return (Array.isArray(data) ? data : data.results || []).filter(item => item.url && item.url.endsWith('.gif')).map(item => ({
      url: item.url,
      preview: item.url,
      tags: [query],
      source: 'shinkai.io',
      nsfw: nsfw
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomUwuNetwork(category, nsfw, env) {
  try {
    const url = `https://uwu.network/api/img/${category}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.url && data.url.endsWith('.gif')) {
      return {
        url: data.url,
        preview: data.url,
        tags: [category],
        source: 'uwu.network',
        nsfw: nsfw
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchUwuNetwork(query, limit, nsfw, env) {
  try {
    const url = `https://uwu.network/api/search?q=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url);
    
    if (!response.ok) return [];
    const data = await response.json();
    
    return (Array.isArray(data) ? data : data.results || []).filter(item => (item.url || item.link) && (item.url || item.link).endsWith('.gif')).map(item => ({
      url: item.url || item.link,
      preview: item.url || item.link,
      tags: [query],
      source: 'uwu.network',
      nsfw: nsfw
    }));
  } catch (error) {
    return [];
  }
}

async function getRandomPurrbot(category, nsfw, env) {
  try {
    const type = nsfw ? 'nsfw' : 'sfw';
    const url = `https://purrbot.site/api/img/${type}/${category}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.link && data.link.endsWith('.gif')) {
      return {
        url: data.link,
        preview: data.link,
        tags: [category],
        source: 'purrbot',
        nsfw: nsfw
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function getRandomPurrbotNsfw(category, env) {
  try {
    const url = `https://purrbot.site/api/img/nsfw/${category}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    const data = await response.json();
    
    if (data.link && data.link.endsWith('.gif')) {
      return {
        url: data.link,
        preview: data.link,
        tags: [category],
        source: 'purrbot',
        nsfw: true
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchPurrbot(query, limit, nsfw, env) {
  const results = [];
  const type = nsfw ? 'nsfw' : 'sfw';
  
  const sfwCategories = ['hug', 'kiss', 'pat', 'poke', 'slap', 'cuddle', 'tickle', 'wave', 'highfive', 'handhold', 'hold', 'boop', 'lick', 'bite', 'nom', 'pinch', 'stare', 'glare', 'nod', 'shrug', 'dance', 'run', 'jump', 'spin'];
  const nsfwCategories = ['hentai', 'lewd', 'ero', 'cum', 'pussy', 'ass', 'harem'];
  
  const categoryList = nsfw ? nsfwCategories : sfwCategories;
  const matchingCategories = categoryList.filter(cat => cat.includes(query.toLowerCase()) || query.toLowerCase().includes(cat));

  for (const cat of matchingCategories.slice(0, limit)) {
    try {
      const url = `https://purrbot.site/api/img/${type}/${cat}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      
      if (data.link && data.link.endsWith('.gif')) {
        results.push({
          url: data.link,
          preview: data.link,
          tags: [cat],
          source: 'purrbot',
          nsfw: nsfw
        });
        if (results.length >= limit) break;
      }
    } catch (err) {
      continue;
    }
  }
  
  return results;
}
