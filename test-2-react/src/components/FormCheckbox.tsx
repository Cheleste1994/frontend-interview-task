import { memo } from 'react'
import { UseFormRegister, FieldError } from 'react-hook-form'
import { SchemaLogIn } from '../utils/yup/schemaValidationLogIn'

type PropsFormInput = {
    register: UseFormRegister<SchemaLogIn>
    errors?: FieldError
}

export default memo(function FormCheckbox({ register, errors }: PropsFormInput) {
  return (
      <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" {...register('rules')} />
              <span className="label-text">I agree</span>
              {errors && <span className="label-text-alt text-red-600">{errors.message}</span>}
          </label>
      </div>
  )
});
