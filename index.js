var app = require('express')();
var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {
	res.send('<h1>Hello Node.js</h1>');
});

app.post('/api/cal', function (req, res) {
    
    let data = req.body

    let carprice = data.carprice //ราคารถ
    let cardeposit = data.cardeposit //เงินดาวน์
    let carinterest = data.carinterest //ดอกเบี้ยต่อเดือน
    let carpay  = data.carpay //จำนวนงวดที่ผ่อน / เดือน

    var carrealprice = carprice - cardeposit //ยอดจัด
    var carinterestmonth = ((carrealprice * parseFloat(carinterest))/100)/12 //หาดอกเบี้ยต่อเดือนจากราคารถ
    var carinterestall = carinterestmonth * carpay //หาดอกเบี้ยทั้งหมด ในระยะงวดผ่อน
    var allprice = carrealprice + carinterestall  //ราคารวมทั้งหมดที่ต้องจ่าย นำราคารถหลักหักดาวร์ + ดอกเบี้ยทั้งปี

    res.send({
        "carrealprice" : parseInt(carrealprice),
        "carinterestmonth" : parseFloat(carinterestmonth.toFixed(2)),
        "installment" : parseFloat((allprice/carpay).toFixed(2))
    })
});

app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});