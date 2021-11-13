/* Header menu */

let menuIcon = document.getElementById('toggle-menu');
let menu = document.querySelector('.right-header-nav');
let menuIconX = document.getElementById('toggle-menu-x');
let menuLinks = document.querySelectorAll('.right-header-nav li');

for(const link of menuLinks){
    link.addEventListener('click', function(){
        if(document.body.clientWidth <= 950){
            document.body.style.overflow = 'auto';
            menu.classList.remove('active-menu');
            menuIconX.style.display = 'none';
            menuIcon.style.display = 'block';
        }
    })
}

menuIcon.addEventListener('click', function(){
    menu.classList.add('active-menu');
    menuIcon.style.display = 'none';
    menuIconX.style.display = 'block';
    document.body.style.overflow = 'hidden';
    menuIconX.style.zIndex = 10;
})
menuIconX.addEventListener('click', function(){
    menuIconX.style.zIndex = -1;
    document.body.style.overflow = 'auto';
    menu.classList.remove('active-menu');
    menuIconX.style.display = 'none';
    menuIcon.style.display = 'block'
})

/* Header menu */
let arrowTop = document.querySelector('.toTop')

window.addEventListener('scroll', function(){
    if(window.pageYOffset > 676){
        arrowTop.classList.add('toTopActive');
    } else {
        arrowTop.classList.remove('toTopActive');
    }

    // if(window.pageXOffset > 950)
})
window.addEventListener('resize', function(){
    if(document.body.clientWidth <= 950){
        menu.classList.remove('active-menu');
        menuIconX.style.display = 'none';
        menuIcon.style.display = 'block';
    } else {
        menuIconX.style.display = 'none';
        menuIcon.style.display = 'none';
    }
})


/* Modal-course */
let headerBtn = document.querySelector('.font-header-btn');
let modalCourse = document.querySelector('.modal-course');
let closeModal = document.getElementById('close-modal-course')
let showModalCourse = document.querySelector('#modal-course-btn');

// create cover modal div and show modal
headerBtn.addEventListener('click', function(e){
    e.preventDefault();
    let coverModalBg = document.createElement('div');
    coverModalBg.classList.add('cover-body-modal');
    document.querySelector('.modal-in').append(coverModalBg);
    
    modalCourse.classList.add('modal-course-active');
    document.body.style.overflow = 'hidden';
})

// close modal
closeModal.addEventListener('click', function(){
    let coverModal = document.querySelector('.cover-body-modal');

    modalCourse.classList.remove('modal-course-active');
    document.querySelector('.modal-in').removeChild(coverModal);
    document.body.style.overflow = 'auto';
})

// close modal with target
window.addEventListener('click', function(event){
    var modalTarget = event.target;
    if(modalTarget.classList.contains('cover-body-modal')){
        modalTarget.parentElement.removeChild(modalTarget);

        modalCourse.classList.remove('modal-course-active');
        modalSubmit.classList.remove('modal-submit-active');
        document.body.style.overflow = 'auto';
    }
})

// submit modal
let closeSubmitBtn = document.querySelector('#close-submit-btn');
let modalSubmit = document.querySelector('.modal-course-submit');

