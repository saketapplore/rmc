const OrderTable = ({orders}) => {

    return (
        <div className='bg-white rounded-xl p-5 mt-6'>
          
           <h2 className='text-lg font-semibold mb-4'>
             Recent Orders
           </h2>

           <div className='overflow-x-auto'>
             
               <table className="w-full text-sm">
                     <thead>
                         <tr className='border-b text-left'>
                           <th className="p-3">Order ID</th>
                           <th className="p-3">Customer</th>
                           <th className="p-3">Product</th>
                           <th className="p-3">Category</th>
                           <th className="p-3">Amount</th>
                          <th className="p-3">Status</th>
                           <th className="p-3">Date</th>
                          </tr>
                     </thead>

                     <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}
                             className='border-b'
                            >
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.product}</td>
                                <td className="p-3">{order.category}</td>
                                <td className="p-3">{order.amount}</td>
                                <td className="p-3">
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      order.status === "Completed"
        ? "bg-green-100 text-green-700"
        : order.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {order.status}
  </span>
</td>
                                <td className="p-3">{order.date}</td>
                            </tr>
                        ))}
                     </tbody>

               </table>

           </div>

        </div>
    )

}

export default OrderTable;

