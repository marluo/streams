import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  /* DETTA KALLAS PÅ FÖRST AV ALLT */
  componentDidMount() {
    //callbackfunktion körs bara när gapi har loadats in!
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "83840272148-9a1ui36uldg5oh5rmrmppam36b8tir93.apps.googleusercontent.com",
          scope: "email"
          //returns a promise, therefore we use then
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //sparar auth instance i auth
          this.onAuthChange(this.auth.isSignedIn.get());
          //passar in i denna funktion när sidan laddas första gången för att veta om vi är inloggad eller ej.
          this.auth.isSignedIn.listen(this.onAuthChange);
          //Lyssnar på förändringar i våran inloggningstate och kallar på onAuthChange om den ändras.
        });
    });
  }

  onAuthChange = isSignedIn => {
    //Funktion för att kolla om vi är inloggade eller ej. Kallar på actions som returnerar true eller false i redux store beroende
    //på om vi är inloggade eller inte som passas in som ett argument.
    //Detta görs för att kunna displaya på hemsidan som "inloggad" eller inte och den gör detta genom att kolla på state.
    if (isSignedIn) {
      const id = this.auth.currentUser.get().getId();
      this.props.signIn(id);
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    console.log();
    //kallar på gapi instance för att logga in. Detta kallar direkt på gapi.
    this.auth.signIn();
  };

  onSignOutClick = () => {
    //kallar på gapi instance för att logga in,
    this.auth.signOut();
  };

  renderAuthButton() {
    //Visar bara om vi är inloggade eller inte. Knapparna kallar direkt på auth, som sedan anropar en funktion som sparar vår
    //inloggningsstate i redux store.
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    id: state.auth.userId
    //hämtar ut värdet som kommer från reducer
  };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
