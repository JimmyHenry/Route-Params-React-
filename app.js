var mountNode = document.getElementById('mountNode');

// router declaration//
var
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute,
    Link = ReactRouter.Link,
    RouteHandler = ReactRouter.RouteHandler,
    IndexRoute = ReactRouter.IndexRoute
  ;


class AddComponent extends React.Component {
  constructor() {
    super();
    this.state = {task: ""};
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update() {
    this.setState({task: this.input.value});
  }
  submit(e){
    e.preventDefault();
    this.props.onSubmit({ task: this.props.name + ''+ this.input.value});
    this.input.value='';
  }

  render() {
    return (
        <form onSubmit={this.submit}>
          <h2> Assigner une tâche :</h2>
          <input ref={(input) => this.input = input} onChange = {this.update} placeholder="doit faire..."/>
          <button> Ajouter </button>
        </form>
    );
  }
}
// ce que fais le component...
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = MainComponent.getData();
    this.changeName = this.changeName.bind(this);
    this.addItem = this.addItem.bind(this);
    console.log(props);
  }

  static getData(){
    return {
            actual: "Julien",
            users:[
              "Julien ","Tommy ","Gladys ", "Fabrice "
            ],
            items:[]
          };
  }
  changeName(key) {
    this.setState({actual:this.state.users[key]});
  }
  addItem(item){
    this.setState({items: this.state.items.concat([item])});
  }

  render() {
    return (
      <div>
                <MenuComponent/>
        <h1
          style={{color: this.props.color ? this.props.color : 'red'}}
          onClick={this.changeName}
          ref={(title) => this.title = title}
        >
        Tâches pour {this.state.actual}!
        </h1>

        <h2> Choisir un membre : </h2>
        <ul>
        {this.state.users.map((user, i) =>{
          var change = this.changeName.bind(this, i);
          return <li key={user} onClick={change}>{user}</li>
        })}
        </ul>
        <h2 className={this.state.items.length ? '': 'hidden'}>Tâches :</h2>

        <ul>
        {this.state.items.map((item, i)=>{
          return <li key={i}> {item.task}</li>
        })}</ul>
        <AddComponent  onSubmit={this.addItem} name={this.state.actual} />
      </div>
    );
  }
}
// ce que fais le component...

class UsersComponent extends React.Component{
// ce que fais le component...
  render(){
    return(
      <div>
        <MenuComponent/>
        <h1> Utilisateurs</h1>
        <p>
          lorem ipsum llolaoaaooa
        </p>
      </div>
    )
  }
}

class UserComponent extends React.Component{
// ce que fais le component...
  constructor(props){
    super(props);

    this.getTasks = props.location.query.getTasks;
    this.name= props.routeParams.name;
    console.log(this.getTasks);
  }
  render(){
    return(
      <div>
        <MenuComponent/>
        <h1> Utilisateur</h1>
        <p>
          {this.name}
        </p>
      </div>
    )
  }
}

class MenuComponent extends React.Component{
  render(){
    return(
      <div>
          <ul>
            <li>
              <Link to={'/'} activeClassName="active">Home</Link>
            </li>
            <li>
              <Link to={'/users'} activeClassName="active">Users</Link>
            </li>
            <li>
              <Link to={{pathname: '/users/user', query:{getTasks:false}}} activeClassName="active"> One Users</Link>
            </li>
          </ul>
      </div>
    )
  }
}
MainComponent.defaultProps = {color:'dodgerblue'};
MainComponent.propTypes = {
  color : React.PropTypes.string.isRequired
}
let MainComponentElement = React.createElement(MainComponent);
ReactDOM.render((
      <Router>
        <Route path="/" component={MainComponent}/>
        <Route path="users">
          <IndexRoute component={UsersComponent}/>
          <Route path=":name" component={UserComponent}/>
        </Route>
      </Router>
), mountNode);
