//export var firstName = 'Michael';
//export var lastName = 'Jackson';
//export var year = 1958;


var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

// 输出三个变量
export {firstName, lastName, year};


// 输出一个函数multiply
export function multiply(x, y) {
    return x * y;
};


// 使用as关键字重命名
function v1() { 
}
function v2() { 
}

//export {
//  v1 as streamV1,
//  v2 as streamV2,
//  v2 as streamLatestVersion
//};

export { v1 as streamV1, v2 as streamV2, v2 as streamLatestVersion}

