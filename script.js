const API_KEY = "a4b5fc241f1f4aef927cfa14e09aa6d7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles) 
{
     const cardsContainer = document.getElementById("cards-container");
     const newsCardTemplate = document.getElementById("template-news-card");
     cardsContainer.innerHTML = "";
     articles.forEach((article)=>{
        if(!article.urlToImage) 
        return;
       const cardClone = newsCardTemplate.content.cloneNode(true);
       fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
     });
}

function fillDataInCard(cardClone, article)
{
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML=article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timezone: "Asia/jakarta"
    });
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url,"_blank");
    });

}
 
let curselnav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem=document.getElementById(id);
    curselnav?.classList.remove('active');
    curselnav=navItem;
    curselnav.classList.add('active');
}

const searchb = document.getElementById("searchbutton");
const searchT = document.getElementById("searchtext");

searchb.addEventListener("click",()=>{
    const query=searchT.value;
    if(!query)
    return;
    fetchNews(query);
    curselnav?.classList.remove('active');
    curselnav=null;
});

