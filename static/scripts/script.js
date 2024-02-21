//setTheme();

// Set the date and time in the footer and update it every second
document.getElementById("footer-space").appendChild(document.createElement("div")).id = "timeAndDate";
getTime();
setInterval(getTime, 1000);
function getTime() {
    document.getElementById("timeAndDate").innerHTML = new Date()
        .toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });
}

// Generate a random quote to place below the social icons
document.getElementById("content").appendChild(document.createElement("div")).id = "quote";
document.getElementById("quote").innerHTML = getQuote();
function getQuote() {
    if (window.location.href === `${window.location.protocol}//${window.location.host}/`) {
        fetch('https://api.quotable.io/quotes/random')
            .then(response => response.json())
            .then(data => {
                let quote = data[0].content;
                let author = data[0].author;
                document.getElementById("quote").innerHTML = `"${quote}" - ${author} <br> (via <a href="https://quotable.io/" target="_blank">quotable.io</a>)`;

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return "";
}

/*function setTheme(season) {
    if (!season)
        season = getSeason();
    //theme css
    document.getElementById('header-theme').href = `/styles/${season}.css`
}

function getSeason() {
    let date = new Date();
    //winter 21 december, 20 march
    let winter = [new Date('12/21/' + (date.getFullYear() - 1)), new Date('03/19/' + date.getFullYear())];
    //spring 20 march, 21 june
    let spring = [new Date('03/20/' + date.getFullYear()), new Date('06/20/' + date.getFullYear())];
    //summer 21 june, 23 september
    let summer = [new Date('06/21/' + date.getFullYear()), new Date('09/22/' + date.getFullYear())];
    //autumn 23 september, 21 december
    let autumn = [new Date('09/23/' + date.getFullYear()), new Date('12/21/' + date.getFullYear() + 1)];

    if (winter[0] < date && date < winter[1])
        return 'winter';
    if (spring[0] < date && date < spring[1])
        return 'spring';
    if (summer[0] < date && date < summer[1])
        return 'summer';
    if (autumn[0] < date && date < autumn[1])
        return 'autumn';
}*/