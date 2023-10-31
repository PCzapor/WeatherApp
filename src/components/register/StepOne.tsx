import { zodResolver } from "@hookform/resolvers/zod";
import {
    FieldError,
    Path,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { stepOneSubmit } from "store/features/register/registerSlice";
import { useAppDispatch } from "store/hooks";
import { z } from "zod";

type InputProps = {
    name: Path<stepOneValidationType>;
    label: "username" | "password" | "Confirm password";
    register: UseFormRegister<stepOneValidationType>;
    required: boolean;
    placeholder: "username" | "password" | "Confirm Password";
    error: FieldError | undefined;
    autoFocus?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
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
type stepOneValidationType = z.infer<typeof stepOneValidation>;

function Input<T extends InputProps>({
    name,
    register,
    label,
    required,
    placeholder,
    error,
    autoFocus,
}: T) {
    return (
        <div className="form-group d-flex flex-column">
            <label>{label}</label>
            <input
                {...register(name)}
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<stepOneValidationType> = (data) => {
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
            <Input
                name="username"
                label="username"
                register={register}
                required
                placeholder="username"
                error={errors.username}
            />
            <Input
                name="password"
                label="password"
                register={register}
                required
                placeholder="password"
                error={errors.password}
            />
            <Input
                name="confirmPassword"
                label="Confirm password"
                register={register}
                required
                placeholder="Confirm Password"
                error={errors.confirmPassword}
            />
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
