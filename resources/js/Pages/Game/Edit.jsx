import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";

function Edit(props) {
    console.log(props)
    const [win, setWin] = useState(null);
    const selectedP1 = {
        value: props.game[0].users[0].id,
        label: props.game[0].users[0].nickname
    }
    const selectedP2 = {
        value: props.game[0].users[1].id,
        label: props.game[0].users[1].nickname
    }
    const location = {
        value: props.game[0].location.id,
        label: props.game[0].location.name,
    }
    if (props.game.winner) {
        setWin({
            value: props.game.winner,
            label: props.igraci.filter(igrac => igrac.id = props.game.winner).name
        })
    }

    const {data, setData, errors, post, put} = useForm({
        date: props.game[0].date || '',
        winner: props.game[0].winner || '',
        location: props.game[0].location_id || '',
        p1: props.game[0].users[0].id,
        p2: props.game[0].users[1].id,
        g1: props.game[0].users[0].pivot.gems,
        g2: props.game[0].users[1].pivot.gems,
    })
    let igraci = []
    props.igraci.map(igrac => {
            igraci.push({
                value: igrac.id,
                label: igrac.nickname
            })
        }
    )
    let lokacije = []
    props.lokacije.map(lokacija => {
            lokacije.push({
                value: lokacija.id,
                label: lokacija.name
            })
        }
    )
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('games.update', props.game, data));
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight">Uredi mec</h2>}
        >
            <Head title="Uredi mec"/>

            <div className="sm:px-6 mt-6 w-full">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <form onSubmit={handleSubmit}>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-2/3">
                                <InputLabel forInput="datum" value="Datum meča"/>
                                <input type="date" name="datum" value={data.date}
                                       onChange={e => setData("date", e.target.value)}/>
                            </div>
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-2/3">
                                <InputLabel forInput="lokacija" value="Lokacija"/>
                                <Select options={lokacije}
                                        defaultValue={location}
                                        onChange={location => setData('location', location)}/>
                            </div>
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-2/3">
                                <InputLabel forInput="p1" value="Igrač 1"/>
                                <Select options={igraci}
                                        defaultValue={selectedP1} onChange={selectedP1 => setData('p1', selectedP1)}
                                />
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <InputLabel forInput="g1" value="Igrac 1 gems"/>
                                <input type="number" name="g1" value={data.g1}
                                       onChange={e => setData("g1", e.target.value)}/>
                            </div>
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-2/3">
                        <InputLabel forInput="p2" value="Igrač 2"/>
                        <Select options={igraci}
                                defaultValue={selectedP2} onChange={selectedP2 => setData('p2', selectedP2)}
                        />
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <InputLabel forInput="g2" value="Igrac 2 gems"/>
                                <input type="number" name="g2" value={data.g2}
                                       onChange={e => setData("g2", e.target.value)}/>
                            </div>
                        </div>



                        <PrimaryButton>Promeni meč</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Edit;
