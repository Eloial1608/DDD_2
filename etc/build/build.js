const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const cleanDist = () => {
  const distPath = path.resolve(__dirname, '../../dist')
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true })
    console.log("Cleaned 'dist' directory.")
  }
}

const compileTS = () => {
  try {
    execSync('tsc -p tsconfig.prod.json && resolve-tspaths -p tsconfig.prod.json -s ./src -o ./dist/src', { stdio: 'inherit' })
    console.log('TypeScript compiled successfully.')
  } catch (error) {
    console.error('TypeScript compilation failed.')
    process.exit(1)
  }
}

const copyFiles = (patterns, srcDir, destDir) => {
  const files = []

  // Recursively find files matching the patterns
  const findFiles = (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        findFiles(entryPath)
      } else if (patterns.some((pattern) => new RegExp(pattern).test(entry.name))) {
        files.push(entryPath)
      }
    })
  }

  findFiles(srcDir)

  files.forEach((file) => {
    const relativePath = path.relative(srcDir, file)
    const destPath = path.join(destDir, relativePath)

    // Ensure the destination directory exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true })

    // Copy the file
    fs.copyFileSync(file, destPath)
    console.log(`Copied: ${relativePath}`)
  })
}

const main = () => {
  const srcDir = path.resolve(__dirname, '../../src')
  const destDir = path.resolve(__dirname, '../../dist/src')

  cleanDist()
  compileTS()
  copyFiles(['\\.json$', '\\.yaml$', '\\.html$', '\\.png$'], srcDir, destDir)
  copyFiles(['^\\.env$'], srcDir, destDir)
}

main()
