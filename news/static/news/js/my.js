'use strict';
const url = 'http://127.0.0.1:8000';

var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/news');

xhr.onload = () => {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
}

xhr.send();

