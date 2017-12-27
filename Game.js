
var c = document.getElementById("myCanvas");  
var cxt = c.getContext("2d");  
var santaImg = document.getElementById("santaImg");  
var enemyLImg = document.getElementById("enemyLImg");  
var enemyMImg = document.getElementById("enemyMImg");  
var enemySImg = document.getElementById("enemySImg");  
var bulletImg = document.getElementById("bulletImg");  
var explodeImg = document.getElementById("explodeImg");  
  
var canWidth = c.width;  
var canHeight = c.height;  

var bulletList = new Array();  
var enemyList = new Array();  
  
var santa = new Santa(245,650);  
santa.showSanta();  
//�������̰�����WASD������������  
window.addEventListener("keypress", function(e)  
{  
    var keyCode = e.keyCode;  
    var direction = "";  
    switch (keyCode)  
    {  
        case 119:  
        direction = "up";  
        break;  
        case 115:  
        direction = "down";  
        break;  
        case 97:  
        direction = "left";  
        break;  
        case 100:  
        direction = "right";  
        break;  
    }  
    santa.moveSanta(direction);  
});  
//��ʱ���ư����ƶ�  
window.setInterval(function()  
                            {  
                                santa.fire();  
                                for (var i = 0; i < bulletList.length; i++)  
                                {  
                                    var b = bulletList[i];  
                                    if ((b.y - b.step) >= 50)  
                                    {  
                                        b.moveBullet();  
                                    }  
                                    else   
                                    {  
                                        b.clcBullet();  
                                        bulletList.splice(i, 1);  
                                //      i -= 1;  
                                    }  
                                }  
                                CheckCollision();  
                                CheckLife();  
                            },30);  
//�������������  
function CreateEnemy()  
{  
    var temp = Math.random()*251;  
    var type = "";  
    var x = Math.random()*(canWidth-enemyLImg.width);  
    if (temp >= 0 && temp <= 30)  
    {  
        type = "large";  
    }  
    else if (temp > 30 && temp <= 150)  
    {  
        type = "medium";  
    }  
    else if(temp > 150 && temp <= 251)  
    {  
        type = "small";  
    }  
    var enemy = new Enemy(type, x, 0)  
    enemyList.push(enemy);  
    enemy.showEnemy();  
}  
//��ʱ�����˲���  
window.setInterval(function()  
                            {  
                                CreateEnemy();  
                            },2000);  
//��ʱ�������ƶ�  
window.setInterval(function()  
                            {  
                                for (var i = 0; i < enemyList.length; i++)  
                                {  
                                    var e = enemyList[i];  
                                    if ((e.y + e.step) < canHeight)  
                                    {  
                                        e.moveEnemy();  
                                    }  
                                    else  
                                    {  
                                        e.clcEnemy();  
                                        enemyList.splice(i, 1);  
                                //      i -= 1;  
                                    }  
                                }  
                            },100);  
  
//������Ƿ񱻰��Ļ���  
function CheckCollision()  
{  
    for (var i = 0; i < enemyList.length; i++)  
    {  
        var e = enemyList[i];  
        for (var j = 0; j < bulletList.length; j++)  
        {  
            var b = bulletList[j];  
            if ( (b.y<=(e.y+e.height) && b.y>=e.y) && ((e.x-b.width)<=b.x && b.x<=(e.x+e.width)) )  
            {  
                b.clcBullet();  
                bulletList.splice(j, 1);  
//              j -= 1;  
                e.life -= 1;  
                if (e.life <= 0)  
                {             
                cxt.drawImage(explodeImg, e.x, e.y);  
                cxt.clearRect(e.x, e.y, explodeImg.width, explodeImg.height);             
                e.clcEnemy();  
                enemyList.splice(i, 1);  
    //          i -= 1;  
                }  
            }  
        }  
    }  
}  
//����Ƿ���ײ����  
function CheckLife()  
{  
    for (var i = 0; i < enemyList.length; i++)  
    {  
        var e = enemyList[i];  
        if (((e.y+e.height)>=santa.y) && (e.y<=(santa.y+santa.height)) && (e.x+e.width)>=santa.x && e.x<=(santa.x+santa.width))  
        {  
            santa.clcSanta();  
            alert("game over");  
            window.location.href = "3.htm";  
        }  
    }  
}  
//����ɻ�����  
function Santa(x, y)  
{  
    this.x = x;  
    this.y = y;  
    this.santaObj = santaImg;  
    this.width = santaImg.width;  
    this.height = santaImg.height;  
    this.life = 1;  
    this.step = 20;  
    this.showSanta = function()  
    {  
        cxt.drawImage(this.santaObj, this.x, this.y);  
    }  
    this.moveSanta = function(direction)  
    {  
        this.clcSanta();  
        switch(direction)  
        {  
            case "up":  
            if ((this.y-this.step) >=0)  
            {  
                this.y -= this.step;  
            }  
            break;  
            case "down":  
            if ((this.y + this.step) <= (canHeight - this.height))  
            {  
                this.y += this.step;  
            }  
            break;  
            case "left":  
            if ((this.x - this.step) >= 0)  
            {  
                this.x -= this.step;  
            }  
            break;  
            case "right":  
            if ((this.x + this.step) <= (canWidth - this.width))  
            {  
                this.x += this.step;  
            }  
            break;  
        }  
        this.showSanta();  
    }  
    this.clcSanta= function()  
    {  
        cxt.clearRect(this.x, this.y, this.width, this.height);  
    }  
    this.fire = function()  
    {  
        var bullet = new Bullet(this.x+this.width/2-2, this.y-11);  
        bullet.showBullet();  
        bulletList.push(bullet);  
    }  
}  
//���尮�Ķ���  
function Bullet(x, y)  
{  
    this.bulletObj = bulletImg;  
    this.x = x;  
    this.y = y;  
    this.width = bulletImg.width;  
    this.height = bulletImg.height;  
    this.step = 20;  
      
    this.showBullet = function()  
    {  
        cxt.drawImage(this.bulletObj, this.x, this.y);  
    }  
    this.clcBullet = function()  
    {  
        cxt.clearRect(this.x, this.y, this.width, this.height);  
    }  
    this.moveBullet = function()  
    {  
        this.clcBullet();  
        this.y -= this.step;  
        this.showBullet();  
    }  
}  
//�������˶���  
function Enemy(type,x,y)  
{  
    this.type = type;  
    if (this.type == "large")  
    {  
        this.enemyObj = enemyLImg;  
        this.width = enemyLImg.width;  
        this.height = enemyLImg.height;  
        this.life = 10;  
    }  
    else if (this.type == "medium")  
    {  
        this.enemyObj = enemyMImg;  
        this.width = enemyMImg.width;  
        this.height = enemyMImg.height;  
        this.life = 6;  
    }  
    else if (this.type == "small")  
    {  
        this.enemyObj = enemySImg;  
        this.width = enemySImg.width;  
        this.height = enemySImg.height;  
        this.life = 1;  
    }  
    this.x = x;  
    this.y = y;  
    //this.width = this.enemyObj.width;  
    //this.height = this.enemyObj.height;  
    this.step = 5;  
      
    this.showEnemy = function()  
    {  
        cxt.drawImage(this.enemyObj, this.x, this.y);  
    }  
    this.clcEnemy = function()  
    {  
        cxt.clearRect(this.x, this.y, this.width, this.height);  
    }  
    this.moveEnemy = function()  
    {  
        this.clcEnemy();          
        this.y += this.step;  
        this.showEnemy();  
    }     
}  