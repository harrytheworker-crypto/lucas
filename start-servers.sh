#!/bin/bash

# Harry AI Project Launch Script
# Starts both the website and dashboard servers

echo "🚀 Starting Harry AI Project Servers..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $WEBSITE_PID $DASHBOARD_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Website Server (Port 8000)
echo "${BLUE}📁 Starting lucasnygaard.com on http://localhost:8000${NC}"
cd "$(dirname "$0")/projects/lucasnygaard.com"
python3 -m http.server 8000 &
WEBSITE_PID=$!

# Wait a moment
sleep 1

# Check if website server started
if kill -0 $WEBSITE_PID 2>/dev/null; then
    echo "${GREEN}✅ Website server running on http://localhost:8000${NC}"
else
    echo "${YELLOW}⚠️  Website server failed to start${NC}"
fi

echo ""

# Start Dashboard Server (Port 3000) - requires npm install first
echo "${BLUE}📊 Starting Mission Control on http://localhost:3000${NC}"
cd "$(dirname "$0")/projects/mission-control/my-app"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}📦 Installing dependencies (this may take a minute)...${NC}"
    npm install
fi

npm run dev &
DASHBOARD_PID=$!

# Wait a moment
sleep 3

# Check if dashboard server started
if kill -0 $DASHBOARD_PID 2>/dev/null; then
    echo "${GREEN}✅ Dashboard server running on http://localhost:3000${NC}"
else
    echo "${YELLOW}⚠️  Dashboard server failed to start${NC}"
fi

echo ""
echo "${GREEN}🚀 Both servers started!${NC}"
echo ""
echo "🔗 Quick Links:"
echo "   Website:    http://localhost:8000"
echo "   Dashboard:  http://localhost:3000"
echo "   Launchpad:  open ~/.openclaw/workspace/launchpad.html"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Open launchpad in browser
open "$(dirname "$0")/launchpad.html" 2>/dev/null || echo "Open launchpad.html manually"

# Wait for servers
wait
