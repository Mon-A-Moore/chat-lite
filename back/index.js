const app = require('express')()
const http = require('http').createServer(app)
const io = require ('socket.io') (http)
const cors = require('cors')

app.use(cors);
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
	next();
});

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(4000, function() {
  console.log('Сервер on port 4000')
})