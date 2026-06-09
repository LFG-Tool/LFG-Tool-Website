// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LFG Tool',
  tagline: 'Manage LFG postings and temporary voice channels with a single bot built for Discord gaming communities.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://lfgtool.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LFG-Tool', // Usually your GitHub org/user name.
  projectName: 'LFG-Tool-Website', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LFG-Tool/LFG-Tool-Website/tree/main/',
        },
        blog: {
          showReadingTime: false,
          routeBasePath: "/updates",
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'LFG Tool',
        logo: {
          alt: 'LFG Tool Logo',
          src: 'img/logo-dark.png',
          srcDark: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/updates',
            position: 'left',
            label: 'Updates & News',
          },
          {
            to: '/contact',
            position: 'left',
            label: 'Contact',
          },
          // {
          //   href: 'https://github.com/LFG-Tool/LFG-Tool-Website',
          //   label: 'GitHub',
          //   position: 'right',
          // },
          {
            type: 'custom-user-navbar',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Platform',
            items: [
              { label: 'Add To Discord', href: 'https://lfgtool.xyz/add', },
              { label: 'Discord Server', href: 'https://discord.lfgtool.xyz', },
              { label: 'Join Tool', to: '/join', },
            ],
          },
          {
            title: 'Documentation', items: [
              { label: 'Getting Started', to: '/docs/intro', },
              { label: 'Updates & News', to: '/updates', },
              { label: 'Contact', to: '/contact', },
            ],
          },
          {
            title: 'Development', items: [
              { label: 'GitHub Organization', href: 'https://github.com/LFG-Tool/', },
              { label: 'Website Repository', href: 'https://github.com/LFG-Tool/LFG-Tool-Website', },],
          },],
        copyright: `Copyright © ${new Date().getFullYear()} LFG Tool. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
