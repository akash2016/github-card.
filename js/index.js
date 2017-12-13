var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function Card(props) {
  return React.createElement(
    'div',
    { style: { margin: '1 em' } },
    React.createElement('img', { width: '75', src: props.avatar_url }),
    React.createElement(
      'div',
      { style: { display: 'inline-block', marginLeft: 10 } },
      React.createElement(
        'div',
        { style: { fontSize: '1.25 em', fontWeight: 'bold' } },
        props.name,
        ' '
      ),
      React.createElement(
        'div',
        null,
        props.company,
        ' '
      )
    )
  );
};

var CardList = function CardList(props) {
  return React.createElement(
    'div',
    null,
    props.cards.map(function (card) {
      return React.createElement(Card, card);
    })
  );
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.state = { userName: '' }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      console.log("Form Submit", this.state.userName);
      axios.get('https://api.github.com/users/' + this.state.userName).then(function (resp) {
        _this2.props.onSubmit(resp.data);
        _this2.setState({ userName: '' });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit.bind(this) },
        React.createElement('input', { type: 'text', value: this.state.userName, onChange: function onChange(event) {
            return _this3.setState({ userName: event.target.value });
          }, placeholder: 'GitHub Username', required: true }),
        React.createElement(
          'button',
          { type: 'submit' },
          'Add Card '
        )
      );
    }
  }]);

  return Form;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this4.state = {
      cards: []
    };return _this4;
  }

  _createClass(App, [{
    key: 'addNewCard',
    value: function addNewCard(cardInfo) {
      this.setState(function (prevState) {
        return {
          cards: prevState.cards.concat(cardInfo)
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Form, { onSubmit: this.addNewCard.bind(this) }),
        React.createElement(CardList, { cards: this.state.cards })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));