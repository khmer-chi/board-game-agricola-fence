module.exports = {
  branches: ["main", { name: "next", prerelease: true }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventional", // 使用 Conventional Commits 規範
        releaseRules: [
          { type: "feat", release: "minor" }, // 新功能 -> minor
          { type: "fix", release: "patch" }, // 修復 -> patch
          { type: "chore", release: "patch" }, // chore -> patch（自訂）
          { type: "docs", release: "patch" }, // 文件更新 -> patch（可選）
          { type: "refactor", release: "patch" }, // 重構 -> patch（可選）
          { type: "BREAKING CHANGE", release: "major" }, // 重大變更 -> major
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventional",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" }, // 新功能分區
            { type: "fix", section: "Bug Fixes" }, // 修復分區
            { type: "chore", section: "Miscellaneous Chores", hidden: false }, // chore 分區
            { type: "docs", section: "Documentation", hidden: false }, // 文件分區
            { type: "refactor", section: "Code Refactors", hidden: false }, // 重構分區
          ],
        },
      },
    ],
    "@semantic-release/changelog", // 自動生成 CHANGELOG.md
    [
      "@semantic-release/git", // 將變更（例如 CHANGELOG.md）提交回儲存庫
      {
        assets: ["CHANGELOG.md", "package.json"], // 提交的檔案
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}", // 提交訊息
      },
    ],
    "@semantic-release/github", // 發布到 GitHub
  ],
};
