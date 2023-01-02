import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';

function Index(props) {
    const {users} = props;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Igraci</h2>}>
            <Head title="Igraci"></Head>
            <div className="sm:px-6 mt-6 w-full">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <h3 className=" px-3 py-2 bg-stone-100 rounded">Ukupno odigranih meceva: {props.games}</h3>
                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <tbody>
                            {users.data.map(user =>
                                <tr key={user.id} tabIndex="0"
                                    className="focus:outline-none h-16 border border-gray-100 rounded">
                                    <td className="">
                                        <div className="flex items-center pl-5">
                                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{user.name}</p>
                                        </div>
                                    </td>
                                    {user.role[0].name != 'admin' ?
                                    <td className="">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">Broj pobeda: <span className="font-bold text-cyan-700">{user.win}</span></p>
                                    </td> : <td></td> }
                                    <td className="pl-5">
                                    <span
                                        className={`py-2 px-3 text-sm leading-none rounded
                                        ${user.role[0].name == 'admin' ? 'text-cyan-700 bg-cyan-100' : 'text-white bg-cyan-700'}`}>
                                        {user.role[0].name != "admin" ? "IGRAC" : "Korisnik"}
                                    </span>
                                    </td>
                                    {user.role[0].name != 'admin' ?
                                    <td className="pl-4">
                                        <Link
                                            className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                            href={route('user.show', user.id)}>Mečevi</Link>

                                    </td> : <td></td>
                                    }
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default Index;
