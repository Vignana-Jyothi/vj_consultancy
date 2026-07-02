import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Card, Modal, Button } from "react-bootstrap";
function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSuccess = async (credentialResponse) => {

        try {

            await login(credentialResponse);

            navigate("/dashboard");

        } catch (error) {

            setErrorMessage(
                error.response?.data?.error || "Something went wrong."
            );

            setShowError(true);

        }

    };

    return (

        <>
            <Container
                className="d-flex justify-content-center align-items-center vh-100"
            >
                <Card className="p-4 text-center">

                    <h3>VJ Consultancy</h3>

                    <p>Continue with Google</p>

                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.log("Login Failed")}
                    />

                </Card>
            </Container>

            {/* Error Modal */}
            <Modal
                show={showError}
                onHide={() => setShowError(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Authorization Error
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={() => setShowError(false)}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );

}



export default Login;