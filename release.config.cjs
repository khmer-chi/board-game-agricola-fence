module.exports = {
  branches: ["main", { name: "next", prerelease: true }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular", // 使用 Conventional Commits 規範
        releaseRules: [
          { type: "feat", release: "minor" }, // 預設：新功能增加次版本
          { type: "fix", release: "patch" }, // 預設：修復增加修補版本
          { type: "chore", release: "patch" }, // 自訂：chore 提交增加修補版本
          { type: "docs", release: "patch" }, // 可選：文件變更也增加修補版本
          { type: "style", release: "patch" }, // 可選：樣式變更增加修補版本
          { type: "refactor", release: "patch" }, // 可選：重構增加修補版本
          { type: "test", release: "patch" }, // 可選：測試變更增加修補版本
          { type: "ci", release: "patch" }, // 可選：CI 變更增加修補版本
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "chore", section: "Miscellaneous Chores", hidden: false }, // 確保 changelog 包含 chore
            { type: "docs", section: "Documentation", hidden: false },
            { type: "style", section: "Styles", hidden: false },
            { type: "refactor", section: "Code Refactors", hidden: false },
            { type: "test", section: "Tests", hidden: false },
            { type: "ci", section: "CI/CD", hidden: false },
          ],
        },
      },
    ],
    "@semantic-release/npm",
  ],
};
