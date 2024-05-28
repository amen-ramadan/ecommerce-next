import axiosClient from "./axiosClient";

const getLatestProducts = () => axiosClient.get( "/products" );

export default { getLatestProducts }