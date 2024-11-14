import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    userName: '',
    email: '',
    password: ''
}

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();

    console.log(formData);

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message,
                })
                navigate('/auth/login')
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive"
                })
            }

        });
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>

                <p>Already have an Account?
                    <Link className="ml-2 font-medium text-primary hover:underline" to="/auth/login">Login</Link>
                </p>


            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            >
            </CommonForm>
        </div>
    );
}

export default AuthRegister;