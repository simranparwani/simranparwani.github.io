<script>
    // let m = { x: 0, y: 0 };
    // const onMouseMove = (evt) => {
    //     m.x = evt.clientX;
    //     m.y = evt.clientY;
    // }
</script>

<div class="circle"></div>
<div class="text">
<h2>Hi, I'm Simran (she/her). Data visualization is my craft.</h2>
<span>This website is ✨under construction,✨ but you can check out my <a href="https://drive.google.com/file/d/1JMGa52rdDtPuDzElUmt5HNbtVb-KqCSt/view?usp=sharing">resume</a> and some of my design processes on <a href="https://www.behance.net/simparwani">Behance.</a> I technically have a <a href="https://www.linkedin.com/in/simran-parwani-a88213141/">LinkedIn</a> and a <a href="https://x.com/simranparwani">Twitter</a> too. Reach out if you want to nerd out about dataviz, fantasy books, plants, or football!</span>
<span><br><br>TO DO:</span>
<ul>
    <li>Switch home page to masonry grid layout</li>
    <li>Design more playful image load animation</li>
    <li>Only display 'faves' category on mobile</li>
    <li>Design about page, maybe some personal dataviz? guiding principles?</li>
    <li>Add blog infrastructure (maybe using Ghost? or mdsvex?) to share process/resources</li>
    <li>Add sports datasets/scrapers I've built on GitHub</li>
    <li>Design resume page</li>
    <li>Self-host/compress images; right now i'm using google photos but performance isn't giving</li>
    <li>Make a footer with 'Built with SvelteKit and hosted on [whatever platform i use, netlify?]'</li>
</ul>
<!-- <span>Some ranges that make up my week:</span>
<ul>
    <li>Drinking <b>12-21 cups</b> of coffee or chai</li>
    <li>Caring for my <b>30-45 plants</b></li>
    <li>Reading <b>2-5 books</b> (yes, audiobooks count)</li>
    <li>Screaming at the TV <b>2-76 times</b> during football season (last fall was rough as a bengals fan)</li>
</ul> -->

</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
  
    .text {
        font-family:"Rubik", sans-serif;  
        width: clamp(200px, 60%, 800px);
        margin-left:2%;
    }

    a {
        color:#bc4749;
    }

    ::selection {
  background: #7FB68560;
}
</style>