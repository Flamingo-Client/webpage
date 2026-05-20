const GH_REPO = 'Flamingo-Client/Flamingo'
const GH_API = `https://api.github.com/repos/${GH_REPO}/releases?per_page=10`

export interface PlatformData {
  name: string
  version: string
  size: string
  type: string
  note: string
  url: string
  custom: boolean
}

export interface ReleaseData {
  version: string
  date: string
  notes: string
  url: string
}

export interface GitHubData {
  gh: string
  platforms: PlatformData[]
  releases: ReleaseData[]
}

export interface GitHubAsset {
  name: string
  size: number
  browser_download_url: string
}

export interface GitHubRelease {
  tag_name: string
  published_at: string
  body: string
  assets: GitHubAsset[]
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${Math.round(mb)} MB` : `${Math.round(bytes / 1024)} KB`
}

function findAsset(assets: GitHubAsset[], pattern: RegExp): GitHubAsset | undefined {
  return assets.find((a) => pattern.test(a.name) && !a.name.includes('arm64') && !a.name.includes('aarch64'))
}

export function parsePlatforms(release: GitHubRelease): PlatformData[] {
  const { assets, tag_name } = release
  const version = tag_name.startsWith('v') ? tag_name : `v${tag_name}`
  const gh = `https://github.com/${GH_REPO}`

  const exe = findAsset(assets, /\.exe$/i)
  const appImage = findAsset(assets, /\.AppImage$/i)
  const dmg = findAsset(assets, /\.dmg$/i)

  return [
    {
      name: 'Windows',
      version,
      size: exe ? formatSize(exe.size) : 'N/A',
      type: '.exe',
      note: 'Windows 10 or later',
      url: exe ? exe.browser_download_url : '#',
      custom: !exe,
    },
    {
      name: 'macOS',
      version,
      size: dmg ? formatSize(dmg.size) : 'Build it yourself',
      type: '.dmg',
      note: 'Intel & Apple Silicon',
      url: dmg ? dmg.browser_download_url : gh,
      custom: !dmg,
    },
    {
      name: 'Linux',
      version,
      size: appImage ? formatSize(appImage.size) : 'N/A',
      type: '.AppImage',
      note: 'AppImage & deb & rpm',
      url: appImage ? appImage.browser_download_url : '#',
      custom: !appImage,
    },
  ]
}

export function parseReleases(releases: GitHubRelease[]): ReleaseData[] {
  return releases.map((r) => {
    const version = r.tag_name.startsWith('v') ? r.tag_name : `v${r.tag_name}`
    const date = new Date(r.published_at).toLocaleDateString('en-GB')
    const body = r.body
      ? r.body
          .replace(/## What's Changed[\s\S]*?(?=## |$)/, '')
          .replace(/## .+/g, '')
          .replace(/\* @\S+/g, '')
          .replace(/https?:\/\/\S+/g, '')
          .replace(/\n{3,}/g, '\n')
          .trim()
      : ''
    const notes = body || 'See GitHub releases for details.'
    return { version, date, notes, url: `https://github.com/${GH_REPO}/releases/tag/${r.tag_name}` }
  })
}

const HARDCODED: GitHubData = {
  gh: `https://github.com/${GH_REPO}`,
  platforms: [
    { name: 'Windows', version: 'v0.2.1', size: '113 MB', type: '.exe', note: 'Windows 10 or later', url: `https://github.com/${GH_REPO}/releases/download/0.2.1/Flamingo.Setup.0.2.1.exe`, custom: false },
    { name: 'macOS', version: 'v0.2.1', size: 'Build it yourself', type: '.dmg', note: 'Intel & Apple Silicon', url: `https://github.com/${GH_REPO}`, custom: true },
    { name: 'Linux', version: 'v0.2.1', size: '140 MB', type: '.AppImage', note: 'AppImage & deb & rpm', url: `https://github.com/${GH_REPO}/releases/download/0.2.1/Flamingo-0.2.1.AppImage`, custom: false },
  ],
  releases: [
    { version: 'v0.2.1', date: '15/05/2026', notes: 'Minor visual bug fixes.', url: `https://github.com/${GH_REPO}/releases/tag/v0.2.1` },
    { version: 'v0.2.0', date: '15/05/2026', notes: 'A new feature has arrived! You can now save and organize your API requests into folders while keeping the experience lightweight, fast, and distraction-free.', url: `https://github.com/${GH_REPO}/releases/tag/v0.2.0` },
    { version: 'v0.1.0', date: '15/05/2026', notes: 'Flamingo Client Is now available for download! Star us on GitHub! Report any issues you encounter on our GitHub issues page, we appreciate your feedback.', url: `https://github.com/${GH_REPO}/releases/tag/v0.1.0` },
  ],
}

export async function fetchGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return HARDCODED
  try {
    const res = await fetch(GH_API, {
      headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return HARDCODED
    const releases: GitHubRelease[] = await res.json()
    if (!releases || releases.length === 0) return HARDCODED
    return {
      gh: `https://github.com/${GH_REPO}`,
      platforms: parsePlatforms(releases[0]),
      releases: parseReleases(releases),
    }
  } catch {
    return HARDCODED
  }
}

export async function fetchLiveData(): Promise<GitHubData> {
  try {
    const res = await fetch(GH_API, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return HARDCODED
    const releases: GitHubRelease[] = await res.json()
    if (!releases || releases.length === 0) return HARDCODED
    return {
      gh: `https://github.com/${GH_REPO}`,
      platforms: parsePlatforms(releases[0]),
      releases: parseReleases(releases),
    }
  } catch {
    return HARDCODED
  }
}
