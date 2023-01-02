import React, {useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import Checkbox from "@/Components/Checkbox";

export default function Register({auth}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        nickname: '',
        password: '',
        role: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.value : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel forInput="name" value="Name"/>

                                <TextInput
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel forInput="email" value="Email"/>

                                <TextInput
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel forInput="nickname" value="Nickname"/>

                                <TextInput
                                    type="text"
                                    name="nickname"
                                    value={data.nickname}
                                    className="mt-1 block w-full"
                                    autoComplete="nickname"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError message={errors.nickname} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel forInput="password" value="Password"/>

                                <TextInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel forInput="password_confirmation" value="Confirm Password"/>

                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2"/>
                            </div>
                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox name="role" value="admin" handleChange={onHandleChange}/>
                                    <span className="ml-2 text-sm text-gray-600">Admin</span>
                                </label>
                                <label className="flex items-center">
                                    <Checkbox name="role" value="user" handleChange={onHandleChange}/>
                                    <span className="ml-2 text-sm text-gray-600">User</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('login')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton className="ml-4" processing={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
