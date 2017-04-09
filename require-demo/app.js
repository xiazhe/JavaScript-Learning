/**
 * Created by zhexia on 16/4/12.
 */
requirejs.config({
    baseUrl: 'libs',
});

requirejs(['jquery', 'common'], function($, common){

    $("#main").html('<p>1111</p>');

    var main = function(){
       $("#main").hide();
    
    };

    var changeMain = common;

    changeMain("cccc");


});