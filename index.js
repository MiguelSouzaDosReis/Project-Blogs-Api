const express = require('express');
const bodyParser = require('body-parser');
const { validDisplayName, validEmail, validPassword, verifyToken } = require('./middleware/Users');
const { validEmailLogin, validPasswordLogin } = require('./middleware/Login');
const { validName } = require('./middleware/Categories');
const { validCategoryIds, validTitle, validContent } = require('./middleware/BlogPost');
const { createBlogPosts } = require('./controller/BlogPosts');

const app = express();
app.use(bodyParser.json());
const Users = require('./controller/Users');
const Login = require('./controller/Login');
const Categories = require('./controller/Categories');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', validDisplayName, validEmail, validPassword, Users.createUsers);
app.post('/login', validEmailLogin, validPasswordLogin, Login.createLogin);
app.get('/user', verifyToken, Users.everthingUsers);
app.get('/user/:id', verifyToken, Users.everthingIdUsers);
app.post('/categories', validName, verifyToken, Categories.createCategories);
app.get('/categories', verifyToken, Categories.everthingCategories);
app.post('/post', verifyToken, validCategoryIds, validTitle, validContent, createBlogPosts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
