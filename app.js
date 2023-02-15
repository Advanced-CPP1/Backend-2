const fs = require('fs');

const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/user-data', (request, response) => {
    const userData = request.body;

    const filePath = path.join(__dirname, 'data', 'user-data.json');

    const fileData = fs.readFileSync(filePath);
    const existingUserData = JSON.parse(fileData);

    existingUserData.push(userData);
    fs.writeFileSync(filePath, JSON.stringify(existingUserData));

    response.render('success');
});

app.get('/messages', (request, response) => {
    const filePath = path.join(__dirname, 'data', 'user-data.json');
    
    const fileData = fs.readFileSync(filePath);
    const userData = JSON.parse(fileData);

    response.render('messages', {userDetails: userData});
});

app.listen(3000);