let hdrName = document.querySelector('.header-name');
var hdrErrorMsgName = document.querySelector('.header-name-error');
hdrName.addEventListener('keyup', function(){
    var success = document.querySelector('.name-success');
    var error = document.querySelector('.name-error');
    let res = /^[a-zA-Z ]*$/;

    if( res.test(hdrName.value) && hdrName.value.length >= 3 && hdrName.value.length < 30 && hdrName.value.match(/[-!$%^&*()_+|~=`{}\[\]:";<> ]\\?,.\/0-9]/) == null ){

        error.style.display = 'none';
        success.style.display = 'block';
        hdrName.style.outline = '1px solid green';
        hdrErrorMsgName.style.display = 'none';
    } else {
        success.style.display = 'none';
        error.style.display = 'block';
        hdrName.style.outline = '1px solid red';
        hdrErrorMsgName.style.display = 'block';
    }
})

let hdrTel = document.querySelector('.header-tel');
var hdrErrorMsgTel = document.querySelector('.header-tel-error');
hdrTel.addEventListener('keyup', function(){
    var success = document.querySelector('.tel-success');
    var error = document.querySelector('.tel-error');

    if( hdrTel.value.match(/[0-9]/gi).length == 12 ){

        error.style.display = 'none';
        success.style.display = 'block';
        hdrTel.style.outline = '1px solid green';
        hdrErrorMsgTel.style.display = 'none';
    } else {
        success.style.display = 'none';
        error.style.display = 'block';
        hdrTel.style.outline = '1px solid red';
        hdrErrorMsgTel.style.display = 'block';
    }
})

showModalCourse.addEventListener('click', function(e){
    fetch_course()
   
    let inputs = modalCourse.querySelectorAll('input');
    let count = 0; 
    for(const npt of inputs){
        if(npt.value == '') {
            count += 1;
            npt.parentElement.querySelectorAll('i')[0].style.display = 'block';
            npt.style.outline = '1px solid red';
            npt.parentElement.querySelector('p').style.display = 'block';
        }
    } 

    for( const err of modalCourse.querySelectorAll('.fa-exclamation-circle') ){
        if(err.style.display == 'block') count += 1
    }

   
    if(count != 0){
        
        e.preventDefault();
    }

    if(count == 0){
        let coverModalBg = document.createElement('div');
        coverModalBg.classList.add('cover-body-modal');
        document.querySelector('.modal-in-submit').append(coverModalBg);
    
        modalCourse.classList.remove('modal-course-active');
        modalSubmit.classList.add('modal-submit-active');
    
        document.querySelector('.modal-course .modal-in')
        .removeChild(document.querySelector('.modal-course .cover-body-modal'));
        
        for(const npt of inputs){
            npt.value = '';
            npt.parentElement.querySelectorAll('i')[0].style.display = 'none';
            npt.parentElement.querySelectorAll('i')[1].style.display = 'none';
            npt.style.outline = '0px solid red';
            npt.parentElement.querySelector('p').style.display = 'none';
        }

        hdrErrorMsgName.style.display = 'none';
        hdrErrorMsgTel.style.display = 'none';
        // e.preventDefault();

        // prevented
    }

    async function fetch_course(){
        let nameInput = document.querySelector('.header-name');
        let phoneInput = document.querySelector('.header-tel');

        let response=await fetch("/contact",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameInput.value,
                phone: phoneInput.value,
            })
        })

        response=await response.json();

        console.log(response);
        return response;

    }

    // let count = 0;
    // let inputs = showModalCourse.parentElement.parentElement.querySelectorAll('input');
    // for(const npt of inputs){
    //     if(npt.value == '') count += 1;
    // }
    // if(count == 0) {
    //     e.preventDefault();
    //     let coverModalBg = document.createElement('div');
    //     coverModalBg.classList.add('cover-body-modal');
    //     document.querySelector('.modal-in-submit').append(coverModalBg);
    
    //     modalCourse.classList.remove('modal-course-active');
    //     modalSubmit.classList.add('modal-submit-active');
    
    //     document.querySelector('.modal-course .modal-in')
    //     .removeChild(document.querySelector('.modal-course .cover-body-modal'));
    // }
})

closeSubmitBtn.addEventListener('click', function(){
    modalSubmit.classList.remove('modal-submit-active');
    document.querySelector('.modal-in-submit')
    .removeChild(document.querySelector('.cover-body-modal'));
    document.body.style.overflow = 'auto';
})

// course part
let courseBtn = document.querySelectorAll('.course-btn');
for(const btn of courseBtn){
    btn.addEventListener('click', function(){
        let coverModalBg = document.createElement('div');
        coverModalBg.classList.add('cover-body-modal');
        document.querySelector('.modal-in').append(coverModalBg);
        
        modalCourse.classList.add('modal-course-active');
        document.body.style.overflow = 'hidden';
    })
}
// course part

// Teacher part

// modal img
let images = document.querySelectorAll('#photos-div .photos img');
let modalImgShow = document.querySelector('.img-modal');
let modalImg = document.querySelector('.img-modal img');
let closeModalImg = document.querySelector('#close-modal-img');

closeModalImg.addEventListener('click', function(){
    modalImgShow.classList.remove('img-modal-active');
    document.body.style.overflow = 'auto';
})
for(const img of images){
    img.addEventListener('click', function(event){
        let targetImgSrc = event.target.getAttribute('src');

        modalImg.src = targetImgSrc;
        modalImgShow.classList.add('img-modal-active');
        document.body.style.overflow = 'hidden';
    })
}
window.addEventListener('click', function(evt){
    if(evt.target.classList == 'modal-img-main'){
        modalImgShow.classList.remove('img-modal-active');
        document.body.style.overflow = 'auto';
    }
})
// modal img
// Teacher part


/* Modal-courses end */
// Footer form
let ftrName = document.querySelector('.footer-name');
var errorMsgName = document.querySelector('.ftr-name-error');
ftrName.addEventListener('keyup', function(){
    var success = ftrForm.querySelector('.name-success');
    var error = ftrForm.querySelector('.name-error');
    let res = /^[a-zA-Z ]*$/;

    if( res.test(ftrName.value) && ftrName.value.length >= 3 && ftrName.value.length < 30 && ftrName.value.match(/[-!$%^&*()_+|~={}\[\]:;<> ]\\?,.\/0-9]/) == null ){

        error.style.display = 'none';
        success.style.display = 'block';
        ftrName.style.outline = '1px solid green';
        errorMsgName.style.display = 'none';
    } else {
        success.style.display = 'none';
        error.style.display = 'block';
        ftrName.style.outline = '1px solid red';
        errorMsgName.style.display = 'block';
    }
})

let ftrTel = document.querySelector('.footer-tel');
var errorMsgTel = document.querySelector('.ftr-tel-error');
ftrTel.addEventListener('keyup', function(){
    var success = ftrForm.querySelector('.tel-success');
    var error = ftrForm.querySelector('.tel-error');

    if( ftrTel.value.match(/[0-9]/gi).length == 12 ){

        error.style.display = 'none';
        success.style.display = 'block';
        ftrTel.style.outline = '1px solid green';
        errorMsgTel.style.display = 'none';
    } else {
        success.style.display = 'none';
        error.style.display = 'block';
        ftrTel.style.outline = '1px solid red';
        errorMsgTel.style.display = 'block';
    }
})

let ftrEmail = document.querySelector('.footer-email');
var errorMsgEmail = document.querySelector('.ftr-email-error');
ftrEmail.addEventListener('keyup', function(){
    var success = ftrForm.querySelector('.email-success');
    var error = ftrForm.querySelector('.email-error');
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if( ftrEmail.value.match(regExp)){
        
        error.style.display = 'none';
        success.style.display = 'block';
        ftrEmail.style.outline = '1px solid green';
        errorMsgEmail.style.display = 'none';
    } else {

        success.style.display = 'none';
        error.style.display = 'block';
        ftrEmail.style.outline = '1px solid red';
        errorMsgEmail.style.display = 'block';
    }
})

let ftrBtn = document.querySelector('#footer-submit');
let ftrForm = document.getElementById('footer-form');

ftrBtn.addEventListener('click',  function(e){
    let inputs = ftrForm.querySelectorAll('input');
    let count = 0; 
     
    for(const npt of inputs){
        if(npt.value == '') {
            count += 1;
            npt.parentElement.querySelectorAll('i')[0].style.display = 'block';
            npt.style.outline = '1px solid red';
            npt.parentElement.querySelector('p').style.display = 'block';
        }
    }
    for( const err of ftrForm.querySelectorAll('.fa-exclamation-circle') ){
        if(err.style.display == 'block') count += 1
    }
    if(count != 0){
        e.preventDefault(); 
    } 

    
 
    if(count == 0){ 
        let coverModalBg = document.createElement('div');
        coverModalBg.classList.add('cover-body-modal');
        document.querySelector('.modal-in-submit').append(coverModalBg);

        modalCourse.classList.remove('modal-course-active');
        modalSubmit.classList.add('modal-submit-active'); 
        
        for(const npt of inputs){
            npt.value = '';
            npt.parentElement.querySelectorAll('i')[0].style.display = 'none';
            npt.parentElement.querySelectorAll('i')[1].style.display = 'none';
            npt.style.outline = '0px solid red';
            npt.parentElement.querySelector('p').style.display = 'none';
        }

        errorMsgName.style.display = 'none';
        errorMsgEmail.style.display = 'none';
        errorMsgTel.style.display = 'none';
        e.preventDefault(); 
    }
})


// let ftrBtn = document.querySelector('#footer-submit');
// let ftrForm = document.getElementById('footer-form');

// ftrBtn.addEventListener('click', function(e){
//     let inputs = ftrForm.querySelectorAll('input');
//     let count = 0;
//     for(const npt of inputs){
//         if(npt.value == '') {
//             count += 1;
//             npt.parentElement.querySelectorAll('i')[0].style.display = 'block';
//             npt.style.outline = '1px solid red';
//             npt.parentElement.querySelector('p').style.display = 'block';
//         }
//     }

//     if(count == 0){
//         let coverModalBg = document.createElement('div');
//         coverModalBg.classList.add('cover-body-modal');
//         document.querySelector('.modal-in-submit').append(coverModalBg);

//         modalCourse.classList.remove('modal-course-active');
//         modalSubmit.classList.add('modal-submit-active');
        
//         for(const npt of inputs){
//             npt.value = '';
//             npt.parentElement.querySelectorAll('i')[1].style.display = 'none';
//             npt.style.outline = '0px solid red';
//             npt.parentElement.querySelector('p').style.display = 'none';
//         }

//         errorMsgName.style.display = 'none';
//         errorMsgEmail.style.display = 'none';
//         errorMsgTel.style.display = 'none';
//         e.preventDefault();
//     }
// })

// Footer form

/* -- owl carousel -- */

$(document).ready(function(){
    
    // News Carousel
    $("#news-div .owl-carousel").owlCarousel({
        items: 3,
        autoplay:true,
        autoPlayTimeout:3000,
        autoplaySpeed:3000,
        autoHeight:false,
        margin:3,
        autoplayHoverPause:false,
        loop: true,
        nav: false,
        dots: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1
            },
            700:{
                items: 2
            },
            950:{
                items: 2
            },
            1000:{
                items: 3
            },
        }
    })

    // Courses Carousel
    $("#courses-div .owl-carousel").owlCarousel({
        items: 3,
        autoplay:true,
        autoPlayTimeout:3000,
        autoplaySpeed:3000,
        autoHeight:false,
        margin:3,
        autoplayHoverPause:false,
        loop: true,
        nav: false,
        dots: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1
            },
            700:{
                items: 2
            },
            950:{
                items: 2
            },
            1000:{
                items: 3
            },
        }
    })

    // Teachers Carousel
    $("#teachers-div .owl-carousel").owlCarousel({
        items: 3,
        autoplay:true,
        autoPlayTimeout:3000,
        autoplaySpeed:3000,
        autoHeight:false,
        margin:3,
        autoplayHoverPause:false,
        loop: true,
        nav: false,
        dots: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1
            },
            700:{
                items: 2
            },
            950:{
                items: 2
            },
            1000:{
                items: 3
            },
        }
    })

    // Videos Carousel
    $("#videos-div .owl-carousel").owlCarousel({
        items: 3,
        autoplay:true,
        autoPlayTimeout:3000,
        autoplaySpeed:3000,
        autoHeight:false,
        margin:3,
        autoplayHoverPause:false,
        loop: true,
        nav: false,
        dots: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1
            },
            700:{
                items: 2
            },
            950:{
                items: 2
            },
            1000:{
                items: 3
            },
        }
    })

    // Results Carousel
    $("#result-div .owl-carousel").owlCarousel({
        items: 3,
        autoplay:true,
        autoPlayTimeout:3000,
        autoplaySpeed:3000,
        autoHeight:false,
        margin:3,
        autoplayHoverPause:false,
        loop: true,
        nav: false,
        dots: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1
            },
            700:{
                items: 2
            },
            950:{
                items: 2
            },
            1000:{
                items: 3
            },
        }
    })

    // Commits Carousel
    $("#commits-div .owl-carousel").owlCarousel({
        items: 3,
        autoplay:true,
        autoPlayTimeout:3000,
        autoplaySpeed:3000,
        autoHeight:false,
        margin:3,
        autoplayHoverPause:false,
        loop: true,
        nav: false,
        dots: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1,
            },
            700:{
                items: 2
            },
            950:{
                items: 2
            },
            1000:{
                items: 3
            },
        }
    })
})

/* Modal video  */

// News Modal
let newsModal = document.querySelector('.new-modal');
let closeNewsModal = document.querySelector('.new-item-top i');
let newsInfo = document.querySelectorAll('.more-news-box');

for(const info of newsInfo){
    info.addEventListener('click', function(evt){
        let imgSrc = evt.currentTarget.parentElement.querySelector('.new-image').getAttribute('src'); 
        let newsTitle = evt.currentTarget.parentElement.parentElement.querySelector('h3')
        let newsDate = evt.currentTarget.parentElement.parentElement.querySelector('span')

        document.getElementById('new-modal-img').src = imgSrc;
        document.getElementById('title-img-modal').innerHTML = newsTitle.textContent;
        document.getElementById('img-modal-date').innerHTML = newsDate.textContent;
        document.getElementById('some-info').innerHTML = 
        evt.currentTarget.parentElement.parentElement.querySelector('.some-info').textContent;
        document.getElementById('desc_title').innerHTML = 
        evt.currentTarget.parentElement.parentElement.querySelector('.desc_title').textContent;
        document.getElementById('description').innerHTML = 
        evt.currentTarget.parentElement.parentElement.querySelector('.description').textContent;
        

        newsModal.classList.add('new-modal-active');
        document.body.style.overflow = 'hidden';
    })
}

window.addEventListener('click', function(evt){
    if(evt.target.classList[0] == 'modal-new-main'){
        newsModal.classList.remove('new-modal-active');
        document.body.style.overflow = 'auto';
    }
})

closeNewsModal.addEventListener('click', function(){
    newsModal.classList.remove('new-modal-active');
    document.body.style.overflow = 'auto';
})

// News Modal

// Course intro
let courseIntroX = document.getElementById('course-intro-close');
let courseIntroModal = document.querySelector('.course-modal-intro');
let introImages = document.querySelectorAll('.course-main .more-course-box');
let introCrsH3 = document.querySelectorAll('.course-main h3');

document.querySelector('.course-btn-info').addEventListener('click', function(){
    courseIntroModal.classList.remove('course-modal-intro-active');
    let coverModalBg = document.createElement('div');
    coverModalBg.classList.add('cover-body-modal');
    document.querySelector('.modal-in').append(coverModalBg);
    
    modalCourse.classList.add('modal-course-active');
})

for(const img of introImages){
    img.addEventListener('click', function(evt){
        var parentE = evt.currentTarget.parentElement.parentElement; 

        document.querySelector('.item-top-left img').src = 
            parentE.querySelector('img').getAttribute('src');
        document.querySelector('.item-top-right h2').innerHTML = 
            parentE.querySelector('.course-content h3').textContent;
        document.querySelector('.item-top-right span').innerHTML = 
            parentE.querySelector('.course-content p').textContent;
        document.querySelector('.course-modal-intro h3').innerHTML = 
            parentE.querySelector('.hidden h1').textContent;
        document.querySelector('.course-modal-intro .introP1').innerHTML = 
            parentE.querySelector('.hidden p').textContent;
        document.querySelector('.course-modal-intro .introP2').innerHTML = 
            parentE.querySelector('.hidden span').textContent;

        courseIntroModal.classList.add('course-modal-intro-active');
        document.body.style.overflow = 'hidden';   
    })
}
window.addEventListener('click', function(evt){
    if(evt.target.classList == 'course-intro-in'){
        courseIntroModal.classList.remove('course-modal-intro-active');
        document.body.style.overflow = 'auto';    
    }
})
courseIntroX.addEventListener('click', function(){
    courseIntroModal.classList.remove('course-modal-intro-active');
    document.body.style.overflow = 'auto';
})

// !Course intro

/* Modal video  */

// ******************** YouTube Video Link ********************** \\

let videoIframes = document.querySelectorAll('#videos-div .video-iframe');

for( const ifr of videoIframes ) {
    // quality options: low, medium, high, max | default is max.
    var thumbnail = get_youtube_thumbnail( ifr.getAttribute('src'), 'medium');
    var img = ifr.parentElement.querySelector('img');

    img.src = thumbnail;
}


// var thumbnail = get_youtube_thumbnail('https://youtu.be/WZKW2Hq2fks', 'medium');



function get_youtube_thumbnail(url, quality){
    if(url){
        var video_id, thumbnail, result;
        if(result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))
        {
            video_id = result.pop();
        }
        else if(result = url.match(/youtu.be\/(.{11})/))
        {
            video_id = result.pop();
        }

        if(video_id){
            if(typeof quality == "undefined"){
                quality = 'high';
            }
        
            var quality_key = 'maxresdefault'; // Max quality
            if(quality == 'low'){
                quality_key = 'sddefault';
            }else if(quality == 'medium'){
                quality_key = 'mqdefault';
            } else if (quality == 'high') {
                quality_key = 'hqdefault';
            }

            var thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+quality_key+".jpg";
            return thumbnail;
        }
    }
    return false;
}

let trgVideos = document.querySelectorAll('#videos-div .video-cover');
let videoModal = document.querySelector('.video-modal');
let videoClose = document.getElementById('modal-video-close');

for(const trgVideo of trgVideos){
    trgVideo.addEventListener('click', function(){
        let ifr = trgVideo.parentElement.querySelector('.video-iframe');
        let modalIfr = videoModal.querySelector('.video-container iframe');

        modalIfr.src = ifr.getAttribute('src');

        document.body.style.overflow = 'hidden';
        videoModal.classList.add('video-modal-active');
    })
}

// close
videoClose.addEventListener('click', function(){
    document.body.style.overflow = 'auto';
    videoModal.classList.remove('video-modal-active');
    document.querySelector('.video-container iframe').setAttribute("src",'')
})

window.addEventListener('click', function(evt){
    if(evt.target.classList == 'modal-video-main'){
        document.querySelector('.video-container iframe').setAttribute("src",'')
        document.body.style.overflow = 'auto';
        videoModal.classList.remove('video-modal-active');
    }
})

// ******************** YouTube Video Link ********************** \\

