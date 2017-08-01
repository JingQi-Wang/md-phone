import { Toast } from 'mint-ui';

export default {
//创建填写用表单
		createForm : function(plugin){
			var dom = $(plugin.dom);
			var out = $('<div>');
			out.attr('class','form-out');
			out.css('border-radius',dom.width()*0.01+'px');
			dom.html(out);
			dom = dom.find(':first');
			if(plugin.title){
				dom.append('<div class="form-middle">'+plugin.title+'</div>');
				dom.append('<div class="form-hr-solid"></div>');
			}
			
			var lookArray = [];
			
			for(var i = 0; i < plugin.colums.length ; i++){
				var colum = plugin.colums[i];
				
				var middle = $("<div >");
				middle.attr('class','form-middle');
				if(colum.show == false){
					middle.css('display', 'none');
				}
				var interior_left = $("<div >");
				interior_left.html(colum.columName);
				interior_left.attr('class','form-interior-left');
				middle.append(interior_left);
				
				var interior_right = $("<div >");
				interior_right.attr('name',colum.name);
				interior_right.attr('class','form-interior-right');
				if(colum.lookType == 'look' || colum.lookType == null){
					interior_right.append(colum.defaultValue);
					lookArray.push(colum.name);
				}else if(colum.lookType == 'input'){
					var input = $('<input>');
					input.attr('name', colum.name);
					input.attr('value', colum.defaultValue);
					input.attr('class', 'form-input');
					if(colum.readonly == true){
						input.attr('readonly', 'readonly');
					}
					interior_right.append(input);
					if(colum.type == 'Date'){
						if(plugin.check.Date){
							input.click(function(){
								plugin.check.Date(this);
							});
						}else{
							input.click(function(){
								phone_form.defualtCheck.Date(this);
							});			
						}
					}
				}else if(colum.lookType == 'text'){
					var textarea = $('<textarea>');
					textarea.attr('name', colum.name);
					textarea.attr('value', colum.value);
					textarea.attr('class', 'form-input');
					if(colum.readonly == true){
						input.attr('readonly', 'readonly');
					}
					interior_right.append(textarea);
				}
				middle.append(interior_right);
				
				dom.append(middle);
				
				if(i != plugin.colums.length - 1 && colum.show == true)
					dom.append('<div class="form-hr-solid"></div>');
			}
			//填入数据
			if(plugin.queryUrl){
				$.ajax({
					type: 'post',
					url: plugin.queryUrl,
					data: plugin.queryParam,
					success: function(data){
						var obj = eval('(' + data + ')').rows[0];
						for(name in lookArray){
							var target = dom.find('div[name='+name+']');
							target.html(obj[name]);
						}
					}
				})
			}
		},

			//提交填写用表单
		submit : function(ele,submit){
			if(!submit.type){
				submit.type = "post";
			}
			//进行data数据的深层次复制，以防止原本的参数对象造成影响
			var data = {};
			
			for(var item in submit.data){
				data[item] = submit.data[item];
			}
			//获取dom节点，然后对在前面定义的字段进行处理
			var dom = $(submit.dom);
			for(var i = 0 ; i < submit.colums.length ; i++){
				var colum = submit.colums[i];
				//获取input框或者是textarea，如果均为空，则不提交该数据到后台
				var input = dom.find('input[name='+colum.name+']');
				var textarea = dom.find('textarea[name='+colum.name+']');
				var time = dom.find('div[name='+colum.name+']');
				var value = null;
				if(input.val()){
					value = input.val();
				}else if(textarea.val()){
					value = textarea.val();
				}else if($.trim(time.text())){
					value = $.trim(time.text());
				}else{
					continue ;
				}
				//如果必填项为true则进行验证是否为空，然后提示某列信息不能为空
				if(colum.must == true){
					if(!value){
						alert(colum.columName + "不能为空");
						return ;
					}
				}
				//采用自定义的字段验证方式进行验证，最后的返回值为true或者false，如果出现false，则终止方法
				if(colum.verify){
					if(!colum.verify(value))
						return ;
				}
				//将数据填充到data中
				data[colum.name] = value;
			}
			//验证是否存在id，如果存在则填入data中，不存在则跳过
			if(submit.id){
				//data[submit.id.name] = submit.id.value;
			}
			//实际进行数据的提交处理
			data.sessionId = localStorage.getItem('sessionId') || null;
			$.ajax({
				type: 'post',
				url: 'http://192.168.0.95:8888/mdoa'+submit.submitUrl,
				data: data,
				success:function(data){
					data = $.parseJSON(data);
					if(data.success == true){
						Toast({
						  message: "表单提交成功",
						  duration: 3000
						});
						ele.$router.push({path:'/launchFlow'});
					}else{
						Toast({
						  message: "表单提交失败",
						  duration: 3000
						});
					}
				},
				error:function(){
					alert("未响应");
				}
			})
		}
}
