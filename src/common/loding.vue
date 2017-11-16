<template lang="html">
    <div id="container" v-if="loading">
        <div id="preloader">
            <span class="span"></span>
            <span class="span2"></span>
            <span class="span3"></span>
            <span class="span4"></span>
            <span class="span5"></span>
        </div>
    </div>
</template>
<script >

</script>
<style media="screen" lang="less">
    body{
        background:rgba(#e7e7e7, 0.24);
        width: 100%;
        height: 100%;
    }
    #container{
        width:54px;
        height:25px;
        position:absolute;
        top:40%;
        left:47%;
    }
    #preloader span{
      	display:block;
      	bottom:0;
      	width:9px;
      	height:5px;
      	background:#9b59b6;
      	position:absolute;
      	-webkit-animation:preloader 1.5s infinite ease-in-out;
      	  -moz-animation:preloader 1.5s infinite ease-in-out;
      	    -ms-animation:preloader 1.5s infinite ease-in-out;
      		    -o-animation:preloader 1.5s infinite ease-in-out;
      		      animation:preloader 1.5s infinite ease-in-out;
    }
    #preloader span:nth-child(2){
      	left:11px;
      	-webkit-animation-delay:.2s;
      	   -moz-animation-delay:.2s;
      	    -ms-animation-delay:.2s;
      		    -o-animation-delay:.2s;
      		      animation-delay:.2s;
    }
    #preloader span:nth-child(3){
      	left:22px;
      	-webkit-animation-delay:.4s;
      	  -moz-animation-delay:.4s;
      	    -ms-animation-delay:.4s;
      		    -o-animation-delay:.4s;
      		      animation-delay:.4s;
    }
    #preloader span:nth-child(4){
      	left:33px;
      	-webkit-animation-delay:.6s;
      	  -moz-animation-delay:.6s;
      	    -ms-animation-delay:.6s;
      		    -o-animation-delay:.6s;
      		      animation-delay:.6s;
    }
    #preloader span:nth-child(5){
      	left:44px;
      	-webkit-animation-delay:.8s;
      	  -moz-animation-delay:.8s;
      	    -ms-animation-delay:.8s;
      		    -o-animation-delay:.8s;
      		      animation-delay:.8s;
    }
    @-webkit-keyframes preloader{
        0%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
      	25%{height:30px;-ms-transform:translateY(15px);background:#3498db;}
      	50%{height:5px;-ms-transform:translateY(0px);background:#44e772;}
      	100%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
    }
    @-moz-keyframes preloader{
        0%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
      	25%{height:30px;-ms-transform:translateY(15px);background:#3498db;}
      	50%{height:5px;-ms-transform:translateY(0px);background:#44e772;}
      	100%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
    }
    @-ms-keyframes preloader{
        0%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
      	25%{height:30px;-ms-transform:translateY(15px);background:#3498db;}
      	50%{height:5px;-ms-transform:translateY(0px);background:#44e772;}
      	100%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
    }
    @keyframes preloader{
        0%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
      	25%{height:30px;-ms-transform:translateY(15px);background:#3498db;}
      	50%{height:5px;-ms-transform:translateY(0px);background:#44e772;}
      	100%{height:5px;-ms-transform:translateY(0px);background:#8d7bd4;}
    }
</style>
