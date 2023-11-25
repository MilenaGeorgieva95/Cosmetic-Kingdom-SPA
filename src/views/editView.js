import { createSubmitHandler, getUserData } from './utils.js'
import { html } from '../../node_modules/lit-html/lit-html.js'
import { editItemById, getItemById } from '../api/data.js'

const editTemplate = (onSubmit, data) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" id="name" .value=${data.name} placeholder="Product Name"/>
            <input type="text" name="imageUrl" id="product-image" .value=${data.imageUrl} placeholder="Product Image"/>
            <input type="text" name="category" id="product-category" .value=${data.category} placeholder="Category"/>
            <textarea id="product-description" name="description" .value=${data.description} placeholder="Description" rows="5" cols="50"></textarea>
            <input type="text" name="price" id="product-price" .value=${data.price} placeholder="Price"/>
            <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function editPage(ctx) {
    const productId = ctx.params.id
    const product = await getItemById(productId);
    console.log(product)
    ctx.render(editTemplate(createSubmitHandler(onEdit), product))

    async function onEdit({ name, imageUrl, category, description, price }) {
        if (!name || !imageUrl || !category || !description || !price) {
            ctx.render(editTemplate(createSubmitHandler(onEdit)))
            return
        }
        const editProduct = await editItemById(productId, { name, imageUrl, category, description, price })
        ctx.page.redirect('/dashboard')
    }
}