const redirects = require('./http_redirects.json')
const requests = require('./http_requests.json')
const js = require('./javascript.json')

const urls = new Map();
const redirect_urls = new Map();
const requests_urls = new Map();
const js_urls = new Map();

const addCount = (map, key) => {
  const count = map.get(key) || 0;
  map.set(key, count + 1);
}

const getMainUrl = (full) => {
  const url = new URL(full);
  let mainUrl = url.origin + url.pathname;
  if (mainUrl.startsWith('https')) {
    mainUrl = mainUrl.substring(8);
  } else {
    mainUrl = mainUrl.substring(7);
  }
  const splits = mainUrl.split('/');
  return splits[0] + '/' + splits[1] || '';
}

for (const redirect of redirects) {
  const mainUrl = getMainUrl(redirect.old_request_url)
  addCount(urls, mainUrl);
  addCount(redirect_urls, mainUrl);
}

for (const request of requests) {
  const mainUrl = getMainUrl(request.url)
  addCount(urls, mainUrl);
  addCount(requests_urls, mainUrl);
}

for (const jsInfo of js) {
  const mainUrl = getMainUrl(jsInfo.script_url)
  addCount(urls, mainUrl);
  addCount(js_urls, mainUrl);
}


const showInsight = (map, k) => {
  const entries = [...map.entries()];
  entries.sort((e1, e2) => e2[1] - e1[1]);

  for (let i = 0; i < k; i += 1) {
    console.log(entries[i]);
  }
}

showInsight(urls, 20);
// showInsight(redirect_urls, 10);
// showInsight(js_urls, 20);
// showInsight(requests_urls, 10);
