# Generated into dist/.htaccess by scripts/postbuild.mjs. Edit this template, not the output.
# Wrapped in IfModule so an unsupported module cannot take the site down.

Options -Indexes
ErrorDocument 404 /404.html

<IfModule mod_headers.c>
  # Temporary probe: if this header is missing from a live response, .htaccess is not being applied.
  Header always set X-Rathkit-Htaccess "on"

  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Report-Only until the docs and search are confirmed clean in the browser console.
  # Then rename to Content-Security-Policy to enforce it.
  Header always set Content-Security-Policy-Report-Only "__CSP__"
</IfModule>
