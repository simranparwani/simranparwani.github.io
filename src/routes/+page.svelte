<script>
    import { onMount } from 'svelte';
    export let data;


    const filters = ["all","faves✨", "sports🏈", "politics👩🏾‍⚖️", "random🦄" ];

    const pickColor = () => {
        let colors = ["#403d58", "#bc4749", "#7FB685"];
        
        let color = colors[Math.floor(Math.random() * 3)];
        return color;

    }

    let selected = "all";
    let imageArr = data.images;
    const filterImages = (e) => {
        selected = e.target.dataset.name;
        switch(selected) {
            case "all":
                imageArr = data.images;
                break;
            case "faves✨":
                imageArr = data.images.filter((d) => d.featured === true);
                break;
            default:
            imageArr = data.images.filter((d) => selected === d.category);
        }
        triggerFadeIn();
    }

    const triggerFadeIn = () => {
        const collage = document.querySelector('.collage');
        if (collage) {
            collage.classList.remove('fadeIn'); // Remove class to reset animation
            void collage.offsetWidth;
            collage.classList.add('fadeIn'); // Add class to start animation
        }
    }

    // Call triggerFadeIn on initial load
    onMount(() => {
        triggerFadeIn(); // Ensure animation runs on initial load
    });



</script>
<div class="filters">
    <span>Filter by: </span>
    {#each filters as filter}
        <button class:active={selected === filter} class="button" data-name={filter} on:click={filterImages}>
            {filter}
        </button>
    {/each}
</div>
<div class="collage fadeIn">
    {#each imageArr as d,i}
    <a class="column" style={"background-image:url('" + d.src + "');  background-color: " + pickColor() + ";"} href={d.href}>
        <p class="overlay">—<br>{d.title}</p>
    </a>
    {/each}
</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
  
    .filters {
        margin-bottom:10px;
        font-family:"Rubik", sans-serif;
       
    }

    .button {
        border-radius:25px;
        margin-right:5px;
        padding:3px 10px;
        border:none;
        font-size:1rem;
    }
    .collage {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 10px;
        align-items: center;
    }

    .fadeIn {
        animation: fadeIn 1s ease-in-out 0s 1 forwards;
        
    }

    @keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

    .column {
        background-size: cover;
        background-position: 25% 60%;
        height:200px;
    }

    .column:hover {
        transition: all 400ms ease-in-out;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-blend-mode: multiply;
        text-decoration: none;
    }



    .overlay {
        visibility: hidden;
    }

    .column:hover .overlay {
        text-align:center;
        margin-top:20%;
        font-family:"Rubik", sans-serif;
        color:white;
        font-size:1rem;
        padding:10px;
        visibility: visible;
    }

.button:hover,
.active {
	background-color: #bc4749;
	color: white;
}


 
    
</style>