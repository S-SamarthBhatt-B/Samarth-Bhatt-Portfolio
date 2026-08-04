export interface RepoStats {
  stars: number;
  forks: number;
  updatedAt: string;
}

const CACHE_PREFIX = 'samarthos_gh_stats:';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes — repo stats don't change fast enough to justify more frequent calls

/** Extracts { owner, repo } from a github.com URL, or null if it doesn't match. */
export function parseGithubRepoUrl(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;
    const [owner, repo] = parsed.pathname.split('/').filter(Boolean);
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

interface CacheEntry {
  data: RepoStats;
  fetchedAt: number;
}

function readCache(key: string): RepoStats | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(key: string, data: RepoStats): void {
  try {
    const entry: CacheEntry = { data, fetchedAt: Date.now() };
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    /* sessionStorage unavailable — not fatal, just skip caching */
  }
}

/**
 * Fetches live star/fork counts for a public GitHub repo. Returns null on any
 * failure (rate limit, network error, private repo) — callers should treat
 * that as "just don't show stats," never as an error to surface to visitors.
 */
export async function fetchRepoStats(owner: string, repo: string): Promise<RepoStats | null> {
  const cacheKey = `${owner}/${repo}`;
  const cached = readCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return null;

    const data = await response.json();
    const stats: RepoStats = {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      updatedAt: data.updated_at ?? '',
    };
    writeCache(cacheKey, stats);
    return stats;
  } catch {
    return null;
  }
}
