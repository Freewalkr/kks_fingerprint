const Screens = [[640,480], [800, 600], [960, 720], [1024,768], [1280, 960], [1400, 1080], [1600, 1200],
                 [1920, 1440], [1280, 800], [1440, 900], [1680,1050], [1900, 1200], [2560, 1600], [1024, 576], [1152, 648],
                 [1280, 720], [1366, 768], [1600, 900], [1920, 1080], [2560, 1440]];

const Fonts = ['Times New Roman', 'Calibri', 'Arial', 'Helvetica', 'Gotham', 'Futura', 'Georgia', 'Pluto Sans', 'Roboto',
                'Museo', 'Comic Sans', 'Verdana', 'Centaur', 'MS Gothic'];

let Names = ['Rodion', 'Stas', 'Mikhail', 'Gedeon', 'Konstantin', 'Vladimir', 'Aleksey', 'Ilya', 'Anatolii', 'Matvei',
                'Yulian', 'Dmitriy', 'Petr', 'Nikita', 'Maksim', 'Stanislav', 'Veniamin', 'Pavel', 'Andrei', 'Boris',
                'Gregory', 'Alexandr', 'Evgeniy', 'Daniil', 'Fedor', 'Filipp', 'Timur', 'Maksimilian', 'Vsevolod',
                'Gleb', 'Anton', 'Roman', 'Ivan', 'Hilbert', 'Eduard', 'Klaus', 'Dietrich', 'Nikolaus', 'Markus', 'Otto',
                'Leon', 'Friederic', 'Albrecht', 'Stefan', 'August', 'Barthold', 'Conrad', 'Hans', 'Theodore', 'Ulbrecht' ]


let DATA = {
    name: Names,
    languages:['ru', 'en'],
    colorDepth:[8,12,24],
    deviceMemory:[1, 2, 4, 8, 16, 32, 64],
    screenResolution: Screens,
    hardwareConcurrency:[1, 2, 4, 8, 12, 16],
    timezoneOffset: [120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720],
    sessionStorage:[true, false],
    localStorage:[true, false],
    indexedDB:[true, false],
    openDatabase:[true, false],
    platform:['Win32', 'Win64', 'Linux', 'Mac'],
    touchSupport:[true, false],
    fonts:Fonts,
    pluginsSupport:[true, false],
    chrome:[true, false],
    cookiesEnabled: [true, false],
}



module.exports = DATA