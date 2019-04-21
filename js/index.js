/**
 * Created by Administrator on 2019/4/11.
 */
//点击开始，startPage消失，游戏开始
// 随机出现实物，出现三节蛇，开始远动
//  上下左右改变方向
//碰到食物，自身加1，食物消失，蛇长度加1
//判断游戏结束，弹出框
var content=document.getElementById("content");
var startPage=document.getElementById("startPage");
var loser=document.getElementsByClassName("loser")[0];
var loserScore=document.getElementById("loserScore");
var oScore=document.getElementById("score");
var oScore1=document.getElementsByClassName("score")[0];
var startBtn=document.getElementsByClassName("startBtn")[0];
var left_side=document.getElementsByClassName("left-side")[0];
var close=document.getElementsByClassName("close")[0];
var snakeMove;
var speed=200;

init();
function init(){
    //地图
    this.mapW=parseInt(getComputedStyle(content).width);
    this.mapH=parseInt(getComputedStyle(content).height);
    this.mapDiv=content;
    //实物
    this.foodW=20;
    this.foodH=20;
    this.foodX=0;
    this.foodY=0;
    //蛇
    this.snakeW=20;
    this.snakeH=20;
    this.snakeBody=[
        [3,1,'head'],
        [2,1,'body'],
        [1,1,'body']
    ];
    //游戏属性
    this.dir='right';
    this.left=false;
    this.right=false;
    this.up=true;
    this.down=true;
    //
    this.score=0;
    //var startGameBool=true;
    //var startPaush=true;
}

function startGame(){
    startPage.style.display="none";
    left_side.style.display="block";
    oScore1.style.display="block";
    food_1();
    snake();
    snakeMove=setInterval(function(){
        move();
    },speed);
    bindEvent();
}
var food;
function food_1(){
    food=document.createElement('div');
    food.style.width=this.foodW+"px";
    food.style.height=this.foodH+"px";
    food.style.position="absolute";
    this.foodX=Math.floor(Math.random()*(this.mapW/20));
    this.foodY=Math.floor(Math.random()*(this.mapH/20));
    food.style.left=this.foodX*20+"px";
    food.style.top=this.foodY*20+"px";
    this.mapDiv.appendChild(food).setAttribute("class","food")
};

function snake(){
    for( var i=0;i<this.snakeBody.length ; i++){
        var snake=document.createElement('div');
        snake.style.width=this.snakeW+"px";
        snake.style.height=this.snakeH+"px";
        snake.style.position="absolute";
        snake.style.left=this.snakeBody[i][0]*20+"px";
        snake.style.top=this.snakeBody[i][1]*20+"px";
        //蛇头
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.dir){
            case 'right':
                break;
            case 'up':
                snake.style.transform='rotate(270deg)';
                break;
            case 'down':
                snake.style.transform='rotate(90deg)';
                break;
            case 'left':
                snake.style.transform='rotate(180deg)';
                break;
        }
    }
}

