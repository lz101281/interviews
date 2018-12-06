//1.从给定的无序、不重复的数组 A 中，取出 N 个数，使其相加和 为 M
//function1
//s为第几层  
let A = [10,4,2,5,1] ;
let N = 2;
let M = 6;

const getNum = (arr, index, nums, s) => {
    for (let x = index; x < arr.length - N + s + 1; x++) {
        if (nums.length < N - 1) { 
            nums.push(arr[x]);
            getNum(arr, x + 1, nums, s + 1)
        } else if (nums.length === N - 1) {
            nums.push(arr[x]);
            if (eval(nums.join("+")) === M) {
                console.log("结果为" + nums);
            }
        }
        nums.pop();
    }
}

getNum(A, 0, [], 0);

//function2
function f(array, n, sum) {
    let length = array.length;
    // 数组转化为排列树
    const getChirdren = (array, value, index) =>
        array.length <= length - n ? null :
            array
                .filter(item => item !== value)
                .filter((item, index2) => index2 >= index)
                .map((value, index, array) => ({ value, chirdren: getChirdren(array, value, index) }));
    let tree = getChirdren(array, null, 0);
    // 排列树转化为排列数组
    let _array = [];
    getValue = (tree, value) =>
        value.length === n ?
            _array.push(value)
            :
            tree && tree.map(item => getValue(item.chirdren, value.concat(item.value)));
    getValue(tree, []);
    // 求出所有和为sum的数组
    return _array.filter(item => item.reduce((pre, cur) => pre + cur) === sum);
}

console.log(f([1, 2, 3, 4, 5], 3, 6))
