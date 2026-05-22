#!/usr/bin/env bash
set -euo pipefail

if [ -n "${TRAKR_RUBY_BIN:-}" ]; then
  export PATH="${TRAKR_RUBY_BIN}:$PATH"
elif command -v brew >/dev/null 2>&1; then
  ruby_prefix="$(brew --prefix ruby@3.3 2>/dev/null || true)"
  if [ -n "$ruby_prefix" ] && [ -d "$ruby_prefix/bin" ]; then
    export PATH="$ruby_prefix/bin:$PATH"
  fi
fi

exec "$@"
