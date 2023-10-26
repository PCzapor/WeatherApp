import { zodResolver } from "@hookform/resolvers/zod";
import {
    SubmitHandler,
    useForm,
    FieldError,
    UseFormRegister,
    Path,
} from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stepOneSubmit } from "store/features/register/stepOneSlice";
import { z } from "zod";

type stepOneValidationType = z.infer<typeof stepOneValidation>;

type InputProps = {
    name:"username"|"password"|"confirmPassword" ;
    label: Path<stepOneValidationType>;
    register: UseFormRegister<stepOneValidationType>;
    required: boolean;
    placeholder: "username"|"password"|"Confirm Password";
    error: FieldError ;
};
const stepOneValidation = z
    .object({
        username: z.string().min(5, "min lenght 5"),
        password: z
            .string()
            .min(8, "password lenght must be at least 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "password lenght must be at least 8 characters"),
    })

    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

function Input<T>(props:{
    name,
    register,
    label,
    required,
    placeholder,
    error,
}: T):T {
    return (
        <div className="form-group d-flex flex-column">
            <label></label>
            <input
                {...register(name, { required: `${name} is required` })}
                autoFocus={autoFocus}
                placeholder={placeholder}
                className={`${error && "border-danger"}`}
            />
            {error && <span>{error?.message}</span>}
        </div>
    );
}

const StepOne = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<stepOneValidationType>({
        resolver: zodResolver(stepOneValidation),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<stepOneValidationType> = (data) => {
        console.log(data);
        dispatch(stepOneSubmit({ ...data }));
        navigate("/register/2");
    };

    return (
        <form className="col-md-6 w-50" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4 text-center">Register</h2>
            <div className="progress my-3 " style={{ height: "2px" }}>
                <div
                    className="progress-bar "
                    role="progressbar"
                    style={{ width: "33.3%" }}
                    aria-valuemin={0}
                    aria-valuenow={25}
                    aria-valuemax={100}
                ></div>
            </div>
            <Input<InputProps>
                name="username"
                label={[
                    "username",
                    "password", 
                    "confirmPassword",
                ]}
                register={register}
                required
                placeholder={"Username"}
                error={errors.username}
                />
            <Input<InputProps>
                name="password"
                label={["username","password", "confirmPassword",]}
                register={register}
                required
                placeholder={"Password"}
                error={errors.password}
                />
            <Input<InputProps>
                name="confirmPassword"
                label={["username","password", "confirmPassword",]}
                register={register}
                required
                placeholder={"Confirm Password"}
                error={errors.confirmPassword}
                />
            {/* <Input
                name="username"
                label="Username"
                register={register}
                required
                placeholder={"Username"}
                error={errors.username}
            />
            <Input
                name="password"
                label="Password"
                register={register}
                required
                placeholder={"Password"}
                error={errors.password}
            />
            <Input
                name="confirmPassword"
                label="Confirm Password"
                register={register}
                required
                placeholder={"Confirm Password"}
                error={errors.confirmPassword}
            /> */}
            <div className="w-100 d-flex justify-content-end">
                <button
                    type="submit"
                    className={`btn btn-primary`}
                    disabled={
                        errors.confirmPassword ||
                        errors.password ||
                        errors.username
                            ? true
                            : false
                    }
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default StepOne;
