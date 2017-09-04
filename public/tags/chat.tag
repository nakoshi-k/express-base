<raw>
  <span></span>
  this.root.innerHTML = opts.content;
</raw>

<chat>
  <div class="form-item chat-message">
    <div each={ messages } class="{(me) ? "me" : "other"} balloon">
        <div class="person">{name}</div>
        <div class="message">
          <raw content={message}></raw>
        </div>
        <div class="date">{date}</div>
    </div>
  </div>
  
  <div class="form-item">
    <textarea name="sendMessage" value="{sendMessage}" onkeyup="{edit}"></textarea>
  </div>

  <div class="form-item text-right">
    <button onclick="{send}" type="button">送信</button>
  </div>

  <style>
    
    chat .balloon {
      display: flex;
    }

    chat .balloon .person{
      border : 2px solid #ddd;
      border-radius: 30px;
      padding : 1em;
      margin : 0.3em;
      font-size:80%; 
    }
    
    chat .balloon .date{
      align-self: flex-end;
    }
    chat .balloon > div.message{
      margin : 0.2em;
      padding : 0.6em;
      border-radius: 6px;
      border : 1px solid #efefef;
    }
    chat .balloon > div .name{
      display: inline-block;
    }
    chat .me {
      flex-direction : row-reverse;
    }
     chat .me > div.message{
       margin-right : 0;
       background: #99dd99;
       border : 0
     }
     chat .other{margin-right : 1em}
    /** other tag specific styles **/
  </style>

  <script>
      this.messages = [
        { me:true , message : "メッセージ1",name:"名前",date:"16:00"},
        { me:true , message : "メッセージ2",name:"名前",date:"17:00"},
        { me:false , message : "メッセージ3",name:"名前",date:"18:00"},
        { me:true , message : "メッセージ4",name:"名前",date:"19:00"},
        { me:false , message : "メッセージ5",name:"名前",date:"20:00"},
        { me:true , message : "メッセージ6",name:"名前",date:"21:00"},
        { me:true , message : "メッセージ7",name:"名前",date:"22:00"}
      ];
      this.sendMessage = "";
      edit  = (e) => {
        this[e.target.name] = e.target.value;
      }
      send = () =>  {
        let date = new Date();
        let sendTime = date.getHours() + ":" + date.getMinutes();
        let pushMessage = this.sendMessage
        pushMessage = pushMessage.replace(/[\n\r]+/g,"<br>");
        this.messages.push({me:"true",message : pushMessage , name : "名前" ,date:sendTime});
      }
  </script>

</chat>
