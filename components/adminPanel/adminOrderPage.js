export function adminOrderPage() {
  let inner = ``;
  myOrderArray.forEach((order) => {
    inner += `
        <div class="d-flex gap-3">
            <p>${order.customerName}</P>
            <p>${order.customerId}</P>
            <p>${order.customerEmail}</P>
            <p>${order.totalAmount}</P>
            <p>${order.numberOfItems}</P>
        </div>
        `;
  });
  return inner;
}
