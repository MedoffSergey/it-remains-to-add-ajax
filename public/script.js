'use strict'


function delete_files (value) {

    console.log('Из текущей директории был удален файл '+ value );
    let va =  document.getElementById(value)
    va.remove();
    $.ajax({
      url: "/delete?id="+value,   //путь
      type: "GET"  //Метод отправки

    });

}

function add_files () {

    let result = prompt('Введите название файла','');
    console.log('В текущую директорию добавлен новый файл');
    console.log(result);

    $.ajax({
      url: "/add?val="+result,   //путь
      type: "GET"  //Метод отправки

    });
}
