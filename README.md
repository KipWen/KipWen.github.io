# Salty_fish

基于 [Hexo](https://hexo.io/) 的个人博客，主题 [hexo-theme-fengye](https://github.com/chen-yingfa/hexo-theme-fengye)。

部署地址：[kipwen.github.io](https://kipwen.github.io)

## 分支结构

| 分支 | 内容 | 推送方式 |
|------|------|----------|
| `source` | 源码（文章、模板、配置） | `git push` |
| `main` | 生成的静态页面 | `hexo deploy` |

## 本地运行

```bash
npm install
npx hexo server
```

访问 `http://localhost:4000`

## 写文章

```bash
npx hexo new post "文章标题"
```

front matter 格式：

```markdown
---
title: 文章标题
categories: tech        # tech / life / finance / health / travel
tags: [标签1, 标签2]
date: 2026-05-05
---
```

## 部署

```bash
# 1. 推送源码（source 分支）
git add -A && git commit -m "..."
git push origin source

# 2. 部署页面（main 分支）
npx hexo clean && npx hexo generate
npx hexo deploy
```
