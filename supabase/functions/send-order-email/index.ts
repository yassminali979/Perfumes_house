import "@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders={
  "Access-Control-Allow-Origin":"*",
  "Access-control-Allow-Headers":
  "authorization, x-client-info,apikey,content-type",
};
Deno.serve(async (req) => {
  if(req.method ==="OPTIONS"){
    return new Response ("ok",{
      headers: corsHeaders,
    });
  }
  try {
    const {
      customer_email,
      customer_name,
      order_id,
      total,
      items,
    } = await req.json();

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td>${item.product_name}</td>
        <td>${item.quantity}</td>
        <td>${item.line_total} EGP</td>
      </tr>
    `).join("");

    const { data, error } = await resend.emails.send({
      from: "Perfumes House <onboarding@resend.dev>",
      to: customer_email,
      subject: `Order Confirmation #${order_id.slice(0,8)}`,
      html: `
        <div style="background:#111;color:white;padding:30px;font-family:Arial">
          <h1 style="color:#D4AF37">
            Perfumes House
          </h1>

          <p>Hello ${customer_name},</p>

          <p>Your order has been received successfully.</p>

          <h3>Order Details</h3>

          <table border="1" cellpadding="10" width="100%">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>

            ${itemsHtml}

          </table>

          <h2 style="color:#D4AF37">
            Total: ${total} EGP
          </h2>

          <p>
          We will contact you soon to confirm your order.
          </p>

          <p>
          Thank you for shopping with us ❤️
          </p>

        </div>
      `,
    });

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        data
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
      return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        status:500,
        headers:{
          ...corsHeaders,
          "Content-Type":"application/json"
        },
      }
    );
  }

})