document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault(); //Previnir de não enviar o formulario com é feito por padrão

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Caregando...');

        //Api Minha
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5d66ad79c0f0882b0a758a8082dab4fc&units=metric&lang=pt_br`;

        //Api Professor
        // let url = `https://api.openweathermap.org/data/2.5/weather?q=
        // ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`;
        

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempoIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngler: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos essa localização.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;


    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempoIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngler-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}

//Projeto de aluno para estudo: Repositório: https://github.com/matealves/weatherapp
// Testar: https://matealves.github.io/weatherapp/