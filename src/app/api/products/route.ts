import { stripe } from '@/lib/stripe'
import { auth } from '@/auth'
import { AuthSession } from '@/types'



export async function POST(req: Request) {
    const body = await req.json()
    const { name, description, price, image, category } = body
    const session = await auth() as AuthSession

    if (!session?.user.admin) {

        return new Response('Não autorizado', { status: 403 })
    }

    if (!name || !description || !price || !image || !category) {
        return new Response('Dados incompletos', { status: 400 });
    }

    try {
        const product = await stripe.products.create({
            name,
            description,
            images: [image],
            metadata: {
                category: category,
            }
        })

        const priceData = await stripe.prices.create({
            unit_amount: price * 100,
            currency: 'brl',
            product: product.id,
        })

        await stripe.products.update(product.id, {
            default_price: priceData.id,
          });
        

        return new Response(JSON.stringify({ product, priceData }), {
            status: 201
        })


    } catch (error){
        console.log(error)
        new Response('Erro ao criar o produto', { status: 500 })
    }

}

export async function PATCH(req: Request) {
    const body = await req.json()
    const { id, name, description, price, image, category } = body
    const session = await auth() as AuthSession

    if (!session?.user.admin) {
        return new Response('Não autorizado', { status: 403 })
    } 

    try {
        const product = await stripe.products.update(id, {
            name,
            description,
            images: [image],
            metadata: {
                category: category,
            }
        })


        if(price){

        const priceData = await stripe.prices.create({
            unit_amount: price * 100,
            currency: 'brl',
            product: product.id,
        })

        await stripe.products.update(product.id, {
            default_price: priceData.id,
          });
        
        }

        return new Response(JSON.stringify({ product }), {
            status: 200
        })


    } catch (error){
        console.log(error)
        return new Response('Erro ao atualizar o produto', { status: 500 })
    }

}

export async function DELETE(req: Request) {
    const body = await req.json()
    const { id } = body
    const session = await auth() as AuthSession

    if (!session?.user.admin) {

        return new Response('Não autorizado', { status: 403 })
    }

    try {
        const product = await stripe.products.del(id)

        return new Response(JSON.stringify({ product }), {
            status: 200
        })


    } catch (error){
        console.log(error)
        return new Response('Erro ao deletar o produto', { status: 500 })
    }

}