function move(){
    for(var i=this.snakeBody.length-1;i>=1;i--){
        this.snakeBody[i][0]=this.snakeBody[i-1][0];
        this.snakeBody[i][1]=this.snakeBody[i-1][1];
    }
    switch(this.dir){
        case "right":
            this.snakeBody[0][0]+=1;
            break;
        case "up":
            this.snakeBody[0][1]-=1;
            break;
        case "left":
            this.snakeBody[0][0]-=1;
            break;
        case "down":
            this.snakeBody[0][1]+=1;
            break;
        default :
            break;
    }
    removeClass("snake");
    snake();
    //碰到边界
    if(this.snakeBody[0][0]>=(this.mapW/20)||this.snakeBody[0][0]<=0||this.snakeBody[0][1]>=(this.mapH/20)||this.snakeBody[0][1]<=0){
        loserScore.innerHTML=this.score;
        oScore.innerHTML=this.score;
        loser.style.display="block";
        clearInterval(snakeMove);
    }
    //碰到身体
    var snakeHX=this.snakeBody[0][0];
    var snakeHY=this.snakeBody[0][1];
    for(var i=1;i<this.snakeBody.length;i++){
        if(snakeHX==this.snakeBody[i][0]&&snakeHY==this.snakeBody[i][1]){
           loserScore.innerHTML=this.score;
            oScore.innerHTML=this.score;
            loser.style.display="block";
            clearInterval(snakeMove);
        }
    }
    //碰到实物
    if(this.foodX==this.snakeBody[0][0]&& this.foodY==this.snakeBody[0][1]){
        var snakeEndX=this.snakeBody[this.snakeBody.length-1][0];
        var snakeEndY=this.snakeBody[this.snakeBody.length-1][1];
        switch(this.dir){
            case "right":
                this.snakeBody.push([snakeEndX+1,snakeEndY,"body"]);
                break;
            case "up":
                this.snakeBody.push([snakeEndX,snakeEndY-1,"body"]);
                break;
            case "left":
                this.snakeBody.push([snakeEndX-1,snakeEndY,"body"]);
                break;
            case "down":
                this.snakeBody.push([snakeEndX,snakeEndY+1,"body"]);
                break;
            default :
                break;
        }
        this.score+=1;
        oScore.innerHTML=this.score;
        loserScore.innerHTML=this.score;
        this.mapDiv.removeChild(food);
        food_1();
       }
}
function removeClass(cls){
    var ele=document.getElementsByClassName(cls);
    while(ele.length>0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}
function setDerict(code){
      switch (code){
          case 37:
              if(this.left){
                  this.dir="left";
                  this.left=false;
                  this.right=false;
                  this.up=true;
                  this.down=true;
              }
              break;
          case 38:
              if(this.up){
                  this.dir="up";
                  this.left=true;
                  this.right=true;
                  this.up=false;
                  this.down=false;
              }
              break;
          case 39:
              if(this.right){
                  this.dir="right";
                  this.left=false;
                  this.right=false;
                  this.up=true;
                  this.down=true;
              }
              break;
          case 40:
              if(this.down){
                  this.dir="down";
                  this.left=true;
                  this.right=true;
                  this.up=false;
                  this.down=false;
              }
              break;
          default :
              break
      }
}
//监听事件
function bindEvent(){
    document.onkeydown=function(e){
        var code= e.keyCode;
        setDerict(code);
    }
}
startPage.onclick=function(){
    startGame();

}
left_side.onclick=function(){
    startBtn.style.backgroundImage="../img/pause.png";
    init();
    startGame();
}

window.onkeydown=function(e){
    if(e.keyCode==13|| e.keyCode==32){
        clearInterval(snakeMove);
    }
}
close.onclick=function(){
    startPage.style.display="block";
    loser.style.display="none";
    oScore1.style.display="none";
    removeClass("snake");
    removeClass("food");
}
function  reloadGame(){
    clearInterval(snakeMove);
    removeClass("snake");
    removeClass("food_1");
    this.snakeBody=[
        [3,1,'head'],
        [2,1,'body'],
        [1,1,'body']
    ];
    this.dir='right';
    this.left=false;
    this.right=false;
    this.up=true;
    this.down=true;
    this.score=0;
    loser.style.display="block";
    loserScore.innerHTML=this.score;
}
//function startAndPause(){
//    if(startPaush){
//        if(startGameBool){
//            startGame();
//            startGameBool=false;
//        }
//        startBtn.setAttribute("background-image",'../img/pause.png');
//        document.onkeydown=function(e){
//            var code= e.keyCode;
//            setDerict(code);
//        }
//        startPaush=false;
//    }else{
//        startBtn.setAttribute("background-image",'../img/start.png');
//        clearInterval(snakeMove);
//        document.onkeydown=function(e){
//            e.returnValue=false;
//            return false;
//        }
//    }
//}