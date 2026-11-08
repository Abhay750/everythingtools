export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  value: string;
  originalLineNumber?: number;
  modifiedLineNumber?: number;
}

export function computeLineDiff(original: string, modified: string): DiffLine[] {
  const origLines = original ? original.split("\n") : [];
  const modLines = modified ? modified.split("\n") : [];

  const n = origLines.length;
  const m = modLines.length;

  // LCS dynamic programming table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (origLines[i] === modLines[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack to assemble diff lines
  const result: DiffLine[] = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.unshift({
        type: "unchanged",
        value: origLines[i - 1],
        originalLineNumber: i,
        modifiedLineNumber: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({
        type: "added",
        value: modLines[j - 1],
        modifiedLineNumber: j,
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({
        type: "removed",
        value: origLines[i - 1],
        originalLineNumber: i,
      });
      i--;
    }
  }

  return result;
}
