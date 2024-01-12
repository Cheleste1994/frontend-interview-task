import { memo } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { SchemaLogIn } from '../utils/yup/schemaValidationLogIn'

type PropsFormInput = {
    register: UseFormRegister<SchemaLogIn>
    errors?: FieldError,
}

export default memo(function FormInput({ register, errors }: PropsFormInput) {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input placeholder="Type here" className="input" {...register('email')} />
            {errors && (
                <div className="label">
                    <span className="label-text-alt text-red-600">{errors.message}</span>
                </div>
            )}
        </label>
    )
})
