#!/usr/bin/env node
// Generates the README address table: Catapult's `utils gen-table` over the local output
// directory, plus one row per deploy action whose address is chain-specific. Those actions take
// a per-chain constant (`Network().chainId` lookup), so the local Anvil run skips them and they
// have no output; they are listed with a marker instead of an address.
//
// Usage: node scripts/gen-table.mjs <output-dir>

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

const PER_CHAIN = '* per-chain address'

const outputDir = process.argv[2]
if (!outputDir) {
  console.error('usage: gen-table.mjs <output-dir>')
  process.exit(1)
}

// Catapult's naming, copied so forced rows match the rows it would emit for the same action.
const toTitleCase = (slug) =>
  slug.split(/[-_\s]+/).filter(Boolean).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
const deriveName = (jobName, key) => {
  const m = jobName.match(/[-_]?v(\d+)/i)
  const version = m ? `V${m[1]}` : ''
  const baseJob = jobName.replace(/[-_]?v\d+$/i, '')
  const isGeneric = /^(factory|address)$/i.test(key)
  const nameCore = isGeneric ? `${toTitleCase(baseJob)} ${toTitleCase(key)}` : toTitleCase(key)
  return `${nameCore.replace(/\s+/g, '')}${version}`
}

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'templates') walk(full, out)
    } else if (/\.ya?ml$/.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

const perChainRows = []
for (const file of walk('jobs')) {
  const doc = parse(fs.readFileSync(file, 'utf8'))
  if (!doc || typeof doc !== 'object' || !Array.isArray(doc.actions) || doc.deprecated) continue
  for (const action of doc.actions) {
    if (action.output !== true) continue
    if (!JSON.stringify(action.arguments ?? {}).includes('Network().chainId')) continue
    perChainRows.push({ job: doc.name, name: deriveName(doc.name, action.name), address: PER_CHAIN })
  }
}

const generated = execFileSync('pnpm', ['exec', 'catapult', 'utils', 'gen-table', outputDir], { encoding: 'utf8' })
const rows = generated
  .split('\n')
  .filter((line) => line.startsWith('│'))
  .slice(1)
  .map((line) => {
    const [job, name, address] = line.split('│').slice(1, 4).map((c) => c.trim())
    return { job, name, address }
  })
if (rows.length === 0) {
  console.error('catapult gen-table produced no rows')
  process.exit(1)
}

const seen = new Set(rows.map((r) => `${r.job}\0${r.name}`))
for (const row of perChainRows) {
  if (!seen.has(`${row.job}\0${row.name}`)) rows.push(row)
}
rows.sort((a, b) => a.job.localeCompare(b.job) || a.name.localeCompare(b.name))

const headers = [['job', 'Job'], ['name', 'Name'], ['address', 'Address']]
const widths = Object.fromEntries(headers.map(([k, t]) => [k, Math.max(t.length, ...rows.map((r) => r[k].length))]))
const sep = (l, m, r) => l + headers.map(([k]) => '─'.repeat(widths[k] + 2)).join(m) + r
const line = (cells) => '│' + headers.map(([k], i) => ' ' + cells[i].padEnd(widths[k]) + ' ').join('│') + '│'

console.log(sep('┌', '┬', '┐'))
console.log(line(headers.map(([, t]) => t)))
console.log(sep('├', '┼', '┤'))
for (const r of rows) console.log(line(headers.map(([k]) => r[k])))
console.log(sep('└', '┴', '┘'))
