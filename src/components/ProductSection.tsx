import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
    title: string;
    data: any;
}

const ProductSection: React.FC<React.PropsWithChildren<Props> & Props> = ({
    title,
    data,
}) => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="grid grid-cols-4 gap-8 mt-4">
                {data.map((product: any) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                            <Image
                                src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                                alt={product.attributes.title}
                                className="h-full w-full object-cover object-center"
                                width={156}
                                height={156}
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <h3 className="text-sm text-gray-700">
                                {product.attributes.title}
                            </h3>
                            <p className="text-sm font-medium text-gray-900">
                                ${product.attributes.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
