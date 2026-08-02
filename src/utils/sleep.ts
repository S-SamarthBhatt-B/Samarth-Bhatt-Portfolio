/** Promise-based delay helper for sequencing boot/terminal animations. */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
