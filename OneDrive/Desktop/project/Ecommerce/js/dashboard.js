const loader=document.querySelector(".loader-container")
const currentPageHeading=document.querySelector("#heading h3")
const currentUser=JSON.parse(localStorage.getItem("currentuser"))
const profile_picture= document.querySelector("#profile-picture")
const database=JSON.parse(localStorage.getItem("Userdatabase"))
const countItem= document.querySelector("#countCartIteam")
// console.log(currentUser);
if(!currentUser){
  window.location.href("../index.html")
}
else{
  // currentPageHeading.innerText = currentUser.firstName 
  // 
}

// selected effect on navbar
const a = document.querySelectorAll("#list ul li a");
a.forEach((item) => {
  item.addEventListener("click", (e) => {

    // Remove 'selected' from all links
    a.forEach((l) => l.classList.remove("selected"));

    // Add 'selected' to the clicked link
    e.currentTarget.classList.toggle("selected");
  });
});

// navbar collapse
  const aside = document.querySelector("aside");
  const collapseBtn = document.querySelector("#collapse-btn i");

  collapseBtn.addEventListener("click", () => {
    aside.classList.toggle("collapsed");
    collapseBtn.classList.toggle("fa-arrow-right");
    collapseBtn.classList.toggle("fa-arrow-left");
  });


// Main Logic 

const allinks=document.querySelectorAll("#dash ,#us ,#sh, #se")
const search = document.querySelector("#search-box")
const cardsContainer= document.querySelector("#cards-container")
const welcomeMsg=document.querySelector("#welcome-msg")

let allusers=[]
let allproducts=[]
let activelink=null

const fetchuser=async()=>{
  try{
  const response = await fetch("https://api.github.com/users")
  const result = await response.json()
  allusers = result
  displayUser(allusers)
  }catch(error){
    console.error(error);
  }
}

function displayUser(users){
  cardsContainer.replaceChildren() //removes all child elements from the element referenced by cardsContainer 
  
  if(users.length===0){
    const p=document.createElement("h3")
    p.setAttribute("class","notfound")
    p.innerText="No such name based on your query"
    cardsContainer.appendChild(p)
  }
  else {
    users.map((ele)=>{
      const cards=document.createElement("div")
      cards.setAttribute("class","cards")
      cards.innerHTML=`
        <img src=${ele.avatar_url} alt=${ele.login}>
        <h3>${ele.login}</h3>
      `;
      cards.addEventListener("click", () => showUserPreview(ele));
      cardsContainer.appendChild(cards)
    })
  }
}

search.addEventListener("input",()=>{
  // console.log(activelink);
     const query=search.value.toLowerCase()
     if(activelink==="Users"){
      if(query.length===0){
        displayUser(allusers)
      }else{
        const filterUser=allusers.filter((user)=>user.login.toLowerCase().startsWith(query))
        displayUser(filterUser)
      }
    }
     else if (activelink=="Shopping"){
       if(query.length===0){
        displayProducts(allproducts)
      }else{
        const filterProduct=allproducts.filter((product)=>product.title.toLowerCase().startsWith(query))
        displayProducts(filterProduct)
      } 
    }
    }
)

