import React from "react";
import { auth } from "../utils/firebaseUtils";
import AuthUserContext from "./AuthUserContext";

const withAuthentication = Component => {
    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser: authUser })
                    : this.setState({ authUser: null });
            });
        }

        render() {
            const { authUser } = this.state;

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }

    return WithAuthentication;
};

export default withAuthentication;
