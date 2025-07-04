class Profile {
  constructor() {
    this.renderProfile();
    this.initThemeSelector();
    this.initCursorFollower();
  }

  renderProfile() {
    // User Info
    const { user, badges, tags, socials, connections } = config;

    document.querySelector('.username-text').textContent = user.username;
    document.querySelector('.discriminator').textContent = `#${user.discriminator}`;
    document.querySelector('.avatar').src = user.avatar;
    document.querySelector('.bio').textContent = user.bio;
    document.querySelector('.status-emoji').textContent = user.customStatus.emoji;
    document.querySelector('.status-text').textContent = user.customStatus.text;

    // Badges
    const badgesContainer = document.querySelector('.badges');
    badges.forEach(badge => {
      const badgeElement = document.createElement('div');
      badgeElement.className = 'badge';
      badgeElement.title = badge.title;
      badgeElement.innerHTML = `<i class="${badge.icon}"></i>`;
      badgesContainer.appendChild(badgeElement);
    });

    // Tags
    const tagsContainer = document.querySelector('.tags');
    tags.forEach(tag => {
      const tagElement = document.createElement('div');
      tagElement.className = `tag tag-${tag.type}`;
      tagElement.innerHTML = `<i class="${tag.icon}"></i> ${tag.name}`;
      tagsContainer.appendChild(tagElement);
    });

    // Socials
    const socialsContainer = document.querySelector('.socials');
    socials.forEach(social => {
      const socialElement = document.createElement('a');
      socialElement.className = 'social';
      socialElement.href = social.url;
      socialElement.target = '_blank';
      socialElement.rel = 'noopener noreferrer';
      socialElement.title = social.name;
      socialElement.innerHTML = `<i class="${social.icon}"></i>`;
      socialsContainer.appendChild(socialElement);
    });

    // Connections
    const connectionsContainer = document.querySelector('.connections-list');
    connections.forEach(connection => {
      const connectionElement = document.createElement('div');
      connectionElement.className = 'connection';
      connectionElement.innerHTML = `
        <i class="${connection.icon}"></i>
        <span>${connection.name}</span>
        <span class="connection-username">${connection.username}</span>
      `;
      connectionsContainer.appendChild(connectionElement);
    });
  }

  initThemeSelector() {
    const themeOptions = document.querySelector('.theme-options');

    config.themes.forEach(theme => {
      const themeOption = document.createElement('div');
      themeOption.className = 'theme-option';
      themeOption.dataset.theme = theme.name;
      themeOption.style.backgroundColor = theme.primary;
      themeOption.addEventListener('click', () => this.changeTheme(theme));
      themeOptions.appendChild(themeOption);
    });
  }

  changeTheme(theme) {
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--card-bg', theme.card);

    // Toggle special ultimate class
    const card = document.querySelector('.card');
    if (theme.name === 'ultimate') {
      card.classList.add('theme-ultimate');
    } else {
      card.classList.remove('theme-ultimate');
    }
  }

  initCursorFollower() {
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll(
      '.badge, .social, .connection, .guild-card, .tag'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursorFollower.style.opacity = '0.4';
      });

      el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.opacity = '1';
      });
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new Profile();
});
