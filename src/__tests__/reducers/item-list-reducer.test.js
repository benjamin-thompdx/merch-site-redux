import itemListReducer from '../../reducers/item-list-reducer';

describe('itemListReducer', () => {

  let action;
  
  const currentState = {
    1: {name: 'The Swag Bag',
      description: 'a bag to hold all of your swag.',
      quantity: 15,
      id: 1},
    2: {name: 'Glass  Water Bottle',
    description: 'a fancy way to carry liquids.',
    quantity: 15,
    id: 2},
  }
  
  const itemData = {
    name: 'jacket',
    description: 'warm and fuzzy',
    quantity: '5',
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(itemListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new item data to masterItemList', () => {
    const { name, description, quantity, id } = itemData;
    action = {
      type: 'ADD_ITEM',
      name: name,
      description: description,
      quantity: quantity,
      id: id
    };
    expect(itemListReducer({}, action)).toEqual({
      [id] : {
        name: name,
        description: description,
        quantity: quantity,
        id: id
      }
    });
  });

  test('Should succesfully delete an item', () => {
    action = {
      type: 'DELETE_ITEM',
      id: 1
    };
    expect(itemListReducer(currentState, action)).toEqual({
      2: {name: 'Glass  Water Bottle',
      description: 'a fancy way to carry liquids.',
      quantity: 15,
      id: 2}
    });
  });
});


