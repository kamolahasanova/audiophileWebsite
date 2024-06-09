import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeProduct, changeAmount } from "../features/productSlice";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils";
function Cart() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  if (products.length == 0) {
    return (
      <div className=" mx-auto max-w-6xl flex flex-col  items-center gap-5">
        <h1 className=" text-2xl font-medium">
          Savatda hozircha mahsulot yo' q
        </h1>
        <p>
          Bosh sahifadagi to'plamlardan boshlang yoki kerakli mahsulotni qidiruv
          orqali toping
        </p>
        <Link className="btn btn-primary" to="/">
          Home
        </Link>
      </div>
    );
  } else {
    return (
      <div className=" align-content overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name/category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {/* <img src={product.images} alt={product.name} /> */}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.name}</div>
                        <div className="text-sm opacity-50">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h1 className=" text-xl ">{formatPrice(product.price)}</h1>
                  </td>
                  <td>
                    <br />
                    <span>{product.description}...</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            changeAmount({
                              type: "increment",
                              id: product.id,
                            })
                          )
                        }
                        className="btn-sm"
                      >
                        +
                      </button>
                      <h3>{product.amount}</h3>
                      <button
                        onClick={() => {
                          if (product.amount == 1) {
                            dispatch(removeProduct(product.id));
                          } else {
                            dispatch(
                              changeAmount({
                                type: "decriment",
                                id: product.id,
                              })
                            );
                          }
                        }}
                        disabled={product.amount == 0 ? true : false}
                        className="btn-sm"
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td>
                    <h1 className=" text-xl ">
                      {formatPrice(product.price * product.amount)}
                    </h1>
                  </td>

                  <th>
                    <button
                      onClick={() => dispatch(removeProduct(product.id))}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrash className=" w-5 h-5" />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th> </th>
              <th> </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Cart;
