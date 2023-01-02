import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, Link} from '@inertiajs/inertia-react';
import SelectYear from "@/Components/SelectYear";
import {Inertia} from "@inertiajs/inertia";

function Index(props) {
const handleSelectChange = (query) =>{
    Inertia.get(route('games.index',{'year':query.target.value} ));
}
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight"></h2>}
        >
            <Head title=""/>

            <div className="sm:px-6 mt-6 w-full">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
<div>
       <SelectYear handleSelectChange={handleSelectChange} />
</div>
                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <tbody>
                            {props.games.map(game => {
                                let result='';
                                return (

                                    <tr key={game.id} tabIndex="0"
                                        className="focus:outline-none h-16 border border-gray-100 rounded">

                                        <td className="">
                                            <div className="flex items-center pl-5">
                                                <p className="text-base font-medium leading-none text-gray-700 mr-2">{game.location.name}</p>

                                            </div>
                                        </td>
                                        {game.users.map(user => {
                                                result += user.pivot.gems + " : "
                                                return (
                                                    <td key={user.id} className="pl-5">
                                                        <button
                                                            className={`py-3 px-3 text-sm focus:outline-none leading-none rounded
                                                ${user.id == game.winner ? 'text-cyan-700 bg-cyan-100' : 'text-gray-700 '}`}>
                                                            {user.name}
                                                        </button>
                                                    </td>
                                                )
                                            }
                                        )}
                                        <td className="pl-5">
                                            <button
                                                className="py-3 px-3 text-sm focus:outline-none w-16 leading-none text-cyan-700 bg-cyan-100 rounded">{result.slice(0, -2)}
                                            </button>
                                        </td>
                                        <td className="pl-5">
                                            <button
                                                className="py-3 px-3 text-sm focus:outline-none leading-none text-gray-700 rounded">{game.date}
                                            </button>
                                        </td>
                                        <td className="pl-4">

                                            <button
                                                className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">Detalji
                                            </button>
                                        </td>

                                    </tr>
                                )}
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
