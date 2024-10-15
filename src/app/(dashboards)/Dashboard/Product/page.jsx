"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Image, Modal, Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteProductMutation, useGetProductsQuery } from "@/redux/Feature/Admin/product/productApi";
import EditProduct from "./EditProduct/page";

const Product = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProductsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedProduct, setSelectedProduct] = useState({});
  const [deleteProduct, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError }] = useDeleteProductMutation();
  console.log(data)

  const productData = data?.data?.map((product, index) => {
    const {
      productID,
      erpCategoryID,
      productTitle,
      subtitle,
      description,
      sku,
      brandID,
      businessID,
      isActive,
    } = product;

    return {
      key: index,
      productID,
      productTitle,
      erpCategoryID,
      brandID,
      businessID,
      subtitle,
      description,
      sku,
      isActive: isActive ? "Active" : "Inactive",
    };
  });
  // console.log(productData);
  const handledl = (productData) => {
    setSelectedProduct(productData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteProduct = () => {
    deleteProduct(selectedProduct?.productID);
  };

  const handleEditProduct = (productData) => {
    setSelectedProduct(productData);
    dispatch(setIsEditModalOpen());
  };

  // Define table columns
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "productID",
    //   key: "productID",
    // },
    {
      title: "Title",
      dataIndex: "productTitle",
      key: "productTitle",
    },
    // {
    //   title: "Subtitle",
    //   dataIndex: "subtitle",
    //   key: "subtitle",
    // },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    // {
    //   title: "Category",
    //   dataIndex: "erpCategoryID",
    //   key: "erpCategoryID",
    // },
    // {
    //   title: "Brand",
    //   dataIndex: "brandID",
    //   key: "brandID",
    // },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> // Display status with color
      ),
    },,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditProduct(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handledl(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  if (error) return <p>Error loading products</p>;

  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Product" path={"/Dashboard/Product/AddProduct"} />
      </div>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Product">
        <EditProduct selectedProduct={selectedProduct} />
      </EditModal>

      {/* Product Table */}
      <DashboardTable columns={columns} data={productData} loading={isLoading} />

      {/* Delete Modal */}
      <DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Product"
        onDelete={handleDeleteProduct}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this product will remove all corresponding data."}
      />
    </>
  );
};

export default Product;
