import * as yup from 'yup'

const schema = yup
    .object({
        email: yup.string().email('Please enter a valid email').required('Email is a required field'),
        rules: yup.bool().oneOf([true], 'Rules not accepted'),
    })
    .required()

export type SchemaLogIn = yup.InferType<typeof schema>

export default schema
