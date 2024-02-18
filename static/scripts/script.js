//setTheme();
setInterval(function () {
    document.getElementById("timeAndDay").innerHTML = getTime();
}, 1000);

function getTime() {
    return new Date()
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