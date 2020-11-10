var all_blogs = [];
var allposts;
var div1;


const responsive = {
    0: {
        items: 1
    },
    320: {
        items: 1
    },
    560: {
        items: 2
    },
    960: {
        items: 3
    }
}




$(document).ready(function () {

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    $toggleCollapse.click(function () {
        $nav.toggleClass('collapse');
    });


    


    //owl-crousel blog 
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        dots: false,
        nav: true,
        responsive: responsive
    });













    //click to scroll top
    $('.move-up span').click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 3000);
    })
    var postsId;


    //readMore Logic
    $.ajax({
        url: "http://localhost:3000/posts",
        method: "get",
        dataType: 'json',
        success: (x) => {
            allposts = x;
            console.log(x)

            x.forEach((result, idx) => {
                carousel(result);
                $(".allPosts").append(div1);

            });
            if (idx == 0) {
                var item = $('<div></div>').appendTo('#c').addClass('carousel-item')
                    .addClass('active');
                carousel(item);
            } else {
                var item = $('<div></div>').appendTo('#c').addClass('carousel-item');
                carousel(item);
            }

        }
    })


    //Dynamic Grid Creation
    function carousel(result) {

        div1 = document.createElement('div');
        div1.className = "card";
        img = document.createElement('img');
        img.src = result.imageurl;
        img.className = "card-img-top";
        para = document.createElement('p');
        para.className = "card-text";
        para.innerHTML = result.Content.slice(0, 100);
        var ids = result.id;
        let anchor = document.createElement('a');
        //    debugger;
        // anchor.href = "#";
        anchor.id = "readme";
        anchor.innerText = "Read More....";
        div1.append(img);
        div1.append(para);
        div1.append(anchor);

        anchor.onclick = function () {
            getSpecificContent(ids);

        }
    }
    function getSpecificContent(ids) {

        console.log('http://localhost:3000/posts/' + ids);
        $.getJSON('http://localhost:3000/posts/' + ids, (data) => {

            // localStorage.setItem("searchObj", JSON.stringify(result));
            if (sessionStorage.getItem('user') != null) {

                localStorage.setItem("readData", JSON.stringify(data));
                location.assign('demo.html');
            }
            else {
                alert("Please Login First !!!");
                location.assign('index.html');
            }
        });
    }


    //Categorywise blog separation Logic
    $(".categoryFilter").click(function () {
        $(".allPosts").hide();
        $(".filterPost").show();
        $(".filterPost").empty();
        let category = $(this).text();
        alert(category);
        for (var i = 0; i < allposts.length; i++) {

            if (allposts[i].category === category) {
                console.log(allposts[i]);
                carousel(allposts[i]);

                $(".filterPost").append(div1);

            }
        }
    })




    //Searching Logic
    $('#searchtitle').keyup(() => {
        var input, filter, ul, li, a, i;
        input = $("#searchtitle");
        filter = input.val().toLowerCase();
        console.log(filter);
        document.getElementById('text').innerText = "";
        for (i = 0; i < allposts.length; i++) {

            // debugger;
            if (input.val() != "") {

                txtValue = allposts[i].title;

                if (txtValue.toLowerCase().indexOf(filter) > -1) {


                    console.log(allposts[i].title);
                    let imge = document.createElement('a');
                    imge.href = "#";
                    imge.innerHTML = allposts[i].title;
                    let titleid = allposts[i].id;
                    imge.id = "anchor-Tag";

                    imge.onclick = function () {

                        getSpecificContent(titleid);

                    }
                    let br = document.createElement('br');
                    imge.append(br);
                    $('#text').append(imge);



                }

            }

        }
    });
});