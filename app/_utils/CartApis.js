import axiosClient from "./axiosClient";

const addToCart = ( payload ) => axiosClient.post( '/carts', payload )

export default { addToCart }