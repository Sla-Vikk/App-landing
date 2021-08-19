document.addEventListener('DOMContentLoaded', function(){
	
	const slidingElement = document.querySelector('.slide-left');
     window.addEventListener('scroll', ()=>{

        const {scrollTop, clientHeight} = document.documentElement

        const elementTop = slidingElement.getBoundingClientRect().top;

        if (scrollTop > (scrollTop + elementTop).toFixed() - clientHeight * 0.5) {
            slidingElement.classList.add('active')
        }
     })


})
