import { getUserData } from './utils.js'
import { html } from '../../node_modules/lit-html/lit-html.js'
import { delteItemById, getTotalBuys, getItemById, buyItem, userBoughtItem } from '../api/data.js';

const detailsTemplate = (data, onDelete, buyProduct) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${data.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${data.totalBuys}</span> times.</h4>
                <span>${data.description}</span>
              </div>  
            </div>

            <div id="action-buttons">
            ${data.controls === 'owner' ? html`
              <a href="/dashboard/${data._id}/edit" id="edit-btn">Edit</a>
              <a @click=${(e) => onDelete(e, data._id)} href="javascript:void(0)" id="delete-btn">Delete</a>` : ''}

              ${data.controls === 'user' && !data.bought ? html`<a @click=${(e) => buyProduct(e, data._id)} href="javascript:void(0)" id="buy-btn">Buy</a>` : ''}
            </div>

          </div>
        </section>`

export async function detailsPage(ctx) {
  const prodId = ctx.params.id
  const prodData = await getProductData(prodId)
  ctx.render(detailsTemplate(prodData, onDelete, buyProduct))

  async function onDelete(e, productId) {
    e.preventDefault()
    const choice = confirm('Are you sure you want to delete this product?')
    if (choice) {
      await delteItemById(productId);
      ctx.page.redirect('/dashboard')
    }
  }
  async function buyProduct(e, productId) {
    e.preventDefault()
    await buyItem({ productId });
    const productData = await getProductData(productId)
    ctx.render(detailsTemplate(productData, onDelete, buyProduct))
  }


}

async function getProductData(prodId) {
  const prodData = await getItemById(prodId);
  prodData.controls = 'guest'
  const user = getUserData();
  const totalBuys = await getTotalBuys(prodId);
  prodData.totalBuys = totalBuys
  if (user) {
    prodData.controls = 'user';
    if (user._id === prodData._ownerId) {
      prodData.controls = 'owner';
    } else {
      const bought = await userBoughtItem(prodId, user._id);
      if (bought) {
        prodData.bought = true;
      }
    }
  }
  return prodData
}