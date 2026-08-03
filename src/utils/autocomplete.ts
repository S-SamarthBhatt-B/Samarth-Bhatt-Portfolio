/**
 * Given the current input and a list of known command names, returns matches
 * that start with the input. Used for Tab-key autocomplete.
 */
export function getAutocompleteMatches(input: string, commandNames: string[]): string[] {
  const query = input.trim().toLowerCase();
  if (!query) return [];
  return commandNames.filter((name) => name.startsWith(query)).sort();
}

/**
 * Returns the closest command suggestion for an unknown input using a simple
 * edit-distance heuristic.
 */
export function getClosestCommand(input: string, commandNames: string[]): string | null {
  const query = input.trim().toLowerCase();
  if (!query) return null;

  let bestMatch = '';
  let bestScore = Number.POSITIVE_INFINITY;

  for (const name of commandNames) {
    const score = levenshteinDistance(query, name.toLowerCase());
    if (score < bestScore) {
      bestScore = score;
      bestMatch = name;
    }
  }

  if (bestScore <= Math.max(4, query.length > 4 ? 4 : 2)) {
    return bestMatch;
  }

  return null;
}

/**
 * Finds the longest common prefix among a list of strings.
 * Used so Tab can complete as far as is unambiguous when multiple matches exist.
 */
export function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (const str of strings.slice(1)) {
    while (!str.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}

function levenshteinDistance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  return dp[a.length][b.length];
}
