import { CartItem } from '@/lib/redux/cart/cartSlice';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, items } = body;
  const itemArrenge = items.map((itm: CartItem) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: itm.title,
        images: [itm?.color?.fakeImg],
        description: `Size: ${itm.size}, Color: ${itm?.color?.color}`,
      },
      unit_amount: itm?.price !== undefined ? Math.floor(itm.price * 110) : 0,
    },
    quantity: itm.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['BB', 'US', 'CA'],
    },
    line_items: itemArrenge,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URl}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URl}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((itm: CartItem) => itm.img)),
    },
  });
  console.log(session.id, 'id');
  return NextResponse.json({
    id: session.id,
  });
}
