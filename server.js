const io = require("socket.io")(3000, {
    cors : {
        origin: "http://localhost:8888",
        methods: ["GET", "POST"]
    }
})

let lamp = "Turn Off"
io.on("connection", (socket) => {
    socket.on("lamp", (data) => {
        lamp = data ? "Turn Off" : "Turn On"
        console.log(lamp)
        io.emit("data", data)
        // port.write(lamp)
    })
})

const SerialPort = require("serialport").SerialPort;
const ReadLine = require("@serialport/parser-readline").ReadlineParser

const port = new SerialPort({
    path: 'COM10',
    baudRate: 9600,
    autoOpen : true
})

const parser = new ReadLine();
port.pipe(parser)

parser.on("data", (line) => { 
    port.write(lamp)
    // if(lamp)
    // port.write("ROBOT POWER ON", (err) => {
    //     if(err) return console.log("error")
    // })
    // console.log(line) 
})

port.on("error", (err) => {
    console.log("port error")
})

console.log("start server")