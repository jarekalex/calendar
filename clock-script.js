// Timezone and city mapping
const timezones = {
    'America/New_York': { city: 'New York', emoji: '🗽' },
    'Europe/London': { city: 'London', emoji: '🇬🇧' },
    'Europe/Paris': { city: 'Paris', emoji: '🗼' },
    'Asia/Tokyo': { city: 'Tokyo', emoji: '🗾' },
    'Asia/Shanghai': { city: 'Shanghai', emoji: '🏯' },
    'Asia/Dubai': { city: 'Dubai', emoji: '🏗️' },
    'Asia/Bangkok': { city: 'Bangkok', emoji: '🛕' },
    'Asia/Singapore': { city: 'Singapore', emoji: '🏙️' },
    'Asia/Hong_Kong': { city: 'Hong Kong', emoji: '🏙️' },
    'Australia/Sydney': { city: 'Sydney', emoji: '🌉' },
    'Pacific/Auckland': { city: 'Auckland', emoji: '🇳🇿' },
    'America/Los_Angeles': { city: 'Los Angeles', emoji: '☀️' },
    'America/Chicago': { city: 'Chicago', emoji: '🏙️' },
    'America/Denver': { city: 'Denver', emoji: '⛰️' },
    'America/Mexico_City': { city: 'Mexico City', emoji: '🇲🇽' },
    'America/Toronto': { city: 'Toronto', emoji: '🍁' },
    'America/Vancouver': { city: 'Vancouver', emoji: '🏔️' },
    'America/Argentina/Buenos_Aires': { city: 'Buenos Aires', emoji: '🇦🇷' },
    'America/Sao_Paulo': { city: 'São Paulo', emoji: '🇧🇷' },
    'Africa/Cairo': { city: 'Cairo', emoji: '🔺' },
    'Africa/Johannesburg': { city: 'Johannesburg', emoji: '🇿🇦' },
    'Africa/Lagos': { city: 'Lagos', emoji: '🇳🇬' },
    'Europe/Berlin': { city: 'Berlin', emoji: '🇩🇪' },
    'Europe/Rome': { city: 'Rome', emoji: '🏛️' },
    'Europe/Moscow': { city: 'Moscow', emoji: '🇷🇺' },
    'India/Kolkata': { city: 'Kolkata', emoji: '🇮🇳' },
};

// Default timezones to display
const defaultTimezones = [
    'America/New_York',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo'
];

let selectedTimezones = [...defaultTimezones];

// DOM Elements
const clocksContainer = document.getElementById('clocksContainer');
const timezoneSelect = document.getElementById('timezonesToDisplay');
const localTimeEl = document.getElementById('localTime');
const localTimezoneEl = document.getElementById('localTimezone');
const resetBtn = document.getElementById('resetBtn');

// Event Listeners
timezoneSelect.addEventListener('change', updateSelectedTimezones);
resetBtn.addEventListener('click', resetToDefault);

// Get selected timezones from the select element
function updateSelectedTimezones() {
    selectedTimezones = Array.from(timezoneSelect.selectedOptions, option => option.value);
    updateAllClocks();
}

// Reset to default timezones
function resetToDefault() {
    selectedTimezones = [...defaultTimezones];
    
    // Update select element
    Array.from(timezoneSelect.options).forEach(option => {
        option.selected = defaultTimezones.includes(option.value);
    });
    
    updateAllClocks();
}

// Format time with leading zeros
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Get UTC offset string
function getUTCOffsetString(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short'
    });
    
    const parts = formatter.formatToParts(date);
    const tzName = parts.find(part => part.type === 'timeZoneName')?.value || 'UTC';
    
    // Calculate UTC offset
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    
    const sign = offset >= 0 ? '+' : '';
    return `UTC ${sign}${offset.toString().padStart(2, '0')}:00 (${tzName})`;
}

// Get formatted date string
function getFormattedDate(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return formatter.format(date);
}

// Get time in specific timezone
function getTimeInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const hours = parseInt(parts.find(p => p.type === 'hour').value);
    const minutes = parseInt(parts.find(p => p.type === 'minute').value);
    const seconds = parseInt(parts.find(p => p.type === 'second').value);
    
    return { hours, minutes, seconds };
}

// Update a single clock card
function updateClockCard(timezone) {
    const { hours, minutes, seconds } = getTimeInTimezone(timezone);
    const now = new Date();
    
    const card = document.querySelector(`[data-timezone="${timezone}"]`);
    if (card) {
        card.querySelector('.time').textContent = formatTime(hours, minutes, seconds);
        card.querySelector('.date').textContent = getFormattedDate(now, timezone);
        card.querySelector('.utc-offset').textContent = getUTCOffsetString(now, timezone);
    }
}

// Update local time
function updateLocalTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    localTimeEl.textContent = formatTime(hours, minutes, seconds);
    
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    localTimezoneEl.textContent = `${localTimezone} (Local)`;
}

// Create and render clock cards
function renderClocks() {
    clocksContainer.innerHTML = '';
    
    selectedTimezones.forEach(timezone => {
        const { hours, minutes, seconds } = getTimeInTimezone(timezone);
        const now = new Date();
        const cityInfo = timezones[timezone];
        
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.setAttribute('data-timezone', timezone);
        
        card.innerHTML = `
            <h3>${cityInfo.emoji} ${timezone.split('/')[1]}</h3>
            <div class="city">${cityInfo.city}</div>
            <div class="time">${formatTime(hours, minutes, seconds)}</div>
            <div class="date">${getFormattedDate(now, timezone)}</div>
            <div class="utc-offset">${getUTCOffsetString(now, timezone)}</div>
        `;
        
        clocksContainer.appendChild(card);
    });
}

// Update all clocks
function updateAllClocks() {
    renderClocks();
    updateLocalTime();
    selectedTimezones.forEach(updateClockCard);
}

// Initial setup and start updates
function init() {
    renderClocks();
    updateLocalTime();
    
    // Update every second
    setInterval(() => {
        updateLocalTime();
        selectedTimezones.forEach(updateClockCard);
    }, 1000);
}

// Start the clock
init();
