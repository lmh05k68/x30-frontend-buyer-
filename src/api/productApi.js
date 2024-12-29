import axiosInstance from "../utils/axios";

const PRODUCT_APIS = {
  BUYER_GET_PRODUCT_GROUPS: "/api/v1/buyer/product-groups",
  BUYER_GET_PRODUCT_GROUP: (id) => "/api/v1/buyer/product-groups/" + id,
};

export const getProductGroups = async (query = {}) => {
  const { data } = await axiosInstance.get(
    PRODUCT_APIS.BUYER_GET_PRODUCT_GROUPS,
    {
      params: query,
    }
  );

  return data;
};

export const getProductGroup = async (id) => {
  const { data } = await axiosInstance.get(
    PRODUCT_APIS.BUYER_GET_PRODUCT_GROUP(id)
  );
  return data;
};
