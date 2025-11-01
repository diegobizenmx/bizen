#!/usr/bin/env bash
set -euo pipefail

# Vercel Ignore Build Step for the Microcredential project
# Exit 0  -> skip build
# Exit 1+ -> run build

CHANGED_FILES=$(git diff --name-only HEAD^ HEAD || true)
if [ -z "$CHANGED_FILES" ]; then
  exit 1
fi

# If any change is outside BIZEN-only paths, build Microcred
# Microcred is everything under src/app except src/app/bizen
if echo "$CHANGED_FILES" | grep -E '^(src/app/(?!bizen/)|src/lib/supabase/client\.ts|src/shared/|public/|package\.json|package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb|next\.config\.ts|postcss\.config\.mjs|tailwind\.config\.(js|cjs|mjs|ts)|tsconfig\.json|eslint\.config\.mjs|middleware\.ts)' -q; then
  exit 1
fi

# If the only changes are inside BIZEN-only paths, skip Microcred build
exit 0


