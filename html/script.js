window.addEventListener('message', function (event) {

    
    if (event.data.type === 'update_money') {
        updateBankMoney(event.data.bank);
        updateHandMoney(event.data.hand);
        updateBlackMoney(event.data.black);
        // updateSocietyMoney(event.data.society);
    } else if (event.data.type === 'hide_hud') {
        hideHUD();
    } else if (event.data.type === 'update_job') {
        updateJob(event.data.name, event.data.grade)
    } else if (event.data.type === 'show_hud') {
        showHUD();
    } else if (event.data.type === 'update_server_info') {
        updateServerInfo(event.data.playerId, event.data.formattedDateTime);
    } else if (event.data.type === 'showSociety') {
        showSociety();
    } else if (event.data.type === 'hideSociety') {
        hideSociety();
    } else if (event.data.type === 'update_money2') {
        updateSocietyMoney(event.data.society);
    }
});

function updateBankMoney(bankMoney) {
    const bankMoneyElement = document.getElementById('bank-money');
    if (bankMoneyElement) {
        const formattedBankMoney = formatNumberWithCommas(bankMoney);
        bankMoneyElement.textContent = `$${formattedBankMoney}`;
    }
}

function updateHandMoney(handMoney) {
    const handMoneyElement = document.getElementById('hand-money');
    if (handMoneyElement) {
        const formattedHandMoney = formatNumberWithCommas(handMoney);
        handMoneyElement.textContent = `$${formattedHandMoney}`;
    }
}

function updateSocietyMoney(societyMoney) {
    const SocietyElement = document.getElementById('society-money');
    if (SocietyElement) {
        const formattedSocietyMoney = formatNumberWithCommas(societyMoney);
        SocietyElement.innerHTML = `<div id="society-money" class="society-money"><i class="fas fa-briefcase"></i> ${formattedSocietyMoney}`;
    }
}

function showSociety() {
    const SocietyElement = document.getElementById('society-money');
    if (SocietyElement) {
        SocietyElement.style.display = 'block';
    }
}

function hideSociety() {
    const SocietyElement = document.getElementById('society-money');
    if (SocietyElement) {
        SocietyElement.style.display = 'none';
    }
}


function updateJob(name, grade) {
    const jobElement = document.getElementById('job');
    if (jobElement) {
        jobElement.textContent = `${name} - ${grade}`;
    }
}

function updateBlackMoney(blackMoney) {
    const blackMoneyElement = document.getElementById('black-money');
    if (blackMoneyElement) {
        const formattedBlackMoney = formatNumberWithCommas(blackMoney);
        blackMoneyElement.textContent = `$${formattedBlackMoney}`;
    }
}

function hideHUD() {
    const hudContainer = document.getElementById('hud-container');
    if (hudContainer) {
        hudContainer.style.display = 'none';
    }
}

function showHUD() {
    const hudContainer = document.getElementById('hud-container');
    if (hudContainer) {
        hudContainer.style.display = 'block';
    }
}


function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatNumberWithZero(number) {
    return number < 10 ? '0' + number : number;
}

// Function to get the 12-hour formatted time
function get12HourTime(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${formatNumberWithZero(minutes)} ${period}`;
}

// Function to format the current date
function formatDate(date) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${monthNames[month]} ${day}, ${year}`;
    return formattedDate;
}

// Update the server info
function updateServerInfo(playerId) {
    const playerIdElement = document.getElementById('player-id');
    if (playerIdElement) {
        playerIdElement.textContent = `${playerId}`;
    }

    const dateTimeElement = document.getElementById('date-time');
    if (dateTimeElement) {
        const currentDate = new Date();
        const formattedTime = get12HourTime(currentDate.getHours(), currentDate.getMinutes());
        const formattedDate = formatDate(currentDate);
        dateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
    }
}