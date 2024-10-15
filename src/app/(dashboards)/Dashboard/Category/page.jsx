"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {  Image } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import AddCategory from "./AddCategory/page";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/Feature/Admin/category/category";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditCategory from "./EditCategory/page";
import DeleteModal from "@/components/Modal/DeleteModal";


const Category = () => {
const dispatch = useAppDispatch();
const { data, error, isLoading: categoryIsLoading } = useGetCategoryQuery();
const { isAddModalOpen, isEditModalOpen , isDeleteModalOpen } = useAppSelector((state) => state.modal);
const [selectedCategory, setSelectedCategory] = useState({});
const [deleteCategory ,  { isLoading: dCIsloading, isError, isSuccess, data: dCData, error:dError } ] = useDeleteCategoryMutation();

  const categoryData = data?.data?.map((category, index) => ({
    key: index,
    id: category.sysCategoryID,
    name: category.sysCategoryName,
    image: category.sysCategoryImage,
    desc: category.sysCategoryDesc,
  }));


  
  const handleEditCategory = (categoryData) => {
    setSelectedCategory(categoryData);
    dispatch(setIsEditModalOpen());
  };

  const handledl = (categoryData) => {
    setSelectedCategory(categoryData);
    dispatch(setIsDeleteModalOpen());
  };


  const handleDeleteCategory = () => {
       deleteCategory(selectedCategory?.id)
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Image alt="" height={50} width={50} src={record.image} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditCategory(record)}>
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


  return (
    <>     
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>

      <DashboardTable columns={columns} data={categoryData} loading={categoryIsLoading}/>
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Category">
        <AddCategory />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        <EditCategory selectedCategory= {selectedCategory}/>
      </EditModal>

{/* delete category */}
<DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Category"
        onDelete={handleDeleteCategory}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Under the category corresponding data will be removed "}
      ></DeleteModal>


    </>
  );
};

export default Category;
