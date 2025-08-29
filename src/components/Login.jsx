import { useContext } from 'react'
import UiContext from '../store/UIContext'
import { Modal } from './UI/Modal';
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";

export const Login = () => {
    const { showLoginModal, isLoginModalOpened } = useContext(UiContext);

    const handleLogin = () => {
        // Handle login logic
    };

    return (
        <Modal
            open={isLoginModalOpened}
            onClose={() => showLoginModal(false)}
        >
            <h2>Login</h2>
            <form
                onSubmit={handleLogin}
            >
                <div>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        required
                    />
                </div>
                <div>
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        required
                    />
                </div>

                <p className="modal-actions">
                    <Button
                        textOnly
                        onClick={() => showLoginModal(false)}
                    >Cancel</Button>
                    <Button
                        type="submit"
                    >Login</Button>
                </p>
            </form>
        </Modal>
    )
}
