const exploder = document.querySelector('.exploder');
const heroStack = document.querySelector('.hero-stack');

if (exploder) {
    let ticking = false; //slow down updates to regular refresh rate

    function updateExplode() {
        const rect = exploder.getBoundingClientRect(); //viewport relative - 0 when top of container @ top of screen, positive when container below
        const buffer = window.innerHeight/5; //finish exploding just before scrolling away
        let progress = 1-((rect.top-buffer) / (window.innerHeight/3.6));
        progress = Math.min(Math.max(progress, 0), 1); // clamp to [0, 1] (so no explosion at page load)
        heroStack.style.setProperty('--explode', progress);
        exploder.style.setProperty('--explode', progress);


        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateExplode);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    updateExplode(); //set to starting state on page load
}
