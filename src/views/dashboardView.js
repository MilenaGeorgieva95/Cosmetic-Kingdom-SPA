import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllItems } from '../api/data.js'

const dashboardTemplate = (products) => html`
<h2>Products</h2>
        <section id="dashboard">

          ${products.length === 0 ? html`<h2>No products yet.</h2>`
    : products.map(productTemplate)}
          
        </section>
         `
const productTemplate = (product) => html`
<div class="product">
  <img src=${product.imageUrl} alt="example" />
  <p class="title">${product.name}</p>
  <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
  <a class="details-btn" href="/dashboard/${product._id}">Details</a>
</div>`

export async function dashboardPage(ctx) {
  const allProducts = await getAllItems();
  console.log(allProducts)
  ctx.render(dashboardTemplate(allProducts))
}