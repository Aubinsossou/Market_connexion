const Produits = {
  init_produit: () => {
    let produit = localStorage.getItem("produit");
    if (!produit) {
      localStorage.setItem("produit", JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem("produit"));
  },
  add_product: () => {
    const button_form_add_product = document.getElementById(
      "button_form_add_product"
    );
    if (button_form_add_product) {
      button_form_add_product.addEventListener("click", (e) => {
        e.preventDefault();
        const name_product = document.querySelector("input[name='name']");
        const price_product = document.querySelector("input[name='price']");
        const qte_product = document.querySelector("input[name='qte']");
        let id = produit.length + 1;
        if(name_product.value==0 || price_product.value==0 || qte_product.value ==0 )
          {
            alert("Champ vide")
          }
        const product = {
          id: id,
          name_product: name_product.value,
          price_product: price_product.value,
          qte_product: qte_product.value,
          prix_total: price_product.value * qte_product.value,
        };
        produit = Produits.init_produit();
        produit.push(product);
        localStorage.setItem("produit", JSON.stringify(produit));
        name_product.value = "";
        price_product.value = "";
        qte_product.value = "";
      });
    }
  },
  display_product: () => {
    const product_list_tag = document.querySelector(".product_list");
    produit = Produits.init_produit();
    let content = ``;

    if (product_list_tag) {
      console.log(product_list_tag);

      if (produit) {
        console.log(produit);
        if (produit.length == 0) {
          console.log("pas de produit disponible");
          {
            content = `<h3>Il y a aucun produit disponible</h3> `;
          }
        } else {
          produit.forEach((item) => {
            content += `  
                <tr> 
                  <td>${item.name_product}</td>
                  <td>${item.price_product}</td> 
                  <td>${item.qte_product}</td>
                  <td>
                    <div class="action">
                    <a href="/edit_product.html?id=${item.id}">Edit</a>
                    <a href="#" class="delete_product" data-product-id=${item.id}>Delete</a>
                    </div>
                    </td> 
                </tr>
            `;
          });
        }
      }
      product_list_tag.innerHTML = content;
    }
  },
  edit_product: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const edit_product = document.getElementById("button_form_edit_product");
    const name_product = document.querySelector("input[name='name']");
    const price_product = document.querySelector("input[name='price']");
    const qte_product = document.querySelector("input[name='qte']");
    const edit_title=document.querySelector(".edit_title")

    product = produit.find((element) => element.id == id);
    if (product) {
      name_product.value = product.name_product;
      price_product.value = product.price_product;
      qte_product.value = product.qte_product;
      if (edit_product) {
        edit_product.addEventListener("click", (e) => {
          e.preventDefault;
          if(name_product.value==0 || price_product.value==0 || qte_product.value ==0 )
          {
            alert("Champ vide")
          }
          product.name_product = name_product.value;
          product.price_product = price_product.value;
          product.qte_product = qte_product.value;
          localStorage.setItem("produit", JSON.stringify(produit));
          name_product.value = "";
          price_product.value = "";
          qte_product.value = "";
        });
      }
    }
  },
  delete_product: () => {
    const delete_product = document.querySelectorAll(
      "a[class='delete_product']"
    );
    if (delete_product) {
      delete_product.forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          const current_element_click = event.target.getAttribute("data-product-id");
          const filter_roducts = produit.filter((item) => item.id != current_element_click);
          localStorage.setItem("produit", JSON.stringify(filter_roducts));
          location.reload();
        });
      })
    }
  },
    logout:()=>{
    const logout=document.querySelector(".logout");
    if(logout){
      logout.addEventListener("click", (e)=>{
        e.preventDefault();
          localStorage.removeItem("token")
          window.location.href="/login_in.html"
          console.log("redirection")
      })
    }
  },
  /*
   verifyUrl:()=>{
    const token = localStorage.getItem("token")
    const url= window.location.pathname
    console.log(token);
    if(url == "/dashboard.html" || url == "/edit_product.html" || url == "/add_product.html" || url == "/accueil.html" && token){
      window.location.href=url
    }else if (url == "/dashboard.html" || url == "/edit_product.html" || url == "/add_product.html" || url == "/accueil.html" && !token){
      window.location.href="login_in.html" 
    }
  },*/
};
Produits.init_produit();
Produits.add_product();
Produits.display_product();
Produits.edit_product();
Produits.delete_product();
Produits.logout();


/*comment utiliser try catch

difference entre les 4 types d'api
Les codes d'erreurs
*/