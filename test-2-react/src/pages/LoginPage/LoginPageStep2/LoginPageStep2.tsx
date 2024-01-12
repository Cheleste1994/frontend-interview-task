import { useState } from 'react'
import { useHistory } from 'react-router'

const URL_API = '/api/endpoint'

type initialState = {
    isLoading: boolean
    dataState: null | { ok: boolean }
    errorMessage: null | string
}

export default function LoginPageStep2() {
    const [emailValue, setEmailValue] = useState(sessionStorage.getItem('email') || '')
    const [{ dataState, errorMessage, isLoading }, setInitialState] = useState<initialState>({
        isLoading: false,
        dataState: null,
        errorMessage: null,
    })

    const history = useHistory()

    const handleSubmit = async () => {
        setInitialState({ isLoading: true, dataState: null, errorMessage: null })
        const results = await fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailValue,
            }),
        })

        try {
            if (results.ok) {
                const data = (await results.json()) as { ok: boolean }
                setInitialState({ isLoading: false, dataState: data, errorMessage: null })
                return
            }
            throw new Error(results.statusText)
        } catch (error) {
            if (error instanceof Error) {
                setInitialState({ isLoading: false, dataState: null, errorMessage: error.message })
            }
        }
    }

    return (
        <div className="flex flex-col grow">
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input
                    placeholder="example@email.com"
                    className="input"
                    disabled
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                />
            </label>
            <div className="flex flex-nowrap justify-center gap-5 mt-auto">
                <button className={`btn btn-primary flex-1`} onClick={() => history.goBack()}>
                    Back
                </button>
                <button
                    className={`btn btn-primary flex-1 relative`}
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    )}
                    Confirm
                </button>
            </div>
            {dataState || errorMessage ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <button
                                        type="button"
                                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="popup-modal"
                                        onClick={() => setInitialState({dataState: null, errorMessage: null, isLoading: false})}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className='flex min-w-[200px] min-h-[100px] justify-center items-center text-2xl px-2'>
                                    {errorMessage && <span className='text-red-600'>{`Error! ${errorMessage}`}</span>}
                                    {dataState && <span className='text-lime-600'>Success!</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
