import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import ProductSection from "../components/ProductSection";

interface Props {
  menu: any;
  onSaleProducts: any;
  frontCategory: any;
}

export default function Home({ menu, onSaleProducts, frontCategory }: Props) {
  return (
    <Layout menu={menu}>
      <div className="h-[26rem] w-full bg-slate-400"></div>
      <div className="lg:px-8 lg:py-4">
        <ProductSection title="On Sale" data={onSaleProducts.data} />
        <ProductSection title="Front-End Category" data={frontCategory.data} />
      </div>
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

  data = await fetch(
    `http://localhost:1337/api/products?filters[categories][name][$eq]=Front&populate=*&pagination[page]=1&pagination[pageSize]=4`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const frontCategory = await data.json();

  return {
    props: {
      menu,
      onSaleProducts,
      frontCategory
    },
  };
}
