const module=(function(){
   let author="Павел Лебедев";
   const messages = [
  {
     id: '1',
     text: 'Привет!',
     createdAt: new Date('2020-10-12T23:00:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '2',
     text: 'Всем привет!',
     createdAt: new Date('2020-10-12T23:03:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
    {
     id: '3',
     text: 'Привет!',
     createdAt: new Date('2020-10-12T23:05:00'),
     author: 'Петров Петр',
     isPersonal: true,
     to: 'Иванов Иван'
  },
  {
     id: '4',
     text: 'Как дела?',
     createdAt: new Date('2020-10-12T23:06:00'),
     author: 'Петров Петр',
     isPersonal: true,
     to: 'Иванов Иван'
  },
    {
     id: '5',
     text: 'Привет!',
     createdAt: new Date('2020-10-12T23:07:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '6',
     text: 'Как поживаете?',
     createdAt: new Date('2020-10-12T23:04:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
    {
     id: '7',
     text: 'Норм',
     createdAt: new Date('2020-10-12T23:10:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '8',
     text: 'Че делаешь?',
     createdAt: new Date('2020-10-12T23:20:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
    {
     id: '9',
     text: 'Кушаю и смотрю обзор нового айфона',
     createdAt: new Date('2020-10-12T23:22:00'),
     author: 'Петров Петр',
     isPersonal: true,
     to: 'Иванов Иван'
  },
  {
     id: '10',
     text: 'Никак, мы тоним...',
     createdAt: new Date('2020-10-12T23:06:00'),
     author: 'Иванов Иван',
     isPersonal: false
  },
    {
     id: '11',
     text: 'Понимаю',
     createdAt: new Date('2020-10-12T23:10:00'),
     author: 'Сергей Сергеев',
     isPersonal: false,
  },
  {
     id: '12',
     text: 'Крепитесь пацаны, все будет!',
     createdAt: new Date('2020-10-12T23:15:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
    {
     id: '13',
     text: 'Да не стоит. Он красивый но сырой',
     createdAt: new Date('2020-10-12T23:25:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '14',
     text: 'Без комментариев',
     createdAt: new Date('2020-10-12T23:20:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
    {
     id: '15',
     text: 'Я с 11 хожу и наслаждаюсь',
     createdAt: new Date('2020-10-12T23:30:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '16',
     text: 'Короновайрус еще атакует. По оф данным уже больше касаря заболевших в сутки...',
     createdAt: new Date('2020-10-12T23:24:00'),
     author: 'Сергей Сергеев',
     isPersonal: false
  },
    {
     id: '17',
     text: 'Подожду 13 поколение',
     createdAt: new Date('2020-10-12T23:35:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '18',
     text: 'Ладно все спокойной ночи',
     createdAt: new Date('2020-10-12T23:30:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
    {
     id: '19',
     text: 'Ладно я пошел',
     createdAt: new Date('2020-10-12T23:40:00'),
     author: 'Петров Петр',
     isPersonal: true,
     to: 'Иванов Иван'
  },
  {
     id: '20',
     text: 'Споки',
   //   text: '',
     createdAt: new Date('2020-10-12T23:50:00'),
     author: 'Сергей Сергеев',
     isPersonal: false
  },
];
   const filterObj={
      author: (item, author)=> !author || item.author.toLowerCase().includes(author.toLowerCase()),
      text: (item, text)=> !text || item.text.toLowerCase().includes(text.toLowerCase()),
      dateTo: (item, dateTo)=> !dateTo || item.createdAt<dateTo,
      dateFrom: (item, dateFrom)=> !dateFrom || item.createdAt>dateFrom
   };
   const validateObj={
      text: (item)=>item.text && item.text.length<=200
   };


    function getMessages(skip=0, top=10, filterComfig={}){ 
      let result=messages.slice();
      Object.keys(filterComfig).forEach((key)=>{
         result=result.filter((item)=>filterObj[key](item,filterComfig[key]));
      });
        return result.sort((a,b)=>{
            return a.createdAt-b.createdAt;
        })
        .slice(skip,skip+top);  
    }


    function getMessage(id){
        return messages.find((item)=>{
            if(item.id===id) return true;
            });
    }
    function validateMessage(msg){
      return Object.keys(validateObj).every((key)=>validateObj[key](msg));
    }

    function addMessage(msg){
      msg.id=`${Date.now()}`
      msg.author=author;
      msg.createdAt=new Date();
      if(validateMessage(msg)){
         messages.push(msg);
         return true;
      }
      return false;
    }

    function editMessage(id, msg){
      if(getMessage(id)){
         if(msg.hasOwnProperty("text")){
            if(typeof msg["text"]==="string"){ 
               if( msg["text"].length>0 && msg["text"].length<=200){
               getMessage(id).text=msg["text"]; 
               }else{
                  return false;
               }
            }else{
               return false;
            }            
         }
         if(msg.hasOwnProperty("isPersonal")){
            if(typeof msg["isPersonal"]==="boolean"){
               getMessage(id).isPersonal=msg["isPersonal"];
            }else{
               return false;
            }
         } 
         if(msg.hasOwnProperty("to")){
            if(typeof msg["to"]==="string"){
               getMessage(id).isPersonal=true;;
               getMessage(id).to=msg["to"];
            }else{
               return false;
            }
         }
         return true;
      }
      return false;
    }

    function removeMessage(id){
      if(getMessage(id)){
         messages.splice(messages.indexOf(getMessage(id)),1);
      return true;
      }
      return false;
    }
    return {getMessages,getMessage,validateMessage,addMessage,editMessage,removeMessage};
})();


// console.log(module.getMessages(0,10,{author: "Ива"}));
// console.log(module.getMessages(0,10,{author: "Ива",dateFrom: new Date('2020-10-12T23:15:00')}));
// console.log(module.getMessages(0,10,{dateTo: new Date('2020-10-12T23:30:00')}));
// console.log(module.getMessages(0,10,{dateFrom: new Date('2020-10-12T23:15:00')}));
// console.log(module.getMessages(0,10,{dateFrom: new Date('2020-10-12T23:15:00'),dateTo: new Date('2020-10-12T23:30:00')}));
// console.log(module.getMessages(0,10,{text: "сп"}));
// console.log(module.getMessages(0,10,{text: "сп", dateFrom: new Date('2020-10-12T23:15:00'),dateTo: new Date('2020-10-12T23:30:00')}));
// console.log(module.getMessages(0,10));
// console.log(module.getMessages());
// console.log(module.getMessage('3'));
// console.log(module.getMessage('7'));
// console.log(module.getMessage('777'));


// console.log(module.validateMessage(messages[1]));
// for(let key in messages){
//    console.log(module.validateMessage(messages[key]));
// }
// for(let i=0;i<20;i++){
//    console.log(module.validateMessage(messages[i]));
// }


// console.log(module.getMessage('22'));

// console.log(module.addMessage({
//    id: '22',
//    text: 'Доброе',
//    createdAt: new Date('2020-10-13T08:00:00'),
//    author: 'Катюха'
// }
// ));
// console.log(module.getMessage('22'));



// console.log(module.getMessage('23'));
// console.log(module.addMessage({
//    text: 'Проснулся уже?',
//    isPersonal: true,
//    to: 'Петров Петр'
// }
// ));
// console.log(module.addMessage({
//    text: 'Проснулся уже?',
// }
// ));
// console.log(module.getMessages(0,10,{text: "ро"}));
// console.log(module.getMessages());


// console.log(module.addMessage({
//    id: '23',
//    text: 'Проснулся уже?',
//    createdAt: new Date('2020-10-13T08:00:00'),
//    author: 'Катюха',
//    isPersonal: true,
//    to: 'Петров Петр'
// }
// ));
// console.log(module.getMessage('23'));


// for(let key in messages){
//    console.log(module.validateMessage(messages[key])); //проверка должна производится не с существуюшими сообщениями, а с теми которые
//    //будут добавлены. иначе надо изменить логику проверку на уникальность id, но смысла нет т.к. все существующие сообшения в стеке 
//    //когда то были добавлены и проходили проверку
// }


// console.log(module.getMessage('20'));
// console.log(module.editMessage('20',{text: "test", isPersonal: true, to: 'Оля'}));
// console.log(module.editMessage('20',{text: "test", to: 'Оля'}));
// console.log(module.getMessage('20'));


// console.log(module.getMessages(0,30));
// console.log(module.removeMessage('20'));
// console.log(module.getMessages(0,30));

