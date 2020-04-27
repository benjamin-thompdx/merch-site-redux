import React from 'react';
import NewItemForm from './NewItemForm.js';
import ItemList from './ItemList.js';
import ItemDetail from './ItemDetail';
import EditItemForm from './EditItemForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ItemControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedItem: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedItem !== null) {
      this.setState({
        formVisibleOnPage: false,
        selectedItem: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingItemInList = (itemToEdit) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity } = itemToEdit;
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: quantity
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedItem: null
    });
  }

  handleItemPurchase = (id) => {
    const currentlySelectedItem = this.state.masterItemList.filter(item => item.id === id)[0];
    const newQuantityOfItem = currentlySelectedItem.quantity - 1;
    const updatedItem = {...currentlySelectedItem, quantity: newQuantityOfItem};
    const previousItemList = this.state.masterItemList.filter(item => item.id !== id);
    this.setState({
      masterItemList: [...previousItemList, updatedItem],
      selectedItem: updatedItem
    });
  }

  handleItemRestock = (id) => {
    const currentlySelectedItem = this.state.masterItemList.filter(item => item.id === id)[0];
    const newQuantityOfItem = currentlySelectedItem.quantity + 10;
    const updatedItem = {...currentlySelectedItem, quantity: newQuantityOfItem};
    const previousItemList = this.state.masterItemList.filter(item => item.id !== id);
    this.setState({
      masterItemList: [...previousItemList, updatedItem],
      selectedItem: updatedItem
    });
  }

  handleDeletingItem = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_ITEM',
      id: id
    }
    dispatch(action);
    this.setState({
      selectedItem: null
    });
  }

  handleChangingSelectedItem = (id) => {
    const selectedItem = this.props.masterItemList[id];
    this.setState({selectedItem: selectedItem}); 
  }

  handleAddingNewItemToList = (newItem) => {
    const {dispatch } = this.props;
    const { name, description, quantity, id } = (newItem);
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: quantity
    }
    dispatch(action);
    this.setState({ formVisibleOnPage: false});
  }

  render(){

    const itemControlStyles = {
      position: 'relative',
      top: '30vh',
      margin: '2%',
      overflowY: 'auto'
    }

    let currentlyVisibleState = null;
    let buttonText = null;
    
    if (this.state.editing) {
      currentlyVisibleState = <EditItemForm 
        item = {this.state.selectedItem}
        onEditItem = {this.handleEditingItemInList} />
      buttonText = "return to items";
    } else if (this.state.selectedItem != null) {
      currentlyVisibleState = <ItemDetail 
        item = {this.state.selectedItem} 
        onClickingDelete = {this.handleDeletingItem}
        onClickingEdit = {this.handleEditClick} />
      buttonText = "return to items";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewItemForm 
        onNewItemCreation={this.handleAddingNewItemToList}/>
      buttonText = "return to items";
    } else {
      currentlyVisibleState = <ItemList 
        itemList={this.props.masterItemList} 
        onItemSelection={this.handleChangingSelectedItem}
        onClickingBuy={this.handleItemPurchase}
        onClickingRestock={this.handleItemRestock} />
      buttonText = "+";
    }

    return (
      <React.Fragment>
        <div style={itemControlStyles}>
          <div className="adjustableButton">
            <button onClick={this.handleClick}>{buttonText}</button>
          </div>
          <div className="storeFront">
            {currentlyVisibleState}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


ItemControl.propTypes = {
  masterItemList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterItemList: state
  }
}

ItemControl = connect(mapStateToProps)(ItemControl);

export default ItemControl;