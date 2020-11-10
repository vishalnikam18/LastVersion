var all_blogs = [];



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
        success: (x) => {
            console.log(x)

            x.forEach((result, idx) => {
                function carousel(item) {
                    var content = $('<div></div>').appendTo(item).addClass('container')
                        .attr('id', 'myContent');
                    $(`<h1><u>${result.title}</u></h1>`).appendTo(content);
                    postsId = result.id;
                    // console.log(result.Content.slice(0, 20));
                    var c = result.Content.slice(0, 300);
                    $(`<p id=${postsId}>${c}</p>`).appendTo(content);
                    // $(`<button id="readMore" class="btn post-btn" >Read More<i class="fas fa-arrow-right"></i></button>`).appendTo(content);
                    var ids = result.id;
                    let anchor = document.createElement('a');
                    //    debugger;
                    anchor.href = "#";
                    anchor.id = "readme";
                    anchor.innerText = "Read More....";

                    content.append(anchor);

                    anchor.onclick = function getSpecificContent() 
                    {

                        // console.log(ids);
                        console.log('http://localhost:3000/posts/' + ids);
                        $.getJSON('http://localhost:3000/posts/' + ids, (data) => {

                            // localStorage.setItem("searchObj", JSON.stringify(result));
                            if (sessionStorage.getItem('user') != null)
                             {
                                 console.log(data.Content);
                                 console.log(data.id);
                                $(`${data.id}`).html(data.Content);
                            }
                            else {
                                alert("Please Login First !!!");
                                window.open('index.html');
                            }
                        });
                    }
                }
                if (idx == 0) {
                    var item = $('<div></div>').appendTo('#c').addClass('carousel-item')
                        .addClass('active');
                    carousel(item);
                } else {
                    var item = $('<div></div>').appendTo('#c').addClass('carousel-item');
                    carousel(item);
                }


            });


        }
    })

    var result1;
    $.ajax(
        {
            url: "http://localhost:3000/posts",
            success: function (result) {
                result1 = result;
                console.log(result1);
            },
            error: function (err) {
                console.log(err);
            }
        });
    $('#readMore').click(() => {
        debugger;
        // var id1 = document.getElementsByName('me').id;
        console.log(id1);
        $.getJSON('http://localhost:3000/posts/' + id, (data) => {
            console.log(postsId);
            console.log(data);
        });
    });


    //Searching Logic
    $('#searchtitle').keyup(() => {
        var input, filter, ul, li, a, i;
        input = $("#searchtitle");
        filter = input.val().toLowerCase();
        console.log(filter);
        document.getElementById('text').innerText = "";
        for (i = 0; i < result1.length; i++) {

            // debugger;
            if (input.val() != "") {

                txtValue = result1[i].title;

                if (txtValue.toLowerCase().indexOf(filter) > -1) {


                    console.log(result1[i].title);
                    let imge = document.createElement('a');
                    imge.href = "#";
                    imge.innerHTML = result1[i].title;
                    let titleid = result1[i].id;
                    imge.id = "anchor-Tag";

                    imge.onclick = (() => {
                       
                        // running code used for 
                        $.ajax(
                            {

                                // var titleid = result1[i].id;
                                url: "http://localhost:3000/posts/" + titleid,
                                success: function (result) {
                                    result1 = result;
                                   
                                    
                                    if (sessionStorage.getItem('user') != null) {
                                       
                                        localStorage.setItem("readData",JSON.stringify(result1));
                                        location.assign('demo.html');
                                        // $(".mydiv").append(para);


                                    }
                                    else {
                                        alert("Please Login First !!!");
                                        window.open('index.html');
                                    }
                                },
                                error: function (err) {
                                    console.log(err);
                                }
                            })

                    });
                    let br = document.createElement('br');
                    imge.append(br);
                    $('#text').append(imge);



                }

            }

        }
    });

    //Fetching data on the basis of categories
    $(".categoryFilter").click(function(){  
        $(".allPosts").hide();
        $(".filterPost").show();
        $(".filterPost").empty();
        let category=$(this).text();           
        alert(category);
        for(var i = 0; i < allposts.length; i++) {
                       
          if(allposts[i].category===category){
               console.log(allposts[i]);
               carousel(allposts[i]);
        
             $(".filterPost").append(div1); 
          
            }             
      }
      })


});