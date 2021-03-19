document.addEventListener('DOMContentLoaded', function () {








    var cont = 0;
    var bzimg = document.querySelectorAll('.whichbz-hd img');

    var bzinput = document.querySelectorAll('.whichbz-hd input');
    var big = document.querySelector('.big');
    var calc = document.querySelector('.calc');
    var bigttom = big.querySelectorAll('.bigbutton button');
    var sspan = document.querySelector('.sspan');
    var bigput = big.querySelector('input');
    var zz = 0;
    var changenum = '';
    var nmubz = 0
    var bzprice = 0
    var coprice = 0
    var k = null;
    for (var i = 0; i < bzinput.length; i++) {






        bzimg[i].addEventListener('click', function (e) {
            k = this.nextElementSibling;
            changenum = k.value

            big.style.visibility = 'visible';

            setTimeout(function () {


                bigput.focus();
                // 这个函数一定写到计时器里面，因为时间函数是异程序处理，放外面会先赋值再计时
                // ，即现赋值再按鼠标， 鼠标会在数字左边
                bigput.value = k.value;





            }, 10)

            sspan.style.visibility = 'hidden';



            calc.style.top = 123 + 'px';

        })







        bzinput[i].addEventListener('click', function () {
            k = this;
            changenum = this.value




            bigput.value = this.value;
            big.style.visibility = 'visible';
            sspan.style.visibility = 'hidden';
            calc.style.top = 123 + 'px';


        })

        bzinput[i].addEventListener('blur', function (e) {


            k = e.target;



        })



        bzinput[i].addEventListener('keyup', function () {


            this.value = Math.ceil(Math.abs(this.value))

            bigput.value = this.value;


            fn1()

        })

    }
    bigput.addEventListener('keyup',
        function () {
            if (this.value == 0) {
                this.value = ''
            }
            bigput.value = Math.ceil(Math.abs(this.value))
            k.value = bigput.value;

            fn1()



        })



    bigttom[0].addEventListener('click', function (e) {

        bigput.value = changenum;

        k.value = bigput.value;




        calc.style.top = 436 + 'px';
        big.style.visibility = 'hidden';
        clearTimeout(time1);
        var time1 = setTimeout(function () {
            sspan.style.visibility = 'visible'
        }, 1000)
        fn1();

    }, true)



    bigttom[1].addEventListener('click', function () {
        k.value = bigput.value;



        k = null;


        calc.style.top = 436 + 'px';
        big.style.visibility = 'hidden';
        clearTimeout(time1);
        var time1 = setTimeout(function () {
            sspan.style.visibility = 'visible'
        }, 1000)

        fn1();


    }, true)




    sspan.addEventListener('click',




        function () {
            this.style.color = 'red';

            for (var j = 0; j < bzinput.length; j++) {
                bzinput[j].value = 0;
            }
            this.style.visibility = 'hidden'
            fn1();


        }








    )











    /* 封装的计算函数 */
    function fn1() {
        localStorage.removeItem('bun');
        for (var j = 0; j < bzinput.length; j++) {
            nmubz = bzinput[j].value;
            // if (nmubz < 0) {
            //     bzinput[j].value = Math.floor(nmubz))
            // }
            if (nmubz >= 1000) {
                bzinput[j].value = '';
                nmubz = 0;
            }
            if (nmubz == 0) {
                bzinput[j].value = '';
                bzinput[j].style.background = ''
            }
            if (nmubz != 0) {
                bzinput[j].style.background = 'red';

            }
            bzprice = bzinput[j].getAttribute("data-price");
            coprice = coprice + bzprice * Math.abs(nmubz);
        }

        localStorage.setItem('bun', coprice);



        //这里后面建个类要的部分
        if (coprice != 0) {
            calc.innerHTML = '当前您已消费' + '<br/>' + coprice + '元';

            if (coprice >= 9999) {
                calc.innerHTML = '当前您已超神';
                coprice = 0;
                calc.style.background = 'red';
            }
            coprice = 0;
            calc.style.background = 'red';


        } else {
            calc.innerHTML = '欢迎光临'
            calc.style.background = '';
            var time1 = setTimeout(function () {
                sspan.style.visibility = 'hidden'
            }, 1000)
        }

    }

    // 混沌乱流布局

    var rice_div = document.querySelectorAll('.rice_falls');

    for (let i = 0; i < rice_div.length; i++) {

        if (i > 0) { rice_div[i].style.marginTop = '0.1rem' }
        if (i > 0 && i % 2) { rice_div[i].style.marginTop = '0.3rem' }

        rice_div[rice_div.length - 2].style.margin = 'auto 0 -0.02rem 0'

    }


    // 点击提交

    var pan = document.querySelector('.footer');
    var firstsubmit = document.querySelector('.firstsubmit');



    pan.addEventListener('click', function (e) {

        // if (e.target == this)
        firstsubmit.click();


    })



})

