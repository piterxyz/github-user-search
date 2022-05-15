const searchInput = document.querySelector('#input');
const submit = document.querySelector('#submit');
const buttonMode = document.querySelector('#btn-mode');

window.addEventListener('DOMContentLoaded', getGitHubUser())
buttonMode.addEventListener('click', toggleMode);
submit.addEventListener('click', () => {
    if (!searchInput.value) return displayError('Please enter a username.');
    getGitHubUser(searchInput.value);
})
searchInput.addEventListener('keydown', event => {
    if (event.key == "Enter") {
        if (!searchInput.value) return displayError('Please enter a username.');
        getGitHubUser(searchInput.value);
    }
})

async function getGitHubUser(login = 'octocat') {
    const avatar = document.querySelector('#avatar');
    const name = document.querySelector('#name');
    const user = document.querySelector('#user');
    const date = document.querySelector('#date');
    const bio = document.querySelector('#bio');
    const repos = document.querySelector('#repos');
    const followers = document.querySelector('#followers');
    const following = document.querySelector('#following');
    const location = document.querySelector('#location');
    const page = document.querySelector('#page');
    const twitter = document.querySelector('#twitter');
    const company = document.querySelector('#company');

    const response = await fetch(`https://api.github.com/users/${login}`)
    const data = await response.json()
    
    if (data.message == "Not Found") return displayError('No results found.');

    avatar.src = data.avatar_url;
    name.textContent = data.name || data.login;
    user.textContent = `@${data.login}`;
    date.textContent = `Joined ${new Date(data.created_at).toLocaleString()}`;
    bio.textContent = data.bio || 'No bio available.';
    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;
    location.textContent = data.location || 'No location available.';
    page.textContent = data.blog || 'No page available.';
    twitter.textContent = data.twitter_username || 'No twitter available.';
    company.textContent = data.company || 'No company available.';
}

function displayError(error) {
    const errorMessage = document.querySelector('#error-message');

    errorMessage.textContent = error;
    setTimeout(() => {
        errorMessage.textContent = '';
    }, 3 * 1000);
}

function toggleMode() {
    const root = document.documentElement.style;
    const modeText = document.querySelector('#mode-text');
    const modeIcon = document.querySelector('#mode-icon');

    root.setProperty('--background', root.getPropertyValue('--background') == "#f6f8ff" ? "#141d2f" : "#f6f8ff");
    root.setProperty('--background-content', root.getPropertyValue('--background-content') == "#fefefe" ? "#1e2a47" : "#fefefe");
    root.setProperty('--text', root.getPropertyValue('--text') == "#4b6a9b" ? "white" : "#4b6a9b");
    root.setProperty('--text-alt', root.getPropertyValue('--text-alt') == "#2b3442" ? "#fefefe" : "#2b3442");
    root.setProperty('--shadow', root.getPropertyValue('--shadow') == "0px 16px 30px -10px rgba(70, 96, 187, 0.2)" ? "0px 16px 30px -10px rgba(70, 88, 109, 0.15)" : "0px 16px 30px -10px rgba(70, 96, 187, 0.2)");
    root.setProperty('--icon-bg', root.getPropertyValue('--icon-bg') == "brightness(100%)" ? "brightness(1000%)" : "brightness(100%)");

    modeText.textContent = modeText.textContent == "DARK" ? "LIGHT" : "DARK";
    modeIcon.src = modeIcon.src.includes("/img/icon-moon.svg") ? "./img/icon-sun.svg" : "./img/icon-moon.svg";
}