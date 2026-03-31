// proxy.js  –  node proxy.js
// Serves the app at http://localhost:3131/
// Proxies /api/* → https://9pei9gzytz.us-east-1.awsapprunner.com

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT     = 3131;
const API_HOST = '9pei9gzytz.us-east-1.awsapprunner.com';
const API_KEY  = 'lqs_dev_12345678901234567890';

http.createServer((req, res) => {

  // ── Proxy API calls: /api/* → upstream ──
  if (req.url.startsWith('/api/')) {
    const upstreamPath = req.url.replace('/api/', '/');
    console.log(`→ API  https://${API_HOST}${upstreamPath}`);

    const opts = {
      hostname: API_HOST,
      path: upstreamPath,
      method: 'GET',
      headers: { 'X-API-Key': API_KEY },
      rejectUnauthorized: false
    };

    const proxy = https.request(opts, apiRes => {
      res.writeHead(apiRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      apiRes.pipe(res);
    });

    proxy.on('error', err => {
      console.error('Proxy error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });

    proxy.end();
    return;
  }

  // ── Serve static files ──
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'public', filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const ext = path.extname(filePath);
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log(`✅ App running at http://localhost:${PORT}`);
  console.log(`   Serving  → ./public/index.html`);
  console.log(`   Proxying → https://${API_HOST}`);
});
