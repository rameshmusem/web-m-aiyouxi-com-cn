// public/site-helper.js
// Lightweight page helper: info cards, keyword badges, and visit notes.

(function () {
  'use strict';

  const CONFIG = {
    siteName: '爱游戏',
    siteUrl: 'https://web-m-aiyouxi.com.cn',
    badgeKeywords: ['热门', '新游', '推荐'],
    visitNote: '欢迎访问爱游戏，开启畅快体验！'
  };

  // ---- DOM Helpers ----
  function createEl(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.textContent = content;
    return el;
  }

  function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
  }

  // ---- Card Builder ----
  function buildInfoCard() {
    const card = createEl('div', 'helper-card helper-card-info');
    const title = createEl('h3', 'helper-card-title', '站点信息');
    const desc = createEl('p', 'helper-card-desc', `欢迎来到 ${CONFIG.siteName}，发现更多精彩内容。`);
    const link = createEl('a', 'helper-card-link', '访问主页');
    link.href = CONFIG.siteUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    appendChildren(card, [title, desc, link]);
    return card;
  }

  function buildVisitNote() {
    const note = createEl('div', 'helper-card helper-card-note');
    const icon = createEl('span', 'helper-note-icon', '💡');
    const msg = createEl('span', 'helper-note-msg', CONFIG.visitNote);
    appendChildren(note, [icon, msg]);
    return note;
  }

  // ---- Badge Row ----
  function buildBadgeRow() {
    const container = createEl('div', 'helper-badge-row');
    const label = createEl('span', 'helper-badge-label', '关键词：');
    const badges = CONFIG.badgeKeywords.map(kw => {
      const badge = createEl('span', 'helper-badge', kw);
      badge.setAttribute('data-keyword', kw);
      return badge;
    });
    appendChildren(container, [label, ...badges]);
    return container;
  }

  // ---- Inject Styles ----
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .helper-card {
        background: #f5f7fa;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 10px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #1f2328;
        max-width: 400px;
      }
      .helper-card-title {
        margin: 0 0 6px;
        font-size: 16px;
        font-weight: 600;
      }
      .helper-card-desc {
        margin: 0 0 8px;
      }
      .helper-card-link {
        color: #0969da;
        text-decoration: none;
        font-weight: 500;
      }
      .helper-card-link:hover {
        text-decoration: underline;
      }
      .helper-card-note {
        background: #fff8c5;
        border-color: #d4a72c;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .helper-badge-row {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 10px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 13px;
      }
      .helper-badge-label {
        font-weight: 500;
        color: #656d76;
      }
      .helper-badge {
        background: #ddf4ff;
        border: 1px solid #54aeff;
        border-radius: 12px;
        padding: 2px 10px;
        font-size: 12px;
        color: #0550ae;
        font-weight: 500;
        cursor: default;
        transition: background 0.15s;
      }
      .helper-badge:hover {
        background: #b6e3ff;
      }
    `;
    document.head.appendChild(style);
  }

  // ---- Mount UI ----
  function mountHelper() {
    injectStyles();
    const wrapper = document.createElement('div');
    wrapper.id = 'site-helper-widget';
    wrapper.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;align-items:flex-end;';
    const card = buildInfoCard();
    const note = buildVisitNote();
    const badgeRow = buildBadgeRow();
    appendChildren(wrapper, [badgeRow, note, card]);
    document.body.appendChild(wrapper);
  }

  // ---- Init on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHelper);
  } else {
    mountHelper();
  }
})();