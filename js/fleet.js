// Fleet page: category tabs and search box

const tabBar = document.querySelector('#tabs');
const searchBox = document.querySelector('#q');
const emptyMessage = document.querySelector('#empty');
const allCards = [...document.querySelectorAll('.card')];

const categories = {
  All: 'All machines',
  Moon: 'The Moon',
  Mars: 'Mars',
  Deep: 'Deep space'
};
const colours = { Moon: '#7fe0f0', Mars: '#ff8a4c', Deep: '#b9a3ff' };

// the home page links here with ?cat=Moon, ?cat=Mars or ?cat=Deep
let current = new URLSearchParams(location.search).get('cat') || 'All';
if (!categories[current]) current = 'All';

function buildTabs() {
  tabBar.innerHTML = '';
  Object.keys(categories).forEach((key) => {
    const button = document.createElement('button');
    button.textContent = categories[key];
    if (key === current) button.className = 'on';
    if (colours[key]) button.style.setProperty('--c', colours[key]);
    button.addEventListener('click', () => {
      current = key;
      history.replaceState(null, '', key === 'All' ? 'fleet.html' : 'fleet.html?cat=' + key);
      update();
    });
    tabBar.append(button);
  });
}

function update() {
  const query = searchBox.value.toLowerCase();
  let visible = 0;
  allCards.forEach((card) => {
    const matches = (current === 'All' || card.dataset.cat === current) && card.dataset.name.includes(query);
    card.hidden = !matches;
    if (matches) visible++;
  });
  emptyMessage.hidden = visible > 0;
  buildTabs();
}

searchBox.addEventListener('input', update);
update();
