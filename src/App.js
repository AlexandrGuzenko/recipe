import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Panel  } from 'react-bootstrap';
import { PanelGroup  } from 'react-bootstrap';
import { ListGroup,ListGroupItem  } from 'react-bootstrap';
import { Modal  } from 'react-bootstrap';
import { FormControl  } from 'react-bootstrap';
import './App.css';
var recipesBook = (typeof localStorage["recipeBook"] !== "undefined") ? JSON.parse(localStorage["recipeBook"]) : [
  {name: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]}, 
  {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]}, 
  {name: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]}
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      resipes: [],
      show:false,
      showEdit:false,
      valueName: "",
      valueIngridients: "",
      editing: ""
    }
    this.state.recipes  = recipesBook;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeIngridients = this.handleChangeIngridients.bind(this);
    this.delete = this.delete.bind(this);
    this.addNewRecipe = this.addNewRecipe.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleCloseEdit() {
    this.setState({ showEdit: false,valueName: "", valueIngridients: ""});
  }
  handleShowEdit(name,ingr) {
    this.setState({ showEdit: true,valueName: name,valueIngridients: ingr, editing:name });
  }

  handleChangeName(e){
    this.setState({ valueName: e.target.value });
  }

  handleChangeIngridients(e){
    this.setState({ valueIngridients: e.target.value });
  }

  delete(name){
    let recipes = [];
    recipes = this.state.recipes.filter((obj) => obj.name !== name);
    localStorage.setItem("recipeBook",JSON.stringify(recipes));
    this.setState({recipes});

  }

  addNewRecipe(){
    let recipes = this.state.recipes;
    recipes.push({name:this.state.valueName, ingredients:this.state.valueIngridients.split(',')});
    localStorage.setItem("recipeBook",JSON.stringify(recipes));
    this.setState({recipes});
    this.handleClose();
    this.setState({valueName: "",valueIngridients: ""});

  }

  editRecipe(name,ingr){
    let recipes = this.state.recipes;
    let index = 0;
    for (let i=0; i<recipes.length;i++){
      if(recipes[i].name === this.state.editing){
        index = i;
      }
    }
    recipes[index] = {name,ingredients: ingr.split(',')}
    this.setState({recipes});
    this.handleCloseEdit();
  }

  render() {
    return (
      <div className="App container">
      <h1> Recipe Box App </h1>
<PanelGroup className="box" accordion id="accordion-example">
 { this.state.recipes.map((recipe,index) =>
    <Panel bsStyle="success" eventKey={index} key={index}>
    <Panel.Heading>
      <Panel.Title toggle>{recipe.name}</Panel.Title>
    </Panel.Heading>
    <Panel.Body collapsible>
    <ListGroup>
    <h2 className="center">Ingridients</h2> <hr/>
      {recipe.ingredients.map((ingrid,ingInd) =>
        <ListGroupItem key={index*100 + ingrid}>{ingrid}</ListGroupItem>
      )}
      </ListGroup>
      <Button bsStyle="danger" className="left" onClick={()=> this.delete(recipe.name)}>Delete</Button>
      <Button bsStyle="primary" className="left" onClick={()=>this.handleShowEdit(recipe.name, recipe.ingredients)}>Edit</Button>
    </Panel.Body>
  </Panel>
  )}
</PanelGroup>
<Button bsStyle="primary" className="left" onClick={this.handleShow}>Add new reciepe</Button>



<Modal show={this.state.showEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title className="center">Edit a recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Recipe name</h4>
            <FormControl
              type="text"
              value={this.state.valueName}
              placeholder="Enter recipe name"
              onChange={this.handleChangeName}
            />
            <h4>Ingridients</h4>
            <FormControl
             componentClass="textarea"
             value={this.state.valueIngridients}
             placeholder="Enter ingredients, separated by commas (,)"
             onChange={this.handleChangeIngridients}
             />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={()=>this.editRecipe(this.state.valueName,this.state.valueIngridients)}>Edit</Button>
            <Button onClick={this.handleCloseEdit}>Close</Button>
          </Modal.Footer>
        </Modal>




<Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="center">Add a recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Recipe name</h4>
            <FormControl
              type="text"
              value={this.state.valueName}
              placeholder="Enter recipe name"
              onChange={this.handleChangeName}
            />
            <h4>Ingridients</h4>
            <FormControl
             componentClass="textarea"
             value={this.state.valueIngridients}
             placeholder="Enter ingredients, separated by commas (,)"
             onChange={this.handleChangeIngridients}
             />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.addNewRecipe}>Add Recipe</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

export default App;
