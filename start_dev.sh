#!/bin/bash

BASE_DIR="$(pwd)"

# Backend
osascript -e 'tell application "Terminal" to do script "cd \"'$BASE_DIR'/backend\" && source .venv/bin/activate && python manage.py runserver"'

# Frontend
osascript -e 'tell application "Terminal" to do script "cd \"'$BASE_DIR'/apps/frontend\" && npm run dev"'

# Dashboard
osascript -e 'tell application "Terminal" to do script "cd \"'$BASE_DIR'/apps/dashboard\" && npm run dev"'

echo "Servers starting in new Terminal windows..."