// Users > Show Preview
function showUserPreview(user) {
  console.log(user);
  const previewContainer = document.createElement("div");
  previewContainer.className = "preview-modal";
  previewContainer.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img src="${user.avatar_url}" alt="${user.login}" />
      <h2>${user.login}</h2>
      <p><strong>ID:</strong> ${user.id}</p> 
      <p><strong>GitHub:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
    </div>
  `;
  
  document.body.appendChild(previewContainer);
  
  // Close modal
  previewContainer.querySelector(".close-btn").addEventListener("click", () => {
    previewContainer.remove();
  });
}

// Products

async function fetchProducts(){
  try{
    const response= await fetch("https://fakestoreapi.com/Products")
    const result=  await response.json()
    allproducts = result;
    displayProducts(allproducts)
  }catch(error){
    console.error(error)
  }

}
const cartdatabase = JSON.parse(localStorage.getItem("CartDB")) || []
// console.log(cartdatabase);

function displayProducts(products){
  cardsContainer.replaceChildren() 
    if(products.length===0){
    const p=document.createElement("h3")
    p.setAttribute("class","notfound")
    p.innerText="No such products based on your query"
    cardsContainer.appendChild(p)
  }
  else{
  products.map((ele)=>{
    const cards = document.createElement("div")
    cards.setAttribute("class", "cards prodcuts")
    cards.innerHTML= `
          <img src=${ele.image} alt=${ele.title}>
          <p>${ele.title.slice(0,60)+"..."}</p>
          <h2 class="price">${"₹"+Math.round(ele.price*80)}</h2>
          <div>
            <button class="buyNow" >Buy Now</button>
            <button class="addToCart" >Add to Cart</button>
          </div>
     `;

      cardsContainer.appendChild(cards)

      const buyNowBtn = cards.querySelectorAll(".buyNow");
      const addToCart = cards.querySelectorAll(".addToCart");
 
      // here we can remove All as we are attaching event listener to each element whne eterating thorough map
      // same forEach shold be removed as we now we have only one buyNowbtn or addToCartbtn

      buyNowBtn.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
        previewProduct(ele,"product")

      })
      })

      addToCart.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
        loader.style.display="block";

    const existingItemIndex = cartdatabase.findIndex(item => item.id === ele.id);
    
    // If item exists, increment quantity (handle undefined case)
    if (existingItemIndex !== -1) {
      cartdatabase[existingItemIndex].quantity = (cartdatabase[existingItemIndex].quantity || 0) + 1;
    } else {
      // If new item, add with quantity 1
      const cartItem = { ...ele, quantity: 1 };
      cartdatabase.push(cartItem);
    }
    localStorage.setItem("CartDB", JSON.stringify(cartdatabase));
    
        countCartIteam()
        setTimeout(()=>{
            loader.style.display="none"
        },300)
        })
      })
    })
  }
}

fetchprofilePhoto()
function fetchprofilePhoto(){
  database.forEach((ele)=>{

    if(currentUser.email==ele.email){
        profile_picture.src=ele.imgURL;
    }
 })
}

fetchDashboard()
function fetchDashboard(){
   cardsContainer.replaceChildren() 
   const cards = document.createElement("div")
    cards.innerHTML= `
    <h2>Dashboard Works !!</h2>
     `;
    cardsContainer.appendChild(cards)
}


function fetchSettings(){
   cardsContainer.replaceChildren() 
   const pfCard = document.createElement("div")
   pfCard.setAttribute("class","setting-container cards")
   pfCard.innerHTML= `
   <label for="pc">Update Your Profile Picture </label>
   <input class="pc" id="upload_img" type="link" placeholder="Paste Your Image URL" required>
   <button  id="update-btn">Update</button>
  
   <p id="info">* Direct image URLs only. Must end in .jpg, .png, .gif etc. No cloud storage links like Google Drive/Dropbox. </p>
   `;
   cardsContainer.appendChild(pfCard)
   const darkMode = document.createElement("div")
   darkMode.setAttribute("class","darkMode cards")
   darkMode.innerHTML= `
         <button class="appearance-btn dark-btn">Turn on Dark Mode</button>
         <button class="appearance-btn light-btn">Turn on Light Mode</button>
   `;
   cardsContainer.appendChild(darkMode);

   const darkthemeBtn = document.querySelector(".dark-btn")
   const lighthemeBtn = document.querySelector(".light-btn")
 
   darkthemeBtn.addEventListener("click",darkTheme)
   lighthemeBtn.addEventListener("click",lightTheme)

   const upload_img=document.querySelector("#upload_img")
   const updateBtn=document.querySelector("#update-btn")


  /// Fetch img URL from database and show in input field 
 database.forEach((e)=>{
    if(e.email==currentUser.email){
         upload_img.value=e.imgURL;
       }
   })

// Image Update Logic   
   updateBtn.addEventListener("click",()=>{
     if(!upload_img.value){
       alert("Please paste image a link")
       return
      }
    loader.style.display="block"

 database.forEach((e)=>{
    if(e.email==currentUser.email){
         e.imgURL=upload_img.value
         console.log(e.imgURL);
         //  console.log("image updated");
        //  alert("Photo Updated Successfully")
       }
   })
   localStorage.setItem("Userdatabase",JSON.stringify(database))
   fetchprofilePhoto()
   setTimeout(()=>{
     loader.style.display="none"
    },800)
 })
} 

allinks.forEach((link)=>{

  link.addEventListener("click",()=>{
    loader.style.display="block"
    const name = link.getAttribute("name");
    tabName(name)
    search.value=""

    if(name==="Dashboard"){
      fetchDashboard()
      activelink="Dashboard"
    }
    else if(name==="Users"){
      fetchuser()
      activelink="Users"

    }
   else if(name==="Shopping"){
      fetchProducts()
      activelink="Shopping"

    }   
    else if(name==="Settings"){
     fetchSettings()
     activelink="Settings"
    }
     setTimeout(() => {
         loader.style.display = "none";
      }, 800);
  })
})

function tabName(name){
  if(name==="Dashboard"){
  welcomeMsg.innerText= "Welcome to "+ name
  }
  else{
     welcomeMsg.innerText= name
  }
}

function darkTheme(){
  console.log("dark theme clicked");
}
function lightTheme(){
  console.log("light theme clicked");
}


const cartBtn= document.querySelector("#cart")
cartBtn.addEventListener("click", ()=>{
  loader.style.display="block";
  fetchCart()
  setTimeout(()=>{
       loader.style.display="none";
    },1000) 
})

function fetchCart(){
   cardsContainer.replaceChildren()
   tabName("Cart")
   if(cartdatabase.length==0){
    const cards = document.createElement("div")
    cards.setAttribute("class", "prodcuts")
    cards.innerHTML= `
         <p> No iteams in Cart </p>
       `;
     cardsContainer.appendChild(cards)  
   }
   else{

  cartdatabase.map((ele)=>{
    const cards = document.createElement("div")
    cards.setAttribute("class", "cards prodcuts")
    cards.innerHTML= `
          <img src=${ele.image} alt=${ele.title}>
          <p>${ele.title.slice(0,60)+"..."}</p>
          <h2 class="price">${"₹"+Math.round(ele.quantity*(ele.price*80))}</h2>
          <div class="quantity-container">
              <button class="minusBtn">−</button>
              <span class="quantity" >${ele.quantity}</span>
              <button class="plusBtn">+</button>
          </div>
          <div>
              <button class="addToCart remove" >Remove</button>
              <button class="buyNow" >Buy Now</button>
          </div>  
          `;
        
     cardsContainer.prepend(cards)

      const buynow = document.querySelector(".buyNow")
      buynow.addEventListener("click",()=>{
        previewProduct(ele,"cart")
      })

     const removeBtn = document.querySelector(".remove")
     removeBtn.addEventListener("click",()=>{
     cartdatabase.pop(ele);
     countCartIteam()
     fetchCart();
    //  console.log("element deleted");
      })

    const plusBtn= document.querySelector(".plusBtn")
    const minusBtn= document.querySelector(".minusBtn")
    const qty= document.querySelector(".quantity")
    if (qty.innerHTML == 1) {
         minusBtn.disabled = true;
    }
    
    plusBtn.addEventListener("click",()=>{
        ele.quantity+=1
        localStorage.setItem("CartDB",JSON.stringify(cartdatabase))
        fetchCart();
    })
    minusBtn.addEventListener("click",()=>{
        ele.quantity-=1
        localStorage.setItem("CartDB",JSON.stringify(cartdatabase))
        fetchCart();
    }) 
  })    
  setTimeout(()=>{
  loader.style.display="none";
  },400)
}
}

countCartIteam()
function countCartIteam(){
  countItem.innerText=cartdatabase.length
}

function previewProduct(ele,source){
  sessionStorage.setItem("paymentData", JSON.stringify(ele));
  cardsContainer.replaceChildren()
  const cards = document.createElement("div")
    cards.setAttribute("class", "cards prodcuts preview")
    cards.innerHTML= `
          <span class="close-btn">&times;</span>
          <img src=${ele.image} alt=${ele.title}>
          <h3>${ele.title}</h3>
          <p>${ele.description.slice(0,100)}</p>
          <p>Category: ${ele.category}</p>
          <p class="quantity">Price (1 item): ${"₹ "+ele.price*80}</p>
          <span class="quantity">Quantity: ${ele.quantity ?ele.quantity :1}</span>
          <h3 class="price">Total Payable: ${"₹ "+Math.round((ele.quantity ? ele.quantity : 1) *(ele.price*80))}</h3>
          <button class="proceedtoPayment">Proceed to Payment</button>  
    `;
    cardsContainer.appendChild(cards)

    document.querySelector(".proceedtoPayment").addEventListener("click", () => {
      window.location.href="./paymentpage.html";
    })
   
    // On clicking close button 
    document.querySelector(".close-btn").addEventListener("click", () => {
    cards.remove();
    if(source == "product")
      fetchProducts()
    else if (source == "cart")
      fetchCart()
    else alert("Something went wrong! Try refreshing the page")
  });
}