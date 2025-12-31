import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');

const DEFAULT_REGISTRY =
  process.env.NPM_REGISTRY ||
  process.env.HKX_NPM_REGISTRY ||
  'http://10.200.204.5:8081/repository/npm-hkx/';

const args = process.argv.slice(2);

const options = {
  registry: DEFAULT_REGISTRY,
  tag: process.env.NPM_DIST_TAG,
  access: process.env.NPM_ACCESS,
  otp: process.env.NPM_OTP,
  skipBuild: false,
  dryRun: false,
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  switch (arg) {
    case '--registry':
      options.registry = args[++i];
      break;
    case '--tag':
      options.tag = args[++i];
      break;
    case '--access':
      options.access = args[++i];
      break;
    case '--otp':
      options.otp = args[++i];
      break;
    case '--skip-build':
      options.skipBuild = true;
      break;
    case '--dry-run':
      options.dryRun = true;
      break;
    default:
      console.warn(`Unknown argument "${arg}" will be ignored.`);
  }
}

if (!existsSync(PACKAGES_DIR)) {
  console.error(`Packages directory "${PACKAGES_DIR}" does not exist.`);
  process.exit(1);
}

const packages = readdirSync(PACKAGES_DIR)
  .map((dir) => {
    const packageJsonPath = path.join(PACKAGES_DIR, dir, 'package.json');
    if (!existsSync(packageJsonPath)) {
      return null;
    }
    const manifest = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    if (manifest.private) {
      return null;
    }
    return {
      dir,
      name: manifest.name,
      version: manifest.version,
      hasBuildScript: Boolean(manifest.scripts?.build),
      publishConfig: manifest.publishConfig ?? {},
    };
  })
  .filter(Boolean);

if (packages.length === 0) {
  console.log('No publishable packages were found under ./packages');
  process.exit(0);
}

function run(command, commandArgs, step) {
  console.log(`\n[${step}] ${command} ${commandArgs.join(' ')}`);
  const result = spawnSync(command, commandArgs, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    throw new Error(
      `Command "${command} ${commandArgs.join(' ')}" exited with code ${result.status}`,
    );
  }
}

for (const pkg of packages) {
  console.log(`\n📦 Publishing ${pkg.name}@${pkg.version}`);
  if (!options.skipBuild) {
    if (!pkg.hasBuildScript) {
      console.warn(`Package ${pkg.name} has no build script, skipping build step.`);
    } else {
      run('pnpm', ['--filter', pkg.name, 'run', 'build'], 'build');
    }
  }

  const publishArgs = [
    '--filter',
    pkg.name,
    'publish',
    '--registry',
    options.registry,
    '--no-git-checks',
  ];

  const publishAccess = options.access || pkg.publishConfig.access;
  if (publishAccess) {
    publishArgs.push('--access', publishAccess);
  }
  if (options.tag) {
    publishArgs.push('--tag', options.tag);
  }
  if (options.otp) {
    publishArgs.push('--otp', options.otp);
  }
  if (options.dryRun) {
    publishArgs.push('--dry-run');
  }

  run('pnpm', publishArgs, 'publish');
}

console.log('\n🎉 All packages published successfully!');

