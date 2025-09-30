#!/bin/bash

# Script to update the README table with current deployment information
# This script runs anvil, deploys contracts, generates a new table, and updates the README

set -e  # Exit on any error

echo "🚀 Starting README table update process..."

echo "🔥 Starting Anvil..."
# Start anvil in the background
anvil > /dev/null 2>&1 &
ANVIL_PID=$!

# Function to cleanup anvil process
cleanup() {
    echo "🧹 Cleaning up..."
    if [ ! -z "$ANVIL_PID" ]; then
        echo "   Killing anvil process (PID: $ANVIL_PID)..."
        kill $ANVIL_PID 2>/dev/null || true
        wait $ANVIL_PID 2>/dev/null || true
    fi
    
    # Also kill any remaining anvil processes
    pkill -f "anvil" 2>/dev/null || true
    
    # Clean up temporary files
    rm -f gen-table.txt readme-table.txt README.md.backup README.md.new 2>/dev/null || true
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Wait a moment for anvil to start
echo "⏳ Waiting for Anvil to start..."
sleep 3

# Check if anvil is running
if ! curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545 > /dev/null; then
    echo "❌ Error: Anvil failed to start or is not responding"
    exit 1
fi

echo "✅ Anvil is running"

echo "🧹 Cleaning output directory..."
rm -rf output

echo "🚀 Deploying contracts to Anvil..."
pnpm run deploy --rpc-url http://localhost:8545 -vvv

echo "📊 Generating deployment table..."
pnpm -s run gen-table > gen-table.txt

echo "📝 Extracting current table from README..."
sed -n '/^┌.*┬.*┬.*┐$/,/^└.*┴.*┴.*┘$/p' README.md > readme-table.txt

echo "🔄 Updating README with new table..."

# Create a backup of the original README
cp README.md README.md.backup

# Find the line numbers where the table starts and ends
TABLE_START=$(grep -n "^┌.*┬.*┬.*┐$" README.md | head -1 | cut -d: -f1)
TABLE_END=$(grep -n "^└.*┴.*┴.*┘$" README.md | tail -1 | cut -d: -f1)

if [ -z "$TABLE_START" ] || [ -z "$TABLE_END" ]; then
    echo "❌ Error: Could not find table boundaries in README.md"
    echo "   Looking for lines starting with ┌ and ending with └"
    exit 1
fi

# Create a new README with the updated table
{
    # Copy everything before the table
    head -n $((TABLE_START - 1)) README.md
    
    # Add the new table
    cat gen-table.txt
    
    # Copy everything after the table
    tail -n +$((TABLE_END + 1)) README.md
} > README.md.new

# Replace the original README with the updated one
mv README.md.new README.md

echo "✅ README table updated successfully!"

# Show the diff for verification
echo ""
echo "📋 Changes made:"
if [ -f "readme-table.txt" ] && [ -f "gen-table.txt" ]; then
    echo "=== DIFF OUTPUT ==="
    diff -u readme-table.txt gen-table.txt || true
    echo "=== END DIFF ==="
fi

echo ""
echo "🎉 Update complete! The README has been updated with the latest deployment table."
