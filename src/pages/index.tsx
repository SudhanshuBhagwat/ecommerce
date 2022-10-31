import Layout from "../components/Layout";

export default function Home({ menu }: { menu: any }) {
  return <Layout menu={menu}>Hello</Layout>;
}

export async function getStaticProps() {
  const data = await fetch(`http://localhost:1337/api/menus/1?nested&populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
    }
  })
  const menu = await data.json();

  return {
    props: {
      menu
    }
  }
}