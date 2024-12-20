import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";
interface ProductType {
  _id: string;
  name: any;
  price: number;
  image: string;
  quantity?: number; // Optional quantity field
  title: string;
   category:string;
    expense:number;
     media:any;
}

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
