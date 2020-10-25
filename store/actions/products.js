export const DELETE_FOR_USER = "DELETE_FOR_USER";
export const CREATE_NEW_ITEM = "CREATE_NEW_ITEM";
export const EDIT_EXISTING_ITEM = "EDIT_EXISTING_ITEM";

export const DeleteUserProduct = (product) => {
  return {
    type: DELETE_FOR_USER,
    payload: {
      itemId: product,
    },
  };
};

export const CreateNewProduct = (id, title, description, imageUrl, price) => {
  return {
    type: CREATE_NEW_ITEM,
    payload: {
      id,
      title,
      description,
      imageUrl,
      price,
    },
  };
};
export const EditNewProduct = (id, title, description, imageUrl, price) => {
  return {
    type: EDIT_EXISTING_ITEM,
    payload: {
      id,
      title,
      description,
      imageUrl,
      price,
    },
  };
};
