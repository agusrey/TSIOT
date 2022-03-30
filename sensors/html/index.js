const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const httpPort = 8080

var count = -1;
var result = 0;

app.get('/reset', function(req, res) {
   count = 0;
   res.sendFile('reset.html', { root: __dirname }); console.log('reset');
} )

app.get('/hitcount', function(req, res) {
   res.send(
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Page HitCount</title>
</head>
<body>
<div id="count">${count}</div>  
</body>
</html>`);

 console.log('hitcount');
} )

app.get('/multi', function(req, res) {
   res.sendFile('multi.html', { root: __dirname }); console.log('multi');
})


app.post('/mult', function(req, res, next) {
   let a = Number(req.body.a);
   let b = Number(req.body.b);
   
   result = a * b;
   req.body.resultado = result;
   console.log(result);

   res.send(

       `<!DOCTYPE html>
      <html lang="en">
      <body>
      <p id="resultado">${result}</p>
      </body>
      </html>`
       );
   })

app.get('/hit', function(req, res) {
   ++count;
   res.send('hit ok'); console.log('get hit');

} )


app.post('/cargar_datos.php', function(req, res) {
   ++count;
   res.sendFile('postOk.html', { root: __dirname } ); console.log('post hit');

} )

app.get('/imagen.png', function(req, res) {
   ++count;
   res.sendFile('gok.png', { root: __dirname } ); console.log('img hit');

} )

app.listen(httpPort, () => console.log(`App listening on port ${httpPort}!`))

