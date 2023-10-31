import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCityData } from "components/api/fetch";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { stepTwoSubmit } from "store/features/register/registerSlice";
import { useAppDispatch } from "store/hooks";
import { z } from "zod";

const stepTwoValidation = z.object({
    city: z.string().optional(),
});
type stepTwoValidationType = z.infer<typeof stepTwoValidation>;
const StepTwo = () => {
    const { mutateAsync } = useMutation(fetchCityData);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<stepTwoValidationType>({
        resolver: zodResolver(stepTwoValidation),
    });

    const dispach = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<stepTwoValidationType> = (data) => {
        dispach(stepTwoSubmit({ ...data }));
        navigate("/register/3");
    };

    const handleChange = (
        selectedOptions: SingleValue<{ value: string; label: string }>
    ) => {
        register("city", { value: selectedOptions?.label });
    };

    const promiseOptions = async (inputValue: string) => {
        const res = await mutateAsync(inputValue);

        if (!res?.length) return [];
        return res.map((item) => {
            return {
                value: item.name,
                label: item.name,
            };
        });
    };

    return (
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4 text-center">Register</h2>
            <div className="progress  my-3" style={{ height: "2px" }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "66.6%" }}
                    aria-valuemin={0}
                    aria-valuenow={66.6}
                    aria-valuemax={100}
                ></div>
            </div>
            <div className="w-75 my-4">
                <AsyncSelect
                    loadOptions={promiseOptions}
                    onChange={handleChange}
                    cacheOptions
                    placeholder={"Input home city"}
                />
            </div>
            <div className="w-100 d-flex justify-content-between">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/register/1");
                    }}
                    className="btn btn-danger"
                    type="button"
                >
                    Previous
                </button>
                <button className="btn btn-primary" type="submit">
                    Next
                </button>
            </div>
        </form>
    );
};
export default StepTwo;
