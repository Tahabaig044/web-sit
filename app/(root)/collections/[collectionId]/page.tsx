import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

interface ProductType {
  _id: string;
  title: string;
  name?: string; // Optional since you're mapping `title` to `name`
  category: string;
  price: number;
  expense?: number; // Optional for fallback
  media: string[];
}

interface CollectionDetailsType {
  image: string;
  title: string;
  description: string;
  products: ProductType[];
}

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  try {
    const collectionDetails: CollectionDetailsType | null = await getCollectionDetails(
      params.collectionId
    );

    if (!collectionDetails) {
      return (
        <div className="text-body-normal text-grey-2">
          Collection details not found.
        </div>
      );
    }

    return (
      <div className="px-10 py-5 flex flex-col items-center gap-8">
        <Image
          src={collectionDetails.image}
          width={1500}
          height={1000}
          alt="collection"
          className="w-full h-[400px] object-cover rounded-xl"
        />
        <p className="text-heading3-bold text-grey-2">
          {collectionDetails.title}
        </p>
        <p className="text-body-normal text-grey-2 text-center max-w-[900px]">
          {collectionDetails.description}
        </p>
        <div className="flex flex-wrap gap-16 justify-center">
          {collectionDetails.products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                name: product.title, // Map `title` to `name`
                expense: product.expense || 0, // Fallback for `expense`
              }}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-body-normal text-red-500">
        Failed to load collection details. Please try again later.
      </div>
    );
  }
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
