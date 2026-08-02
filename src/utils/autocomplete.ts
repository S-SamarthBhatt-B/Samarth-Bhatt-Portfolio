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
