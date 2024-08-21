<script>
    import { page } from "$app/stores"

    const nav = [
        {title: "Simran Parwani", path: "/"},
        {title: "About", path: "/about"},
    ];


</script>



<nav>
    <ul>
        {#each nav as item}
            <li>
                <a class:current={$page.url.pathname == item.path } href={item.path}>{item.title}</a>
            </li>
        {/each}
    </ul>
</nav>
<body>
<slot />
</body>
<!-- <footer class="footer">_<br>Built with SvelteKit</footer> -->


<style>
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
    
    nav {
        font-family:"Rubik", sans-serif;
        height:50px;
        color: #403D58;

    }
    ul {
        display:flex;
        list-style: none;
        font-size: 1.5rem;

    }

    li {
        margin-right:20px;
        
    }

    a {
color: #403D58;
text-decoration: none;
background-image: linear-gradient(#BC4749, #BC4749);
background-size: 0% 0.1em;
background-position-y: 100%;
background-position-x: 0%;
background-repeat: no-repeat;
transition: background-size 200ms ease-in-out;
}
a:hover,
a:focus,
a:active {
background-size: 100% 0.1em;
}
.current {
        text-decoration: underline;
        text-underline-offset: 8px;
} 

/* body {
    flex-grow:1;
    display:flex;
} */

.footer {
    height:60px;
    color:#BC4749;
    font-family:"Rubik", sans-serif;
    font-size: 1.5rem;
    margin-top:20px;
    

}
</style>

