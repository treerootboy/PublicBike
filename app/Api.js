var Api;
var station = {};
station['5005000000']='产业园站';
station['5020000000']='鹏兴花园三期站';
station['5017000000']='鹏兴花园五期站';
station['5032000000']='大望桥头站';
station['5031000000']='林果场站';
station['5030000000']='市花园站';
station['5018000000']='仙湖植物园站';
station['5003000000']='莲塘街道办站';
station['5023000000']='雍翠豪庭站';
station['5021000000']='聚福花园站';
station['5034000000']='桐景花园站';
station['5025000000']='长岭村口站';
station['5026000000']='玉雅居站';
station['5015000000']='广岭家园站';
station['5029000000']='莲塘水厂站';
station['5002000000']='鹏兴一期站';
station['5001000000']='消防中队站';
station['5000000000']='莲塘派出所站';
station['5019000000']='梧桐山新居站';
station['5004000000']='华景园站';
station['5022000000']='港莲一村站';
station['5024000000']='罗湖公安分局站';
station['5033000000']='梧桐山牌坊站';
station['5027000000']='东方尊峪站';
station['5016000000']='西岭下站';
station['5010000000']='太安地铁站';
station['5014000000']='翠苑大厦站';
station['5013000000']='太宁路口站';
station['5012000000']='第二实验中学站';
station['5007000000']='罗湖体育馆站';
station['5009000000']='新秀地铁站';
station['5011000000']='黄贝岭地铁站';
station['5028000000']='万佛禅寺站';
station['5008000000']='罗湖区政府站';
station['5006000000']='怡景地铁A出口站';
station['5055000000']='贝丽花园站';
station['5085000000']='渔民村';
station['5062000000']='螺岭小学站';
station['5038000000']='碧波花园站';
station['5047000000']='留医部站';
station['5036000000']='罗芳村站';
station['5065000000']='童乐天桥站';
station['5040000000']='婚姻登记处站';
station['5096000000']='松园北天桥';
station['5080000000']='罗湖村站';
station['5097000000']='国都花园';
station['5058000000']='水贝村站';
station['5053000000']='翠竹万佳站';
station['5045000000']='冶金大厦站';
station['5042000000']='黄贝岭村站';
station['5079000000']='国贸站';
station['5050000000']='田贝地铁站';
station['5092000000']='寰宇酒店';
station['5088000000']='地王大厦';
station['5087000000']='深圳书城';
station['5075000000']='惠州大厦站';
station['5091000000']='宝丽大厦';
station['5064000000']='晒布地铁站';
station['5083000000']='三岛中心';
station['5076000000']='华都园大厦站';
station['5090000000']='京基1000';
station['5035000000']='区委党校站';
station['5054000000']='金丽珠宝站';
station['5084000000']='向西村';
station['5060000000']='雅园立交站';
station['5071000000']='南湖街道办站';
station['5044000000']='环岛丽园站';
station['5089000000']='大剧院';
station['5063000000']='湖贝地铁站';
station['5061000000']='儿童公园站';
station['5094000000']='红岭家乐福';
station['5041000000']='深圳古玩城站';
station['5070000000']='东门街道办站';
station['5056000000']='文锦广场站';
station['5098000000']='门诊部站';
station['5074000000']='春风万佳站';
station['5077000000']='罗湖医院站';
station['5052000000']='翠竹北站';
station['5057000000']='文锦北天桥站';
station['5051000000']='翠竹街道办';
station['5067000000']='深圳中学站';
station['5078000000']='时钟广场';
station['5086000000']='万象城';
station['5069000000']='深圳戏院站';
station['5066000000']='东门站';
station['5068000000']='人民公园站';
station['5072000000']='鸿昌广场站';
station['5039000000']='东湖公园西门站';
station['5048000000']='翠竹地铁站';
station['5049000000']='翠竹公园站';
station['5082000000']='爵士大厦';
station['5095000000']='红岭小学';
station['5073000000']='文锦渡海关站';
station['5043000000']='北斗路站';
station['5037000000']='宁水花园站';
station['5093000000']='红桂大厦';
station['5081000000']='双城世纪';
station['5059000000']='鸿业街站';
station['5046000000']='水库新村站';
Api = {
		_url: '',
        station: station,
        url: function(station_code){
                this._url = 'http://lhcs.shencom.cn/scamp/index.php/bicycle/tool/ajax_return_station_info/' + station_code;
                return this;
        },
        fetch: function(success){
        	$.ajax({
			   	url: 'https://jsonp.afeld.me/',
			   	type: 'GET',
			   	dataType: 'jsonp',
			   	jsonp: 'callback',
			   	data: { "url": this._url },
			   	timeout: 5000,
			   	success: function(data){
			   		success && success instanceof Function && success(data);
			   	}
			});
			return this;
        }
};
module.exports = Api;