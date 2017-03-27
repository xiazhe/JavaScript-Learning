var myImage = new Image();
myImage.src = 'https://avatars3.githubusercontent.com/u/420370?v=3&s=460';
myImage.onload = function(){
    console.log(myImage.height, myImage.width)
}