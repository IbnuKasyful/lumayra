# Deploys mockup\ to Cloudflare Pages project "lumayra" (https://lumayra.pages.dev).
# Log in first with `npx wrangler login`.
# The Cloudflare account ID comes from $env:CLOUDFLARE_ACCOUNT_ID, or from a
# git-ignored deploy.local.ps1 next to this script that sets it.
# _unused\ is left out by copying only the site files to a temp folder.
$ErrorActionPreference = 'Stop'
$local = Join-Path $PSScriptRoot 'deploy.local.ps1'
if (Test-Path $local) { . $local }
if (-not $env:CLOUDFLARE_ACCOUNT_ID) { throw 'Set CLOUDFLARE_ACCOUNT_ID or create deploy.local.ps1' }
$src = Join-Path $PSScriptRoot 'mockup'
$out = Join-Path $env:TEMP 'lumayra-pages-deploy'
if (Test-Path $out) { Remove-Item -Recurse -Force $out }
New-Item -ItemType Directory $out | Out-Null
Copy-Item (Join-Path $src 'assets'), (Join-Path $src 'images') -Destination $out -Recurse
Copy-Item (Join-Path $src '*.html') -Destination $out
npx wrangler pages deploy $out --project-name=lumayra --branch=main
