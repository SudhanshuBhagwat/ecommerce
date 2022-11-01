import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

interface Props {
  menu: any;
  onSaleProducts: any;
}

export default function Home({ menu, onSaleProducts }: Props) {
  return (
    <Layout menu={menu}>
      <section>
        <div className="grid grid-cols-4 gap-8">
          {onSaleProducts.data.map((product: any) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="min-h-72 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                <Image
                  src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                  alt={product.attributes.title}
                  className="h-full w-full lg:h-full lg:w-full"
                  width={400}
                  height={600}
                />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{product.attributes.title}</h3>
                <span>{product.attributes.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  let data = await fetch(
    `http://localhost:1337/api/menus/1?nested&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const menu = await data.json();

  data = await fetch(
    `http://localhost:1337/api/products?filters[onSale][$eq]=true&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const onSaleProducts = await data.json();

  return {
    props: {
      menu,
      onSaleProducts,
    },
  };
}
