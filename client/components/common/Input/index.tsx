import { ErrorMessage, Field, FieldAttributes, useField } from "formik";
import { FC } from "react";

const InputField: FC<FieldAttributes<any>> = ({
    name,
    label = "",
    ...rest
}) => {
    const [field, meta, helpers] = useField(name);
    return (
        <div className={`${meta.error ? "" : "mb-2"}`}>
            <label htmlFor={name} className={"pl-1 text-sm text-gray-500"}>
                {label}
            </label>
            <Field
                className={`px-4 py-2 w-full rounded-lg shadow-sm ${
                    meta.touched &&
                    (meta.error
                        ? "border-2 border-red-300"
                        : "border-2 border-green-300")
                } focus:outline-none`}
                name={name}
                id={name}
                {...rest}
            />
            <ErrorMessage
                name={name}
                component="p"
                className="text-xs text-right text-red-400"
            />
        </div>
    );
};

export default InputField;
