/**
 * Created by zhexia on 16/4/12.
 */
//define(function(require){
//    var $ = require('jquery');
//    return $("#main").html("434454");
//});

define('common', ['jquery'], function($){
    function changeMain(value){
        $("#main").html(value);

    }


    return changeMain;
});