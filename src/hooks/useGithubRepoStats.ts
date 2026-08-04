import { useEffect, useState } from 'react';
import { parseGithubRepoUrl, fetchRepoStats, type RepoStats } from '@/utils/github';

/**
 * Fetches live star/fork counts for a project's GitHub URL. Returns null
 * while loading or on any failure — consumers should render nothing in
 * that case rather than an error state, since this is a non-critical
 * decorative enhancement, not core content.
 */
export function useGithubRepoStats(githubUrl: string | undefined): RepoStats | null {
  const [stats, setStats] = useState<RepoStats | null>(null);

  useEffect(() => {
    if (!githubUrl) return;
    const parsed = parseGithubRepoUrl(githubUrl);
    if (!parsed) return;

    let cancelled = false;
    fetchRepoStats(parsed.owner, parsed.repo).then((result) => {
      if (!cancelled && result) setStats(result);
    });

    return () => {
      cancelled = true;
    };
  }, [githubUrl]);

  return stats;
}
