const DATA = {
    'Chrome':{
            'normal':[3.6, 3.71, 3.44, 3.21, 3.45],
            'fast3G':[3.7, 3.62, 3.23, 3.47, 3.58],
            'fast3G + 6x slowdown':[4.7, 4.6, 4.54, 4.53, 4.51],
            'slow3G':[3.6, 3.66, 3.7, 3.55, 3.49],
            'slow3G + 6x slowdown':[4.58, 4.7, 4.63, 4.43, 4.21],
    },
    'Opera':{
            'normal':[3.54, 3.61, 3.48, 3.65, 3.5],
            'fast3G':[3.55, 3.63, 3.78, 3.43, 3.52],
            'fast3G + 6x slowdown':[4.45, 4.54, 4.56, 4.52, 4.59],
            'slow3G':[3.65, 3.68, 3.72, 3.73, 3.61],
            'slow3G + 6x slowdown':[4.56, 4.53, 4.56, 4.58, 4.66],
    },
    'Firefox':{
         'normal':[3.6, 3.73, 3.65, 3.71, 3.72],
    },
};

const GoogleCanvas = document.getElementById("google");
const OperaCanvas = document.getElementById("opera");
const FirefoxCanvas = document.getElementById("firefox");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
///////////////////////////////////////////////////////////////Google data
const GoogleNormal = {
    label: "normal mode",
    data: [3.6, 3.71, 3.44, 3.21, 3.45],
    lineTension: 0,
    fill: false,
    borderColor: 'red'
  };

const GoogleFast3G = {
    label: "fast 3G",
    data: [3.55, 3.63, 3.78, 3.43, 3.52],
    lineTension: 0,
    fill: false,
  borderColor: 'blue'
  };

const GoogleFast3GSlow = {
    label: "fast 3G + 6x slowdown",
    data: [4.7, 4.6, 4.54, 4.53, 4.51],
    lineTension: 0,
    fill: false,
  borderColor: 'green'
  };

  const GoogleSlow3G = {
    label: "fast 3G + 6x slowdown",
    data: [3.6, 3.66, 3.7, 3.55, 3.49],
    lineTension: 0,
    fill: false,
  borderColor: 'violet'
  };
  const GoogleSlow3GSlow = {
    label: "fast 3G + 6x slowdown",
    data: [4.58, 4.7, 4.63, 4.43, 4.21],
    lineTension: 0,
    fill: false,
  borderColor: 'black'
  };
///////////////////////////////////////////////////////////////Google data


//////////////////////////////////////////////////////////////Opera data
const OperaNormal = {
    label: "normal mode",
    data: [3.54, 3.61, 3.48, 3.65, 3.5],
    lineTension: 0,
    fill: false,
    borderColor: 'red'
  };

const OperaFast3G = {
    label: "fast 3G",
    data: [3.55, 3.63, 3.78, 3.43, 3.52],
    lineTension: 0,
    fill: false,
  borderColor: 'blue'
  };

const OperaFast3GSlow = {
    label: "fast 3G + 6x slowdown",
    data: [4.45, 4.54, 4.56, 4.52, 4.59],
    lineTension: 0,
    fill: false,
  borderColor: 'green'
  };

  const OperaSlow3G = {
    label: "fast 3G + 6x slowdown",
    data: [3.65, 3.68, 3.72, 3.73, 3.61],
    lineTension: 0,
    fill: false,
  borderColor: 'violet'
  };
  const OperaSlow3GSlow = {
    label: "fast 3G + 6x slowdown",
    data: [4.56, 4.53, 4.56, 4.58, 4.66],
    lineTension: 0,
    fill: false,
  borderColor: 'black'
  };

//////////////////////////////////////////////////////////////Opera data



//////////////////////////////////////////////////////////////Firefox data
const FirefoxNormal = {
    label: "Firefox - normal mode",
    data: [3.6, 3.73, 3.65, 3.71, 3.72],
    lineTension: 0,
    fill: false,
    borderColor: 'red'
  };
//////////////////////////////////////////////////////////////Firefox data




/////////////////////////////////////////////////////////////Google graphic
const GoogleExperimentNumber = {
  labels: ["1", "2", "3", "4", "5",],
  datasets: [GoogleNormal, GoogleFast3G, GoogleFast3GSlow, GoogleSlow3G, GoogleSlow3GSlow]
};
var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 20,
      fontColor: 'black'
    }
  }
};
var lineChart = new Chart(GoogleCanvas, {
  type: 'line',
  data: GoogleExperimentNumber,
  options: chartOptions
});
/////////////////////////////////////////////////////////////Google graphic

////////////////////////////////////////////////////////////Opera graphic
const OperaExperimentNumber = {
    labels: ["1", "2", "3", "4", "5",],
    datasets: [OperaNormal, OperaFast3G, OperaFast3GSlow, OperaSlow3G, OperaSlow3GSlow]
  };

  var lineChart = new Chart(OperaCanvas, {
    type: 'line',
    data: OperaExperimentNumber,
    options: chartOptions
  });
////////////////////////////////////////////////////////////Opera graphic

//////////////////////////////////////////////////////////////Firefox graphic
const FirefoxExperimentNumber = {
    labels: ["1", "2", "3", "4", "5",],
    datasets: [FirefoxNormal]
  };

  var lineChart = new Chart(FirefoxCanvas, {
    type: 'line',
    data: FirefoxExperimentNumber,
    options: chartOptions
  });
//////////////////////////////////////////////////////////////Firefox graphic


let tabs = ['Google', 'Opera', 'Firefox'];
let data = ['first', 'second', 'third']

const tab = document.querySelector('.nav');
const content = document.querySelectorAll('.tab-pane');
const links =document.querySelectorAll('.nav-link')

tab.addEventListener('click', function(e){
        let index = tabs.indexOf(e.target.textContent);
        let choice = data[index];
        for(let i=0; i<content.length; i++){
            if(content[i].id == choice){
                show(content[i]);
                links[i].classList.add('active');
                continue;
            }
            content[i].classList.remove('show', 'active');
            links[i].classList.remove('active');

        }

})

function show(a){
    if(!a.classList.contains('show', 'active')){
        a.classList.add('show', 'active');
    }
   
}
const showButton = document.querySelector('.show-tables');
const measured = document.querySelector('.measured');
const hideButton = document.querySelector('.hide-tables');

showButton.addEventListener('click', function(e){
    measured.style.display ='block';
})
hideButton.addEventListener('click', function(e){
    measured.style.display ='none';
})


//////////////////////////////////////////////////////////////Sum gistogram

const sumGist = document.getElementById('gistagram');
var Worst = {
    label: 'Worst case scenario (seconds)',
    data: [4.576, 4.578, 0],
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
    borderColor: 'rgba(0, 99, 132, 1)',
    yAxisID: "y-axis-time"
  };
   
  var Best = {
    label: 'Best case scenario (seconds)',
    data: [3.482, 3.556, 3.682],
    backgroundColor: 'rgba(99, 132, 0, 0.6)',
    borderColor: 'rgba(99, 132, 0, 1)',
    yAxisID: "y-axis-time"
  };
   
  var BrowserData = {
    labels: tabs,
    datasets: [Worst, Best]
  };
   
  var chartOptions = {
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.6
      }],
      yAxes: [{
        id: "y-axis-time"
      }],
    }
  };
   
  var barChart = new Chart(sumGist, {
    type: 'bar',
    data: BrowserData,
    options: chartOptions
  });