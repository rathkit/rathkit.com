# Generated into dist/.htaccess by scripts/postbuild.mjs. Edit this template, not the output.
# Wrapped in IfModule so an unsupported module cannot take the site down.

Options -Indexes
ErrorDocument 404 /404.html

# TEMPORARY redirect probe: shows how the backend sees the connection so the HTTPS
# redirect cannot loop. Remove once the redirect rules are in.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^ - [E=RK_HTTPS:%{HTTPS},E=RK_PORT:%{SERVER_PORT},E=RK_SCHEME:%{REQUEST_SCHEME}]
</IfModule>
<IfModule mod_setenvif.c>
  SetEnvIf X-Forwarded-Proto (.+) RK_XFP=$1
  SetEnvIf X-Forwarded-Scheme (.+) RK_XFS=$1
  SetEnvIf X-Forwarded-SSL (.+) RK_XSSL=$1
  SetEnvIf Host (.+) RK_HOST=$1
</IfModule>

<IfModule mod_headers.c>
  # Temporary probe: if this header is missing from a live response, .htaccess is not being applied.
  Header always set X-Rathkit-Htaccess "on"
  Header always set X-Rk-Https "%{RK_HTTPS}e"
  Header always set X-Rk-Port "%{RK_PORT}e"
  Header always set X-Rk-Scheme "%{RK_SCHEME}e"
  Header always set X-Rk-Xfp "%{RK_XFP}e"
  Header always set X-Rk-Xfs "%{RK_XFS}e"
  Header always set X-Rk-Xssl "%{RK_XSSL}e"
  Header always set X-Rk-Host "%{RK_HOST}e"

  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Report-Only until the docs and search are confirmed clean in the browser console.
  # Then rename to Content-Security-Policy to enforce it.
  Header always set Content-Security-Policy-Report-Only "__CSP__"
</IfModule>
