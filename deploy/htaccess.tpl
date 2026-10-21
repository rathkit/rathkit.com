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

  # public_html/.htaccess (a PHP app's front controller) is inherited by this folder. It adds a
  # trailing slash to unknown paths and then rewrites them to index.php, which does not exist here
  # (HTTP 500). Answer missing paths with 404 first so ErrorDocument serves the branded page.
  RewriteCond %{REQUEST_URI} !^/\.well-known/ [NC]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ - [R=404,L]
</IfModule>

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Enforced after the docs, search and theme toggle showed no violations in a clean browser profile.
  Header always set Content-Security-Policy "__CSP__"
</IfModule>
