import"./main-448b7643.js";import{P as e}from"./progressbar.min-b6ae59e6.js";var i=new e.Circle("#static-progress-circle",{strokeWidth:4,color:"#ffcc00",trailColor:"#eee",trailWidth:4,svgStyle:null,duration:0});i.set(1);var t=new e.Line("#orange-progress",{strokeWidth:4,easing:"easeInOut",duration:1400,color:"#F0743E",trailColor:"rgba(253, 231, 215, 0.8)",trailWidth:10,svgStyle:{width:"100%",height:"100%"},from:{color:"#F0743E"},to:{color:"#F0743E"}});t.set(.5);var r=document.getElementById("progress-slider");r.addEventListener("input",function(){var o=r.value;t.set(o)});new Swiper(".mySwiper",{navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});
