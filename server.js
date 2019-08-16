  //Подключение модулей
const express = require('express');
const fs = require('fs');
const path = require ('path');
const pug = require('pug');
const url = require('url')
const removeFs = require('fs-extra')

//init app
const app = express();

//load View Engine
// console.log(path.join(__dirname, 'views'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');    // указываем используемый шаблонизатор HTML кода

const directory = '/home/smedov/Work/Test';    //Указываем путь текущей дериктории


//добовляет файлы которые на компьютере для загрузки если они имеются
app.use(express.static(path.join(__dirname, 'public')));

//Главная страница
app.get('/', function (req, res) {

    const files = fs.readdirSync(directory);    //Прочитываем файлы из текущей директории
    let str = '';

    for (var key in files){           //перебираем файлы из директории
      str += ( files[key] + ',');
    }
    res.render('index', { title: 'Directory', value: files}); //рендерим файл index.pug
});

//  удаления файла из текущей директории
app.get('/delete', function(req, res) {
    // let deleteUrl = req.url;
    // let deleteParseUrl = url.parse(deleteUrl,true,true);
    // let deletePath = req.query.val;
    const folder = '/home/smedov/Work/Test/'+req.query.id;
    console.log(folder);
    removeFs.remove(folder, err => {
    console.error(err)
    })
    res.send("Файл " + req.query.id + " был успешно удален")
});



app.get('/add', function(req, res){
    let Url = req.url;
    let parseUrl = url.parse(Url,true,true);

    console.log("search: "+parseUrl.search);
    let path = req.query.val;

  fs.writeFile(path, "Hello мир!", function(error){
      if(error) throw error; //Использую инструкцию throw для генерирования исключения
      console.log("Содержимое файла:");

      res.send("200");//выведем 200ок

  });

});


//запускаем сервер
app.listen(3000, function () {
    console.log ('Отслеживаем порт: 3000!');
});
