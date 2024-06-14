import axiosClient from "./axiosClient";

const getLatestProducts = () => axiosClient.get( "/product-amen-tests?populate=*" );
const getProductById = (id) => axiosClient.get( `/product-amen-tests/${id}?populate=*`);

const getProductsByCategory = (category) => axiosClient.get( `/product-amen-tests?filters[category][$eq]=${category}&populate=*`);
export default { getLatestProducts, getProductById, getProductsByCategory }