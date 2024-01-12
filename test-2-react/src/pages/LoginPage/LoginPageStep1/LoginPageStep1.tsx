import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormCheckbox from '../../../components/FormCheckbox'
import FormInput from '../../../components/FormInput'
import schema, { SchemaLogIn } from '../../../utils/yup/schemaValidationLogIn'
import { useEffect, useMemo } from 'react'
import ButtonSubmit from '../../../components/ButtonSubmit'

export default function LoginPageStep1() {
    const {
        getValues,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SchemaLogIn>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: { email: sessionStorage.getItem('email') || '' },
    })

    const registerMemo = useMemo(() => register, [register])

    useEffect(() => {
        sessionStorage.setItem('email', !errors.email ? getValues().email : '');
      }, [errors.email, getValues().email])

    const onSubmit = ({ email }: SchemaLogIn) => {}

    return (
        <form className="flex flex-col grow" onSubmit={handleSubmit(onSubmit)}>
            <FormInput register={registerMemo} errors={errors.email} />
            <div className="p-1"></div>
            <FormCheckbox register={registerMemo} errors={errors.rules} />
            <ButtonSubmit isValid={isValid} />
        </form>
    )
}
