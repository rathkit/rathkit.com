# Generated into dist/.htaccess by scripts/postbuild.mjs. Edit this template, not the output.
# Wrapped in IfModule so an unsupported module cannot take the site down.

Options -Indexes
ErrorDocument 404 /404.html

# Canonical host and HTTPS. The backend reports HTTPS correctly (HTTPS=on/off), so this cannot loop.
# .well-known stays reachable over HTTP so certificate validation keeps working.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_URI} !^/\.well-known/ [NC]
  RewriteCond %{HTTPS} off
  RewriteRule ^ https://rathkit.com%{REQUEST_URI} [R=301,L]
  RewriteCond %{HTTP_HOST} ^www\.rathkit\.com$ [NC]
  RewriteRule ^ https://rathkit.com%{REQUEST_URI} [R=301,L]
</IfModule>

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Report-Only until the docs and search are confirmed clean in the browser console.
  # Then rename to Content-Security-Policy to enforce it.
  Header always set Content-Security-Policy-Report-Only "__CSP__"
</IfModule>
