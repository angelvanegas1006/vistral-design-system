#!/bin/bash

# Development Setup Script
# This script sets up the development environment for new contributors

set -e

echo "🚀 Setting up Vistral Design System development environment..."

# Check Node.js version
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    echo "💡 Use nvm to install: nvm install 20 && nvm use"
    exit 1
  fi
  echo "✅ Node.js version: $(node -v)"
else
  echo "❌ Node.js is not installed"
  echo "💡 Install Node.js 18+ from https://nodejs.org/"
  exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed"
  exit 1
fi
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Verify setup
echo ""
echo "🔍 Verifying setup..."

echo "  - Running type check..."
npm run typecheck

echo "  - Running linter..."
npm run lint || echo "⚠️  Linter found issues (this is okay for initial setup)"

echo "  - Running tests..."
npm run test:run || echo "⚠️  Some tests may fail initially"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Read CONTRIBUTING.md for guidelines"
echo "  2. Read ARCHITECTURE.md for architecture overview"
echo "  3. Run 'npm run storybook' to view components"
echo "  4. Run 'npm run dev' to start development"
echo ""
echo "🎉 Happy coding!"
