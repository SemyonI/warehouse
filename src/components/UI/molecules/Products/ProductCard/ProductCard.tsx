import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Delete } from 'src/assets/delete.svg';
import { ReactComponent as Edit } from 'src/assets/edit.svg';

import { editProduct, RootState } from 'src/store';

import { Modal } from 'src/components/UI/atoms/Modal';
import { ModalButton } from 'src/components/UI/atoms/ModalButton';
import { LargeText, Text } from 'src/components/UI/atoms/typography/styledComponents';
import { ProductDeleteWarning } from 'src/components/UI/molecules/Products/ProductDeleteWarning';
import { ProductEditForm } from 'src/components/UI/molecules/Products/ProductEditForm';

import {
  DeleteProduct,
  DeleteProductText,
  ProductCardWrapper,
  ProductWarehouse,
  WarehousesWrapper,
} from './styledComponents';

export const ProductCard: FC = () => {
  const dispatch = useDispatch();

  const currentProduct = useSelector((state: RootState) => state.reducer.currentProduct);

  const [isEdit, setIsEdit] = useState(false);
  const [isOpenWarning, setIsOpenWarning] = useState(false);

  if (isEdit) {
    return (
      <>
        <ProductEditForm />
        <ModalButton
          text="Сохранить"
          onClick={() => {
            if (currentProduct) {
              dispatch(editProduct({ product: currentProduct }));
            }
            setIsEdit(false);
          }}
        />
      </>
    );
  }
  return (
    currentProduct && (
      <>
        <ProductCardWrapper>
          <LargeText>{currentProduct?.name}</LargeText>
          <Text>Общее количество: {currentProduct?.amount || 0} шт</Text>
          {!!currentProduct?.warehouses.length && (
            <WarehousesWrapper>
              <Text>Скады, на которых храниться продукция</Text>
              {currentProduct?.warehouses?.map?.((warehouse) => (
                <ProductWarehouse key={warehouse.id}>
                  <Text>
                    {warehouse.name} - {warehouse.amount} шт
                  </Text>
                </ProductWarehouse>
              ))}
            </WarehousesWrapper>
          )}
          <Text>Незарезервированная продукция: {currentProduct?.undistributedProduction || 0} шт</Text>
        </ProductCardWrapper>
        <ModalButton text="Редактировать" onClick={() => setIsEdit(true)}>
          <Edit width="20px" />
        </ModalButton>
        <DeleteProduct onClick={() => setIsOpenWarning(true)}>
          <DeleteProductText>Удалить</DeleteProductText>
          <Delete width="30px" height="30px" />
        </DeleteProduct>
        <Modal isOpen={isOpenWarning} onClose={() => setIsOpenWarning(false)}>
          <ProductDeleteWarning onClose={() => setIsOpenWarning(false)} />
        </Modal>
      </>
    )
  );
};
