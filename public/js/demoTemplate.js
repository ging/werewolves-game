//var serverUrl = "/";

var DEMO = {};

/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/

/*DEMO.create_token = function(userName, role, callback) {

    var req = new XMLHttpRequest();
    var url = serverUrl + 'token';
    var body = {roomId: getParameterByName('id'), username: userName, role: role};

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            callback(req.responseText);
        }
    };

    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
}*/

DEMO.resizeVideos = function (local, remotes) {
    local.player.resize();
    for (var r in remotes) {
        if ((remotes[r].hasVideo() || remotes[r].hasScreen()) && remotes[r].showing) {
            remotes[r].player.resize();
        }
    }
}

window.onload = function () {
    var user_no=1;

   // $('#connection_panel').modal({keyboard: false, backdrop: 'static'});

    var messText = document.getElementById('chat_message');
    var chat_body = document.getElementById('chat_body');
    var users_list = document.getElementById('users_list');
    var chat_text = document.getElementById('chat_text');

    var my_name;

    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;


    DEMO.close = function () {
        window.location.href = '/';
    }

    for(var i in document.getElementsByClassName('close_button')) {
        document.getElementsByClassName('close_button')[i].onclick = DEMO.close;
    }

    //document.getElementById('back_icon').onclick = DEMO.close;

    messText.onkeyup = function(e) {
      e = e || event;
      if (e.keyCode === 13) {
          DEMO.send_chat_message();
      }
      return true;
    }

    var add_text_to_chat = function(text, style) {
        var p = document.createElement('p');
        p.className = 'chat_' + style;
        p.innerHTML = text;
        chat_body.appendChild(p);
        chat_body.scrollTop = chat_body.scrollHeight;
       //document.getElementById("onlinecount").innerHTML = 'There are '+onlineCount+' users online, list:'+userhtml;
    }

    var add_user_to_list = function(name, id) {

        var p = document.createElement('p');
        //p.className = 'chat_' + style;
        p.innerHTML +=name; //'<i class="icon-user"></i> ' + 
        p.id = id;
        console.log('add ', name);
          setTimeout(function () {
            if(name=='me')
            {
                document.getElementById('test'+id+'_name').innerHTML = 'name:'+name;
            }
            else{
                document.getElementById('localVideo_name').innerHTML = 'name:'+my_name;

            }
            }, 2000);
        users_list.appendChild(p);
    }

    var remove_user_from_list = function(id) {
        var p = document.getElementById(id);
        p.parentElement.removeChild(p);
    }

    DEMO.connect_to_chat = function() {
         var html = '';
            html += '<div class="msg-system">';
            html += ' Succesfully connected to the room';
            html += '</div>';
            var section = document.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;

            chat_body.appendChild(section);
            chat_body.scrollTop = chat_body.scrollHeight; 
        }
    DEMO.add_chat_participant = function(name, id) {
        //add_text_to_chat('New participant: ' + name, 'italic');
            var get_span7=getByClass("span7");
            if(get_span7.length>=6){
            $('#time_start').show();
            if(get_span7.length>6)
            {
              alert("The room is full!");
              DEMO.logout();
            }
            }
            var html = '';
            html += '<div class="msg-system">';
            html += name;
            html += ' entered the room';
            html += '</div>';
            var section = document.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;
            chat_body.appendChild(section); 
            chat_body.scrollTop = chat_body.scrollHeight; 
            //this.scrollToBottom();
            
            /*var flag=1;
            var get_span1=getByClass("span1");
            for(var i=0;i<get_span1.length;i++)
            {
                var temp=get_span1[i].innerHTML;
                var temp1=temp.split("");
                var temp2=temp1[5];
                user_no_arr[temp2]=temp2;
            } 
            var j=1;
            while(flag==1)
            {
                if(user_no_arr[j]==0)
                    {
                       if (DEMO.chat_stream) {
                     DEMO.chat_stream.sendData({your_id:id,your_name:name, your_no:j, user_no_arr:user_no_arr});
                     }
                     name=j+'.'+name;
                     flag=0;
                   
                    }
                j++;
            }        
            */
            name=user_no+'.'+name;
            user_no=user_no+1;
            add_user_to_list(name, id);
            $('#test'+id+'_name').html('name:'+name);
        }  
    

    

    DEMO.remove_chat_participant = function(name, id) {
        //add_text_to_chat('Participant ' + name + ' left the room', 'italic');
            var show_name=document.getElementById('test'+id+'_name').innerHTML;
            var temp1=show_name.split("");
            var temp2=temp1[5];
            user_no=user_no-1;
            setTimeout(function () {
            
            var get_span1=getByClass("span1");
            var the_no=document.getElementById('me').innerHTML;
            var the_no1=the_no.split(".");
            the_no=the_no1[0];
            if(temp2<the_no)
            {
                the_no--;
                get_span1[0].innerHTML="name:"+the_no+'.'+my_name;
                document.getElementById('me').innerHTML=the_no+'.'+my_name;
            }
            for(var i=1;i<get_span1.length;i++)
            {
                the_no=get_span1[i].innerHTML;
                var the_no1=the_no.split("");
                the_no=the_no1[5];
                if(temp2<the_no)
                {
                    the_no--;
                    var the_name=get_span1[i].innerHTML;
                    var the_name1=the_name.split(".");
                    the_name=the_name1[1];
                    get_span1[i].innerHTML="name:"+the_no+'.'+the_name;
                    var the_id=$(get_span1[i]).attr("id");
                    var the_id1=the_id.split("_name");
                    the_id=the_id1[0];
                    the_id1=the_id.split("test");
                    the_id=the_id1[1];
                    document.getElementById(the_id).innerHTML=the_no+'.'+the_name;
                }
                
            }

            }, 2000);
            var html = '';
            html += '<div class="msg-system">';
            html += name;
            html += ' lefted the room';
            html += '</div>';
            
            var section = document.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;
            chat_body.appendChild(section);
            chat_body.scrollTop = chat_body.scrollHeight; 
        remove_user_from_list(id);
    }
    DEMO.logout = function(){
         window.location = "../index.html";
        //location.reload();
    }
    DEMO.send_chat_message = function() {
        if(messText.value.match (/\S/)) {
            if (DEMO.chat_stream) {
                DEMO.chat_stream.sendData({msg: messText.value, name: my_name});
            }
            
            var contentDiv = '<div>'+messText.value+'</div>';
            var usernameDiv = '<span>'+my_name+'</span>';
            
            var section = document.createElement('section');
                section.id = 'chat_body';
                section.className = 'user';
                section.innerHTML = contentDiv + usernameDiv;
            
            chat_body.appendChild(section);
            chat_body.scrollTop = chat_body.scrollHeight;
            //add_text_to_chat(my_name + ': ', 'name');
            //add_text_to_chat(messText.value, '');
        }
        messText.value = '';
    };
var next = 1;
var vote=0;

var role_id = new Array(); 
var arr1 = new Array();
var arr2 = new Array();
    DEMO.chat_message_received = function(evt) {
        //var msg = evt.msg;
        /*add_text_to_chat(msg.name + ': ', 'name');
        add_text_to_chat(msg.msg, '');*/


if(evt.msg.isresult)
{
    document.getElementById('test'+evt.stream.getID()+'_result_show').innerHTML = evt.msg.msg;
}

    
    /*if(evt.msg.your_id==localStream.getID())
    {
    var name_1=evt.msg.your_no+'.'+my_name;
    document.getElementById('me').innerHTML = name_1;
    document.getElementById('localVideo_name').innerHTML = 'name:'+name_1;
    user_no_arr=[0,0,0,0,0,0,0];
    user_no_arr[evt.msg.your_no]=evt.msg.your_no;
    //alert(user_no_arr);
    var get_span1=getByClass("span1");
    var j=1;
    var flag_1=1;
    for(var i=1;i<get_span1.length;i++)
    {
        while((evt.msg.user_no_arr[j]==0)||(j==evt.msg.your_no))
        {j++;
        }
        var user_name=get_span1[i].innerHTML;
        var user_name1=user_name.split(".");
        user_name=user_name1[1];
        var name_3=j+'.'+user_name;
        user_no_arr[j]=j;
        var user_id=$(get_span1[i]).attr("id");
        var user_id2=user_id.split("_name");
        var user_id3=user_id2[0];
        user_id2=user_id3.split("test");
        user_id3=user_id2[1];
        document.getElementById(user_id3).innerHTML = name_3;
        document.getElementById(user_id).innerHTML = "name:"+name_3;
        j++;
}
}*/

else if(evt.msg.isready){
    document.getElementById('test'+evt.stream.getID()+'_result_show').innerHTML = "Ready!";
}
else if(evt.msg.isreallyready){
    document.getElementById('daynight_show').innerHTML = "The Night";
    $(".likeCount").html(0);
    arr1 = evt.msg.arr1;
    arr2 = evt.msg.arr2;
    role_id = evt.msg.role_id;
    var myrole_ID = "test"+localStream.getID()+"_result_show";
    for(var i=1;i<evt.msg.role_id.length;i++){
         if(arr1[i]=='killer')
        {
            if(role_id[i]=='test'+localStream.getID()+'_result_show')
            {
            var killer_name=document.getElementById('localVideo_name').innerHTML;
            var killer_name1=killer_name.split("name:");
            arr2[i]=killer_name1[1];
            }
            else{
            var role_id1=role_id[i].split("_result_show");
            var role_id2=role_id1[0];
            var killer_name=document.getElementById(role_id2+'_name').innerHTML;
            var killer_name1=killer_name.split("name:");
            arr2[i]=killer_name1[1];}
        }

    if(myrole_ID==evt.msg.role_id[i])
    {
        document.getElementById('localVideo_result_show').innerHTML = evt.msg.arr1[i];
        if(evt.msg.arr1[i]=="villager")
            {
                $('#local-video').hide();
                $('#villager_night').show();
            }
        else if(evt.msg.arr1[i]=="seer")
            {
                if(role_id[i]=='test'+localStream.getID()+'_result_show')
            {
                for(var j=0;j<role_id.length;j++)
                {
                    if(j!=i)
                    {
                    var role_id1=role_id[j].split("_result_show");
                    var role_id2=role_id1[0];
                    var newDiv7 = document.createElement('div');
                    newDiv7.className = "seer_block";
                    newDiv7.setAttribute("id", role_id2+'_seer_block');
                    
                    document.getElementById(role_id2+"_container").appendChild(newDiv7);
            }}
                 setTimeout(function () {
             $('#seer_night').show();
                    }, 2000); 
                
        }}
        else{
                for(var j=0;j<evt.msg.arr1.length;j++)
                {
                    if((evt.msg.arr1[j]=="killer")&&(role_id[j]!='test'+localStream.getID()+'_result_show'))
                        {
                          document.getElementById(evt.msg.role_id[j]).innerHTML = 'killer';                        }
                }
                $('.heart').show();
                $('.likeCount').show();
            }
    }
    
    }
$('.heart').removeClass("heartAnimation").attr("rel","like");
//$('#boom').hide(); 
$('#time_start').hide(); 
 setTimeout(function () {
$("#input_result").show();
        }, 2000);

$("#ready_show").show();
setTimeout(function () {
$("#ready_show").hide();
$("#daynight_show").show();
        }, 2000);
setTimeout(function () {
$('#demo').pietimer('start');
$('#circle').show();
        }, 2000);
        var get_span7=getByClass("span7");
        for(var i=0;i<get_span7.length;i++){
        if(get_span7[i].innerHTML=="Ready!")
        {
          var readyid=$(get_span7[i]).attr("id");
          document.getElementById(readyid).innerHTML = "";
        } 
    }
}
else if(evt.msg.iskilled)
{
    if(evt.msg.iname)
    {
         killed_id = 'test'+evt.msg.iid;
         printText('Day'+play_round);
         play_round = play_round+1;
         printText(evt.msg.iname+' died yesterday.');
         var newDiv7 = document.createElement('div');
         newDiv7.className = "block";
         newDiv7.setAttribute("id", killed_id + '_block');
         document.getElementById(killed_id+"_container").appendChild(newDiv7);
         kill_role(killed_id);
         judge_role();
        $(".likeCount").html(0);
        $('.heart').show();
        $('.likeCount').show();
        $('.heart').removeClass("heartAnimation").attr("rel","like");
        $('#giveup_vote').show();
         //next=0;
    }
    
}
else if(evt.msg.like)
{
    vote=vote+1;
    if(evt.msg.giveup!=1)
    {
    var local_id="test"+localStream.getID();
    if(evt.msg.like!=local_id)
    {
        var C=parseInt($("#likeCount"+evt.msg.like).html());
    $("#likeCount"+evt.msg.like).html(C+1);
    }
    else
    {
        var D = parseInt($("#likeCountlocalVideo").html());
        $("#likeCountlocalVideo").html(D+1);}
    }
    var get_span7=getByClass("span7");
    var get_block=getByClass("block");
    if(vote==get_span7.length-get_block.length)
    {
    comparasion();  
    judge_role();
    vote = 0;  
    }
}
else if(evt.msg.unlike)
{
    var local_id="test"+localStream.getID();
   
    if(evt.msg.unlike!=local_id)
    {
        var C=parseInt($("#likeCount"+evt.msg.unlike).html());
    $("#likeCount"+evt.msg.unlike).html(C-1);
        
    }
    else
    {
        var D = parseInt($("#likeCountlocalVideo").html());
        $("#likeCountlocalVideo").html(D-1);}
}
else{

var contentDiv = '<div>'+evt.msg.msg+'</div>';
var usernameDiv = '<span>'+evt.msg.name+'</span>';

var section = document.createElement('section');
    section.className = 'service';
    section.id = 'chat_body';
    section.innerHTML = usernameDiv + contentDiv;
chat_body.appendChild(section);
chat_body.scrollTop = chat_body.scrollHeight;
//CHAT.scrollToBottom();  
}
    }

     var connect_user = function () {
        //$('#connection_panel').modal('hide');
        my_name = document.getElementById('username_txt').value;
                    if(my_name != ""){
                document.getElementById("username_txt").value = '';
                document.getElementById("connection_panel").style.display = 'none';
                document.getElementById("chatbox").style.display = 'block';
                }
                document.getElementById("showusername").innerHTML = my_name;
      var name_2;
      setTimeout(function () {
            name_2=user_no+'.'+my_name;
            user_no=user_no+1;
           
            add_user_to_list(name_2,'me');
            document.getElementById('localVideo_name').innerHTML = 'name:'+name_2;
            }, 4000);
      //  $('#'+localStream.getID()+'_name').html(my_name);
        DEMO.init_demo(my_name);
    }
   var kill_role = function(roleid){
    for(var i = 0; i<arr1.length; i++)
    {
        var role_id1=role_id[i].split("_result_show");
        var role_id2=role_id1[0];
        if(roleid==role_id2)
        {
            $('#'+role_id2+'_seer_block').remove();
            arr1[i]=0;
        }
        
    }
   }

   var judge_role = function(){
    var get_span7=getByClass("span7");
    var villager = 0;
    var killer = 0;
    $('#giveup_vote').hide();
    $('.heart').hide();
    $('.likeCount').hide();
    var get_block=getByClass("block");
   // $('#boom').hide();
    for(var i = 0; i<arr1.length; i++)
    {
        if(arr1[i]=="killer")
        {
             killer = killer+1;
        }
        else{
             villager = villager+1;
        }        
    }
    if(killer == 0)
    {
       printText("Villager won.");
       setTimeout(function () {
       document.getElementById('daynight_show').innerHTML = "Villager Won";
       }, 500);
        for(var i=0;i<arr2.length;i++)
        {
            if(arr2[i])
            {
              printText("Killer:"+arr2[i]);
            }}
       play_round = 1;
       var get_span7=getByClass("span7");
       for(var i=0;i<get_span7.length;i++){
          var readyid=$(get_span7[i]).attr("id");
          document.getElementById(readyid).innerHTML = "";
       }
       $('.block').remove();
       $('#time_start').show();
       setTimeout(function () {
       $('.heart').hide();
       $('.likeCount').hide();
       $('#giveup_vote').hide();
                    }, 1000);
       for(var i=0;i<arr2.length;i++)
            {
                arr2[i]=0;
            }
    }
    else if(villager == 0)
    {
       printText("Killer won.");
       setTimeout(function () {
       document.getElementById('daynight_show').innerHTML = "Killer Won";
       }, 500);
       for(var i=0;i<arr2.length;i++)
        {
            if(arr2[i])
            {
              printText("Killer:"+arr2[i]);
        }}
       play_round = 1;
       var get_span7=getByClass("span7");
       for(var i=0;i<get_span7.length;i++){
          var readyid=$(get_span7[i]).attr("id");
          document.getElementById(readyid).innerHTML = "";
       }
       $('.block').remove();
       $('.seer_block').remove();
       $('#time_start').show();
       setTimeout(function () {
       $('.heart').hide();
       $('.likeCount').hide();
       $('#giveup_vote').hide();
                    }, 1000);
       for(var i=0;i<arr2.length;i++)
            {
                arr2[i]=0;
            }
    }
    else if(vote>=get_span7.length-get_block.length){
       //printText('Day'+play_round);
       //play_round = play_round+1;
       document.getElementById('daynight_show').innerHTML = "The Night";
       night_start();
       setTimeout(function () {
            $('#demo').pietimer('start');
            $('#circle').show();
                    }, 2000);

    }

   }

   var night_start = function(){
    $(".likeCount").html(0);
    $('.heart').removeClass("heartAnimation").attr("rel","like");
    //$('#boom').hide(); 
    var role_self = document.getElementById('localVideo_result_show').innerHTML;
    if(role_self=="villager")
    {
        $('#local-video').hide();
        $('#villager_night').show();
    }
    else if (role_self=="seer")
    {
        var get_block=getByClass("block");
        var block_id=$(get_block[0]).attr("id");
        if(block_id=="localVideo_block")
        {
            $('#local-video').hide();
            $('#seer_night_after').show();
        }
        else{
            $('.seer_block').show();
            $('#seer_night').show();
    }
        
    }
    else{
         setTimeout(function () {
            $('.heart').show();
            }, 1000);
         setTimeout(function () {
            $('.likeCount').show();
            }, 1000);
    }
   }
   var comparasion = function(){
    var get_count=getByClass("likeCount");
        var temp=0;
        var j=i;
        for(var i=0;i<get_count.length;i++)//compare
        {
          if(get_count[i].innerHTML>temp)
          {
            temp=get_count[i].innerHTML;
            j=i;
          }
        }
        for (var i=0;i<get_count.length;i++)
        {
            if((get_count[i].innerHTML==temp)&&(i!=j))
            {
                temp="none";
            }
        }
        if(temp!="none")
        {
        var killed_id=$(get_count[j]).attr("id");
        var killed_id1=killed_id.split("likeCount");
        var killed_id2=killed_id1[1];
        if(killed_id2=="localVideo")
             {  var newDiv7 = document.createElement('div');
                newDiv7.className = "block";
                newDiv7.setAttribute("id", 'lovalVideo_block');
                local_id='test'+localStream.getID();
                kill_role(local_id);
                document.getElementById("localVideo_container").appendChild(newDiv7);
             }
        else{
            var newDiv7 = document.createElement('div');
            newDiv7.className = "block";
            newDiv7.setAttribute("id", killed_id2 + '_block');
            kill_role(killed_id2);
            document.getElementById(killed_id2+"_container").appendChild(newDiv7);
        
            }
        var get_span1=getByClass("span1");
    temp=get_span1[j].innerHTML;
    printText(temp+' is voted out.'); 
        } 
        else{
    printText('Nobody is voted out.');
        }
//judge
   
   } 

    document.getElementById('username_txt').onkeyup = function(e) {
      e = e || event;
      if (e.keyCode === 13) {
          connect_user();
      }
      return true;
    }


$('body').on("click",'.heart',function()
{
    
    var A=$(this).attr("id");
    var B=A.split("like");
    var messageID=B[1];
    var C=parseInt($("#likeCount"+messageID).html());
    $(this).css("background-position","")
    var D=$(this).attr("rel");

    if(D === 'like') 
    { 
    $("#likeCount"+messageID).html(C+1);
    if(messageID!='localVideo')
    {
    if (DEMO.chat_stream) {
        DEMO.chat_stream.sendData({like:messageID});
    }}
    else{
    if (DEMO.chat_stream) {
        var local_id='test'+localStream.getID();
        DEMO.chat_stream.sendData({like:local_id});
    } 
    }
    $(this).addClass("heartAnimation").attr("rel","unlike");
         
    vote=vote+1;
    var get_span7=getByClass("span7");
    var get_block=getByClass("block");
    if(vote==get_span7.length-get_block.length)
    {
    comparasion();
    judge_role();    
    vote = 0;  
    }
    $('#giveup_vote').hide();
    
    }
    else
    {
    $("#likeCount"+messageID).html(C-1);
    if (DEMO.chat_stream) {
        DEMO.chat_stream.sendData({unlike:messageID});
    }
    $(this).removeClass("heartAnimation").attr("rel","like");
    $(this).css("background-position","left");
    }
    $(".heart").hide('slow');


});
function randArray(data){
    //获取数组长度
    var arrlen = data.length;
    //创建数组 存放下标数
    var try1 = new Array();
    for(var i = 0;i < arrlen; i++){
        try1[i] = i;
    }
    //创建数组 生成随机下标数
    var try2 = new Array();
    for(var i = 0;i < arrlen; i++){
        try2[i] = try1.splice(Math.floor(Math.random() * try1.length),1);
    }
    //创建数组，生成对应随机下标数的数组
    var try3 = new Array();
    for(var i = 0; i < arrlen; i++){
        try3[i] = data[try2[i]];
    }
    return try3;
}
var arr = new Array();
var arr1 = new Array();

function getByClass(sClass){

    var aResult=[];

    var aEle=document.getElementsByTagName('*');

    for(var i=0;i<aEle.length;i++){

       /*当className相等时添加到数组中*/

       if(aEle[i].className==sClass){

            aResult.push(aEle[i]);

        }

    }

    return aResult;

};

    var play_round = 1;
  //  $('#boom').hide();  
    $('#input_result').hide();
    $('#time_start').hide(); 
    
    $('#demo').pietimer({
        seconds: 15,
        color: '#8B1A1A',
        height: 100,
        width: 100
    },function(){
        $('#circle').hide();
        $('#seer_night').hide();
        vote = 0;
        document.getElementById('daynight_show').innerHTML = "The Day";
        // $('#boom').show('slow');
        $('#local-video').show();
        $('.night').hide();
        $('.seer_block').hide();
        $(".grid_element").show(); 
    var get_killed=getByClass("likeCount");
    for(var i=0;i<get_killed.length;i++){
    if(get_killed[i].innerHTML==1)
    {
      var killed_id=$(get_killed[i]).attr("id");
      var killed_id1=killed_id.split("likeCount");
      var killed_id2=killed_id1[1];
      if(killed_id2=="localVideo")
      {  var newDiv7 = document.createElement('div');
         newDiv7.className = "block";
         newDiv7.setAttribute("id", 'localVideo_block');
         local_id='test'+localStream.getID();
         document.getElementById("localVideo_container").appendChild(newDiv7);
         printText('Day'+play_round);
         play_round = play_round+1;
         printText('You died yesterday.');
         if (DEMO.chat_stream) {
                DEMO.chat_stream.sendData({iskilled:"1", iname:my_name, iid:localStream.getID()});
            }
         kill_role(local_id);
         judge_role();  
      }
      
    }
     }
    $(".likeCount").html(0);
    
    var get_block=getByClass("block");
    var block_id=$(get_block[0]).attr("id");
    if(block_id=="localVideo_block")
    {
      $(".likeCount").html(0);
      $('.heart').hide();
      $('.likeCount').hide();
    }
    else{
      $('.heart').show();
      $('.likeCount').show();
      $('.heart').removeClass("heartAnimation").attr("rel","like");
      $('#giveup_vote').show();
    }
    });

   

    $('#time_start').click(function(){
        //$('#boom').hide();
        $("#daynight_show").hide();
        if (DEMO.chat_stream) {
                DEMO.chat_stream.sendData({isready:"1"});
            }
            
           document.getElementById('localVideo_result_show').innerHTML = "Ready!";
        var get_span7=getByClass("span7");
        var count_ready=0;
        for(var i=0;i<get_span7.length;i++){
        if(get_span7[i].innerHTML=="Ready!")
        {
          count_ready = count_ready+1;
        } }
        if(count_ready==get_span7.length)
        {
            document.getElementById('daynight_show').innerHTML = "The Night";
            play_round = 1;
            next = 1;
            var killer_no = parseInt(get_span7.length/3);
   
            for(var i=0;i<get_span7.length-1;i++)
            {
                if(i<killer_no)
                {
                    arr[i]="killer";
                }
                else
                {
                    arr[i]="villager";
                }
            }
            arr[get_span7.length-1]="seer";
            $(".likeCount").html(0);
            $('.heart').removeClass("heartAnimation").attr("rel","like");
           // $('#boom').hide(); 
            $('#time_start').hide(); 
            setTimeout(function () {
            $("#input_result").show();
            }, 2000);
            $("#ready_show").show();
            setTimeout(function () {
            $("#ready_show").hide();
            $("#daynight_show").show();
                    }, 2000);
            setTimeout(function () {
            $('#demo').pietimer('start');
            $('#circle').show();
                    }, 2000); 
            arr1=randArray(arr);
            for(var i=0;i<get_span7.length;i++){
                if(get_span7[i].innerHTML=="Ready!")
        {
          var readyid=$(get_span7[i]).attr("id");
          document.getElementById(readyid).innerHTML = "";
        } 
               role_id[i]=$(get_span7[i]).attr("id");
            } 
            role_id[0]='test'+localStream.getID()+'_result_show';
            document.getElementById('localVideo_result_show').innerHTML = arr1[0];
            
            if(arr1[0]=="villager")
            {
                $('#local-video').hide();
                $('#villager_night').show();
            }
            else if(arr1[0]=="seer")
            {
                for(var i=1;i<role_id.length;i++)
                {
                    var role_id1=role_id[i].split("_result_show");
                    var role_id2=role_id1[0];
                    var newDiv7 = document.createElement('div');
                    newDiv7.className = "seer_block";
                    newDiv7.setAttribute("id", role_id2+'_seer_block');
                    
                    document.getElementById(role_id2+"_container").appendChild(newDiv7);
            }
                 setTimeout(function () {
             $('#seer_night').show();
                    }, 2000); 
                
        }
        else{
                arr2[0]=my_name;
                $('.heart').show();
                $('.likeCount').show();
                for(var j=1;j<arr1.length;j++)
                {
                    if(arr1[j]=="killer")
                        {
                            document.getElementById(role_id[j]).innerHTML = 'killer';
}
                }
                /*for(var j=1;j<arr1.length;j++)
                {
                    if(arr1[j]=="villager")
                        {
                            var role_id1=role_id[j].split("_result_show");
                            var ID=role_id1[0];
                            //var ID1=ID.split("test");
                            //var ID2=ID1[1];
                            $(ID).hide();
                        }
                }*/
            }
        for(var i=1;i<role_id.length;i++){
         if(arr1[i]=='killer')
        {
            var role_id1=role_id[i].split("_result_show");
            var role_id2=role_id1[0];
            var killer_name=document.getElementById(role_id2+'_name').innerHTML;
            var killer_name1=killer_name.split("name:");
            arr2[i]=killer_name1[1];
        }    
    
    }
        if (DEMO.chat_stream) {
                DEMO.chat_stream.sendData({isreallyready:"1", arr1:arr1, arr2:arr2, role_id:role_id});
            }
        for(var i=0;i<get_span7.length;i++){
        if(get_span7[i].innerHTML=="Ready!")
        {
          var readyid=$(get_span7[i]).attr("id");
          document.getElementById(readyid).innerHTML = "";
        } 
    }   }

            return false;
        });
     
$('#giveup_vote').click(function(){
    vote=vote+1;
    var get_span7=getByClass("span7");
    var get_block=getByClass("block");
    if(vote==get_span7.length-get_block.length)
    {
    comparasion();
    judge_role();
    vote = 0;  
    }
    $('#giveup_vote').hide();
    $('.heart').hide();
    $('.likeCount').hide();
    if (DEMO.chat_stream) {
             DEMO.chat_stream.sendData({like:1, giveup:1});
    }
     });

  $('body').on("click",'.seer_block',function()
{
    
        
        var see_id=$(this).attr("id");
        var see_id1=see_id.split("_seer_block");
        var see_id2=see_id1[0];
        var role;
        for(var i=0;i<role_id.length;i++)
        {
           if(role_id[i]==see_id2+'_result_show')
           {
            role= arr1[i];
           }
        }
        var see_name=document.getElementById(see_id2+'_name').innerHTML;
        alert('He/She is '+role);
        printText(see_name+' is '+role);//get the name in system information
        $('.seer_block').hide();
        $('#seer_night').hide();
        $('#local-video').hide();
        $('#seer_night_after').show();
         });

    $('#close_popup').click(function(){
        $('#popup').hide('slow');
         });
    $('#open_popup').click(function(){
        $('#popup').show('slow');
         });
    $('#open_how').click(function(){
        $('#how').show('slow');
         });
    $('#how').click(function(){
        $('#how').hide('slow');
         });
    document.getElementById('connect_button').onclick = connect_user;
}
   

    /*document.getElementById('chat_button').onclick = function () {
        $('#users_button').removeClass('active');
        $('#chat_button').addClass('active');
        $('#chat_body').show();
        $('#chat_message').show();
        $('#users_list_container').hide();
    
    }

    document.getElementById('users_button').onclick = function () {
        $('#users_button').addClass('active');
        $('#chat_button').removeClass('active');
        $('#chat_body').hide();
        $('#chat_message').hide();
        $('#users_list_container').show();
    }*/
