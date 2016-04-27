(function () {
    'use strict';
    /**
    * List 类
    * listSize(属性) 列表的元素个数
    * pos(属性)      列表的当前位置
    * length(属性)   返回列表中元素的个数
    * clear(方法)    清空列表中的所有元素
    * toString(方法) 返回列表的字符串形式
    * getElement(方法) 返回当前位置的元素
    * insert(方法)   在现有元素后插入新元素
    * append(方法)   在列表的末尾添加新元素
    * remove(方法)   从列表中删除元素
    * front(方法)    将列表的当前位置设移动到第一个元素
    * end(方法)      将列表的当前位置移动到最后一个元素
    * prev(方法)     将当前位置后移一位
    * next(方法)     将当前位置前移一位
    * currPos(方法)  返回列表的当前位置
    * moveTo(方法)   将当前位置移动到指定位置
    */

    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.length = length;
        this.dataStore = [];
        this.clear = clear;
        this.toString = toString;
        this.getElement = getElement;
        this.insert = insert;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.currPos = currPos;
        this.moveTo = moveTo;
    };

    function clear() {
        // this.dataStore.splice(0, this.listSize);
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    };

    function append(element) {
        this.dataStore[this.listSize++] = element;
    };

    function toString() {
        // return this.dataStore.toString();
        return this.dataStore;
    };

    function getElement() {
        return this.dataStore[this.pos];
    };

    /**
     * 向列表中插入一个元素
     * element, 被插入的元素
     * after, 当前元素的位置
     */
    function insert(element, after) {
        var insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }

        return false;
    };

    //查找元素在列表中的位置
    function find(element) {
        for (var i = 0; i < this.listSize; ++i) {
            if (this.dataStore[i] == element) {
                return i;
            }
        }

        return -1;
    };

    function remove(element) {
        var foundAt = find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }

        return false;
    };

    function length() {
        return this.listSize;
    };

    //判断元素是否在列表中
    function contains(element) {
        for (var i = 0; i < this.listSize; ++i) {
            if (element == this.dataStore[i]) {
                return true
            }
        }

        return false;
    };

    //遍历列表
    function front() {
        this.pos = 0;
    };

    function end() {
        this.pos = this.listSize - 1;
    };

    function prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    };

    function next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos;
        }

    };

    function currPos() {
        return this.pos;
    };

    function moveTo(position) {
        this.pos = position;
    };


    window.List = List;

})();