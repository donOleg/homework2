/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

    if (!Array.isArray(array) || !array.length) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for(var i = 0; i < array.length; i++) {
        if (fn(array[i]) == false) {
            return false;
        }
    };

    return true;
}

function onArray (arg) {
    return arg > 0;
};
var sourse = [2,5,8];
var result = isAllTrue(sourse, onArray);

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    if (!Array.isArray(array) || !array.length) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for(var i = 0; i < array.length; i++) {
        if (fn(array[i]) == true) {
            return true;
        }
    };
}
function isSomeTrueArray (arg) {
    return arg > 0;
};
var someArr = [2,5,8];
var res = isAllTrue(someArr, isSomeTrueArray);

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    var result = [];

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for(var i = 1; i < arguments.length; i++) {
        try {
            fn(arguments[i]);
        } catch(e) {
            result.push(arguments[i]);
            console.log(e.message)
        }
    }
    return result;
}

/*
 Задача 4:
 Используя отладчик и точки остановки, определите в каких случаях if дает true
 Исправьте условие внутри if таким образом, чтобы функция возвращала true
 */
function findError(data1, data2) {

    return (function() {
        for (var i = 0; i < data1.length; i++) {
            if ( data1[i] !== data2[i] && Number.isNaN(data1[i]) !== Number.isNaN(data2[i]) ) {
                return false;
            }
        }
        return true;
    })();
}
console.log( findError(['привет', 'loftschool', 10, NaN, '20'], ['привет', 'loftschool', '10', NaN, 20]) );

/*
 Задача 5:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданным аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {

    if (typeof number !== 'number') {
        throw new Error('number is not a number');
    }

    return {
        sum: function () {
            for (let i = 0; i < arguments.length; i++) {
                number = number + arguments[i];
            }
            return number;
        },
        dif: function () {
            for (let i = 0; i < arguments.length; i++) {
                number = number - arguments[i];
            }
            return number;
        },
        div: function () {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error('division by 0');
                }
                number = number / arguments[i];
            }
            return number;
        },
        mul: function () {
            for (let i = 0; i < arguments.length; i++) {
                number = number * arguments[i];
            }
            return number;
        }
    };
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    findError,
    calculator
};
