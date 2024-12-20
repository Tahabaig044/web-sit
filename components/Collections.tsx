import { getCollections } from "@/lib/actions/actions";
// import { Filter } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
// import Filter from "./Filter";

const Collections = async () => {
  const collections = await getCollections();
// console.log(collections)
  return (
    <div>
      {/* <Filter/> */}
      <h1 className="text-center mt-10 text-heading1-bold">Collections</h1>
    <div className="px-6 py-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-6 md:gap-10">
      {collections.map((collection: CollectionType) => (
          <Link
            href={`/collections/${collection._id}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 hover:scale-105 transition-transform duration-200"
            key={collection._id}
          >
            <div className="relative  w-full h-36   overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.title}
                // width={200}
                // height={250}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-4 text-lg font-medium text-gray-800 text-center tracking-wide">
              {collection.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Collections;


// import { getCollections } from "@/lib/actions/actions";
// import Image from "next/image";
// import Link from "next/link";

// const Collections = async () => {
//   const collections = await getCollections();

//   return (
//     <div className="px-6 py-8 overflow-x-auto scrollbar-hide bg-gray-50">
//       <p className="text-heading1-bold">Collections</p>
//       {!collections || collections.length === 0 ? (
//         <p className="text-body-bold">No collections found</p>
//       ) : (
//         <div className="flex flex-wrap items-center justify-center gap-8">
//           {collections.map((collection: CollectionType) => (
//             <Link href={`/collections/${collection._id}`} key={collection._id}>
//               <Image
//                 key={collection._id}
//                 src={collection.image}
//                 alt={collection.title}
//                 width={350}
//                 height={200}
//                 className="rounded-lg cursor-pointer"
//               />
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Collections;
