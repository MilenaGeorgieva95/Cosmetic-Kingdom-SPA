import { createSubmitHandler, getUserData } from './utils.js'
import { html } from '../../node_modules/lit-html/lit-html.js'
import { createItem } from '../api/data.js'

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Product</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name"/>
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image"/>
            <input type="text" name="category" id="product-category" placeholder="Category"/>
            <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>
            <input type="text" name="price" id="product-price" placeholder="Price"/>
            <button type="submit">Add</button>
        </form>
    </div>
</section>`

export async function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)))

    async function onCreate({ name, imageUrl, category, description, price }) {
        if (!name || !imageUrl || !category || !description || !price) {
            ctx.render(createTemplate(createSubmitHandler(onCreate)))
            return alert('Missing fields')
        }
        const newProduct = await createItem({ name, imageUrl, category, description, price });
        ctx.page.redirect('/dashboard')
    }
}

