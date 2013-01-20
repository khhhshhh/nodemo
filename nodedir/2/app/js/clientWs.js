(function(){
	var $record = $('#record'),
		$display = $('#display'),
		$content = $('#content'),
		$name = $('#name'),
		$count = $('#count span'),
		timer = null,
		title = document.getElementsByTagName('title')[0],
		isNotFirst = false;

	var ws = io.connect(null);

	ws.on('connect', function(){
		show('系统', '已经接服务器!!!!!', false);
	});

	ws.on('message', function(msg){
		var data = JSON.parse(msg);
		if(data.type == 'msg'){ 
			show(data.name, data.content, false);
			if(isNotFirst){
				title.innerHTML = '[' + data.name + '] : ' + data.content;
			} else {
				isNotFirst = true;
			}
		}
		else if(data.type == 'count') {
			console.log(data.count);
			$count.text(data.count);
		}
			
	})

	function send(msg){
		ws.send(msg);
	}

	function show(name, content, isSelf){

		var $item = $('<div class="item"></div>');

		var $name = $('<span class="name"></span><br/>');
		$name.text(name);

		var $content = $('<span class="content"></span>');
		$content.text(content);

		if(isSelf) {
			$name.addClass('self');
		}
		$item.append($name).append($content);
		$record.append($item);

		var record = $record.get(0);
		record.scrollTop = record.scrollHeight;
	}

	$content.on('keydown', function(event){
		var $this = $(this);
		if(event.keyCode == 13) {
			var _content = $this.val();
			if(_content == '') {
				return;
			}
			var _name = $name.val();
			show(_name, _content, true);
			send(JSON.stringify({
				type : 'msg',
				name : _name,
				content : _content 
			}));
		}
	});

	$content.on('keyup', function(event){
		if(event.keyCode == 13) {
			$(this).val('');
		}
	});
})();
